import {db} from "@/lib/db";
import { Hash } from "lucide-react";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
export async function POST(req: Request){
    try{
        const body = await req.json();
        const {email, username, password} = body;

        //if email exists
        const existingUserByEmail = await db.user.findUnique({
            where:{email:email}
        });

        if (existingUserByEmail){
            return NextResponse.json({user: null, messag: "an account with this Email already Exists"}, {status: 409})
        }
         //if username exists
        const existingUserByUsername = await db.user.findUnique({
            where:{username:username}
        });

        if (existingUserByEmail){
            return NextResponse.json({user: null, messag: "an account with this Email already Exists"}, {status: 409})
        }

         if (existingUserByUsername){
            return NextResponse.json({user: null, messag: "an account with this Username already Exists"}, {status: 409})
        }
        const hashedPassword = await hash(password,10);
        const newUser = await db.user.create({
            data:{
                username,
                email,
                password : hashedPassword
            }
        })

        return NextResponse.json(body);
    } catch (error){

    }
}