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
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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
    }, 5000);

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
          className:"text-white bg-green-500",
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
      {/* banner section */}
      <div className="relative w-full min-h-[250px] sm:min-h-[300px] md:h-[400px] lg:h-[600px] xl:h-[600px] overflow-hidden">
        {/* Banner Images */}
        {featureImageList?.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            className={`absolute top-0 left-0 w-full h-full  transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Left Navigation Button */}
        {/* <Button
    variant="outline"
    size="icon"
    onClick={() => setCurrentSlide((prev) => (prev - 1 + featureImageList.length) % featureImageList.length)}
    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 rounded-full shadow-lg 
               sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center"
  >
    <ChevronLeftIcon className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
  </Button> */}

        {/* Right Navigation Button */}
        {/* <Button
    variant="outline"
    size="icon"
    onClick={() => setCurrentSlide((prev) => (prev + 1) % featureImageList.length)}
    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 rounded-full shadow-lg 
               sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center"
  >
    <ChevronRightIcon className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
  </Button> */}

        {/* Dot Navigation for Mobile */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {featureImageList.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "bg-black" : "bg-gray-400"
              }`}
              onClick={() => setCurrentSlide(idx)}
            ></span>
          ))}
        </div>
      </div>
      {/* shop by category section */}
      <section className="py-14 bg-[#F0F0F0] ">
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl font-bold text-center mb-10">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow mb-16"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 bg-white">
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

      {/* shop by brand section */}
      <section className="py-8 bg-[#F0F0F0] ">
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl font-bold text-center mb-10">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow mb-20"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 bg-white">
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

      {/* featured product section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 ">
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
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => navigate("/shop/listing")}
              className="items-center justify-center rounded-full px-4 w-fit text-[#A67A4B] py-3 bg-white border-[1px] border-[#A67A4B] cursor-pointer hover:bg-[#A67A4B] hover:text-white"
            >
              Shop All
            </Button>
          </div>
        </div>
      </section>

      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />

      {/* footer */}

      <footer className="bg-[#F0F0F0] text-slate-800 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 - About Us */}
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-600">
                We bring you the latest fashion trends with premium quality and
                affordability. Discover top brands, stylish apparel, and
                accessories that define your personality.
              </p>
            </div>

            {/* Column 2 - Quick Links & Social Media */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/shop/listing"
                    className="text-gray-600 hover:text-[#A67A4B] transition"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#A67A4B] transition"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#A67A4B] transition"
                  >
                    Brands
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#A67A4B] transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>

              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#A67A4B] transition"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#A67A4B] transition"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#A67A4B] transition"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#A67A4B] transition"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 3 - Newsletter */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-600">
                Subscribe to receive the latest updates and offers.
              </p>
              <form className="mt-4">
                <input
                  type="email"
                  placeholder="Email Address *"
                  className="w-full p-2 border border-gray-400 rounded-md mb-3"
                  required
                />
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    id="subscribe"
                    className="mr-2"
                    required
                  />
                  <label htmlFor="subscribe" className="text-gray-600">
                    Yes, subscribe me to your newsletter.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#A67A4B] text-white p-2 rounded-md hover:bg-[#ae8355] transition"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ShoppingHome;

// function ShoppingHome() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const dispatch = useDispatch();
//   const { productList, productDetails } = useSelector((state) => state.shoppingProducts);
//   const { user } = useSelector((state) => state.auth);
//   const { toast } = useToast();
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const navigate = useNavigate();
//   const { featureImageList } = useSelector((state) => state.commonFeature);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [featureImageList]);

//   useEffect(() => {
//     dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   useEffect(() => {
//     if (productDetails) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   function handleGetProductDetails(productId) {
//     dispatch(fetchProductDetails(productId));
//   }

//   function handleAddToCart(productId) {
//     dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({ title: "Product added to cart" });
//       }
//     });
//   }

//   function handleNavigateToListingPage(item, section) {
//     sessionStorage.setItem("filters", JSON.stringify({ [section]: [item.id] }));
//     navigate("/shop/listing");
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Banner Section */}
//       <div className="relative w-full h-[600px] md:h-[400px] sm:h-[250px] overflow-hidden">
//         {featureImageList?.map((slide, index) => (
//           <img
//             key={index}
//             src={slide.image}
//             className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
//               index === currentSlide ? "opacity-100" : "opacity-0"
//             }`}
//           />
//         ))}
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setCurrentSlide((prev) => (prev - 1 + featureImageList.length) % featureImageList.length)}
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
//         >
//           <ChevronLeftIcon className="w-6 h-6" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setCurrentSlide((prev) => (prev + 1) % featureImageList.length)}
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
//         >
//           <ChevronRightIcon className="w-6 h-6" />
//         </Button>
//       </div>

//       {/* Categories Section */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {categoriesWithIcon.map((category) => (
//               <Card key={category.id} onClick={() => handleNavigateToListingPage(category, "category")} className="cursor-pointer">
//                 <CardContent className="flex flex-col items-center p-6">
//                   <img src={category.imageUrl} alt={category.alt} className="w-24 h-24 object-cover" />
//                   <span className="font-bold">{category.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//             {productList?.map((product) => (
//               <ShopProductTile key={product.id} product={product} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} />
//             ))}
//           </div>
//         </div>
//       </section>

//       <ProductDetails open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
//     </div>
//   );
// }

// export default ShoppingHome;
