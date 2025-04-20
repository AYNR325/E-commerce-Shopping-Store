// import React, { useEffect, useState } from 'react'
// import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
// import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '../ui/table'
// import { Dialog } from '../ui/dialog'
// import { Button } from '../ui/button'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllOrders } from '@/store/shop/order-slice'
// import { format } from 'date-fns'
// import AdminOrderDetails from './AdminOrderDetails'

// function AdminOrders() {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
//   const [selectedOrder, setSelectedOrder] = useState(null)
//   const dispatch = useDispatch()

//   // Fix the selector to match the actual state structure
//   const orderState = useSelector((state) => state.order)
//   const { orderList, isLoading } = orderState || { orderList: [], isLoading: false }

//   useEffect(() => {
//     // Fetch all orders for admin (without userId filter)
//     dispatch(getAllOrders({}))
//       .catch(error => console.error("Error fetching orders:", error));
//   }, [dispatch])

//   const handleViewDetails = (order) => {
//     setSelectedOrder(order)
//     setOpenDetailsDialog(true)
//   }

//   return (
//     // <Card className="bg-white">
//     //   <CardHeader>
//     //     <CardTitle>All Orders</CardTitle>
//     //   </CardHeader>
//     //   <CardContent>
//     //     {isLoading ? (
//     //       <div className="text-center py-4">Loading orders...</div>
//     //     ) : (
//     //       <Table>
//     //         <TableHeader>
//     //           <TableRow>
//     //             <TableHead>Order ID</TableHead>
//     //             <TableHead>Customer</TableHead>
//     //             <TableHead>Order Date</TableHead>
//     //             <TableHead>Order Status</TableHead>
//     //             <TableHead>Total Amount</TableHead>
//     //             <TableHead>
//     //               <span className="sr-only">View Details</span>
//     //             </TableHead>
//     //           </TableRow>
//     //         </TableHeader>
//     //         <TableBody>
//     //           {Array.isArray(orderList) && orderList.length > 0 ? (
//     //             orderList.map((order) => (
//     //               <TableRow key={order._id}>
//     //                 <TableCell className="font-medium">
//     //                   {typeof order._id === 'string' ? order._id.substring(0, 8) + '...' : order._id}
//     //                 </TableCell>
//     //                 <TableCell>{order.userId ? order.userId.substring(0, 8) + '...' : 'N/A'}</TableCell>
//     //                 <TableCell>
//     //                   {order.orderDate ? format(new Date(order.orderDate), 'dd/MM/yyyy') : 'N/A'}
//     //                 </TableCell>
//     //                 <TableCell>
//     //                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//     //                     order.orderStatus === 'completed' ? 'bg-green-100 text-green-800' :
//     //                     order.orderStatus === 'processing' ? 'bg-blue-100 text-blue-800' :
//     //                     order.orderStatus === 'shipping' ? 'bg-purple-100 text-purple-800' :
//     //                     order.orderStatus === 'delivered' ? 'bg-teal-100 text-teal-800' :
//     //                     'bg-yellow-100 text-yellow-800'
//     //                   }`}>
//     //                     {order.orderStatus ? order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1) : 'Pending'}
//     //                   </span>
//     //                 </TableCell>
//     //                 <TableCell>₹{order.totalAmount || 0}</TableCell>
//     //                 <TableCell>
//     //                   <Button
//     //                     variant="outline"
//     //                     className="bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border-[1px] border-[#A67A4B]"
//     //                     size="sm"
//     //                     onClick={() => handleViewDetails(order)}
//     //                   >
//     //                     View Details
//     //                   </Button>
//     //                 </TableCell>
//     //               </TableRow>
//     //             ))
//     //           ) : (
//     //             <TableRow>
//     //               <TableCell colSpan={6} className="text-center py-4">
//     //                 No orders found
//     //               </TableCell>
//     //             </TableRow>
//     //           )}
//     //         </TableBody>
//     //       </Table>
//     //     )}
//     //   </CardContent>

//     //   <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
//     //     <AdminOrderDetails order={selectedOrder} onClose={() => setOpenDetailsDialog(false)} />
//     //   </Dialog>
//     // </Card>

//     // <Card className="bg-white w-full">
//     //   <CardHeader>
//     //     <CardTitle className="text-lg md:text-xl">All Orders</CardTitle>
//     //   </CardHeader>
//     //   <CardContent className="overflow-x-auto">
//     //     {isLoading ? (
//     //       <div className="text-center py-4">Loading orders...</div>
//     //     ) : (
//     //       <div className="w-full">
//     //         <Table className="min-w-[600px] sm:min-w-full">
//     //           <TableHeader>
//     //             <TableRow className="bg-gray-100">
//     //               <TableHead className="text-xs sm:text-sm">Order ID</TableHead>
//     //               <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Customer</TableHead>
//     //               <TableHead className="text-xs sm:text-sm">Order Date</TableHead>
//     //               <TableHead className="text-xs sm:text-sm">Status</TableHead>
//     //               <TableHead className="text-xs sm:text-sm hidden md:table-cell">Total</TableHead>
//     //               <TableHead className="text-xs sm:text-sm">
//     //                 <span className="sr-only">Actions</span>
//     //               </TableHead>
//     //             </TableRow>
//     //           </TableHeader>
//     //           <TableBody>
//     //             {Array.isArray(orderList) && orderList.length > 0 ? (
//     //               orderList.map((order) => (
//     //                 <TableRow key={order._id} className="text-xs sm:text-sm">
//     //                   <TableCell className="font-medium">
//     //                     {typeof order._id === "string"
//     //                       ? order._id.substring(0, 8) + "..."
//     //                       : order._id}
//     //                   </TableCell>
//     //                   <TableCell className="hidden sm:table-cell">
//     //                     {order.userId ? order.userId.substring(0, 8) + "..." : "N/A"}
//     //                   </TableCell>
//     //                   <TableCell>
//     //                     {order.orderDate
//     //                       ? format(new Date(order.orderDate), "dd/MM/yyyy")
//     //                       : "N/A"}
//     //                   </TableCell>
//     //                   <TableCell>
//     //                     <span
//     //                       className={`px-2 py-1 rounded-full text-xs font-medium ${
//     //                         order.orderStatus === "completed"
//     //                           ? "bg-green-100 text-green-800"
//     //                           : order.orderStatus === "processing"
//     //                           ? "bg-blue-100 text-blue-800"
//     //                           : order.orderStatus === "shipping"
//     //                           ? "bg-purple-100 text-purple-800"
//     //                           : order.orderStatus === "delivered"
//     //                           ? "bg-teal-100 text-teal-800"
//     //                           : "bg-yellow-100 text-yellow-800"
//     //                       }`}
//     //                     >
//     //                       {order.orderStatus
//     //                         ? order.orderStatus.charAt(0).toUpperCase() +
//     //                           order.orderStatus.slice(1)
//     //                         : "Pending"}
//     //                     </span>
//     //                   </TableCell>
//     //                   <TableCell className="hidden md:table-cell">
//     //                     ₹{order.totalAmount || 0}
//     //                   </TableCell>
//     //                   <TableCell>
//     //                     <Button
//     //                       variant="outline"
//     //                       className="text-xs sm:text-sm bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border border-[#A67A4B] px-3 py-1 sm:px-4 sm:py-2"
//     //                       onClick={() => handleViewDetails(order)}
//     //                     >
//     //                       View
//     //                     </Button>
//     //                   </TableCell>
//     //                 </TableRow>
//     //               ))
//     //             ) : (
//     //               <TableRow>
//     //                 <TableCell colSpan={6} className="text-center py-4">
//     //                   No orders found
//     //                 </TableCell>
//     //               </TableRow>
//     //             )}
//     //           </TableBody>
//     //         </Table>
//     //       </div>
//     //     )}
//     //   </CardContent>

//     //   <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
//     //     <AdminOrderDetails
//     //       order={selectedOrder}
//     //       onClose={() => setOpenDetailsDialog(false)}
//     //     />
//     //   </Dialog>
//     // </Card>

//     <Card className="bg-white w-full">
//       <CardHeader>
//         <CardTitle className="text-lg md:text-xl">All Orders</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {isLoading ? (
//           <div className="text-center py-4">Loading orders...</div>
//         ) : (
//           // Force horizontal scrolling
//           <div className="w-full overflow-x-auto">
//             <Table className="min-w-[800px] w-full">
//               <TableHeader>
//                 <TableRow className="bg-gray-100">
//                   <TableHead className="text-xs sm:text-sm whitespace-nowrap">
//                     Order ID
//                   </TableHead>
//                   <TableHead className="text-xs sm:text-sm whitespace-nowrap hidden sm:table-cell">
//                     Customer
//                   </TableHead>
//                   <TableHead className="text-xs sm:text-sm whitespace-nowrap">
//                     Order Date
//                   </TableHead>
//                   <TableHead className="text-xs sm:text-sm whitespace-nowrap">
//                     Status
//                   </TableHead>
//                   <TableHead className="text-xs sm:text-sm whitespace-nowrap hidden md:table-cell">
//                     Total
//                   </TableHead>
//                   <TableHead className="text-xs sm:text-sm whitespace-nowrap">
//                     <span className="sr-only">Actions</span>
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {Array.isArray(orderList) && orderList.length > 0 ? (
//                   orderList.map((order) => (
//                     <TableRow key={order._id} className="text-xs sm:text-sm">
//                       <TableCell className="font-medium whitespace-nowrap">
//                         {typeof order._id === "string"
//                           ? order._id.substring(0, 8) + "..."
//                           : order._id}
//                       </TableCell>
//                       <TableCell className="hidden sm:table-cell whitespace-nowrap">
//                         {order.userId ? order.userId.substring(0, 8) + "..." : "N/A"}
//                       </TableCell>
//                       <TableCell className="whitespace-nowrap">
//                         {order.orderDate
//                           ? format(new Date(order.orderDate), "dd/MM/yyyy")
//                           : "N/A"}
//                       </TableCell>
//                       <TableCell className="whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             order.orderStatus === "completed"
//                               ? "bg-green-100 text-green-800"
//                               : order.orderStatus === "processing"
//                               ? "bg-blue-100 text-blue-800"
//                               : order.orderStatus === "shipping"
//                               ? "bg-purple-100 text-purple-800"
//                               : order.orderStatus === "delivered"
//                               ? "bg-teal-100 text-teal-800"
//                               : "bg-yellow-100 text-yellow-800"
//                           }`}
//                         >
//                           {order.orderStatus
//                             ? order.orderStatus.charAt(0).toUpperCase() +
//                               order.orderStatus.slice(1)
//                             : "Pending"}
//                         </span>
//                       </TableCell>
//                       <TableCell className="hidden md:table-cell whitespace-nowrap">
//                         ₹{order.totalAmount || 0}
//                       </TableCell>
//                       <TableCell className="whitespace-nowrap">
//                         <Button
//                           variant="outline"
//                           className="text-xs sm:text-sm bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border border-[#A67A4B] px-3 py-1 sm:px-4 sm:py-2"
//                           onClick={() => handleViewDetails(order)}
//                         >
//                           View
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={6} className="text-center py-4">
//                       No orders found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </CardContent>

//       <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
//         <AdminOrderDetails
//           order={selectedOrder}
//           onClose={() => setOpenDetailsDialog(false)}
//         />
//       </Dialog>
//     </Card>
//   )
// }

// export default AdminOrders

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "@/store/shop/order-slice";
import { format } from "date-fns";
import AdminOrderDetails from "./AdminOrderDetails";

function AdminOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.order);
  const { orderList, isLoading } = orderState || {
    orderList: [],
    isLoading: false,
  };
console.log("orderList", orderList);
console.log(orderState);
  useEffect(() => {
    dispatch(getAllOrders({})).catch((error) =>
      console.error("Error fetching orders:", error)
    );
  }, [dispatch]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailsDialog(true);
  };

  return (
    // <Card className="bg-white w-full">
    //   <CardHeader>
    //     <CardTitle className="text-lg md:text-xl">All Orders</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     {isLoading ? (
    //       <div className="text-center py-4">Loading orders...</div>
    //     ) : (
    //       // 🔥 FIX: Wrap table in an `overflow-x-auto` div
    //       <div className="w-[95%] md:w-[100%] overflow-x-auto">
    //         <Table className=" wd-[95%] md:w-[100%]">
    //           <TableHeader>
    //             <TableRow className="bg-gray-100">
    //               <TableHead className="text-xs sm:text-sm whitespace-nowrap">
    //                 Order ID
    //               </TableHead>
    //               <TableHead className="text-xs sm:text-sm whitespace-nowrap hidden sm:table-cell">
    //                 Customer
    //               </TableHead>
    //               <TableHead className="text-xs sm:text-sm whitespace-nowrap">
    //                 Order Date
    //               </TableHead>
    //               <TableHead className="text-xs sm:text-sm whitespace-nowrap">
    //                 Status
    //               </TableHead>
    //               <TableHead className="text-xs sm:text-sm whitespace-nowrap hidden md:table-cell">
    //                 Total
    //               </TableHead>
    //               <TableHead className="text-xs sm:text-sm whitespace-nowrap">
    //                 <span className="sr-only">Actions</span>
    //               </TableHead>
    //             </TableRow>
    //           </TableHeader>
    //           <TableBody>
    //             {Array.isArray(orderList) && orderList.length > 0 ? (
    //               orderList.map((order) => (
    //                 <TableRow key={order._id} className="text-xs sm:text-sm">
    //                   <TableCell className="font-medium whitespace-nowrap">
    //                     {order._id?.substring(0, 8) + "..."}
    //                   </TableCell>
    //                   <TableCell className="hidden sm:table-cell whitespace-nowrap">
    //                     {order.userId?.substring(0, 8) + "..."}
    //                   </TableCell>
    //                   <TableCell className="whitespace-nowrap">
    //                     {order.orderDate
    //                       ? format(new Date(order.orderDate), "dd/MM/yyyy")
    //                       : "N/A"}
    //                   </TableCell>
    //                   <TableCell className="whitespace-nowrap">
    //                     <span
    //                       className={`px-2 py-1 rounded-full text-xs font-medium ${
    //                         // order.orderStatus === "completed" ? "bg-green-100 text-green-800" :
    //                         // order.orderStatus === "processing" ? "bg-blue-100 text-blue-800" :
    //                         // order.orderStatus === "shipping" ? "bg-purple-100 text-purple-800" :
    //                         // order.orderStatus === "delivered" ? "bg-teal-100 text-teal-800" :
    //                         // "bg-yellow-100 text-yellow-800"
    //                         order.orderStatus === "pending"
    //                           ? "bg-yellow-100 text-yellow-800"
    //                           : order.orderStatus === "processing"
    //                           ? "bg-blue-100 text-blue-800"
    //                           : order.orderStatus === "shipped"
    //                           ? "bg-purple-100 text-purple-800"
    //                           : order.orderStatus === "delivered"
    //                           ? "bg-green-100 text-green-800"
    //                           : order.orderStatus === "cancelled"
    //                           ? "bg-red-100 text-red-800"
    //                           : "bg-gray-100 text-gray-800"
    //                       }`}
    //                     >
    //                       {order.orderStatus?.charAt(0).toUpperCase() +
    //                         order.orderStatus.slice(1) || "Pending"}
    //                     </span>
    //                   </TableCell>
    //                   <TableCell className="hidden md:table-cell whitespace-nowrap">
    //                     ₹{order.totalAmount || 0}
    //                   </TableCell>
    //                   <TableCell className="whitespace-nowrap">
    //                     <Button
    //                       variant="outline"
    //                       className="text-xs sm:text-sm bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border border-[#A67A4B] px-3 py-1 sm:px-4 sm:py-2"
    //                       onClick={() => handleViewDetails(order)}
    //                     >
    //                       View Details
    //                     </Button>
    //                   </TableCell>
    //                 </TableRow>
    //               ))
    //             ) : (
    //               <TableRow>
    //                 <TableCell colSpan={6} className="text-center py-4">
    //                   No orders found
    //                 </TableCell>
    //               </TableRow>
    //             )}
    //           </TableBody>
    //         </Table>
    //       </div>
    //     )}
    //   </CardContent>

    //   <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
    //     <AdminOrderDetails
    //       order={selectedOrder}
    //       onClose={() => setOpenDetailsDialog(false)}
    //     />
    //   </Dialog>
    // </Card>

    <Card className="bg-white w-full">
  <CardHeader>
    <CardTitle className="text-lg md:text-xl">All Orders</CardTitle>
  </CardHeader>
  <CardContent>
    {isLoading ? (
      <div className="text-center py-4">Loading orders...</div>
    ) : (
      <div className=" w-[85%]  md:w-[100%] overflow-x-auto">
        <Table className=" w-[80%]  md:w-[100%]">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-xs sm:text-sm whitespace-nowrap">
                Order ID
              </TableHead>
              <TableHead className="text-xs sm:text-sm whitespace-nowrap hidden sm:table-cell">
                Customer
              </TableHead>
              <TableHead className="text-xs sm:text-sm whitespace-nowrap">
                Order Date
              </TableHead>
              <TableHead className="text-xs sm:text-sm whitespace-nowrap">
                Status
              </TableHead>
              <TableHead className="text-xs sm:text-sm whitespace-nowrap hidden md:table-cell">
                Total
              </TableHead>
              <TableHead className="text-xs sm:text-sm whitespace-nowrap">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(orderList) && orderList.length > 0 ? (
              orderList.map((order) => (
                <TableRow key={order._id} className="text-xs sm:text-sm">
                  <TableCell className="font-medium whitespace-nowrap">
                    {order._id?.substring(0, 8) + "..."}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell whitespace-nowrap">
                    {order.userId?.substring(0, 8) + "..."}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {order.orderDate
                      ? format(new Date(order.orderDate), "dd/MM/yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.orderStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.orderStatus === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.orderStatus === "shipped"
                          ? "bg-purple-100 text-purple-800"
                          : order.orderStatus === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.orderStatus === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.orderStatus?.charAt(0).toUpperCase() +
                        order.orderStatus.slice(1) || "Pending"}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell whitespace-nowrap">
                    ₹{order.totalAmount || 0}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Button
                      variant="outline"
                      className="text-xs sm:text-sm bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border border-[#A67A4B] px-3 py-1 sm:px-4 sm:py-2"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )}
  </CardContent>

  <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
    <AdminOrderDetails
      order={selectedOrder}
      onClose={() => setOpenDetailsDialog(false)}
    />
  </Dialog>
</Card>







  );
}

export default AdminOrders;
