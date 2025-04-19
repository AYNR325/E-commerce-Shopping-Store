import React from "react";
import { SheetContent, SheetHeader, SheetTitle ,Sheet} from "../ui/sheet";
import { Button } from "../ui/button";
import CartItemsContent from "./CartItemsContent";
import { useNavigate } from "react-router-dom";

function CartWrapper({ cartItems, setOpenCartSheet ,closeSheet,openCartSheet}) {
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
    // <SheetContent className="bg-[#F0F0F0] sm:max-w-md overflow-auto">
    //   <SheetHeader>
    //     <SheetTitle>Your Cart</SheetTitle>
    //   </SheetHeader>
    //   <div className="mt-8 space-y-4">
    //     {cartItems && cartItems.length > 0
    //       ? cartItems.map((item) => <CartItemsContent cartItem={item} />)
    //       : null}
    //   </div>

    //   <div className="mt-8 space-y-4">
    //     <div className="flex justify-between">
    //       <span className="font-bold">Total</span>
    //       <span className="font-bold">₹{totalCartAmount}</span>
    //     </div>
    //   </div>
    //   <Button
    //     className="w-full mt-6  bg-[#A67A4B] text-white  hover:bg-[#af865a]"
    //     onClick={() => {
    //       navigate("/shop/checkout");
    //       setOpenCartSheet(false);
    //       closeSheet();
    //     }}
    //   >
    //     Checkout
    //   </Button>
    // </SheetContent>
//     <SheetContent className="bg-[#F0F0F0] sm:max-w-md max-h-screen flex flex-col">
//   <SheetHeader className="pb-4">
//     <SheetTitle>Your Cart</SheetTitle>
//   </SheetHeader>

//   {/* Scrollable Content */}
//   <div className="flex-1 overflow-y-auto px-2">
//     {cartItems && cartItems.length > 0 ? (
//       cartItems.map((item, index) => <CartItemsContent key={index} cartItem={item} />)
//     ) : (
//       <p className="text-center text-gray-500">Your cart is empty.</p>
//     )}
//   </div>

//   {/* Total Price & Checkout Button (Sticky at Bottom) */}
//   <div className="p-4 border-t bg-[#F0F0F0]">
//     <div className="flex justify-between font-bold">
//       <span>Total</span>
//       <span>₹{totalCartAmount}</span>
//     </div>
//     <Button
//       className="w-full mt-4 bg-[#A67A4B] text-white hover:bg-[#af865a]"
//       onClick={() => {
//         navigate("/shop/checkout");
//         setOpenCartSheet(false);
//         closeSheet();
//       }}
//     >
//       Checkout
//     </Button>
//   </div>
// </SheetContent>

// {/* <SheetContent className="bg-[#F0F0F0] sm:max-w-md h-full flex flex-col">
//   <SheetHeader className="pb-4">
//     <SheetTitle>Your Cart</SheetTitle>
//   </SheetHeader>

//   {/* Scrollable Cart Items Section */}
//   <div className="flex-1 overflow-y-auto px-2 space-y-4">
//     {cartItems && cartItems.length > 0 ? (
//       cartItems.map((item, index) => <CartItemsContent key={index} cartItem={item} />)
//     ) : (
//       <p className="text-center text-gray-500">Your cart is empty.</p>
//     )}
//   </div>

//   {/* Total Price & Checkout Button - Stays Fixed */}
//   <div className="p-4 border-t bg-[#F0F0F0] sticky bottom-0">
//     <div className="flex justify-between font-bold">
//       <span>Total</span>
//       <span>₹{totalCartAmount}</span>
//     </div>
//     <Button
//       className="w-full mt-4 bg-[#A67A4B] text-white hover:bg-[#af865a]"
//       onClick={() => {
//         navigate("/shop/checkout");
//         setOpenCartSheet(false);
//         closeSheet();
//       }}
//     >
//       Checkout
//     </Button>
//   </div>
// </SheetContent> */}

// {/* <SheetContent className="bg-[#F0F0F0] sm:max-w-md h-full flex flex-col">
//   <SheetHeader className="pb-4">
//     <SheetTitle>Your Cart</SheetTitle>
//   </SheetHeader>

//   {/* Scrollable Cart Items Section */}
//   <div className="flex-1 overflow-y-auto px-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//     {cartItems && cartItems.length > 0 ? (
//       cartItems.map((item, index) => <CartItemsContent key={index} cartItem={item} />)
//     ) : (
//       <p className="text-center text-gray-500">Your cart is empty.</p>
//     )}
//   </div>

//   {/* Total Price & Checkout Button - Stays Fixed */}
//   <div className="p-4 border-t bg-[#F0F0F0] sticky bottom-0">
//     <div className="flex justify-between font-bold">
//       <span>Total</span>
//       <span>₹{totalCartAmount}</span>
//     </div>
//     <Button
//       className="w-full mt-4 bg-[#A67A4B] text-white hover:bg-[#af865a]"
//       onClick={() => {
//         navigate("/shop/checkout");
//         setOpenCartSheet(false);
//         closeSheet();
//       }}
//     >
//       Checkout
//     </Button>
//   </div>
// </SheetContent> */}


// {/* <SheetContent className="bg-[#F0F0F0] sm:max-w-md h-full flex flex-col">
//   <SheetHeader className="pb-4">
//     <SheetTitle>Your Cart</SheetTitle>
//   </SheetHeader>

//   {/* Scrollable Cart Items Section */}
//   <div className="flex-1 overflow-y-auto px-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//     {cartItems && cartItems.length > 0 ? (
//       cartItems.map((item, index) => <CartItemsContent key={index} cartItem={item} />)
//     ) : (
//       <p className="text-center text-gray-500">Your cart is empty.</p>
//     )}
//   </div>

//   {/* Total Price & Checkout Button - Stays Fixed */}
//   <div className="p-4 border-t bg-[#F0F0F0]">
//     <div className="flex justify-between font-bold">
//       <span>Total</span>
//       <span>₹{totalCartAmount}</span>
//     </div>
//     <Button
//       className="w-full mt-4 bg-[#A67A4B] text-white hover:bg-[#af865a]"
//       onClick={() => {
//         navigate("/shop/checkout");
//         setOpenCartSheet(false);
//         closeSheet();
//       }}
//     >
//       Checkout
//     </Button>
//   </div>
// </SheetContent> */}

// <SheetContent className="bg-[#F0F0F0] sm:max-w-md h-full flex flex-col flex-1 overflow-y-auto px-2 space-y-4 ">
//   <SheetHeader className="pb-4">
//     <SheetTitle>Your Cart</SheetTitle>
//   </SheetHeader>

//   {/* Scrollable Cart Items Section */}
//   <div
//     className="mt-8 space-y-4 "
//     // style={{
//     //   WebkitOverflowScrolling: "touch", // Enables smooth scrolling on iOS
//     //   overflowScrolling: "touch", // Ensures touch scrolling works
//     // }}
//   >
//     {cartItems && cartItems.length > 0 ? (
//       cartItems.map((item, index) => <CartItemsContent key={index} cartItem={item} />)
//     ) : (
//       <p className="text-center text-gray-500">Your cart is empty.</p>
//     )}
//   </div>

//   {/* Total Price & Checkout Button - Stays Fixed */}
//   <div className="p-4 border-t bg-[#F0F0F0]">
//     <div className="flex justify-between font-bold">
//       <span>Total</span>
//       <span>₹{totalCartAmount}</span>
//     </div>
//     <Button
//       className="w-full mt-4 bg-[#A67A4B] text-white hover:bg-[#af865a]"
//       onClick={() => {
//         navigate("/shop/checkout");
//         setOpenCartSheet(false);
//         closeSheet();
//       }}
//     >
//       Checkout
//     </Button>
//   </div>
// </SheetContent>

// <SheetContent className="bg-[#F0F0F0] sm:max-w-md h-full flex flex-col px-2 space-y-4">

// <SheetHeader className="pb-4">
//   <SheetTitle>Your Cart</SheetTitle>
// </SheetHeader>

// {/* Scrollable Cart Items Section */}
// <div className="flex-1 overflow-y-auto mt-4 space-y-4 ">
//   {cartItems && cartItems.length > 0 ? (
//     cartItems.map((item, index) => <CartItemsContent key={index} cartItem={item} />)
//   ) : (
//     <p className="text-center text-gray-500">Your cart is empty.</p>
//   )}
// </div>

// {/* Total Price & Checkout Button - Fixed at Bottom */}
// <div className="p-4 border-t bg-[#F0F0F0]">
//   <div className="flex justify-between font-bold">
//     <span>Total</span>
//     <span>₹{totalCartAmount}</span>
//   </div>
//   <Button
//     className="w-full mt-4 bg-[#A67A4B] text-white hover:bg-[#af865a]"
//     onClick={() => {
//       navigate("/shop/checkout");
//       setOpenCartSheet(false);
//       closeSheet();
//     }}
//   >
//     Checkout
//   </Button>
// </div>
// </SheetContent>

// <SheetContent className="bg-[#F0F0F0] sm:max-w-md h-full flex flex-col px-2">

// <SheetHeader className="pb-4 shrink-0">
//   <SheetTitle>Your Cart</SheetTitle>
// </SheetHeader>

// {/* Scrollable Cart Items Section */}
// <div
//   className="flex-1 overflow-y-auto mt-4 space-y-4"
//   style={{
//     WebkitOverflowScrolling: "touch",  // smooth iOS scroll
//   }}
// >
//   {cartItems && cartItems.length > 0 ? (
//     cartItems.map((item, index) => <CartItemsContent key={index} cartItem={item} />)
//   ) : (
//     <p className="text-center text-gray-500">Your cart is empty.</p>
//   )}
// </div>

// {/* Total Price & Checkout Button - Fixed at Bottom */}
// <div className="p-4 border-t bg-[#F0F0F0] shrink-0">
//   <div className="flex justify-between font-bold">
//     <span>Total</span>
//     <span>₹{totalCartAmount}</span>
//   </div>
//   <Button
//     className="w-full mt-4 bg-[#A67A4B] text-white hover:bg-[#af865a]"
//     onClick={() => {
//       navigate("/shop/checkout");
//       setOpenCartSheet(false);
//       closeSheet();
//     }}
//   >
//     Checkout
//   </Button>
// </div>

// </SheetContent>

<Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
  <SheetContent className="h-full flex flex-col bg-[#F0F0F0] sm:max-w-md px-2">
    
    <SheetHeader className="pb-4 shrink-0">
      <SheetTitle>Your Cart</SheetTitle>
    </SheetHeader>

    {/* Scrollable Cart Items Section */}
    <div
      className="flex-1 overflow-y-auto mt-4 space-y-4"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <CartItemsContent key={index} cartItem={item} />
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>

    {/* Total Price & Checkout Button - Fixed at Bottom */}
    <div className="p-4 border-t bg-[#F0F0F0] shrink-0">
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>₹{totalCartAmount}</span>
      </div>
      <Button
        className="w-full mt-4 bg-[#A67A4B] text-white hover:bg-[#af865a]"
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
          closeSheet();
        }}
      >
        Checkout
      </Button>
    </div>

  </SheetContent>
</Sheet>

  );
}

export default CartWrapper;
