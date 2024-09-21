'use client'

import React, { useEffect, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/webpack';
import { Metadata } from 'next';


const FileInput = () => {

  const [bankStatents, setBankStatents] = useState();

  const [subscriptions, setSubscriptions] = useState();

  const [pdfText, setPdfText] = useState<string|undefined>();

  const [metaData, setMetaData] = useState<any|undefined>();

  const [err, setErr] = useState<string|undefined>();

  const onFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {

    e.preventDefault();

    const files = e.target.files;

    if(!files){

      console.log('Missing file');

      return;

    }

    const fileArray = Array.from(files)


    fileArray.forEach((file) => {

      const fileReader = new FileReader();

      fileReader.onload = onLoadFile;

      fileReader.readAsArrayBuffer(file);
      
    });

  }

  function onLoadFile(event: any){

    const typedArray = new Uint8Array(event.target.result);

    pdfjsLib.getDocument({
        data: typedArray
    }).promise.then((pdf) => {

      setMetaData(metaData);

      pdf.getPage(1).then((page)=>{
        page.getTextContent().then((content) => {
          let text = '';
          content.items.forEach((item: any) => {
            text += item.str + ' '
          });
          setPdfText(text)
        })
      })

    })   

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

  }

  useEffect(() => {
    if(pdfText){
      sendToAi(pdfText);
    }
  },[pdfText])

  if(subscriptions){
    console.log(subscriptions);
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
