'use client'

import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { UseSelector } from 'react-redux';
import { updateUser } from '../lib/redux/user/userSlice';
import { useMutation } from '@tanstack/react-query';
import { User } from '@prisma/client';
import { useRegisterUser } from '../lib/tanstack';
import { useRouter } from 'next/navigation'

const SignUp = () => {

  const [email, setEmail] = useState <string | undefined>();

  const [name, setName] = useState<string | undefined>();

  const [password, setPassword] = useState <string | undefined>();

  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false)

  const [username, setUsername] = useState<string | undefined>();

  const [error, setError] = useState<string | undefined>();

  const {mutate: registerUser} = useRegisterUser();

  const router = useRouter();

  const handleSubmit = async(e: any) => {

    e.preventDefault();

    console.log('starting submit');
    
    registerUser({
      email: email,
      name: name,
      password: password,
      username: username
    },{
      onSuccess: (data) => {

        router.push(`/?id=${data.id}`);

        setShouldRedirect(true);
        
        router.refresh();

      }
    });

  }


  return (

    <div className='h-screen w-full flex flex-col items-center justify-center bg-black text-black'>

      <form onSubmit={handleSubmit}

      className='flex flex-col gap-10 w-[50%] p-10 bg-white py-28 rounded-2xl'>

        <div className="flex justify-center items-center">
          <h1 className="font-bold text-4xl gap-4">Signup</h1>
        </div>

        <input 
          className='w-full p-5 h-auto rounded-2xl border'
          type="name"
          name='name'
          minLength={8}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
        />

        <input 
          className='w-full p-5 h-auto rounded-2xl border'
          type="email"
          name="email"
          minLength={8}
          onChange={ e => setEmail(e.target.value)}
          placeholder="Email"
        />

        <div className="flex gap-5">

          <input
          className='w-full p-5 h-auto rounded-2xl border text-black'
          type="password"
          name='password'
          minLength={8}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          />

          <input
          className='w-full p-5 h-auto rounded-2xl border text-black'
          type="username"
          name= 'username'
          minLength={8}
          onChange={e => setUsername(e.target.value)}
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

