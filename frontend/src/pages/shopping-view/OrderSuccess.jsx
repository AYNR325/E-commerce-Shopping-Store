import React, { useEffect, useState } from 'react';
import successVideo from "../../assets/paySuccessVideo.mp4";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, clearCartAsync } from '@/store/shop/cart-slice';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

function OrderSuccess() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.shoppingCart);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get the session_id from URL query parameters
    const urlParams = new URLSearchParams(location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId && user?.id && !orderCreated) {
      // Calculate order summary from cart items
      const subtotal = cartItems?.items?.reduce((total, item) => {
        const itemPrice = item.salePrice !== null ? item.salePrice : item.price;
        return total + (itemPrice * item.quantity);
      }, 0) || 0;
      
      const totalAmount = subtotal;
      
      // Create order summary for display
      setOrderSummary({
        items: cartItems?.items || [],
        subtotal,
        totalAmount,
        createdAt: new Date().toISOString(),
        status: 'processing'
      });
      
      // Verify the session and get order details
      setIsLoading(true);
      axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/session/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if (response.data.success) {
          setOrderId(response.data.order._id);
          
          // Clear the cart in both frontend and backend
          if (user && user.id) {
            dispatch(clearCartAsync(user.id))
              .then(() => {
                console.log("Cart cleared successfully");
              })
              .catch(err => {
                console.error("Failed to clear cart:", err);
                // Fallback to just clearing the frontend cart
                dispatch(clearCart());
              });
          } else {
            console.log("No user ID available, clearing frontend cart only");
            dispatch(clearCart());
          }
          
          setOrderCreated(true);
          
          toast({
            title: "Order confirmed!",
            description: "Your order has been placed successfully.",
            variant: "success",
            className: "text-white bg-green-500",
          });
        } else {
          setError(response.data.message || "Failed to verify order");
          toast({
            title: "Failed to confirm order",
            description: response.data.message || "An error occurred while confirming your order.",
            variant: "destructive",
            className: "text-white bg-red-500",
          });
        }
      })
      .catch(err => {
        console.error("Error verifying order:", err);
        setError(err.response?.data?.message || "An unexpected error occurred");
        toast({
          title: "Error",
          description: "An unexpected error occurred while confirming your order.",
          variant: "destructive",
          className: "text-white bg-red-500",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, location, user, cartItems, orderCreated, toast]);

  console.log(orderSummary,"orderSummary");

  return (
    <div className="flex flex-col justify-center items-center p-4 min-h-[75vh]">
      {/* Video Section */}
      <div className="w-full max-w-[250px] sm:max-w-[300px]">
        <video src={successVideo} autoPlay muted className="w-full h-60" />
      </div>

      {/* Success Message */}
      <h2 className="text-green-600 font-bold text-xl sm:text-2xl text-center">
        Payment Successful
      </h2>

      {/* Order Details */}
      {isLoading ? (
        <p className="text-center mt-4">Processing your order...</p>
      ) : error ? (
        <div className="mt-4 text-center">
          <p className="text-red-500">Error processing order</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      ) : orderSummary ? (
        <div className="mt-6 w-full max-w-md">
          <div className="bg-[#F0F0F0] p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {orderId && (
                <p className="text-sm text-gray-600">
                  Order ID: <span className="font-medium">{orderId}</span>
                </p>
              )}
              <p className="text-sm text-gray-600">
                Date: <span className="font-medium">{new Date(orderSummary.createdAt).toLocaleDateString()}</span>
              </p>
              <p className="text-sm text-gray-600">
                Status: <span className="font-medium capitalize">{orderSummary.status || 'Processing'}</span>
              </p>
            </div>

            {orderSummary.items && orderSummary.items.length > 0 && (
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="font-medium mb-2">Items</h4>
                <ul className="space-y-2">
                  {orderSummary.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="text-sm">
                        {item.title} x {item.quantity}
                      </span>
                      <span className="text-sm font-medium">
                        ₹{((item.salePrice || item.price) * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Subtotal</span>
                <span className="text-sm">₹{orderSummary.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{orderSummary.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center mt-4">Order details not available</p>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-6">
        <Button asChild variant="outline" className="bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border-[1px] border-[#A67A4B]"> 
          <Link to="/shop">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline" className="bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border-[1px] border-[#A67A4B]">
          <Link to="/shop/account">View All Orders</Link>
        </Button>
      </div>
    </div>
  );
}

export default OrderSuccess;
