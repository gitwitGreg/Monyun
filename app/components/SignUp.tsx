'use client'

import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { UseSelector } from 'react-redux';
import { updateUser } from '../lib/redux/user/userSlice';
import { register } from '../lib/lib';

const SignUp = () => {

  const [name, setName] = useState<string | undefined>();

  const [username, setUsername] = useState<string | undefined>();

  const [email, setEmail] = useState<string | undefined>();

  const [password, setPassword] = useState<string | undefined>();


  const dispatch = useDispatch();

  const registerUser = async(e: React.FormEvent<HTMLInputElement>) => {

    e.preventDefault();

    const user = {
      email: email,
      name: name,
      password: password,
      username: username,

    }

    const newAccount = await register(user);


    if(newAccount){
      console.log('dispatch')
      dispatch(updateUser(newAccount))
    }else{
      console.log('missing account');
    }
    
    redirect(`/`);

  }

  
  return (

    <div className='h-screen w-full flex flex-col items-center justify-center bg-black'>

      <form onSubmit={() => registerUser}
      className='flex flex-col gap-10 w-[50%] p-10 bg-white py-28 rounded-2xl'>

        <div className="flex justify-center items-center">
          <h1 className="font-bold text-4xl gap-4">Signup</h1>
        </div>

        <input 
          className='w-full p-5 h-auto rounded-2xl border'
          type="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <input 
          className='w-full p-5 h-auto rounded-2xl border'
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <div className="flex gap-5">

          <input
          className='w-full p-5 h-auto rounded-2xl border text-black'
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          />

          <input
          className='w-full p-5 h-auto rounded-2xl border text-black'
          type="username"
          onChange={(e)=> setUsername(e.target.value)}
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

