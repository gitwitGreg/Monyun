import React from 'react'
import FileInput from './FileInput'
import Subscriptions from './Subscriptions'

const Dashboard = () => {

  return (

    <div className='p-20 bg-white flex gap-20 justify-center h-full w-full overflow-scroll'>

        <div className=' bg-orange-500 w-full h-full overflow-scroll p-10'>

          <FileInput />

        </div>
        
        <div className='bg-blue-500 p-10 w-full h-auto text-black overflow-scroll'>

          <Subscriptions /> 

        </div>


    </div>

  )
  
}

export default Dashboard
