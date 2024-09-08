'use client'

import React, { useEffect } from 'react'
import { useDispatch, UseDispatch, useSelector } from 'react-redux'
import { RootState } from '../lib/redux/store'
import { usePathname, useSearchParams } from 'next/navigation'
import { updateUser } from '../lib/redux/user/userSlice'
import { fetchUserInfo } from '../lib/tanstack/keyFunctions'
import { useFetchUserInfo } from '../lib/tanstack'
import { useState } from 'react'
import { User } from '@prisma/client'
import WarningIcon from '@mui/icons-material/Warning';

const NavBar = () => {

  const dispatch = useDispatch();

  const sessionAccount = useSelector((state: RootState) => state.userSlice.user);

  const searchParams = useSearchParams();

  const userId = searchParams.get('id');

  console.log('userId', userId);

  const {data: userInfo, error, isLoading} = useFetchUserInfo(userId as string);

  console.log(userInfo);


  useEffect(() => {
    if(userInfo){
      dispatch(updateUser(userInfo))
    }
  },[userInfo]);

  if(sessionAccount){
    return(
      <div>
        Worked
      </div>
    )
  }

  return (
    <div className='flex items-center justify-center p-36'>
      <h1>
        An error occured please refresh the page <WarningIcon/>
      </h1>
    </div>
  )
}

export default NavBar
