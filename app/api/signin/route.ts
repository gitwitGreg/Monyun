import { encrypt } from "@/app/lib/lib";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest){

    try{

        /** Convert to json data */
        const credentials = await req.json();

        const {email, password} = credentials;

        console.log('password: ', password);

        /** Create new prisma instance */
        const prisma = new PrismaClient();
    
        /** Find associated accont */
        const account = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
    
        /** Handle case of invalid id */
        if(!account){

            console.log('unable to find account associated with provided id');


            return NextResponse.json({error: 'No account with provided email'}, {status: 404});

        }

        /** Handle session login */

        console.log('password: ', password);

        console.log('hash string: ', account.password);

        const passwordCompare = await compare(password, account.password);

        console.log('password comppare: ', passwordCompare)

        if(!passwordCompare){
    
            console.log('Incoorect password provided');
    
            return {error: 'Incorrect password'}
    
        }
    
        /* check the database to see if the user is valid if not throw error */
    
        const experation = new Date(Date.now() + 10 * 60 * 1000);
    
        const session = await encrypt({account, experation});
    
        cookies().set('session', session, {expires: experation});

        /** return user account information */
        return NextResponse.json(account);
    

    }catch(error){

        console.log(error);

        return NextResponse.json({error: error})

    }


}