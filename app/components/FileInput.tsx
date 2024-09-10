import React from 'react'

const FileInput = () => {
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
                className='w-auto h-auto'/>
            </div>

        </div>

    </div>
  )
}

export default FileInput
