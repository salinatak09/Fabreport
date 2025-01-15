
// Importing mongoose library along with Document and Model types from it
import mongoose, { Document, Model, Schema } from "mongoose";

// Merging CustomerModel interface with mongoose's Document interface to create 
// a new interface that represents a customer document in MongoDB
export interface CustomerDocument extends Document {
  name: string,
  createdAt: Date;
  // updatedAt: Date;
}

// Defining a mongoose schema for the customer document, specifying the types 
// and constraints
const customerSchema = new Schema<CustomerDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true
    }
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: true,
  }
);

// Creating a mongoose model for the customer document
const Customer: Model<CustomerDocument> =
  mongoose.models?.customers || mongoose.model("customers", customerSchema);

export default Customer;
