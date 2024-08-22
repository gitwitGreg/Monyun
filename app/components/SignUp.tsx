import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { UseSelector } from 'react-redux';
import { updateUser } from '../lib/redux/user/userSlice';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '../lib/tanstack/queryKeys';
import { User } from '@prisma/client';
import { useRegisterUser } from '../lib/tanstack';
import { RegisterAccount } from '../types/types';

const SignUp = () => {

  return (

    <div className='h-screen w-full flex flex-col items-center justify-center bg-black text-black'>

      <form action={async(formData)=> {

        'use server'

        const user = {
        email: formData.get('email') as string,
        name: formData.get('name') as string,
        password: formData.get('password')as string,
        username: formData.get('username')as string
        }

        const registeUser = useRegisterUser();

        console.log('user we are passing: ', user);

        registeUser.mutateAsync(user);
         
      }}
      className='flex flex-col gap-10 w-[50%] p-10 bg-white py-28 rounded-2xl'>

        <div className="flex justify-center items-center">
          <h1 className="font-bold text-4xl gap-4">Signup</h1>
        </div>

        <input 
          className='w-full p-5 h-auto rounded-2xl border'
          type="name"
          name='name'
          placeholder="Name"
        />

        <input 
          className='w-full p-5 h-auto rounded-2xl border'
          type="email"
          name="email"
          placeholder="Email"
        />

        <div className="flex gap-5">

          <input
          className='w-full p-5 h-auto rounded-2xl border text-black'
          type="password"
          name='password'
          placeholder="Password"
          />

          <input
          className='w-full p-5 h-auto rounded-2xl border text-black'
          type="username"
          name= 'username'
          placeholder="Username"
          />

        </div>

        <div className=" flex w-full items-center justify-center">

          <button className="bg-black text-white rounded-xl p-5 w-[50%] hover:bg-white hover:text-black ease-in hover:border">
            Login
          </button>

        </div>

      </form>

  </div>

  )
}

export default SignUp

