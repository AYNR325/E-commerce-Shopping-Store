import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { deleteCartItem,updateCartQuantity } from "@/store/shop/cart-slice";
function CartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
          variant: "success",
          className:"text-white bg-green-500",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
          variant:"distructive",
          className:"text-white bg-green-500",
        });
      }
    });
  }
  return (
    // <div className="flex items-center space-x-4">
    //   <img
    //     src={cartItem?.image}
    //     alt={cartItem?.title}
    //     className="w-20 h-20 rounded object-cover"
    //   />

    //   <div className="flex-1">
    //     <h3 className="font-extrabold">{cartItem?.title}</h3>
    //     <div className="flex items-center gap-2 mt-1">
    //       <Button
    //         variant="outline"
    //         className="h-6 w-6 rounded-[8px]"
    //         size="icon"
    //         disabled={cartItem?.quantity === 1}
    //         onClick={() => handleUpdateQuantity(cartItem, "minus")}
    //       >
    //         <Minus className="w-4 h-4" />
    //         <span className="sr-only">Decrease</span>
    //       </Button>
    //       <span className="font-semibold">{cartItem?.quantity}</span>
    //       <Button
    //         variant="outline"
    //         className="h-6 w-6 rounded-[8px] "
    //         size="icon"
    //         onClick={() => handleUpdateQuantity(cartItem, "plus")}
    //       >
    //         <Plus className="w-4 h-4" />
    //         <span className="sr-only">Increase</span>
    //       </Button>
    //     </div>
    //   </div>
    //   <div className="flex flex-col items-end">
    //     <p className="font-semibold">
    //       ₹ 
    //       {(
    //         (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
    //         cartItem?.quantity
    //       ).toFixed(2)}
    //     </p>
    //     <Trash
    //       onClick={() => handleCartItemDelete(cartItem)}
    //       className="cursor-pointer mt-1"
    //       size={20}
    //     />
    //   </div>
    // </div>
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-2 border-b">
  {/* Product Image */}
  <img
    src={cartItem?.image}
    alt={cartItem?.title}
    className="w-20 h-20 sm:w-24 sm:h-24 rounded object-cover"
  />

  {/* Details */}
  <div className="flex flex-col flex-1 text-center sm:text-left">
    <h3 className="font-extrabold text-sm sm:text-base">{cartItem?.title}</h3>
    
    {/* Quantity Controls */}
    <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
      <Button
        variant="outline"
        className="h-6 w-6 rounded-lg"
        size="icon"
        disabled={cartItem?.quantity === 1}
        onClick={() => handleUpdateQuantity(cartItem, "minus")}
      >
        <Minus className="w-4 h-4" />
      </Button>
      
      <span className="font-semibold text-sm">{cartItem?.quantity}</span>
      
      <Button
        variant="outline"
        className="h-6 w-6 rounded-lg"
        size="icon"
        onClick={() => handleUpdateQuantity(cartItem, "plus")}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  </div>

  {/* Price & Delete Button */}
  <div className="flex flex-col items-center sm:items-end">
    <p className="font-semibold text-sm sm:text-base">
      ₹{((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
    </p>

    <Trash
      onClick={() => handleCartItemDelete(cartItem)}
      className="cursor-pointer mt-2 sm:mt-1 text-red-500 hover:text-red-700"
      size={22}
    />
  </div>
</div>

  );
}

export default CartItemsContent;
