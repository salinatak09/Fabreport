import { NextResponse } from "next/server";
import {hash} from "bcryptjs";
import User from "@/models/users";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    console.log('payload', { name, email, password });
    const existUser = await User.findOne({email});
    console.log({existUser});
    if(existUser){
      return NextResponse.json({
        message: 'User Exists Already!!',
        error: 'Try with a new Email !'
      });
    }
    const hashedPassword = await hash(password, 10);
    console.log({hashedPassword});
    const newUser = await User.create({ name, email, password:hashedPassword});
    console.log("userSchema:" , User);
    console.log({newUser});
    newUser.save();
    return NextResponse.json({
      message:'User created Succesfully!',
      result: newUser
    });
  } catch (error) {
    console.log({error});
    return NextResponse.json({
      message: 'Error in creating User!!', 
      error
    });
  }
}