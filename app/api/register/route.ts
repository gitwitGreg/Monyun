import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { genSaltSync, hash } from "bcryptjs";
import { encrypt } from "@/app/lib/lib";


/**
 * 
 * @param req  stringified object of user information
 * @param res - json object of user account
 * @returns  - user account
 */


export async function POST (req: NextRequest, res: NextResponse) {

    /** Convert request to json */
    const body = await req.json();

    try{
    
        /** Handle case of submission without password */
        if(!body.password){
    
            console.log('missing information');
    
            return 
        }
    
    
        /** Create prisma instance */
        const prisma = new PrismaClient();
    
        const exsistingUser =  await prisma.user.findFirst({
            where: {
                username: body.username
            }
        })
    
        if(exsistingUser){
    
            return {error: 'Username already taken'}
    
        }
    
        /** Create salt for hash */
        const salt = genSaltSync(10)
        
        /** Hash password */
        const hashPassword =  await hash(body.password, salt);
    
        /** Create user in database */
        const newAccount = await prisma.user.create({
            data: {
                name: body.name as string,
                email: body.email as string,
                username: body.username as string,
                password: hashPassword,
                profilePicture: ''
            }
        })
    
        /** Handle creation errors */
        if(!newAccount){
    
            console.log('There was an error creating your account');
    
            return
    
        }

        /** Create expitation time */
        const expiration = new Date(Date.now() + 10 * 60 * 1000);
    
        /** Create a user session */
        const session = await encrypt({newAccount, expiration});
        
        /** Pass the session through cookies */
        cookies().set('session', session, {expires: expiration});
    
        /** Return account */
        return NextResponse.json(newAccount);

    }catch(error){

        /** Handle any erros */
        console.log(error);

        return NextResponse.json({error: error});
        
    }
}