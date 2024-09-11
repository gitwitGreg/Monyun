'use client'

import React from 'react'
import * as pdfjsLib from 'pdfjs-dist';

const FileInput = () => {

    const onFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault();

        const file = e.target.files?.[0];

        if(!file){

            console.log('Missing file');

            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = onLoadFile;

        fileReader.readAsArrayBuffer(file);

    }

    function onLoadFile(event: any){

        const typedArray = new Uint8Array(event.target.result);

        pdfjsLib.getDocument({
            data: typedArray
        }).promise.then((pdf) => {

            console.log('loaded: ', pdf.numPages);

            pdf.getPage(1).then((page)=>{
                page.getTextContent().then((content) => {
                    let text = '';
                    content.items.forEach((item: any) => {
                        text += item.str + ' '
                    });
                    console.log('text: ', text);
                })
            })

        })

        

    }

  return (
    <div className='w-full h-auto'>

        <div className='flex justify-center'>
            <h1 className='text-xl font-serif mb-4'>
                Upload Bank statements
            </h1>
        </div>

        <div className='w-full h-auto'>

            <img
            src='/file-upload.svg'
            className='w-full h-auto'
            />
            
            <div className='flex flex-col h-atuo w-auto justify-center items-center'>

                <p className="text-light-4 small-regular mb-6">
                    SVG, PNG, JPEG 
                </p>
                
                <input 
                type='file'
                className='w-auto h-auto'
                onChange={onFileChange}
                accept='.pdf'/>
            </div>

        </div>

    </div>
  )
}

export default FileInput
