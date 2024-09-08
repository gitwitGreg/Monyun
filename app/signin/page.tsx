'use client'

import { useRouter } from "next/navigation";
import LoginIcon from '@mui/icons-material/Login';

import { useEffect, useState } from "react";
import { useSignInUser } from "../lib/tanstack";

export default function signin(){

  const [email, setEmail] = useState <string | undefined>();

  const [errMess, setErrMess] = useState<string | undefined>()

  const [password, setPassword] = useState<string | undefined>();

  const router = useRouter();

  const {mutate: signInUser} = useSignInUser();

  const handleSubmit = async(e: any) => {

    e.preventDefault();

    console.log('starting submit');

    if(!email || !password){

      setErrMess('Missing log in credentials');

      return;
      
    }
    
    signInUser({email, password},{

      onSuccess: (data) => {

        router.push(`/?id=${data.id}`);

        router.refresh();

      },

      onError: (data) => {

        setErrMess(data.message);
        
      }

    })

  }


  useEffect(() => {
    if(errMess){
      setTimeout(() => {
        setErrMess('');
      },3000)
    }
  },[errMess])

  return(

    <div className='h-screen w-full flex flex-col items-center justify-center bg-black'>

      <form onSubmit={handleSubmit}
      className='flex flex-col gap-10 w-[50%] p-10 bg-white py-28 rounded-2xl text-black'>

        {errMess && (
          <div className="bg-red-500 flex h-full w-full items-center">
            <h1>{errMess}</h1>
          </div>
        )}

          <div className="flex justify-center items-center">
              <h1 className="font-bold text-4xl gap-4">Login <LoginIcon /></h1>
          </div>

        <input 
          className='w-full p-5 h-auto rounded-2xl border'
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
        className='w-full p-5 h-auto rounded-2xl border text-black'
        type="password"
        onChange={(e)=> setPassword(e.target.value)}
        placeholder="Password"
        />

        <div className=" flex w-full items-center justify-center">
          <button className="bg-black text-white rounded-xl p-5 w-[50%] hover:bg-white hover:text-black ease-in hover:border">Login</button>
        </div>

      </form>
      
    </div>
  )

}