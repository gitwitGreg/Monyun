import React from 'react'
import FileInput from './FileInput'

const Dashboard = () => {

  return (
    <div className='p-20 bg-white flex gap-20 justify-center h-auto w-full'>

        <div className=' bg-orange-500 w-[50%] h-auto overflow-scroll p-10'>

          <FileInput />

        </div>
        
        <div className='bg-blue-500 p-20 w-[50%]'>

        </div>


    </div>
  )
}

export default Dashboard
