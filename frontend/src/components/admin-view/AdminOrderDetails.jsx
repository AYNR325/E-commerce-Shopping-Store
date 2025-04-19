import React, { useState, useEffect } from "react";
import { DialogContent, DialogTitle, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { updateOrderStatus, updatePaymentStatus } from "@/store/shop/order-slice";
import { useToast } from "@/hooks/use-toast";

function AdminOrderDetails({ order, onClose }) {
  const [orderStatus, setOrderStatus] = useState("pending");
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Set the initial status when the order prop changes
  useEffect(() => {
    if (order?.orderStatus) {
      setOrderStatus(order.orderStatus);
    }
  }, [order]);

  if (!order) {
    return (
      <DialogContent className="sm:max-w-[600px] bg-white">
        <div className="text-center py-4">No order details available</div>
      </DialogContent>
    );
  }

  const handleOrderStatusChange = async () => {
    if (orderStatus === order.orderStatus) {
      toast({
        title: "No changes made",
        description: "The order status is already set to " + orderStatus,
        variant: "default",
        className: "text-white bg-yellow-500",
      });
      return;
    }

    setIsUpdatingOrder(true);
    try {
      await dispatch(updateOrderStatus({ 
        orderId: order._id, 
        orderStatus: orderStatus 
      })).unwrap();
      
      toast({
        title: "Order status updated",
        description: `Order status has been updated to ${orderStatus}`,
        variant: "success",
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Failed to update order status",
        description: error.message || "An error occurred",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  return (
    // <DialogContent className="sm:max-w-[600px] h-[600px] bg-[#F0F0F0] overflow-auto " >
    //   <DialogHeader>
    //     <DialogTitle>Order Details</DialogTitle>
    //   </DialogHeader>
      
    //   <div className="grid gap-6">
    //     <div className="grid gap-2">
    //       <div className="flex items-center justify-between mt-2">
    //         <p className="font-medium">Order ID</p>
    //         <Label>{order._id}</Label>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <p className="font-medium">Customer ID</p>
    //         <Label>{order.userId || "N/A"}</Label>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <p className="font-medium">Order Date</p>
    //         <Label>
    //           {order.orderDate 
    //             ? format(new Date(order.orderDate), "dd/MM/yyyy HH:mm") 
    //             : "N/A"}
    //         </Label>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <p className="font-medium">Payment Method</p>
    //         <Label>{order.paymentMethod || "N/A"}</Label>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <p className="font-medium">Payment Status</p>
    //         <span className={`px-2 py-1 rounded-full text-xs ${
    //           order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
    //           order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
    //           'bg-yellow-100 text-yellow-800'
    //         }`}>
    //           {order.paymentStatus ? 
    //             (order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)) : 
    //             'Pending'}
    //         </span>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <p className="font-medium">Order Status</p>
    //         <div className="flex items-center gap-2">
    //           <Select value={orderStatus} onValueChange={setOrderStatus}>
    //             <SelectTrigger className="w-[180px]">
    //               <SelectValue placeholder="Select status" />
    //             </SelectTrigger>
    //             <SelectContent>
    //               <SelectItem value="pending">Pending</SelectItem>
    //               <SelectItem value="processing">Processing</SelectItem>
    //               <SelectItem value="shipping">Shipping</SelectItem>
    //               <SelectItem value="delivered">Delivered</SelectItem>
    //               <SelectItem value="completed">Completed</SelectItem>
    //             </SelectContent>
    //           </Select>
    //           <Button 
    //             size="sm" 
    //             onClick={handleOrderStatusChange}
    //             disabled={isUpdatingOrder || orderStatus === order.orderStatus}
    //           >
    //             {isUpdatingOrder ? "Updating..." : "Update"}
    //           </Button>
    //         </div>
    //       </div>
    //     </div>

    //     <Separator />

    //     <div>
    //       <h3 className="font-semibold mb-2">Shipping Address</h3>
    //       {order.addressInfo ? (
    //         <div className="grid gap-1 text-sm">
    //           <p>{order.addressInfo.address || "N/A"}</p>
    //           <p>
    //             {[
    //               order.addressInfo.city,
    //               order.addressInfo.state,
    //               order.addressInfo.pincode
    //             ].filter(Boolean).join(", ")}
    //           </p>
    //           <p>{order.addressInfo.country || "N/A"}</p>
    //           <p>Phone: {order.addressInfo.phone || "N/A"}</p>
    //         </div>
    //       ) : (
    //         <p className="text-sm text-gray-500">No address information available</p>
    //       )}
    //     </div>

    //     <Separator />

    //     <div>
    //       <h3 className="font-semibold mb-2">Order Items</h3>
    //       {Array.isArray(order.cartItems) && order.cartItems.length > 0 ? (
    //         <div className="space-y-4">
    //           {order.cartItems.map((item, index) => (
    //             <div key={item._id || `item-${index}`} className="flex gap-4 border-b pb-2">
    //               <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
    //                 {item.image && (
    //                   <img 
    //                     src={item.image} 
    //                     alt={item.title} 
    //                     className="w-full h-full object-cover"
    //                   />
    //                 )}
    //               </div>
    //               <div className="flex-1">
    //                 <p className="font-medium">{item.title || "Unknown Product"}</p>
    //                 <div className="flex justify-between mt-1">
    //                   <p className="text-sm text-gray-500">
    //                     Qty: {item.quantity || 1}
    //                   </p>
    //                   <p className="font-medium">
    //                     ₹{item.price || 0}
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       ) : (
    //         <p className="text-sm text-gray-500">No items in this order</p>
    //       )}
    //     </div>

    //     <Separator />

    //     <div className="space-y-2">
    //       <div className="flex justify-between">
    //         <p>Subtotal</p>
    //         <p>₹{order.totalAmount || 0}</p>
    //       </div>
          
    //       <div className="flex justify-between font-bold">
    //         <p>Total</p>
    //         <p>₹{order.totalAmount || 0}</p>
    //       </div>
    //     </div>
    //   </div>
    // </DialogContent>

    <DialogContent className="sm:max-w-[600px] h-[600px] bg-[#F7F7F7] rounded-2xl p-6 overflow-auto shadow-xl">
  <DialogHeader>
    <DialogTitle className="text-2xl font-bold text-gray-800">Order Details</DialogTitle>
  </DialogHeader>

  <div className="grid gap-6">
    {/* Order Info Section */}
    <div className="grid gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-700">Order ID</p>
        <Label className="text-gray-900">{order._id}</Label>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-700">Customer ID</p>
        <Label className="text-gray-900">{order.userId || "N/A"}</Label>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-700">Order Date</p>
        <Label className="text-gray-900">
          {order.orderDate 
            ? format(new Date(order.orderDate), "dd/MM/yyyy HH:mm") 
            : "N/A"}
        </Label>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-700">Payment Method</p>
        <Label className="text-gray-900">{order.paymentMethod || "N/A"}</Label>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-700">Payment Status</p>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
          order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {order.paymentStatus 
            ? order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1) 
            : 'Pending'}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-700">Order Status</p>
        <div className="flex items-center gap-2">
          <Select value={orderStatus} onValueChange={setOrderStatus}>
            <SelectTrigger className="w-[180px] border-gray-300  shadow-sm">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-md shadow-lg">
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            size="sm"
            className="rounded-md bg-[#A67A4B] hover:bg-[#ad8253] text-white transition"
            onClick={handleOrderStatusChange}
            disabled={isUpdatingOrder || orderStatus === order.orderStatus}
          >
            {isUpdatingOrder ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>

    {/* Shipping Address */}
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
      {order.addressInfo ? (
        <div className="grid gap-1 text-sm text-gray-700">
          <p>{order.addressInfo.address || "N/A"}</p>
          <p>
            {[
              order.addressInfo.city,
              order.addressInfo.state,
              order.addressInfo.pincode
            ].filter(Boolean).join(", ")}
          </p>
          <p>{order.addressInfo.country || "N/A"}</p>
          <p>Phone: {order.addressInfo.phone || "N/A"}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No address information available</p>
      )}
    </div>

    {/* Order Items */}
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-2">Order Items</h3>
      {Array.isArray(order.cartItems) && order.cartItems.length > 0 ? (
        <div className="space-y-4">
          {order.cartItems.map((item, index) => (
            <div key={item._id || `item-${index}`} className="flex gap-4 border-b pb-2 last:border-0">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                {item.image && (
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.title || "Unknown Product"}</p>
                <div className="flex justify-between mt-1 text-sm text-gray-600">
                  <p>Qty: {item.quantity || 1}</p>
                  <p className="font-medium text-gray-900">₹{item.price || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No items in this order</p>
      )}
    </div>

    {/* Summary */}
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-2">
      <div className="flex justify-between text-gray-700">
        <p>Subtotal</p>
        <p>₹{order.totalAmount || 0}</p>
      </div>
      <div className="flex justify-between font-bold text-gray-900">
        <p>Total</p>
        <p>₹{order.totalAmount || 0}</p>
      </div>
    </div>
  </div>
</DialogContent>

  );
}

export default AdminOrderDetails;
