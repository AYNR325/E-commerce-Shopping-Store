import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function AdminOrderDetails() {
  return (
    <DialogContent className="sm:max-w-[600px] bg-white">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order ID</p>
            <Label>134802</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>12/12/2022</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label variant="success">Completed</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>$100.00</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">
              Order Details
              <ul className="grid gap-0.5 text-muted-foreground font-normal">
                <li>Product: iPhone 12 Pro Max</li>
                <li>Quantity: 1</li>
                <li>Price: $100.00</li>
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <div>John Doe</div>
                <div>123 Main St</div>
                <div>Anytown, USA</div>
                <div>12345</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetails;
