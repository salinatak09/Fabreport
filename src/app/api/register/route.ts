import { NextResponse } from "next/server";
import {hash} from "bcryptjs";
import User from "@/models/users";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const existUser = await User.findOne({email});
    if(existUser){
        return NextResponse.json({
            message: 'User Exists Already!!',
            error: 'Try with a new Email !'
        });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({ name, email, password:hashedPassword});
    newUser.save();
    return NextResponse.json({
        message:'User created Succesfully!',
        result: newUser
    });
  } catch (error) {
    return NextResponse.json({
        message: 'Error in creating User!!', 
        error
    });
  }
}