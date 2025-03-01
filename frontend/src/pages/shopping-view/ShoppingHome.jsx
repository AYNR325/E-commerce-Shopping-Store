import React from "react";

import nikeLogo from "../../assets/brand_logo/nike_logo.svg";
import adidasLogo from "../../assets/brand_logo/adidas_logo.svg";
import pumaLogo from "../../assets/brand_logo/puma_logo.svg";
import leviLogo from "../../assets/brand_logo/levi's_logo.svg";
import zaraLogo from "../../assets/brand_logo/zara_logo.svg";
import hmLogo from "../../assets/brand_logo/H&M_logo.svg";
import menImg from "../../assets/category/men.png";
import womenImg from "../../assets/category/women.png";
import kidsImg from "../../assets/category/kids.png";
import accessoriesImg from "../../assets/category/accessories.png";
import footwearImg from "../../assets/category/footwear.jpg";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import ShopProductTile from "@/components/shopping-view/ShopProductTile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetails from "@/components/shopping-view/ProductDetails";
import { useNavigate } from "react-router-dom";
import { getFeatureImages } from "@/store/common";

const categoriesWithIcon = [
  { id: "men", label: "Men", imageUrl: menImg, alt: "Men's Fashion Category" },
  {
    id: "women",
    label: "Women",
    imageUrl: womenImg,
    alt: "Women's Fashion Category",
  },
  {
    id: "kids",
    label: "Kids",
    imageUrl: kidsImg,
    alt: "Kids Fashion Category",
  },
  {
    id: "accessories",
    label: "Accessories",
    imageUrl: accessoriesImg,
    alt: "Accessories Category",
  },
  {
    id: "footwear",
    label: "Footwear",
    imageUrl: footwearImg,
    alt: "Footwear Category",
  },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", imageUrl: nikeLogo, alt: "Nike Logo" },
  { id: "adidas", label: "Adidas", imageUrl: adidasLogo, alt: "Adidas Logo" },
  { id: "puma", label: "Puma", imageUrl: pumaLogo, alt: "Puma Logo" },
  { id: "levi", label: "Levi's", imageUrl: leviLogo, alt: "Levi's Logo" },
  { id: "zara", label: "Zara", imageUrl: zaraLogo, alt: "Zara Logo" },
  { id: "h&m", label: "H&M", imageUrl: hmLogo, alt: "H&M Logo" },
];

function ShoppingHome() {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const navigate = useNavigate();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // console.log(productList, "product");

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
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
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  // console.log(featureImageList, "featureImageList");
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                key={index}
                src={slide.image}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {/* <categoryItem.icon className="w-12 h-12 mb-4 text-primary" /> */}
                  <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                    <img
                      src={categoryItem.imageUrl}
                      alt={categoryItem.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {/* <brandItem.icon className="w-12 h-12 mb-4 text-primary" /> */}
                  <div className="w-20 h-20 mb-4">
                    <img
                      src={brandItem.imageUrl}
                      alt={brandItem.alt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShopProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section> */}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {productList && productList.length > 0 ? (
              ["men", "women", "kids", "accessories", "footwear"].map(
                (category) => {
                  const product = productList.find(
                    (item) => item.category === category
                  );
                  return (
                    product && (
                      <ShopProductTile
                        key={product.id}
                        handleGetProductDetails={handleGetProductDetails}
                        product={product}
                        handleAddToCart={handleAddToCart}
                      />
                    )
                  );
                }
              )
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </section>

      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
