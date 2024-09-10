import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";


/**
 * 
 * @param req Stringified object with user id
 * @returns - user account
 */

export async function POST(req: NextRequest){

    /** Convert request to json */
    const userId = await req.json();

    /** Create a prisma instance */
    const prisma = new PrismaClient();

    try{

        /** Find associated account based on id */
        const userAccount = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });

        /** Handle any errors with finding user account */
        if(!userAccount){

            console.log("unable to find user with associated id");

            return NextResponse.json({error: 'Unable to find user with provided id'}, {status: 404})
        }
    
        /** Return user account */
        return NextResponse.json(userAccount);

    }catch(error){

        /** Handle any unexpected erros */
        console.log(error);

        return NextResponse.json({error: error}, {status: 400})

    }

}