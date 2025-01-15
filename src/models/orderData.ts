import { FabricData, FabricCount } from '@/interface';
import mongoose, {Document, Model, Schema} from 'mongoose';



export interface OrderType extends FabricData{
    createdAt: Date,
}

const FabricCountSchema = new Schema<FabricCount>({
    date: {
        type: Date,
        required: true
    },
    nag: {
        type: Number
    },
    faad: {
        type: Number
    },
    thaan: {
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    name: {
        type: String
    },
    workType: {
        type: String
    },
    printType: {
        type: String
    }
});

const orderSchema = new Schema<OrderType>({
    customerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'customers'
    },
    incomingFabric: {
        type: FabricCountSchema
    },
    outgoingFabric: {
        type: FabricCountSchema
    },
    price: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
    debit: {
        type: Number
    },
    credit: {
        type: Number
    },
    balance: {
        type: Number
    },
    assignerName: {
        type: String,
    }
});

const Order: Model<OrderType> =
  mongoose.models?.orders || mongoose.model("orders", orderSchema);

export default Order;