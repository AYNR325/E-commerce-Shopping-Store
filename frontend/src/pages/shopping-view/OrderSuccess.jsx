import React from 'react';
import successVideo from "../../assets/paySuccessVideo.mp4";
import successImg from "../../assets/payment_success.gif";
import paymentSuccess from "../../assets/paymentSuccessful.mp4"
import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    
    <div className="flex flex-col justify-center items-center p-4 min-h-[75vh] ">
  {/* Video Section */}
  <div className="w-full max-w-[250px] sm:max-w-[300px]">
  <video src={successVideo} autoPlay muted className="w-full h-60" />
  </div>

  {/* Success Message */}
  <h2 className="text-green-600 font-bold text-xl sm:text-2xl  text-center">
    Payment Successful
  </h2>

  {/* Text and Link */}
  <p className="text-center text-gray-600 mt-2">
    Your order has been successfully processed. You can track your order on your
    <Link to="/shop/account" className="text-blue-500 hover:underline ml-1">
      account page
    </Link>.
  </p>
</div>

  );
}

export default OrderSuccess;
