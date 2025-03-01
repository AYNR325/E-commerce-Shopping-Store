
import React from "react";
import img from "../../assets/account.jpg";
import Address from "@/components/shopping-view/Address";
import { useDispatch, useSelector } from "react-redux";
import CartItemsContent from "@/components/shopping-view/CartItemsContent";
import AddressCard from "@/components/shopping-view/AddressCard";
import { Button } from "@/components/ui/button";
import { useState ,useEffect} from "react";
import { createOrder, getAllOrders, getOrderDetails, paymentGateway } from "@/store/shop/order-slice";
import {loadStripe} from '@stripe/stripe-js';
import { useToast } from "@/hooks/use-toast";
import { fetchAllAddresses } from "@/store/shop/address-slice";
import { Link } from "react-router-dom";
function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
const {toast}=useToast();
  const dispatch = useDispatch();
const {orderData,isLoading,error}=useSelector((state) => state.order);
  // console.log(cartItems.items, "ayush");
const { addressList } = useSelector((state) => state.address);

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

      // useEffect(() => {
      //   const paymentInfo =  dispatch(paymentGateway({ cartItems })).unwrap();
      //   if(paymentInfo?.data?.id){
      //     const orderId=JSON.parse(sessionStorage.getItem("currentOrderId"))
      //     dispatch(getAllOrders({userId: user?.id })).then((data) => {
      //       if(data?.payload?.success){
      //         sessionStorage.removeItem("currentOrderId")
      //         dispatch(getOrderDetails({orderId}))
      //         window.location.href="/shop/success"
      //       }
      //     })
      //   }
      // }, [dispatch])
      
  

  const handlePayment = async () => {
    if(currentSelectedAddress !== undefined && currentSelectedAddress !== null) {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  
      if (!stripe) {
        console.error('Stripe failed to initialize');
        
        toast({
          title: "Stripe failed to initialize. Please try again later.",
          variant: "warning",
          className:"text-white bg-red-500",
    
        })
        return;
      }
  
      if (!cartItems?.items?.length) {
        
        toast({
          title: "Cart is empty. Please add items to the cart before proceeding.",
          variant: "warning",
          className:"text-white bg-red-500",
    
        })
        return;
      }
  
      
      toast({
        title: "Processing payment...",
        variant: "success",
        className:"text-white bg-green-500",
  
      })
  
      // Dispatch payment action to get session details
      const response = await dispatch(paymentGateway({ cartItems })).unwrap();
      console.log(response.data.id,"ayush");
      
      if (!response?.data.id) {
        
        toast({
          title: "Unable to generate payment session. Please try again later.",
          variant: "warning",
          className:"text-white bg-red-500",
        })
        throw new Error('Invalid checkout session URL');
      }
  
      
      /* Using window.location.assign instead of window.location.href to avoid refreshing the page when redirected to Stripe Checkout

        ------ if you want to use url use the code given below------
      console.log('Redirecting to:', response.data.url);
      window.location.assign(response.data.url); */

      // Redirect to Stripe Checkout page using the session ID from backend
      stripe.redirectToCheckout({sessionId:response.data.id})
      

  
    } catch (error) {
      console.error('Payment Error:', error?.message || error || 'An unexpected error occurred');
      
      toast({
        title: "An error occurred while processing your payment. Please try again later.",
        variant: "warning",
        className:"text-white bg-red-500",
      })
    }
  } else {
    
    toast({
      title: "Please select an address to proceed with checkout.",
      variant: "warning",
      className:"text-white bg-red-500",
      
    })
    return;
  }
  };
  
  console.log(orderData, "ayush")
console.log(addressList,"ayush")
  console.log(currentSelectedAddress, "selectedAddress");

  useEffect(() => {
      dispatch(fetchAllAddresses(user?.id));
      console.log("Fetched address list:", addressList);
    }, [dispatch]);


    
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        {/* <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} /> */}
        <div className="border-r-2 border-r-gray-200">
        <h2 className="text-4xl font-bold">Select Address</h2>
        <div className="mb-5 py-10  grid grid-cols-1 w-3/4 h-3/4   gap-2 lg:grid-cols-2 ">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                selectedId={currentSelectedAddress}
                key={singleAddressItem._id}
                addressInfo={singleAddressItem}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : 
          <div className="text-center flex flex-col justify-center font-semibold text-xl text-slate-800"><span>No addresses found.</span><span>Please add a new address.</span>
          <Link to={"/shop/account"}><button className="bg-black text-white hover:text-black hover:bg-white border-[1px] border-black rounded-[7px] mt-5 text-lg p-2 ">Add Address</button></Link>
           </div>
          }
          </div>
      </div>
         
         <div>
          <h2 className="text-4xl font-bold text-center mb-2">Your Cart</h2>
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <CartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold"> ₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full bg-black text-white rounded hover:bg-white hover:text-black border-[1px] border-black">
            <Button className="w-full" onClick={handlePayment}>Checkout</Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
