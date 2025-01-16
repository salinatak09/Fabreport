"use client";

import { FabricDataTable } from "@/components/order/FabricDataTable";
import { OrderProvider } from "@/contexts/OrderContext";

const DataRecord = ()=>{

  return (
    <>
      <div className="rounded-md m-2 p-4">
        <OrderProvider>
          <FabricDataTable/>
        </OrderProvider>
      </div>
    </>
  )
}

export default DataRecord;