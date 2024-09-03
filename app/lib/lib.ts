import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { loginUser, RegisterAccount } from "../types/types";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, User } from "@prisma/client";
import { compare }from "bcryptjs";
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


export async function updateSession(req: NextRequest){

    const session = req.cookies.get('session')?.value;

    console.log('session: ', session);

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

    const cookie = cookies().get('session')?.value;

    if(!cookie){

        console.log('no session information');

        return null;
    }

    const session = await decrypt(cookie);


}

export async function deleteSession(){
    cookies().delete('session');
}





