"use client";

import { CustomerType } from "@/interface";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ContextType {
  customers?: CustomerType[],
  setCustomers: Dispatch<SetStateAction<CustomerType[]>>
}

const CustomerContext = createContext<ContextType>({});

// CustomerType[]|null

export const useCustomerContext = () => useContext(CustomerContext);


export const CustomerProvider = ({ children }:Readonly<{children: React.ReactNode}>) => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  // const addCustomer = (newData:CustomerType) => {
  //   setCustomers((prev) => prev ? [...prev, newData]: [newData]);
  // };

  // const getCustomer = async ()=>{
  //   try{
  //     const res = await fetch(`/api/customers`);
  //     const {result, message, error} = await res.json();
  //     if(res.status === 200){
  //       setCustomerList(result);
  //       setLoading(false);
  //     }
  //     else{
  //       toast.error(message, {
  //         description: error
  //       });
  //     }
  //   } catch(err){
  //     toast.error("Some Error Occurred!!", {
  //       description: err?.toString()
  //     });
  //   }
  // }]

  return (
    <CustomerContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
};
