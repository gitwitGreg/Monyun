import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { User } from "@prisma/client";
import { updateUser } from "../redux/user/userSlice";
import { RegisterAccount } from "@/app/types/types";



const registerUser = async(user: RegisterAccount) => {

    try{

      const response = await fetch('/api/register', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(user)

      });

      if(!response.ok){

        throw new Error('Failed to register');

      }

      const newAccount = await response.json();

      return newAccount;


    }catch(error){

      console.log(error);

      throw new Error('Failed to register');

    }


}

export const useRegisterUser = () => {

    // const dispatch = useDispatch();

    return useMutation({

        mutationFn: registerUser,

        onSuccess: (data: User) => {

            // dispatch(updateUser(data));


        }
    })

}