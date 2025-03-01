import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartItemsContent from "./CartItemsContent";
import { useNavigate } from "react-router-dom";

function CartWrapper({ cartItems, setOpenCartSheet ,closeSheet}) {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="bg-white sm:max-w-md overflow-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <CartItemsContent cartItem={item} />)
          : null}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">₹{totalCartAmount}</span>
        </div>
      </div>
      <Button
        className="w-full mt-6 bg-black text-white hover:bg-white hover:text-black border-black border-[1px] hover:rounded-2xl"
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
          closeSheet();
        }}
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default CartWrapper;
