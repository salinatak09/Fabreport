"use client";

import { CustomerType } from "@/interface";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ContextType {
  customers?: CustomerType[],
  setCustomers: Dispatch<SetStateAction<CustomerType[]>>
}

const CustomerContext = createContext<ContextType>({customers:[], setCustomers: ()=>{}});

// CustomerType[]|null

export const useCustomerContext = () => useContext(CustomerContext);


export const CustomerProvider = ({ children }:Readonly<{children: React.ReactNode}>) => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  return (
    <CustomerContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
};
