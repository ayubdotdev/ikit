import { NextRequest, NextResponse  } from "next/server";
import {connectToDatabase} from "@/lib/db";
import User from "@/models/User";

export async function POST(request:NextRequest){
    try {
        const {email,password}=  await request.json();
        if(!email || !password){
            return NextResponse.json(
                {message:"Please provide an email and password"},
                {status:400}
            )
        }

        await connectToDatabase();
        console.log("connected to database");
        // check if user alreay exist
        const existingUser = await User.findOne({email});

        if (existingUser) {  // Fix: Check if user exists instead of using !
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 400 }
            );
        }
        
        await User.create({email,password});

        return NextResponse.json(
            {message:"User created successfully"},
            {status:201}
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {message:"Something went wrong"},
            {status:500}
        )
    }
}

