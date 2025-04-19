// import React  from "react";
// import { useEffect,useState } from "react";
// import ProductFilter from "@/components/shopping-view/ProductFilter";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ArrowUpDownIcon } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllFilteredProducts, fetchProductDetails} from "@/store/shop/product-slice";
// import ShopProductTile from "@/components/shopping-view/ShopProductTile";
// import { useSearchParams } from "react-router-dom";
// import ProductDetails from "@/components/shopping-view/ProductDetails";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/hooks/use-toast";

// function createSearchParamsHelper(filterParams) {
//   const queryParams = [];

//   for (const [key, value] of Object.entries(filterParams)) {
//     if (Array.isArray(value) && value.length > 0) {
//       const paramValue = value.join(",");

//       queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
//     }
//   }

//   console.log(queryParams, "queryParams",filterParams);

//   return queryParams.join("&");
// }
// function ShoppingListing() {

//   const sortOptions = [
//     { id: "price-lowtohigh", label: "Price: Low to High" },
//     { id: "price-hightolow", label: "Price: High to Low" },
//     { id: "title-atoz", label: "Title: A to Z" },
//     { id: "title-ztoa", label: "Title: Z to A" },
//   ];
//   const dispatch=useDispatch();
//   const {productList,productDetails}=useSelector((state)=>state.shoppingProducts)
//   const {user}=useSelector(state=>state.auth)
  
//   const [sort, setSort] = useState(null)
//   const [filters, setFilters] = useState({})
//   const [searchParams, setSearchParams] =useSearchParams()
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
//   const { toast } = useToast();

//   const handleSort=(value)=>{
//     console.log(value,"value")
//     setSort(value)
//   }
  
//   function handleFilter(getSectionId,getCurrentOption){
//     console.log(getSectionId,getCurrentOption)

//     let copyFilters={...filters}
//     const indexOfCurrentSection=Object.keys(copyFilters).indexOf(getSectionId)
//     if(indexOfCurrentSection===-1){
//       copyFilters={
//         ...copyFilters,
//         [getSectionId]: [getCurrentOption],
//       }
//     } else {
//       const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption)
//       if(indexOfCurrentOption===-1){
//         copyFilters[getSectionId].push(getCurrentOption)
//       } else {
//         copyFilters[getSectionId].splice(indexOfCurrentOption, 1)
//       }
//     }
//     setFilters(copyFilters)
//     console.log(filters,"copyFilters");
//     sessionStorage.setItem('filters',JSON.stringify(copyFilters))
//   }

//   function handleGetProductDetails(getCurrentProductId){
//     // Navigate to product detail page
//     console.log(getCurrentProductId)
//     dispatch(fetchProductDetails(getCurrentProductId))
//   }

//   function handleAddToCart(getCurrentProductId){
//     console.log(getCurrentProductId);
//     // Add product to cart
//     dispatch(addToCart( {userId:user?.id, productId:getCurrentProductId, quantity:1})).then((data)=>{
//       if(data?.payload?.success){
//         dispatch(fetchCartItems(user?.id));
//         toast({
//           title: data?.payload?.message,
//           description: "Product added to cart successfully!",
//           appearance: "success",
//           duration: 2000,
//           className:"bg-white"
//         });
//       }
//     });
//   }

//   // useEffect(() => {
//   //   // Set initial filters from search params
//   //   const initialFilters = {};
//   //   searchParams.forEach((value, key) => {
//   //     initialFilters[key] = value.split(",");
//   //   });
//   //   setFilters(initialFilters);
//   // }, []);
//   useEffect(() => {
//     const category = searchParams.get("category");
//     if (category) {
//       setFilters({ category: [category] });
//     } else {
//       setFilters({});
//     }
//   }, [searchParams]); // Watch for changes in searchParams

//   // useEffect(() => {
//   //   if (Object.keys(filters).length > 0) {
//   //     dispatch(fetchAllFilteredProducts({ filterParams: filters }));
//   //   }
//   // }, [filters, dispatch]);

//   useEffect(() => {
//     setSort("price-lowtohigh");
//     setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
//   }, [])
  
//   useEffect(() => {
//     if (filters !== null && sort !== null)
//       dispatch(
//         fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
//       );
//   }, [dispatch, sort, filters]);

//   // Update searchParams based on filters
//   useEffect(() => {
//     if(filters && Object.keys(filters).length>0){
//       const createQueryString= createSearchParamsHelper(filters)
//       setSearchParams(new URLSearchParams(createQueryString))
//       dispatch(fetchAllFilteredProducts({ filterParams: filters }));
//     }
//   }, [filters,dispatch])
  
//   useEffect(()=>{
//     if(productDetails !== null){
//       setOpenDetailsDialog(true)
//     }
//   },[productDetails])

//   // console.log(productList,"products",searchParams)
//   // console.log(productDetails,"productDetails")
  
  
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
//       <ProductFilter filters={filters} handleFilter={handleFilter}/>
//       <div className="bg-background w-full rounded-lg shadow-sm">
//         <div className="p-4 border-b flex items-center justify-between">
//           <h2 className="text-lg font-extrabold">All Products</h2>
//           <div className="flex items-center gap-3">
//             <span className="text-muted-foreground">{productList.length} Products</span>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="flex items-center gap-1"
//                 >
//                   <ArrowUpDownIcon className="h-4 w-4" />
//                   <span>Sort by</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-[200px] bg-white">
//                 <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
//                   {sortOptions.map((sortItem) => (
//                     <DropdownMenuRadioItem
//                       value={sortItem.id}
//                       key={sortItem.id}
//                     >
//                       {sortItem.label}
//                     </DropdownMenuRadioItem>
//                   ))}
//                 </DropdownMenuRadioGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//           {/* Product cards go here */}
//           {productList && productList.length > 0
//             ? productList.map((productItem) => (
//                 <ShopProductTile
//                   handleGetProductDetails={handleGetProductDetails}
//                   product={productItem}
//                   handleAddToCart={handleAddToCart}
//                 />
//               ))
//             : null}
//         </div>
//       </div>
//       <ProductDetails open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
//     </div>
//   );
// }

// export default ShoppingListing



import React from "react";
import { useEffect, useState } from "react";
import ProductFilter from "@/components/shopping-view/ProductFilter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/product-slice";
import ShopProductTile from "@/components/shopping-view/ShopProductTile";
import { useSearchParams } from "react-router-dom";
import ProductDetails from "@/components/shopping-view/ProductDetails";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function parseSearchParams(searchParams) {
  const filters = {};
  searchParams.forEach((value, key) => {
    if (value) {
      filters[key] = value.split(",");
    }
  });
  return filters;
}

function createSearchParamsString(filterParams) {
  const queryParams = new URLSearchParams();

  Object.entries(filterParams).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      queryParams.set(key, value.join(","));
    }
  });

  return queryParams.toString();
}

function ShoppingListing() {
  const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];

  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shoppingProducts);
  const { user } = useSelector(state => state.auth);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState(() => {
    const savedFilters = sessionStorage.getItem('filters');
    if (savedFilters) {
      return JSON.parse(savedFilters);
    }
    return parseSearchParams(searchParams);
  });
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();

  const handleSort = (value) => {
    setSort(value);
  };
  
  function handleFilter(sectionId, option) {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      
      if (!newFilters[sectionId]) {
        newFilters[sectionId] = [option];
      } else {
        const optionIndex = newFilters[sectionId].indexOf(option);
        if (optionIndex === -1) {
          newFilters[sectionId] = [...newFilters[sectionId], option];
        } else {
          newFilters[sectionId] = newFilters[sectionId].filter(item => item !== option);
          if (newFilters[sectionId].length === 0) {
            delete newFilters[sectionId];
          }
        }
      }
      
      sessionStorage.setItem('filters', JSON.stringify(newFilters));
      return newFilters;
    });
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  function handleAddToCart(productId) {
    dispatch(addToCart({
      userId: user?.id,
      productId: productId,
      quantity: 1
    })).then((data) => {
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

  // Handle URL params changes
  useEffect(() => {
    const category = searchParams.get("category");
    if (category && !filters.category) {
      setFilters(prev => ({
        ...prev,
        category: [category]
      }));
    }
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      const queryString = createSearchParamsString(filters);
      setSearchParams(queryString, { replace: true });
    } else {
      setSearchParams({});
    }
  }, [filters]);

  // Fetch products when filters or sort changes
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({
      filterParams: filters,
      sortParams: sort
    }));
  }, [dispatch, filters, sort]);

  // Handle product details modal
  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    // <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 bg-white">
    //   <ProductFilter filters={filters} handleFilter={handleFilter} />
    //   <div className="bg-background w-full rounded-lg shadow-sm">
    //     <div className="p-4 flex items-center justify-between ">
    //       <h2 className="text-xl font-bold ml-10">All Products</h2>
    //       <div className="flex items-center gap-3">
    //         <span className="text-muted-foreground">{productList.length} Products</span>
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Button
    //               variant="outline"
    //               size="sm"
    //               className="flex items-center gap-1 bg-black text-white hover:bg-white hover:text-black border-black border-[1px] "
    //             >
    //               <ArrowUpDownIcon className="h-4 w-4" />
    //               <span>Sort by</span>
    //             </Button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="end" className="w-[200px] bg-white">
    //             <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
    //               {sortOptions.map((sortItem) => (
    //                 <DropdownMenuRadioItem
    //                   value={sortItem.id}
    //                   key={sortItem.id}
    //                 >
    //                   {sortItem.label}
    //                 </DropdownMenuRadioItem>
    //               ))}
    //             </DropdownMenuRadioGroup>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    //       {productList?.map((productItem) => (
    //         <ShopProductTile
    //           key={productItem.id}
    //           handleGetProductDetails={handleGetProductDetails}
    //           product={productItem}
    //           handleAddToCart={handleAddToCart}
    //         />
    //       ))}
    //     </div>
    //   </div>
    //   <ProductDetails 
    //     open={openDetailsDialog} 
    //     setOpen={setOpenDetailsDialog} 
    //     productDetails={productDetails}
    //   />
    // </div>

    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]  p-4 md:p-6 bg-white">
  <ProductFilter filters={filters} handleFilter={handleFilter} />
  <div className="bg-background w-full rounded-lg shadow-sm">
    <div className="p-4 flex flex-wrap items-center justify-between gap-4">
      <h2 className="text-xl font-bold ml-4 md:ml-10">All Products</h2>
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground">{productList.length} Products</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 bg-black text-white hover:bg-white hover:text-[#A67A4B] border-[#A67A4B] border-[1px]"
            >
              <ArrowUpDownIcon className="h-4 w-4" />
              <span>Sort by</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] bg-white">
            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
              {sortOptions.map((sortItem) => (
                <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                  {sortItem.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    {/* Product Grid - Improved responsiveness */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {productList?.map((productItem) => (
        <ShopProductTile
          key={productItem.id}
          handleGetProductDetails={handleGetProductDetails}
          product={productItem}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  </div>

  <ProductDetails 
    open={openDetailsDialog} 
    setOpen={setOpenDetailsDialog} 
    productDetails={productDetails}
  />
</div>

  );
}

export default ShoppingListing;