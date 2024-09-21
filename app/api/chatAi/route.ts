import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

/**
 * 
 * @param req string containing user bank statement information
 * @returns - hatCompletionMessage from open ai
 */


export async function POST (req: NextRequest){

    console.log('starting')

    /** convert request to json */
    const userBankData = await req.json();
    
    /** Create open ai instance */
    const openai = new OpenAI();

    /** Create message object to pass to chat completion */
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        {
          role: "system",
          content:
            "You are a helpful finance assistant that will take in users' bank statements in text form, identify recurring subscriptions, provide the name of the subscription, and offer a link to cancel it.",
        },
        {
          role: "user",
          content: `Bank statement data: ${userBankData}`, 
        },
    ];

    /** Chat completion request */
    try{

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",

            messages

        });

        /** Return json object with response from ai */
        return NextResponse.json({subscriptions: completion.choices[0].message.content});

    }catch(error){

        /** Return json object with error */
        return NextResponse.json({error: error}, {status: 400})

    }

}