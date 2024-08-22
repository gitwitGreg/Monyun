import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { genSaltSync, hash } from "bcryptjs";
import { encrypt } from "@/app/lib/lib";


export async function POST (req: NextRequest, res: NextResponse) {

    const body = await req.json();

    try{
        
        console.log('user:', body);
    
        if(!body.password){
    
            console.log('missing information');
    
            return 
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
        
        const hashPassword =  await hash(body.password, salt);
    
        const newAccount = await prisma.user.create({
            data: {
                name: body.name as string,
                email: body.email as string,
                username: body.username as string,
                password: hashPassword,
                profilePicture: ''
            }
        })
    
        if(!newAccount){
    
            console.log('There was an error creating your account');
    
            return
    
        }

    
        // const expiration = new Date(Date.now() + 10 * 60 * 1000);
    
        // const session = await encrypt({newAccount, expiration});
    
        // cookies().set('session', session, {expires: expiration});
    
        return newAccount;

    }catch(error){

        console.log(error);
        
    }
}