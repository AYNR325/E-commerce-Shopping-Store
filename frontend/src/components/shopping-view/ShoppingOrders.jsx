import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetails from "./ShoppingOrderDetails";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getAllOrders } from "@/store/shop/order-slice";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch();
  const {user}=useSelector(state=>state.auth)
  const {orderList}=useSelector(state=>state.order)

  useEffect(() => {
    dispatch(getAllOrders(user?.id))
  }, [dispatch])

  console.log(orderList,"orderList")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only"> View Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>2022-01-01</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>$100.00</TableCell>
              <TableCell>
              <Dialog
                  open={openDetailsDialog}
                  onOpenChange={setOpenDetailsDialog}
                >
                  <button
                    className="btn btn-primary bg-black text-white p-2 rounded-xl hover:bg-white hover:text-black border-black border-[1px]"
                    onClick={() => setOpenDetailsDialog(true)}
                  >
                    
                    View Details
                  </button>
                  <ShoppingOrderDetails />
                </Dialog>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>789012</TableCell>
              <TableCell>2022-02-01</TableCell>
              <TableCell>Shipped</TableCell>
              <TableCell>$200.00</TableCell>
              <TableCell>
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={setOpenDetailsDialog}
                >
                  <button
                    className="btn btn-primary bg-black text-white p-2 rounded-xl hover:bg-white hover:text-black border-black border-[1px]"
                    onClick={() => setOpenDetailsDialog(true)}
                  >
                    
                    View Details
                  </button>
                  <ShoppingOrderDetails />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
