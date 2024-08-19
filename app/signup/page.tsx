import { redirect } from "next/navigation";
import { register } from "../lib/lib";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export default function signup(){
    return(
        <div className='h-screen w-full flex flex-col items-center justify-center bg-black'>

        <form action={
  
          async (formData) => {
  
            'use server';
  
            const user = {
              email: formData.get('email'),
              name: formData.get('name'),
              password: formData.get('password'),
              username: formData.get('username')
            }
  
            await register(user);
  
            redirect(`/`);
  
          }
  
        }
        className='flex flex-col gap-10 w-[50%] p-10 bg-white py-28 rounded-2xl'>
  
            <div className="flex justify-center items-center">
                <h1 className="font-bold text-4xl gap-4">Signup</h1>
            </div>

            <input 
            className='w-full p-5 h-auto rounded-2xl border'
            type="name"
            name="name"
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
            name="password"
            placeholder="Password"
            />

            <input
            className='w-full p-5 h-auto rounded-2xl border text-black'
            type="username"
            name="username"
            placeholder="Username"
            />

          </div>
  
          <div className=" flex w-full items-center justify-center">
            <button className="bg-black text-white rounded-xl p-5 w-[50%] hover:bg-white hover:text-black ease-in hover:border">Login</button>
          </div>
  
        </form>
        
      </div>
    )
}