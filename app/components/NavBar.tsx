'use client'

import React from 'react'
import { useDispatch, UseDispatch, useSelector } from 'react-redux'
import { RootState } from '../lib/redux/store'

const NavBar = () => {

    const user = useSelector((state: RootState) => state.userSlice.user);

    console.log('user: ', user);

    const dispatch = useDispatch;


    if(user.email !== ''){
        return(
            <div>
                Worked
            </div>
        )
    }


  return (
    <div>
      nav page
    </div>
  )
}

export default NavBar
