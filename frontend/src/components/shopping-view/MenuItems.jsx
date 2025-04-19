// import React from "react";
// import {
//   Link,
//   useLocation,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";
// import { Label } from "../ui/label";

// function MenuItems() {
//   const menuItemHeader = [
//     {
//       id: "home",
//       label: "Home",
//       path: "/shop/home",
//     },
//     {
//       id: "products",
//       label: "Products",
//       path: "/shop/listing",
//     },
//     {
//       id: "men",
//       label: "Men",
//       path: "/shop/listing",
//     },
//     {
//       id: "women",
//       label: "Women",
//       path: "/shop/listing",
//     },
//     {
//       id: "kids",
//       label: "Kids",
//       path: "/shop/listing",
//     },
//     {
//       id: "footwear",
//       label: "Footwear",
//       path: "/shop/listing",
//     },
//     {
//       id: "accessories",
//       label: "Accessories",
//       path: "/shop/listing",
//     },
//     // {
//     //   id: "search",
//     //   label: "Search",
//     //   path: "/shop/search",
//     // },
//   ];
//   console.log(menuItemHeader);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const handleNavigate = (getCurrentMenuItem) => {
//     sessionStorage.removeItem("filters");
//     const currentFilter =
//       getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !== "products"
//         ? {
//             category: [getCurrentMenuItem.id],
//           }
//         : null;

//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    
//     // location.pathname.includes("listing") && currentFilter !== null
//     //   ? setSearchParams(
//     //       new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
//     //     )
//     //   : navigate(getCurrentMenuItem.path);

//     // Build the URL for navigation
//     // if (getCurrentMenuItem.path.includes("listing") && currentFilter !== null) {
//     //   navigate(`${getCurrentMenuItem.path}?category=${getCurrentMenuItem.id}`);
//     // } else {
//     //   navigate(getCurrentMenuItem.path);
//     // }

//     if (getCurrentMenuItem.path.includes("listing") && currentFilter !== null) {
//       // Use navigate with query params for better route handling
//       const searchParams = new URLSearchParams();
//       searchParams.set("category", getCurrentMenuItem.id);
      

//       // Force re-render even if the same path
//       if (location.pathname === getCurrentMenuItem.path) {
//         navigate(`${getCurrentMenuItem.path}?${searchParams.toString()}`, { replace: true });
//       } else {
//         navigate(`${getCurrentMenuItem.path}?${searchParams.toString()}`);
//       }
//     } else {
//       navigate(getCurrentMenuItem.path);
//     }

//   };

//   return (
//     <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-8 lg:flex-row">
//       {menuItemHeader.map((menuItem) => (
//         <Label
//           key={menuItem.id}
//           onClick={() => handleNavigate(menuItem)}
//           className="text-sm font-medium cursor-pointer"
//         >
//           {menuItem.label}
//         </Label>
//       ))}
//     </nav>
//   );
// }

// export default MenuItems;

// import React, { useEffect } from "react";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { Label } from "../ui/label";

// function MenuItems() {
//   const menuItemHeader = [
//     { id: "home", label: "Home", path: "/shop/home" },
//     { id: "products", label: "Products", path: "/shop/listing" },
//     { id: "men", label: "Men", path: "/shop/listing" },
//     { id: "women", label: "Women", path: "/shop/listing" },
//     { id: "kids", label: "Kids", path: "/shop/listing" },
//     { id: "footwear", label: "Footwear", path: "/shop/listing" },
//     { id: "accessories", label: "Accessories", path: "/shop/listing" },
//   ];

//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();

//   useEffect(() => {
//     const category = searchParams.get("category");
//     if (category) {
//       console.log(`Current category from URL: ${category}`);
//     }
//   }, [searchParams]);

//   const handleNavigate = (menuItem) => {
//     const currentCategory = menuItem.id !== "home" && menuItem.id !== "products" ? menuItem.id : null;
//     const params = new URLSearchParams();

//     if (currentCategory) {
//       params.set("category", currentCategory);
//     }

//     const targetPath = `${menuItem.path}?${params.toString()}`;

//     // Avoid duplicate navigation
//     if (location.pathname + location.search !== targetPath) {
//       navigate(targetPath);
//     }
//   };

//   return (
//     <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-8 lg:flex-row">
//       {menuItemHeader.map((menuItem) => (
//         <Label
//           key={menuItem.id}
//           onClick={() => handleNavigate(menuItem)}
//           className="text-sm font-medium cursor-pointer"
//         >
//           {menuItem.label}
//         </Label>
//       ))}
//     </nav>
//   );
// }

// export default MenuItems;


// import React from "react";
// import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
// import { Label } from "../ui/label";

// function MenuItems() {
//   const menuItemHeader = [
//     { id: "home", label: "Home", path: "/shop/home" },
//     { id: "products", label: "Products", path: "/shop/listing" },
//     { id: "men", label: "Men", path: "/shop/listing" },
//     { id: "women", label: "Women", path: "/shop/listing" },
//     { id: "kids", label: "Kids", path: "/shop/listing" },
//     { id: "footwear", label: "Footwear", path: "/shop/listing" },
//     { id: "accessories", label: "Accessories", path: "/shop/listing" },
//   ];

//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();

//   // Function to handle navigation
//   const handleNavigate = (menuItem) => {
//     const { id, path } = menuItem;

//     // Remove existing filters
//     sessionStorage.removeItem("filters");

//     // Add category filter if it's a valid category
//     const newSearchParams = new URLSearchParams(searchParams);
//     if (id !== "home" && id !== "products") {
//       newSearchParams.set("category", id);
//     } else {
//       newSearchParams.delete("category"); // Remove category filter if navigating to products or home
//     }

//     // If we're already on the current page with the same params, we don't need to navigate again
//     if (location.pathname === path && searchParams.toString() === newSearchParams.toString()) {
//       return; // No navigation
//     } else {
//       // Navigate to the new path with the search parameters
//       navigate(`${path}?${newSearchParams.toString()}`);
//     }
//   };

//   return (
//     <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-8 lg:flex-row">
//       {menuItemHeader.map((menuItem) => (
//         <Label
//           key={menuItem.id}
//           onClick={() => handleNavigate(menuItem)}
//           className="text-sm font-medium cursor-pointer"
//         >
//           {menuItem.label}
//         </Label>
//       ))}
//     </nav>
//   );
// }

// export default MenuItems;


import React from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/product-slice";

function MenuItems({closeSheet}) {
  const menuItemHeader = [
    { id: "home", label: "Home", path: "/shop/home" },
    { id: "products", label: "Products", path: "/shop/listing" },
    { id: "men", label: "Men", path: "/shop/listing", category: "men" },
    { id: "women", label: "Women", path: "/shop/listing", category: "women" },
    { id: "kids", label: "Kids", path: "/shop/listing", category: "kids" },
    { id: "footwear", label: "Footwear", path: "/shop/listing", category: "footwear" },
    { id: "accessories", label: "Accessories", path: "/shop/listing", category: "accessories" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const handleNavigate = (menuItem) => {
    const { id, path, category } = menuItem;

    // Handle home navigation
    if (id === "home") {
      navigate("/shop/home");
      return;
    }

    // Clear existing filters
    sessionStorage.removeItem("filters");

    if (id === "products") {
      // For general products page
      navigate("/shop/listing");
      dispatch(fetchAllFilteredProducts({ filterParams: {} }));
    } else {
      // For category-specific pages
      const newFilters = { category: [category] };
      sessionStorage.setItem("filters", JSON.stringify(newFilters));
      navigate(`/shop/listing?category=${category}`);
      dispatch(fetchAllFilteredProducts({ filterParams: newFilters }));
    }
  };

  const isActive = (menuItem) => {
    const currentCategory = searchParams.get("category");
    
    if (menuItem.id === "home") {
      return location.pathname === "/shop/home";
    }
    
    if (menuItem.id === "products") {
      return location.pathname === "/shop/listing" && !currentCategory;
    }
    
    return location.pathname === "/shop/listing" && currentCategory === menuItem.category;
  };

  return (
    // <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-8 lg:flex-row">
    //   {menuItemHeader.map((menuItem) => (
    //     <Label
    //       key={menuItem.id}
    //       onClick={() => {handleNavigate(menuItem)
    //         closeSheet()
    //       }}
    //       className={`text-sm font-medium cursor-pointer transition-colors
    //         ${isActive(menuItem) 
    //           ? "text-[#A67A4B] font-bold" 
    //           : "text-muted-foreground hover:text-[#A67A4B]"}`}
    //     >
    //       {menuItem.label}
    //     </Label>
    //   ))}
    // </nav>

    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
    {menuItemHeader.map((menuItem) => (
      <span
        key={menuItem.id}
        onClick={() => {
          handleNavigate(menuItem);
          closeSheet && closeSheet();
        }}
        className={`text-sm font-medium cursor-pointer transition-colors ${
          isActive(menuItem) ? "text-[#A67A4B] font-bold" : "text-muted-foreground hover:text-[#A67A4B]"
        }`}
      >
        {menuItem.label}
      </span>
    ))}
  </nav>
  );
}

export default MenuItems;

