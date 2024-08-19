import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { loginUser } from "../types/types";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { compare, genSaltSync, hash } from "bcryptjs";
import { UseSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { updateUser } from "./redux/user/userSlice";



const secretKey = process.env.JWT_SECRET;

const key = new TextEncoder().encode(secretKey);


export async function encrypt(payload: any){

    return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('10 seconds from now')
    .sign(key)

}

export async function decrypt(input: any) : Promise<any> {

    const payload = await jwtVerify(input, key, {
        algorithms: ['HS256']
    });

    return payload;
}

export async function login(formData: any){

    const user = formData;

    console.log(user);

    const prisma = new PrismaClient();

    const userAccount = await prisma.user.findFirst({

        where: {

            email: user.email,

        }
    })

    if(!userAccount){

        console.log('user doesnt have an account');

        return {error: 'User does not have an account'};

    }

    const passwordCompare = await compare(userAccount.password,  user.password);

    if(!passwordCompare){

        console.log('Incoorect password provided');

        return {error: 'Incoorect password'}

    }

    // updateUser(userAccount);

    /* check the database to see if the user is valid if not throw error */

    const experation = new Date(Date.now() + 10 * 60 * 1000);

    const session = await encrypt({user, experation});

    cookies().set('session', session, {expires: experation});

}

export async function register(formData: any){

    const user = formData;

    console.log(user);

    if(!user){

        console.log('missing information');

        return {error: 'Missing user information'}
    }


    const prisma = new PrismaClient();

    // const exsistingUser =  await prisma.user.findFirst({
    //     where: {
    //         username: user.username
    //     }
    // })

    // if(exsistingUser){

    //     return {error: 'Username already taken'}

    // }

    const salt = genSaltSync(10)
    
    const hashPassword = await hash(user.password, salt);

    const newAccount = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            username: user.username,
            password: hashPassword,
            profilePicture: ''
        }
    })

    if(!newAccount){

        console.log('There was an error creating your account');

        return {error: 'There was an error while creating your account'}

    }



    const expiration = new Date(Date.now() + 10 * 60 * 1000);

    const session = await encrypt({newAccount, expiration});

    cookies().set('session', session, {expires: expiration});

}

export async function updateSession(req: NextRequest){

    const session = req.cookies.get('session')?.value;

    if(!session){

        console.log('missing session');

        return null;

    }

    const parsed = await decrypt(session);

    parsed.experes = new Date(Date.now() + 10 * 60 * 1000);

    const  res = NextResponse.next();

    res.cookies.set({

        name: session,

        value: await encrypt(parsed),

        httpOnly: true,

        expires: parsed.expires

    });

}

export async function getSession(){

    const session = cookies().get('session')?.value;

    if(!session){

        console.log('no session information');

        return null;
    }

    return decrypt(session);

}





