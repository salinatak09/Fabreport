"use client";

import { FabricData } from "@/interface";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ContextType {
  orders?: FabricData[],
  setOrders: Dispatch<SetStateAction<FabricData[]>>
}

const OrderContext = createContext<ContextType>({orders:[], setOrders:()=>{}});

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }:Readonly<{children: React.ReactNode}>) => {
  const [orders, setOrders] = useState<FabricData[]>([]);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
