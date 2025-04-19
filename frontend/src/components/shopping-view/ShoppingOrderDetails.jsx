import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetails({ order }) {
  console.log("Order details:", order);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Format price
  const formatPrice = (price) => {
    if (!price && price !== 0) return "N/A";
    return `₹${parseFloat(price).toFixed(2)}`;
  };
  
  // Check if address info exists and has valid data
  const hasValidAddress = order?.addressInfo && (
    order.addressInfo.address || 
    order.addressInfo.city || 
    order.addressInfo.state || 
    order.addressInfo.country
  );
  
  return (
    <DialogContent className="sm:max-w-[600px] bg-white">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order ID</p>
            <Label>{order?._id || "N/A"}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{formatDate(order?.orderDate)}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label variant="success">{order?.orderStatus || "N/A"}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label variant={order?.paymentStatus === "completed" ? "success" : "warning"}>
              {order?.paymentStatus || "N/A"}
            </Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>{formatPrice(order?.totalAmount)}</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">
              Order Items
              {order?.cartItems && order.cartItems.length > 0 ? (
                <ul className="grid gap-2 text-muted-foreground font-normal mt-2">
                  {order.cartItems.map((item, index) => (
                    <li key={index} className="border-b pb-2">
                      <div>Product: {item.title}</div>
                      <div>Quantity: {item.quantity}</div>
                      <div>Price: {formatPrice(item.price)}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted-foreground mt-2">No items found</div>
              )}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              {hasValidAddress ? (
                <div className="grid gap-0.5 text-muted-foreground">
                  <div>{order.addressInfo.address || "N/A"}</div>
                  <div>{order.addressInfo.city || "N/A"}</div>
                  <div>{order.addressInfo.state}, {order.addressInfo.country}</div>
                  <div>Pincode: {order.addressInfo.pincode || "N/A"}</div>
                  <div>Phone: {order.addressInfo.phone || "N/A"}</div>
                </div>
              ) : (
                <div className="text-muted-foreground">Address information not available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetails;