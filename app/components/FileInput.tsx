'use client'

import React, { useEffect, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/webpack';
import Tesseract from 'tesseract.js';
import { updateSubscriptions } from '../lib/redux/subscriptions/subcriptionSlice';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';
import { useRouter } from 'next/navigation';
import { TailSpin } from 'react-loader-spinner';


const FileInput = () => {

  const [bankStatents, setBankStatents] = useState();

  const [subscriptions, setSubscriptions] = useState();

  const [pdfText, setPdfText] = useState<string|undefined>();

  const [err, setErr] = useState<string|undefined>();

  const userSubscriptions = useSelector((state: RootState) => state.subscription.user);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const onFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {

    e.preventDefault();

    const files = e.target.files;

    if(!files){

      console.log('Missing file');

      return;

    }

    const fileArray = Array.from(files)

    try{

      fileArray.forEach((file) => {

        const fileReader = new FileReader();
        
        console.log('we have the file: ', file);
  
        fileReader.onload = async(event) => {

           await onLoadFile(event);

        };

        fileReader.onerror = (error) => {

          console.log('error: ', error);

        }
  
        const buffer = fileReader.readAsArrayBuffer(file);

        console.log('past the file reader buffer', buffer);
        
      });

    }catch(error){

      console.log(error);

    }

  }

  const onLoadFile = async(event: any) => {

    const typedArray = new Uint8Array(event.target.result);

    setIsLoading(true);

   try{

    const pdf = await pdfjsLib.getDocument({
      data: typedArray
    }).promise

    if(!pdf){

      console.log('error loading the pdf');

      return;
    }

    const numPages = pdf.numPages;

    console.log('num pages: ', numPages);

    let pageContent = '';

    for(let i = 1; i <= numPages; i++){

      console.log("on page number: ", i);

      const page = await pdf.getPage(i);

      if(!page){

        console.log('error getting page');

        return;

      }


      const operatorList = await page.getOperatorList();

      const hasImages = operatorList.fnArray.includes(pdfjsLib.OPS.paintImageXObject);

      if (hasImages) {

        console.log(`Page ${i} contains images, no selectable text available.`);


        const veiwPort = page.getViewport({
          scale: 1
        });

        const canvas = document.createElement('canvas');

        const context = canvas.getContext('2d');

        if(!context){

          console.log('no context');

          return;
        }

        canvas.height = veiwPort.height;

        canvas.width = veiwPort.width;

        const renderTask = page.render({
          canvasContext: context,
          viewport: veiwPort
        });

        await renderTask.promise;

        const ocrResult = await Tesseract.recognize(canvas, 'eng');

        pageContent += ocrResult.data.text + ' ';

        console.log(`ocr text for page ${i}: `, ocrResult);

        continue;

      }

      console.log('page: ', page );

      const content = await page.getTextContent();

      console.log('content: ', content);

      if(!content || !content.items){

        console.log('error getting page content');

        return;

      }

      if(content.items.length === 0) {

        console.log('no content on this page');
        
        continue;

      }
      
      content.items.forEach((item: any) => {

        if(!item.str){

          console.log('the item on this page has null content');

        }else{

          console.log('item: ', item);

          pageContent += item.str + ' ';

        }

      });
      
    } 

    setPdfText(pageContent);

   }catch(error){

    console.log('error in on file load: ', error);

   }

  }


  const sendToAi = async(text: string) => {

    console.log('sending to ai');


    const response = await fetch('/api/chatAi', {

      method: "POST",

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(text)

    });

    if(!response.ok){

      const errObj = await response.json();

      setErr(errObj.error);

      return;
    }

    const resObj = await response.json();

    const foundSubs = resObj.subscriptions;

    setSubscriptions(foundSubs);

    console.log('found subs: ', foundSubs);

    if(!foundSubs){

      console.log('we havent found the subscriptions yet');

      return;

    }

    console.log('about to dispatch subsriptionsz')


    console.log('user subs from  before dispatch', userSubscriptions)

    dispatch(updateSubscriptions({subscriptions: foundSubs}));

    console.log('user subs after dispatch', userSubscriptions);

    setIsLoading(false);

    router.refresh();

  }

  useEffect(() => {
    
    if(pdfText){

      sendToAi(pdfText);

    }

  },[pdfText])


  if(userSubscriptions){

    console.log(userSubscriptions.subscriptions);

  }

  if(isLoading){

    return (
      <div className="h-screen w-full items-center flex justify-center">

        <TailSpin
        height="200"
        width="200"
        color="orange"
        ariaLabel="loading"
        />

      </div>

    )
  }

  return (

    <div className="w-full h-auto">

      {!bankStatents && (
        <>
          <div className="flex justify-center">

            <h1 className="text-xl font-serif mb-4">

              Upload Bank statements

            </h1>

          </div>

          <div className="w-full h-auto">

            <img 
            src="/file-upload.svg" 
            className="w-full h-auto" 
            />

            <div className="flex flex-col h-atuo w-auto justify-center items-center">

              <p className="text-light-4 small-regular mb-6">
                SVG, PNG, JPEG
              </p>

              <input
              type="file"
              className="w-auto h-auto ml-20"
              onChange={onFileChange}
              multiple
              accept=".pdf"
              />

            </div>

          </div>

        </>

      )}

    </div>
  );

}

export default FileInput
