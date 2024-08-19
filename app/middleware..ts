import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "./lib/lib";


export async function middleware (req: NextRequest) {

    return updateSession(req);

}