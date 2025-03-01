import React from "react";
import CancelImg from "../../assets/paymentCancel.gif";
import { Link } from "react-router-dom";
function OrderCancel() {
  return (
    
    <div className="flex flex-col justify-center items-center p-4 min-h-[75vh] ">
  {/* Image Section */}
  <div className="w-2/3 max-w-[200px]">
    <img src={CancelImg} alt="Payment Cancelled" className="w-full h-auto" />
  </div>

  {/* Heading */}
  <h1 className="text-xl sm:text-2xl font-bold text-red-500 mt-4 text-center">
    Payment Cancelled
  </h1>

  {/* Text and Link */}
  <p className="pt-3 text-center text-gray-600">
    Your payment has been cancelled. Please check your
    <Link to="/shop/account" className="text-blue-500 hover:underline ml-1">
      payment details
    </Link>.
  </p>
</div>



  );
}

export default OrderCancel;
