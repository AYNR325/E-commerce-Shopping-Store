import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useDispatch,useSelector } from "react-redux";
import { addToCart,fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/product-slice";
function ProductDetails({ open, setOpen, productDetails }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  function handleAddToCart(getCurrentProductId) {
    console.log(getCurrentProductId);
    // Add product to cart
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: data?.payload?.message,
          description: "Product added to cart successfully!",
          appearance: "success",
          duration: 2000,
          className:"bg-white"
        });
      }
    });
  }

  const handleDialogClose=()=>{
    setOpen(false);
    dispatch(setProductDetails());
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-gray-200">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-contain"
          />
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full bg-black text-white hover:text-black hover:bg-white hover:border-[1px] border-black hover:rounded-xl"
                onClick={() => handleAddToCart(productDetails?._id)}
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetails;
