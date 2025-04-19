import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getOrderDetails } from "@/store/shop/order-slice";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails, isLoading, error } = useSelector((state) => state.order);
  const { toast } = useToast();

  console.log(orderDetails,"orderDetails");
  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, [dispatch, user]);

  const fetchOrders = () => {
    if (user?.id) {
      dispatch(getAllOrders({ userId: user.id }))
        .catch(error => {
          console.error("Error fetching orders:", error);
          toast({
            title: "Error",
            description: "Failed to fetch orders. Please try again.",
            variant: "destructive",
            className: "text-white bg-red-500",
          });
        });
    }
  };

  const refreshOrderDetails = () => {
    if (selectedOrderId) {
      handleViewDetails(selectedOrderId);
    }
  };

  const handleViewDetails = (orderId) => {
    if (!orderId) {
      console.error("Invalid order ID");
      return;
    }
    
    setSelectedOrderId(orderId);
    console.log("Fetching order details for ID:", orderId);
    dispatch(getOrderDetails({ orderId }))
      .then(response => {
        console.log("Order details response:", response);
        
        if (response.payload && response.payload.order) {
          console.log("Order details received:", {
            id: response.payload.order._id,
            hasAddressInfo: !!response.payload.order.addressInfo,
            addressInfo: response.payload.order.addressInfo
          });
          
          // Log the address information in detail
          if (response.payload.order.addressInfo) {
            console.log("Address details:", {
              address: response.payload.order.addressInfo.address,
              city: response.payload.order.addressInfo.city,
              state: response.payload.order.addressInfo.state,
              country: response.payload.order.addressInfo.country,
              pincode: response.payload.order.addressInfo.pincode,
              phone: response.payload.order.addressInfo.phone
            });
          } else {
            console.log("No address information found in order");
          }
        }
        
        if (response.error) {
          console.error("Error in response:", response.error);
          
          // Check if it's an authentication error
          if (response.payload && (
              response.payload.message === "Unauthorised user!" || 
              response.payload.message === "Authentication failed. Please log in again." ||
              response.payload.message === "Authentication token not found. Please log in again."
            )) {
            toast({
              title: "Authentication Error",
              description: "Please log in again to view order details.",
              variant: "destructive",
              className: "text-white bg-red-500",
            });
            // Optionally redirect to login page
            // window.location.href = '/login';
          } else {
            toast({
              title: "Error",
              description: "Failed to fetch order details. Please try again.",
              variant: "destructive",
              className: "text-white bg-red-500",
            });
          }
        } else {
          setOpenDetailsDialog(true);
        }
      })
      .catch(error => {
        console.error("Error fetching order details:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
          className: "text-white bg-red-500",
        });
      });
  };

  const getPaymentStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // const getOrderStatusBadgeClass = (status) => {
  //   switch (status) {
  //     case 'completed':
  //       return 'bg-green-100 text-green-800';
  //     case 'processing':
  //       return 'bg-blue-100 text-blue-800';
  //     case 'shipping':
  //       return 'bg-indigo-100 text-indigo-800';
  //     case 'delivered':
  //       return 'bg-teal-100 text-teal-800';
  //     default:
  //       return 'bg-yellow-100 text-yellow-800';
  //   }
  // };

  const getOrderStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800'; // fallback for unknown status
    }
  };
  
  const formatStatus = (status) => {
    return status ? (status.charAt(0).toUpperCase() + status.slice(1)) : 'Pending';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">Loading orders...</div>
        ) : orderList && orderList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Order Total</TableHead>
                <TableHead>
                  <span className="sr-only">View Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(orderList) && orderList.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{typeof order._id === 'string' ? order._id.substring(0, 8) + '...' : order._id}</TableCell>
                  <TableCell>{order.createdAt ? format(new Date(order.createdAt), 'yyyy-MM-dd') : 'N/A'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      getOrderStatusBadgeClass(order.orderStatus)
                    }`}>
                      {formatStatus(order.orderStatus)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      getPaymentStatusBadgeClass(order.paymentStatus)
                    }`}>
                      {formatStatus(order.paymentStatus)}
                    </span>
                  </TableCell>
                  <TableCell>₹{(order.totalAmount || 0).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button 
                    className="bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border-[1px] border-[#A67A4B]"
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(order._id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        )}
      </CardContent>

      {/* <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="max-w-3xl bg-[#F0F0F0] max-h-[80vh] overflow-auto ">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                View the details of your order including items and total amount.
              </DialogDescription>
            </div>
            
          </DialogHeader>
          {orderDetails ? (
            <div className="space-y-6  ">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Order Information</h3>
                  <p className="text-sm text-muted-foreground">Order ID: {orderDetails._id}</p>
                  <p className="text-sm text-muted-foreground">
                    Date: {orderDetails.orderDate ? format(new Date(orderDetails.orderDate), 'yyyy-MM-dd') : 'N/A'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status: <span className={`px-2 py-1 rounded-full text-xs ${getOrderStatusBadgeClass(orderDetails.orderStatus)}`}>
                      {formatStatus(orderDetails.orderStatus)}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Payment Status: <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusBadgeClass(orderDetails.paymentStatus)}`}>
                      {formatStatus(orderDetails.paymentStatus)}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">Payment Method: {orderDetails.paymentMethod || 'Card'}</p>
                  
                </div>
                <div>
                  <h3 className="font-medium">Shipping Address</h3>
                  {orderDetails.addressInfo ? (
                    <>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails.addressInfo.address || 'Address not provided'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {[
                          orderDetails.addressInfo.city || '',
                          orderDetails.addressInfo.state || '',
                          orderDetails.addressInfo.pincode || ''
                        ].filter(Boolean).join(', ') || 'Location details not provided'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails.addressInfo.country || ''}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Phone: {orderDetails.addressInfo.phone || 'Not provided'}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No address information available</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Items</h3>
                {orderDetails.cartItems && orderDetails.cartItems.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody >
                      {orderDetails.cartItems.map((item, index) => (
                        <TableRow key={item.productId || `item-${index}`}>
                          <TableCell className="flex items-center gap-2">
                            <img 
                              src={item.image || 'https://placehold.co/100x100?text=No+Image'} 
                              alt={item.title || 'Product'} 
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span>{item.title || 'Unknown Product'}</span>
                          </TableCell>
                          <TableCell>{item.quantity || 0}</TableCell>
                          <TableCell>₹{(Number(item.price) || 0).toFixed(2)}</TableCell>
                          <TableCell>₹{((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No items found in this order
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <div className="w-1/3 space-y-1">
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span>₹{(orderDetails.totalAmount || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Last Updated:</span>
                    <span>{orderDetails.orderUpdateDate ? format(new Date(orderDetails.orderUpdateDate), 'yyyy-MM-dd HH:mm') : 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-40">Loading order details...</div>
          )}
        </DialogContent>
      </Dialog> */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
  <DialogContent className="max-w-3xl bg-[#F0F0F0] shadow-2xl rounded-2xl max-h-[80vh] overflow-auto p-6">
    <DialogHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
      <div>
        <DialogTitle className="text-2xl font-bold text-gray-800">Order Details</DialogTitle>
        <DialogDescription className="text-gray-500">
          View the breakdown of your order including items, status, and total.
        </DialogDescription>
      </div>
    </DialogHeader>

    {orderDetails ? (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Info */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm space-y-2">
            <h3 className="font-semibold text-lg text-gray-700">Order Information</h3>
            <p className="text-sm text-gray-600">Order ID: {orderDetails._id}</p>
            <p className="text-sm text-gray-600">
              Date: {orderDetails.orderDate ? format(new Date(orderDetails.orderDate), 'yyyy-MM-dd') : 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              Status: <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusBadgeClass(orderDetails.orderStatus)}`}>
                {formatStatus(orderDetails.orderStatus)}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Payment Status: <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadgeClass(orderDetails.paymentStatus)}`}>
                {formatStatus(orderDetails.paymentStatus)}
              </span>
            </p>
            <p className="text-sm text-gray-600">Payment Method: {orderDetails.paymentMethod || 'Card'}</p>
          </div>

          {/* Address */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm space-y-2">
            <h3 className="font-semibold text-lg text-gray-700">Shipping Address</h3>
            {orderDetails.addressInfo ? (
              <>
                <p className="text-sm text-gray-600">{orderDetails.addressInfo.address || 'Address not provided'}</p>
                <p className="text-sm text-gray-600">
                  {[
                    orderDetails.addressInfo.city || '',
                    orderDetails.addressInfo.state || '',
                    orderDetails.addressInfo.pincode || ''
                  ].filter(Boolean).join(', ') || 'Location not provided'}
                </p>
                <p className="text-sm text-gray-600">{orderDetails.addressInfo.country || ''}</p>
                <p className="text-sm text-gray-600">Phone: {orderDetails.addressInfo.phone || 'Not provided'}</p>
              </>
            ) : (
              <p className="text-sm text-gray-500">No address information available</p>
            )}
          </div>
        </div>

        {/* Items Table */}
        {/* <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Items</h3>
          {orderDetails.cartItems && orderDetails.cartItems.length > 0 ? (
            <Table className="rounded-lg overflow-hidden shadow-sm">
              <TableHeader className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails.cartItems.map((item, index) => (
                  <TableRow key={item.productId || `item-${index}`} className="hover:bg-gray-50">
                    <TableCell className="flex items-center gap-3">
                      <img
                        src={item.image || 'https://placehold.co/100x100?text=No+Image'}
                        alt={item.title || 'Product'}
                        className="w-12 h-12 object-cover rounded shadow-sm"
                      />
                      <span className="text-sm text-gray-700">{item.title || 'Unknown Product'}</span>
                    </TableCell>
                    <TableCell className="text-sm">{item.quantity || 0}</TableCell>
                    <TableCell className="text-sm">₹{(Number(item.price) || 0).toFixed(2)}</TableCell>
                    <TableCell className="text-sm font-medium">₹{((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-4 text-gray-500">No items found in this order</div>
          )}
        </div> */}
        <div>
  <h3 className="font-semibold text-lg text-gray-700 mb-2">Items</h3>

  {orderDetails.cartItems && orderDetails.cartItems.length > 0 ? (
    <>
      {/* Table for medium and up */}
      <Table className="rounded-lg overflow-hidden shadow-sm hidden md:table">
        <TableHeader className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderDetails.cartItems.map((item, index) => (
            <TableRow key={item.productId || `item-${index}`} className="hover:bg-gray-50">
              <TableCell className="flex items-center gap-3">
                <img
                  src={item.image || 'https://placehold.co/100x100?text=No+Image'}
                  alt={item.title || 'Product'}
                  className="w-12 h-12 object-cover rounded shadow-sm"
                />
                <span className="text-sm text-gray-700">{item.title || 'Unknown Product'}</span>
              </TableCell>
              <TableCell className="text-sm">{item.quantity || 0}</TableCell>
              <TableCell className="text-sm">₹{(Number(item.price) || 0).toFixed(2)}</TableCell>
              <TableCell className="text-sm font-medium">₹{((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Card list for mobile */}
      <div className="md:hidden space-y-4">
        {orderDetails.cartItems.map((item, index) => (
          <div key={item.productId || `item-${index}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
            <img
              src={item.image || 'https://placehold.co/100x100?text=No+Image'}
              alt={item.title || 'Product'}
              className="w-14 h-14 object-cover rounded shadow"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{item.title || 'Unknown Product'}</h4>
              <p className="text-sm text-gray-600">Quantity: {item.quantity || 0}</p>
              <p className="text-sm text-gray-600">Price: ₹{(Number(item.price) || 0).toFixed(2)}</p>
              <p className="text-sm text-gray-800 font-semibold">Total: ₹{((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="text-center py-4 text-gray-500">No items found in this order</div>
  )}
</div>


        {/* Summary Section */}
        <div className="flex justify-end">
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm w-full md:w-1/3 space-y-2">
            <div className="flex justify-between font-medium text-gray-800">
              <span>Total Amount:</span>
              <span>₹{(orderDetails.totalAmount || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Last Updated:</span>
              <span>{orderDetails.orderUpdateDate ? format(new Date(orderDetails.orderUpdateDate), 'yyyy-MM-dd HH:mm') : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center h-40 text-gray-500">Loading order details...</div>
    )}
  </DialogContent>
</Dialog>

    </Card>
  );
}

export default ShoppingOrders;
