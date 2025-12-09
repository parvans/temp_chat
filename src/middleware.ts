import { NextRequest, NextResponse } from "next/server"
import { redis } from "./lib/redis";
import { nanoid } from "nanoid";

export const middleware = async (req:NextRequest) =>{
    const pathName = req.nextUrl.pathname;
    const roomMatch = pathName.match(/^\/room\/([^/]+)$/);
    if(!roomMatch) return NextResponse.redirect(new URL("/", req.url))

    const roomId = roomMatch[1];
    const meta = await redis.hgetall<{
    connected:string[],createdAt:number}>(
        `meta:${roomId}`
    )

    if(!meta) return NextResponse.redirect(new URL("/?error=room-not-found", req.url))

    const existToken = req.cookies.get('x-auth-token')?.value

    if(existToken && meta.connected.includes(existToken)){
        return NextResponse.next()
    }

    if(meta.connected.length >= 2){
        return NextResponse.redirect(new URL("/?error=room-full", req.url))
    }

    const resp = NextResponse.next()
    const token = nanoid()
    resp.cookies.set("x-auth-token",token,{
        path:'/',
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:"strict"
    })

    await redis.hset(`meta:${roomId}`,{
        connected:[...meta.connected, token]
    })

    return resp
}

export const config = {
    matcher:["/room/:path*"]
}