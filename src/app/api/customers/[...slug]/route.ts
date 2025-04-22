import { connectToDataBase } from "@/lib/db";
import Order from "@/models/orderData";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest, {params}:{params:{slug?:string[]}})=>{
    const id = params.slug?.[0];
    try {
        const isConn = await connectToDataBase();
        console.log("isConn :", isConn);
        const result = await Order.find({customerId: id});
        revalidatePath(`/dashboard/${id}`);
        return NextResponse.json({
            message: 'Order Transaction Data fetched Successful!',
            result
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Error while fetching Data',
            error
        });
    }
}

export async function POST(req:NextRequest, {params}:{params:{slug?:string[]}}){
   
    // let data = await req.json();
    const customerId = params.slug?.[0];
    // data = Object.assign(data, customerId);
    try {
        const isConn = await connectToDataBase();
        console.log("isConn :", isConn);
        // Creating a new customer using Customer model
        const newOrder = await Order.create({customerId});
        // Saving the new customer
        newOrder.save();
        revalidatePath(`/dashboard/${customerId}`);
        // Returning the string representation of the new customer
        return NextResponse.json({
            message:'Order created Succesfully!',
            result: newOrder
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Error in creating Order', 
            error
        });
    }

}

export async function PUT(req:NextRequest, {params}:{params:{slug?:string[]}}){
   
    const customerId = params.slug?.[0];
    const orderId = params.slug?.[1];
    const key = params.slug?.[2] as string;
    let data = await req.json();
    try {
        const isConn = await connectToDataBase();
        console.log("isConn :", isConn);
        // updating a Order using Order model
        const newOrder = await Order.updateOne({customerId, _id: orderId}, {
            $set:{
                [key]:data
            },
            // $currentDate: { lastUpdated: true }
        },{
            upsert:true
        });
        revalidatePath(`/dashboard/${customerId}`);

        // Returning the string representation of the new customer
        return NextResponse.json({
            message:'Order Updated Succesfully!',
            result: newOrder
        }, {status:200});
    } catch (error) {
        return NextResponse.json({
            message: 'Error in creating Order', 
            error
        }, {status:500});
    }

}

export async function DELETE(req: NextRequest){
    const _id = await req.json();
    try {
        const isConn = await connectToDataBase();
        console.log("isConn :", isConn);
        // Deleting the todo with the specified ID
        const result = await Order.deleteOne({_id});
        revalidatePath(`/dashboard/${_id}`);
        return NextResponse.json({
            message: `Deleted successfully!!`, 
            result
        });
    } catch (error) {
        // Returning an error message if todo deletion fails
        return NextResponse.json({
            message: `Error While Deleting Data!`, 
            error
        });
    }
}