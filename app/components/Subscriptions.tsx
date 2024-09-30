'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/redux/store';

const Subscriptions = () => {
    
  const userSubscriptions = useSelector((state: RootState) => state.subscription.user);

  if(userSubscriptions){

    return(

        <div className='h-full w-full overflow-x-scroll'>

            <p>{userSubscriptions.subscriptions}</p>

        </div>
    )
  }
    
  return (
    <div className='w-full h-auto'>
      No found subscriptions yet
    </div>
  )
}

export default Subscriptions
