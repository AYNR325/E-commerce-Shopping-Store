import React, { useEffect } from "react";
import img from "../../assets/account.jpg";
import Address from "@/components/shopping-view/Address";
import { useDispatch, useSelector } from "react-redux";
import CartItemsContent from "@/components/shopping-view/CartItemsContent";
import AddressCard from "@/components/shopping-view/AddressCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { paymentGateway, getAllOrders, getOrderDetails } from "@/store/shop/order-slice";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";
import { fetchAllAddresses } from "@/store/shop/address-slice";
import { Link } from "react-router-dom";
import { clearCart } from "@/store/shop/cart-slice";
import ShoppingOrders from "@/components/shopping-view/ShoppingOrders";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { orderData, isLoading, error } = useSelector((state) => state.order);
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

  useEffect(() => {
    // Check if there's a payment session ID in the URL (returned by Stripe after successful payment)
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
      // If we have a session ID, it means payment was successful
      // Redirect to success page with the session ID
      window.location.href = `/shop/success?session_id=${sessionId}`;
    }
  }, []);
  

  const handlePayment = async () => {
    // Check if user is logged in
    if (!user || !user.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed with checkout.",
        variant: "destructive",
        className: "text-white bg-red-500",
      });
      // Optionally redirect to login page
      // window.location.href = '/login';
      return;
    }

    if(currentSelectedAddress !== undefined && currentSelectedAddress !== null) {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  
      if (!stripe) {
        console.error('Stripe failed to initialize');
        
        toast({
          title: "Stripe failed to initialize. Please try again later.",
          variant: "warning",
          className:"text-white bg-red-500",
        });
        return;
      }
  
      if (!cartItems?.items?.length) {
        toast({
          title: "Cart is empty. Please add items to the cart before proceeding.",
          variant: "warning",
          className:"text-white bg-red-500",
        });
        return;
      }
  
      toast({
        title: "Processing payment...",
        variant: "success",
        className:"text-white bg-green-500",
      });
  
      console.log('Selected address:', currentSelectedAddress);
      
      // Include the selected address in the payment request
      const paymentData = {
        cartItems,
        addressId: currentSelectedAddress // Pass the entire address object
      };
  
      console.log('Sending payment data:', paymentData);
      
      // Dispatch payment action to get session details
      const response = await dispatch(paymentGateway(paymentData)).unwrap();
      console.log('Payment session created:', response.data);
      
      if (!response?.data.id) {
        toast({
          title: "Unable to generate payment session. Please try again later.",
          variant: "warning",
          className:"text-white bg-red-500",
        });
        throw new Error('Invalid checkout session URL');
      }
  
      // Redirect to Stripe Checkout page using the session ID
      stripe.redirectToCheckout({sessionId: response.data.id});
      
    } catch (error) {
      console.error('Payment Error:', error);
      
      // Check for authentication error
      if (error.message?.includes('401') || error?.response?.status === 401 || 
          (error?.response?.data?.message && error.response.data.message.includes('Unauthorised'))) {
        toast({
          title: "Authentication Error",
          description: "Please log in again to continue with checkout.",
          variant: "destructive",
          className:"text-white bg-red-500",
        });
        // Optionally redirect to login page
        // window.location.href = '/login';
      } else {
        toast({
          title: "An error occurred while processing your payment.",
          description: error?.message || "Please try again later.",
          variant: "warning",
          className:"text-white bg-red-500",
        });
      }
    }
  } else {
    toast({
      title: "Please select an address to proceed with checkout.",
      variant: "warning",
      className:"text-white bg-red-500",
    });
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
    // <div className="flex flex-col bg-[#F0F0F0]">
    //   <div className="relative h-[300px] w-full overflow-hidden">
    //     <img src={img} className="h-full w-full object-cover object-center" />
    //   </div>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
    //     {/* <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} /> */}
    //     <div className="border-r-2 border-r-gray-200">
    //     <h2 className="text-4xl font-bold">Select Address</h2>
    //     <div className="mb-5 py-10  grid grid-cols-1 w-3/4 h-3/4   gap-2 lg:grid-cols-2 ">
    //     {addressList && addressList.length > 0
    //       ? addressList.map((singleAddressItem) => (
            
    //           <AddressCard
    //             selectedId={currentSelectedAddress}
    //             key={singleAddressItem._id}
    //             addressInfo={singleAddressItem}
    //             setCurrentSelectedAddress={setCurrentSelectedAddress}
    //           />
              
    //         ))
    //       : 
    //       <div className="text-center flex flex-col justify-center font-semibold text-xl text-slate-800"><span>No addresses found.</span><span>Please add a new address.</span>
    //       <Link to={"/shop/account"}><button className="bg-black text-white hover:text-black hover:bg-white border-[1px] border-black rounded-[7px] mt-5 text-lg p-2 ">Add Address</button></Link>
    //        </div>
    //       }
    //       </div>
    //   </div>
         
    //      <div>
    //       <h2 className="text-4xl font-bold text-center mb-2">Your Cart</h2>
    //     <div className="flex flex-col gap-4">
    //       {cartItems && cartItems.items && cartItems.items.length > 0
    //         ? cartItems.items.map((item) => (
    //             <CartItemsContent cartItem={item} />
    //           ))
    //         : null}
    //       <div className="mt-8 space-y-4">
    //         <div className="flex justify-between">
    //           <span className="font-bold">Total</span>
    //           <span className="font-bold"> ₹{totalCartAmount}</span>
    //         </div>
    //       </div>
    //       <div className="mt-4 w-full bg-[#A67A4B] text-white  hover:bg-[#af865a] ">
    //         <Button className="w-full" onClick={handlePayment}>Checkout</Button>
    //       </div>
    //     </div>
    //     </div>
    //   </div>
    // </div>

//     <div className="flex flex-col bg-[#F0F0F0]">
//   {/* Image Section */}
//   <div className="relative h-[300px] w-full overflow-hidden">
//     <img src={img} className="h-full w-full object-cover object-center" />
//   </div>

//   {/* Main Grid Layout */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
//     {/* Address Section */}
//     <div className="border-r-2 border-r-gray-200">
//       <h2 className="text-3xl sm:text-4xl font-bold">Select Address</h2>
//       <div
//         className={`py-10 grid w-3/4 gap-2 lg:grid-cols-2 overflow-auto ${
//           cartItems?.items?.length > 3 ? "max-h-[450px]" : "h-auto"
//         }`}
//       >
//         {addressList && addressList.length > 0 ? (
//           addressList.map((singleAddressItem) => (
//             <AddressCard
//               selectedId={currentSelectedAddress}
//               key={singleAddressItem._id}
//               addressInfo={singleAddressItem}
//               setCurrentSelectedAddress={setCurrentSelectedAddress}
//               className="min-h-[120px]" // Ensures proper height adjustment
//             />
//           ))
//         ) : (
//           <div className="text-center flex flex-col justify-center font-semibold text-xl text-slate-800">
//             <span>No addresses found.</span>
//             <span>Please add a new address.</span>
//             <Link to={"/shop/account"}>
//               <button className="bg-black text-white hover:text-black hover:bg-white border-[1px] border-black rounded-[7px] mt-5 text-lg p-2">
//                 Add Address
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>

//     {/* Cart Section */}
//     <div>
//       <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">Your Cart</h2>
//       <div className="flex flex-col gap-4">
//         {cartItems && cartItems.items && cartItems.items.length > 0 ? (
//           <div className={`overflow-auto ${cartItems.items.length > 3 ? "max-h-[450px]" : "h-auto"}`}>
//             {cartItems.items.map((item) => (
//               <CartItemsContent cartItem={item} key={item.id} />
//             ))}
//           </div>
//         ) : null}
//         <div className="mt-8 space-y-4">
//           <div className="flex justify-between">
//             <span className="font-bold">Total</span>
//             <span className="font-bold">₹{totalCartAmount}</span>
//           </div>
//         </div>
//         <div className="mt-4 w-full bg-[#A67A4B] text-white hover:bg-[#af865a]">
//           <Button className="w-full" onClick={handlePayment}>
//             Checkout
//           </Button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

// <div className="flex flex-col bg-[#F0F0F0] min-h-screen">
// {/* Image Section */}
// <div className="relative w-full h-52 sm:h-72 md:h-96 overflow-hidden">
//   <img src={img} alt="Banner" className="h-full w-full object-cover object-center" />
// </div>

// {/* Main Content */}
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-8 max-w-7xl mx-auto">
  
//   {/* Address Section */}
//   <div className="flex flex-col">
//     <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Select Address</h2>
//     <div className={`grid gap-4 sm:grid-cols-2 ${
//         cartItems?.items?.length > 3 ? "max-h-[400px]" : "h-auto"
//       } overflow-auto p-2 rounded-lg bg-white shadow-sm`}>
//       {addressList && addressList.length > 0 ? (
//         addressList.map((singleAddressItem) => (
//           <AddressCard
//             selectedId={currentSelectedAddress}
//             key={singleAddressItem._id}
//             addressInfo={singleAddressItem}
//             setCurrentSelectedAddress={setCurrentSelectedAddress}
//             className="min-h-[120px]"
//           />
//         ))
//       ) : (
//         <div className="flex flex-col justify-center items-center text-center font-semibold text-lg text-slate-700 py-10">
//           <p>No addresses found.</p>
//           <p>Please add a new address.</p>
//           <Link to="/shop/account">
//             <button className="bg-black text-white hover:bg-white hover:text-black border border-black rounded-md mt-4 px-4 py-2 transition-colors">
//               Add Address
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   </div>

//   {/* Cart Section */}
//   <div className="flex flex-col">
//     <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">Your Cart</h2>
//     <div className="flex flex-col gap-4 bg-white rounded-lg shadow-sm p-4">
//       {cartItems && cartItems.items && cartItems.items.length > 0 ? (
//         <div className={`overflow-auto ${
//             cartItems.items.length > 3 ? "max-h-[400px]" : "h-auto"
//           }`}>
//           {cartItems.items.map((item) => (
//             <CartItemsContent cartItem={item} key={item.id} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-slate-500">Your cart is empty.</p>
//       )}

//       <div className="mt-6 border-t pt-4 space-y-2">
//         <div className="flex justify-between text-lg font-semibold">
//           <span>Total</span>
//           <span>₹{totalCartAmount}</span>
//         </div>
//       </div>

//       <Button 
//         className="mt-4 w-full bg-[#A67A4B] text-white hover:bg-[#af865a] transition-colors"
//         onClick={handlePayment}
//       >
//         Checkout
//       </Button>
//     </div>
//   </div>
// </div>
// </div>


// <div className="flex flex-col bg-[#F0F0F0] min-h-screen">
//   {/* Image Section */}
//   <div className="relative w-full h-52 sm:h-72 md:h-96 overflow-hidden">
//     <img src={img} alt="Banner" className="h-full w-full object-cover object-center" />
//   </div>

//   {/* Main Content */}
//   <div className="w-full flex flex-col lg:flex-row gap-8 px-4 py-8">

//     {/* Address Section */}
//     <div className="flex-1 flex flex-col bg-white shadow-lg rounded-2xl p-6">
//       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 text-[#333] border-b pb-2 text-center">
//         Select Address
//       </h2>
//       <div className={`grid gap-4 sm:grid-cols-2 ${
//           cartItems?.items?.length > 3 ? "max-h-[400px]" : "h-auto"
//         } overflow-auto`}>
//         {addressList && addressList.length > 0 ? (
//           addressList.map((singleAddressItem) => (
//             <AddressCard
//               selectedId={currentSelectedAddress}
//               key={singleAddressItem._id}
//               addressInfo={singleAddressItem}
//               setCurrentSelectedAddress={setCurrentSelectedAddress}
//               className="min-h-[120px] border rounded-lg p-4 shadow-sm hover:shadow-md transition"
//             />
//           ))
//         ) : (
//           <div className="flex flex-col justify-center items-center text-center font-semibold text-lg text-slate-700 py-10">
//             <p>No addresses found.</p>
//             <p>Please add a new address.</p>
//             <Link to="/shop/account">
//               <button className="bg-black text-white hover:bg-white hover:text-black border border-black rounded-md mt-4 px-4 py-2 transition-colors">
//                 Add Address
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>

//     {/* Cart Section */}
//     <div className="flex-1 flex flex-col bg-white shadow-lg rounded-2xl p-6">
//       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 text-[#333] border-b pb-2 text-center">
//         Your Cart
//       </h2>
//       <div className="flex flex-col gap-4">
//         {cartItems && cartItems.items && cartItems.items.length > 0 ? (
//           <div className={`overflow-auto ${
//               cartItems.items.length > 3 ? "max-h-[400px]" : "h-auto"
//             }`}>
//             {cartItems.items.map((item) => (
//               <div 
//                 key={item.id}
//                 className="flex items-center justify-between rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition"
//               >
//                 <CartItemsContent cartItem={item} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-slate-500">Your cart is empty.</p>
//         )}

//         <div className="mt-6 border-t pt-4 space-y-2">
//           <div className="flex justify-between text-lg font-semibold">
//             <span>Total</span>
//             <span>₹{totalCartAmount}</span>
//           </div>
//         </div>

//         <Button 
//           className="mt-4 w-full bg-[#A67A4B] text-white hover:bg-[#af865a] transition-colors"
//           onClick={handlePayment}
//         >
//           Checkout
//         </Button>
//       </div>
//     </div>
//   </div>
// </div>

<div className="flex flex-col bg-[#F0F0F0] min-h-screen">
  {/* Image Section */}
  <div className="relative w-full h-52 sm:h-72 md:h-96 overflow-hidden">
    <img src={img} alt="Banner" className="h-full w-full object-cover object-center" />
  </div>

  {/* Main Content */}
  <div className="w-full flex flex-col lg:flex-row gap-8 px-4 py-8 max-w-7xl mx-auto  ">
    
    {/* Address Section */}
    <div className="flex-1 flex flex-col bg-white shadow-lg rounded-2xl p-6 max-h-[600px]">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 text-[#333] border-b pb-2 text-center">
        Select Address
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 overflow-auto pr-2">
        {addressList && addressList.length > 0 ? (
          addressList.map((singleAddressItem) => (
            <div 
              key={singleAddressItem._id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <AddressCard
                selectedId={currentSelectedAddress}
                addressInfo={singleAddressItem}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                className="min-h-[120px]"
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center text-center font-semibold text-lg text-slate-700 py-10">
            <p>No addresses found.</p>
            <p>Please add a new address.</p>
            <Link to="/shop/account">
              <button className="bg-[#A67A4B] text-white hover:bg-[#af865a]  rounded-md mt-4 px-4 py-2 transition-colors">
                Add Address
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>

    {/* Cart Section */}
    <div className="flex-1 flex flex-col bg-white shadow-lg rounded-2xl p-6 max-h-[600px]">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 text-[#333] border-b pb-2 text-center">
        Your Cart
      </h2>
      <div className="flex flex-col gap-2 overflow-auto pr-2">
        {cartItems && cartItems.items && cartItems.items.length > 0 ? (
          cartItems.items.map((item) => (
            <div 
              key={item.id}
              className=" rounded-lg p-2 "
            >
              <CartItemsContent cartItem={item} />
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500">Your cart is empty.</p>
        )}
<div className="sticky bottom-0 bg-white">
        <div className="mt-6 border-t pt-2 space-y-2">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{totalCartAmount}</span>
          </div>
        </div>

        <Button 
          className="mt-4 w-full bg-[#A67A4B] text-white hover:bg-[#af865a] transition-colors"
          onClick={handlePayment}
        >
          Checkout
        </Button>
        </div>
      </div>
    </div>
  </div>
</div>



  );
}

export default ShoppingCheckout;
