import React, { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import ShopProductTile from "@/components/shopping-view/ShopProductTile";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import { fetchProductDetails } from "@/store/shop/product-slice";
function SearchPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { toast } = useToast();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const {productDetails}=useSelector((state) => state.shoppingProducts);

  useEffect(() => {
    if (keyword && keyword.trim().length >= 3) {
      dispatch(getSearchResults(keyword));
    } else {
      dispatch(resetSearchResults());
    }
  }, [keyword]);

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
          className:"text-white bg-green-500",
        });
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      {!searchResults.length ? (
        <h1 className="text-xl font-extrabold">No result found!</h1>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShopProductTile
            handleAddToCart={handleAddToCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchPage;
