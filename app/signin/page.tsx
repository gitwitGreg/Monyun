import { redirect } from "next/navigation";
import { login } from "../lib/lib";
import LoginIcon from '@mui/icons-material/Login';
import { hash } from 'bcryptjs';
import { genSaltSync } from "bcryptjs";

export default function signin(){

  return(

    <div className='h-screen w-full flex flex-col items-center justify-center bg-black'>

      <form action={

        async (formData) => {

          'use server';

          const user = {
            email: formData.get('email'),
            password: formData.get('password')
          }

          await login(user);

          // redirect("/");

        }

      }
      className='flex flex-col gap-10 w-[50%] p-10 bg-white py-28 rounded-2xl'>

          <div className="flex justify-center items-center">
              <h1 className="font-bold text-4xl gap-4">Login <LoginIcon /></h1>
          </div>

        <input 
          className='w-full p-5 h-auto rounded-2xl border'
          type="email"
           name="email"
          placeholder="Email"
        />

        <input
        className='w-full p-5 h-auto rounded-2xl border text-black'
        type="password"
        name="password"
        placeholder="Password"
        />

        <div className=" flex w-full items-center justify-center">
          <button className="bg-black text-white rounded-xl p-5 w-[50%] hover:bg-white hover:text-black ease-in hover:border">Login</button>
        </div>

      </form>
      
    </div>
  )

}