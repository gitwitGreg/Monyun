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
import Link from 'next/link'

const NavBar = () => {

  const dispatch = useDispatch();

  const sessionAccount = useSelector((state: RootState) => state.userSlice.user);

  const searchParams = useSearchParams();

  const userId = searchParams.get('id');

  console.log('userId', userId);

  const {data: userInfo, error, isLoading} = useFetchUserInfo(userId as string);

  useEffect(() => {
  },[])


  useEffect(() => {
    if(userInfo){
      dispatch(updateUser(userInfo))
    }
  },[userInfo]);

  if(sessionAccount){
    return(
      <div className='bg-black text-white p-10 flex justify-between border-black'>

        <div>
          <Link href='/'>
            <h1 className='text-xl text-purple-300 font-bold'>
              Monyun
            </h1>
          </Link>
        </div>

        <div className='flex'>
          <div>
            {sessionAccount.profilePicture && (
              <div className='rounded-xl'>
                <img 
                src={sessionAccount.profilePicture}
                width={20}
                height={20}
                alt='Users profile picture'/>
              </div>
            )}
          </div>
        </div>

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
