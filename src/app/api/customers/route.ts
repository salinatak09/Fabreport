import { connectToDataBase } from "@/lib/db";
import Customer from "@/models/customerData";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET (){
    try {
        const isConn = await connectToDataBase();
        console.log("isConn :", isConn);
        const result = await Customer.find({});
        revalidatePath("/dashboard");
        return NextResponse.json({
            message: 'Customer List fetched Successful!',
            result
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Error while fetching Data',
            error
        });
    }
}

export async function POST(req:NextRequest){
   
    const {name} = await req.json();
    try {
        // If Customer already exists
        const customer = await Customer.findOne({name});
        if(customer){
            return NextResponse.json({
                message: `${name} already Exist!!`,
                result: 'Try to add with new Name'
            },{
                status: 409
            })
        }
        // Creating a new customer using Customer model
        const newCustomer = await Customer.create({
            name
        });
        // Saving the new customer
        newCustomer.save();
        revalidatePath("/dashboard");
        // Returning the string representation of the new customer
        return NextResponse.json({
            message:'Customer Added Succesfully!',
            result: newCustomer
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Error While creating customer', 
            error
        });
    }

}

export async function DELETE(req: NextRequest){
    const {_id, name} = await req.json();
    try {
        // Deleting the Customer with the specified ID
        const result = await Customer.deleteOne({_id});
        revalidatePath("/dashboard");
        return NextResponse.json({
            message: `${name} deleted successfully!!`, 
            result
        });
    } catch (error) {
        // Returning an error message if Customer deletion fails
        return NextResponse.json({
            message: `Error While Deleting ${name}`, 
            error
        });
    }
}