import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { RegisterAccount } from "@/app/types/types";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import { fetchUserInfo, signInUser } from "./keyFunctions";

const registerUser = async(user: RegisterAccount)  => {

  try{

    console.log('about to make api call: ', user);

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

    console.log('made it through')

    const newAccount: User = await response.json();

    return newAccount;

  }catch(error){

    console.log(error);

    throw new Error('Failed to register');

  }
}

export const useRegisterUser = () => {

  return useMutation({

    mutationFn: (user: RegisterAccount) => registerUser(user),

    mutationKey: [QUERY_KEYS.REGISTER_USER],

  })

}


export const useFetchUserInfo = (userId: string) => {

  return useQuery({

    queryFn: () => fetchUserInfo(userId),

    queryKey: [QUERY_KEYS.FETCH_USER_INFO],

    enabled: !!userId

  })

}

export const useSignInUser = () => {

  return useMutation({

    mutationFn: (credentials: {email: string, password: string}) => signInUser(credentials),

    mutationKey: [QUERY_KEYS.SIGN_IN_USER]
  })

}