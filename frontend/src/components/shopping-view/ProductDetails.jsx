import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/product-slice";
import StarRating from "../common/StarRating";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { addProductReview, getAllReviews } from "@/store/shop/review-slice";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
function ProductDetails({ open, setOpen, productDetails }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { reviews } = useSelector((state) => state.review);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddReview() {
    dispatch(
      addProductReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setReviewMsg("");
        setRating(0);
        dispatch(getAllReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
          variant: "success",
          className: "bg-green-500 text-white",
        });
      } else{
        toast({
          title: "Error adding review",
          description: "Either you have already reviewed this product or you haven't brought this product yet. Please check your purchase history and try again.",
          variant: "error",
          className: "bg-red-500 text-white",
        });
      }
      console.log(data);
    });
  }

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getAllReviews(productDetails?._id));
    }
  }, [productDetails]);

  console.log(reviews);

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
          className: "bg-green-500 text-white",
        });
      }
    });
  }

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    // <Dialog open={open} onOpenChange={handleDialogClose}>
    //   <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-[#F0F0F0]">
    //     <div className="relative overflow-hidden rounded-lg">
    //       <img
    //         src={productDetails?.image}
    //         alt={productDetails?.title}
    //         width={600}
    //         height={600}
    //         className="aspect-square w-full object-contain"
    //       />
    //     </div>
    //     <div>
    //       <div>
    //         <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
    //         <p className="text-muted-foreground text-2xl mb-5 mt-4">
    //           {productDetails?.description}
    //         </p>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <p
    //           className={`text-3xl font-bold text-primary ${
    //             productDetails?.salePrice > 0 ? "line-through" : ""
    //           }`}
    //         >
    //           ${productDetails?.price}
    //         </p>
    //         {productDetails?.salePrice > 0 ? (
    //           <p className="text-2xl font-bold text-muted-foreground">
    //             ${productDetails?.salePrice}
    //           </p>
    //         ) : null}
    //       </div>
    //       <div className="flex items-center gap-2 mt-2">
    //         <div className="flex items-center gap-0.5">
    //           <StarRating rating={averageReview} />
    //         </div>
    //         <span className="text-muted-foreground">
    //           ({averageReview.toFixed(2)})
    //         </span>
    //       </div>
    //       <div className="mt-5 mb-5">
    //         {productDetails?.totalStock === 0 ? (
    //           <Button className="w-full opacity-60 cursor-not-allowed">
    //             Out of Stock
    //           </Button>
    //         ) : (
    //           <Button
    //             className="w-full bg-black text-white hover:text-black hover:bg-white hover:border-[1px] border-black hover:rounded-xl"
    //             onClick={() => handleAddToCart(productDetails?._id)}
    //           >
    //             Add to Cart
    //           </Button>
    //         )}
    //       </div>
    //       <Separator />
    //       <div className="max-h-[300px] overflow-auto">
    //         <h2 className="text-xl font-bold mb-4">Reviews</h2>
    //         <div className="grid gap-6">
    //           {reviews && reviews.length > 0 ? (
    //             reviews.map((reviewItem) => (
    //               <div className="flex gap-4 ">
    //                 <Avatar className="w-10 h-10 border  bg-gray-300 p-4 pt-2 pr-3 rounded-full  ">
    //                   <AvatarFallback>
    //                     {reviewItem?.userName[0].toUpperCase()}
    //                   </AvatarFallback>
    //                 </Avatar>
    //                 <div className="grid gap-1">
    //                   <div className="flex items-center gap-2">
    //                     <h3 className="font-bold">{reviewItem?.userName}</h3>
    //                   </div>
    //                   <div className="flex items-center gap-0.5">
    //                     <StarRating rating={reviewItem?.reviewValue} />
    //                   </div>
    //                   <p className="text-muted-foreground">
    //                     {reviewItem.reviewMessage}
    //                   </p>
    //                 </div>
    //               </div>
    //             ))
    //           ) : (
    //             <h1>No Reviews</h1>
    //           )}
    //         </div>

    //         <div className="mt-10 flex-col flex gap-2">
    //           <Label>Write a review</Label>
    //           <div className="flex gap-1">
    //             <StarRating rating={rating} handleRatingChange={handleRatingChange} />
    //           </div>
    //           <Input name="reviewMsg" value={reviewMsg} onChange={(e)=>setReviewMsg(e.target.value)} placeholder="Write a review..." />
    //           <Button disabled={reviewMsg.trim()===""} className="bg-black text-white hover:text-black hover:bg-white hover:border-[1px] border-black hover:rounded-xl" onClick={handleAddReview} >Submit</Button>
    //         </div>
    //       </div>
    //     </div>
    //   </DialogContent>
    // </Dialog>

    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-10 p-6 max-w-[95vw] sm:max-w-[90vw] lg:max-w-[75vw] bg-[#F0F0F0] 
      max-h-[90vh] overflow-y-auto"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full h-auto object-contain"
          />
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col overflow-y-auto">
          {/* Title & Description */}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">
              {productDetails?.title}
            </h1>
            <p className="text-muted-foreground text-lg md:text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>

          {/* Price & Sale Price */}
          <div className="flex items-center justify-between">
            <p
              className={`text-2xl md:text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-xl md:text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRating rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>

          {/* Add To Cart Button */}
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full bg-[#A67A4B] text-white  hover:bg-[#af865a] "
                onClick={() => handleAddToCart(productDetails?._id)}
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />

          {/* Reviews Section */}
          <div className="max-h-[250px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={reviewItem.id} className="flex gap-4">
                    {/* <Avatar className="w-10 h-10 border bg-gray-300 p-4 pt-2 pr-3 rounded-full">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar> */}
                    <Avatar className="w-10 h-10 border bg-gray-300 flex items-center justify-center rounded-full">
  <AvatarFallback className="text-lg font-bold text-slate-700">
    {reviewItem?.userName[0].toUpperCase()}
  </AvatarFallback>
</Avatar>

                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRating rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
          </div>

          {/* Add Review Section */}

          <div className="mt-10 flex-col flex gap-2">
            <Label>Write a review</Label>
            <div className="flex gap-1">
              <StarRating
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
            </div>
            <Input
              name="reviewMsg"
              value={reviewMsg}
              onChange={(e) => setReviewMsg(e.target.value)}
              placeholder="Write a review..."
            />
            <Button
              disabled={reviewMsg.trim() === ""}
              className="bg-black text-white hover:text-white hover:bg-gray-800  "
              onClick={handleAddReview}
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetails;
