import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteOrder, getOrder } from "@/actions/orderHandlers";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import TotalAmount from "./TotalAmount";
import CreditContent from "./CreditContent";
import FabricForm from "./FabricForm";
import InvoiceContent from "@/components/order/InvoiceContent";
import { useOrderContext } from "@/contexts/OrderContext";
import { AddRow } from "./AddRow";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Skeleton } from "../ui/skeleton";

export const validateNumberMsg = { message: "Negative Number not allowed!" };

export function FabricDataTable() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.customerId as string;
  const { orders, setOrders } = useOrderContext();
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    const { result, message, error } = await getOrder({ customerId });
    if (result) {
      setOrders(result);
      setLoading(false);
      toast.success(message);
    }
    if (error) {
      toast.error(error?.toString());
    }
  };

  const removeOrder = async (orderId: string) => {
    const { result, message, error } = await deleteOrder(customerId, orderId);
    if (error) {
      toast.error(error?.toString());
    }
    if (result?.deletedCount) {
      toast.success(message);
      await fetchOrder();
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <div className="flex gap-2 mb-2 align-items-center">
        <Button onClick={() => router.back()} className="flex gap-1">
          <ArrowLeft />
          Back
        </Button>
        <AddRow />
      </div>
      <Table className="p-1 border rounded border-black">
        <TableCaption>
          {(orders?.length && orders?.length>0) ?
            'A list of your recent Orders.' : 'Nothing to show'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Incoming Fabric</TableHead>
            <TableHead>Outgoing Fabric</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Total Amount</TableHead>
            <TableHead>Debit</TableHead>
            <TableHead>Credit</TableHead>
            <TableHead>Assigner Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading ? (
            orders?.map((data) => (
              <TableRow key={data?._id}>
                <TableCell className="font-medium">
                  {data?.incomingFabric ? (
                    <div className="m-2">
                      <div className="flex flex-wrap gap-2">
                        <div className="font-medium">Date : </div>
                        <div>
                          {new Date(data?.incomingFabric?.date)?.toDateString()}
                        </div>
                      </div>
                      {data?.incomingFabric?.nag ? (
                        <div className="flex flex-wrap gap-2">
                          <div className="font-medium">Nag : </div>
                          <div>{data?.incomingFabric?.nag}</div>
                        </div>
                      ) : (
                        ""
                      )}
                      {data?.incomingFabric?.faad ? (
                        <div className="flex flex-wrap gap-2">
                          <div className="font-medium">Faad : </div>
                          <div>{data?.incomingFabric?.faad}</div>
                        </div>
                      ) : (
                        ""
                      )}
                      {data?.incomingFabric?.thaan ? (
                        <div className="flex flex-wrap gap-2">
                          <div className="font-medium">Thaan : </div>
                          <div>{data?.incomingFabric?.thaan}</div>
                        </div>
                      ) : (
                        ""
                      )}
                      {data?.incomingFabric?.workType && (
                        <div className="flex flex-wrap gap-2">
                          <div className="font-medium">
                            {data?.incomingFabric?.workType} :
                          </div>
                          <div>{data?.incomingFabric?.name}</div>
                        </div>
                      )}
                      {data?.incomingFabric?.printType && (
                        <div className="flex flex-wrap gap-2">
                          <div className="font-medium">Print Type : </div>
                          <div>{data?.incomingFabric?.printType}</div>
                        </div>
                      )}
                      {data?.incomingFabric?.note && (
                        <div className="flex flex-wrap gap-2">
                          <div className="font-medium">Note : </div>
                          <div>{data?.incomingFabric?.note}</div>
                        </div>
                      )}
                      <FabricForm
                        type="Edit"
                        title="Incoming"
                        customerId={customerId}
                        orderId={data?._id!}
                      />
                    </div>
                  ) : (
                    <div>
                      <FabricForm
                        type="Add"
                        title="Incoming"
                        customerId={customerId}
                        orderId={data?._id!}
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {data?.outgoingFabric ? (
                    <div className="m-2">
                      <div className="flex flex-wrap gap-2">
                        <div className="font-medium">Date : </div>
                        <div>
                          {new Date(data?.outgoingFabric?.date)?.toDateString()}
                        </div>
                      </div>
                      {data?.outgoingFabric?.nag ? (
                        <div className="flex flex-wrap gap-2">
                          <div className="font-medium">Nag : </div>
                          <div>{data?.outgoingFabric?.nag}</div>
                        </div>
                      ) : (
                        ""
                      )}
                      {data?.outgoingFabric?.faad ? (
                        <div className="flex flex-wrap gap-2">
                          <div className="font-medium">Faad : </div>
                          <div>{data?.outgoingFabric?.faad}</div>
                        </div>
                      ) : (
                        ""
                      )}
                      {data?.outgoingFabric?.thaan ? (
                        <div className="flex flex-wrap gap-2">
                          <div className="font-medium">Thaan : </div>
                          <div>{data?.outgoingFabric?.thaan}</div>
                        </div>
                      ) : (
                        ""
                      )}
                      {data?.outgoingFabric?.workType && (
                        <div className="flex flex-wrap gap-2">
                          <div className="font-medium">
                            {data?.outgoingFabric?.workType} :
                          </div>
                          <div>{data?.outgoingFabric?.name}</div>
                        </div>
                      )}
                      {data?.outgoingFabric?.printType && (
                        <div className="flex flex-wrap gap-2">
                          <div className="font-medium">Print Type : </div>
                          <div>{data?.outgoingFabric?.printType}</div>
                        </div>
                      )}
                      {data?.outgoingFabric?.note && (
                        <div className="flex flex-wrap gap-2">
                          <div className="font-medium">Note : </div>
                          <div>{data?.outgoingFabric?.note}</div>
                        </div>
                      )}
                      <FabricForm
                        type="Edit"
                        title="Outgoing"
                        customerId={customerId}
                        orderId={data?._id!}
                      />
                    </div>
                  ) : (
                    <div>
                      <FabricForm
                        type="Add"
                        title="Outgoing"
                        customerId={customerId}
                        orderId={data?._id!}
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="font-medium">
                    {data?.price ? (
                      <span>
                        {data?.price}
                        <InvoiceContent
                          type="Edit"
                          orderId={data?._id!}
                          customerId={customerId}
                          title="Price"
                          invoiceKey="price"
                        />
                      </span>
                    ) : (
                      <InvoiceContent
                        type="Add"
                        orderId={data?._id!}
                        customerId={customerId}
                        title="Price"
                        invoiceKey="price"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-center">
                  <div className="font-medium">
                    {/* {data?.price ? <TotalAmount price={data?.price} unit={{nag:data?.outgoingFabric?.nag, faad:data?.outgoingFabric?.faad, thaan: data?.outgoingFabric?.thaan}} customerId={customerId} orderId={data?._id}/> : 'Add Price First'} */}
                    {data?.price ? (
                      <TotalAmount
                        price={data?.price?.toString()}
                        unit={{ thaan: data?.outgoingFabric?.thaan.toString() }}
                      />
                    ) : (
                      "Add Price First"
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="font-medium">
                    {data?.debit ? (
                      <span>
                        {data?.debit}
                        <InvoiceContent
                          type="Edit"
                          orderId={data?._id!}
                          customerId={customerId}
                          title="Debit"
                          invoiceKey="debit"
                        />
                      </span>
                    ) : (
                      <InvoiceContent
                        type="Add"
                        orderId={data?._id!}
                        customerId={customerId}
                        title="Debit"
                        invoiceKey="debit"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="font-medium">
                  {data?.credit ? (
                      <span>
                        {data?.credit}
                        <InvoiceContent
                          type="Edit"
                          orderId={data?._id!}
                          customerId={customerId}
                          title="Credit"
                          invoiceKey="credit"
                        />
                      </span>
                    ) : (
                      <InvoiceContent
                        type="Add"
                        orderId={data?._id!}
                        customerId={customerId}
                        title="Credit"
                        invoiceKey="credit"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="font-medium">
                  {data?.assignerName ? (
                      <span>
                        {data?.assignerName}
                        <InvoiceContent
                          type="Edit"
                          orderId={data?._id!}
                          customerId={customerId}
                          title="Assigner Name"
                          invoiceKey="assignerName"
                        />
                      </span>
                    ) : (
                      <InvoiceContent
                        type="Add"
                        orderId={data?._id!}
                        customerId={customerId}
                        title="Assigner Name"
                        invoiceKey="assignerName"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Trash2 className="text-red-500" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You want to delete !!
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => removeOrder(data._id!)}
                          className="hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
              </TableCell>
            </TableRow>
          )}
          
        </TableBody>
      </Table>
    </div>
  );
}
