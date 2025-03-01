// import React, { useState, useEffect } from "react";
// import { Input } from "../ui/input";
// import { Search } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
// import { useToast } from "@/hooks/use-toast";
// function SearchBox() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const toast =useToast();
//   const { searchResults } = useSelector((state) => state.shopSearch);
//   const [keyword, setKeyword] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams();
//   //   const handleSearch = () => {
//   //     console.log("Search clicked");
//   //     navigate("/shop/search");
//   //   };

//   //   useEffect(() => {
//   //     if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
//   //       setTimeout(() => {
//   //         setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
//   //         dispatch(getSearchResults(keyword));
//   //       }, 1000);
//   //     }
//   //   }, [keyword]);

//   const handleSearch = () => {
//     if (keyword.trim().length >= 3) {
//       navigate(`/shop/search?keyword=${encodeURIComponent(keyword)}`);
//       dispatch(getSearchResults(keyword)); // Trigger search action
      
//       // } else {
//       //       toast.error("Search term must be at least 4 characters long", {
//       //         autoClose: 3000,
//       //       });
//       // 
//       //   setKeyword("");
//       //       setSearchParams(new URLSearchParams(""));
//       //     dispatch(resetSearchResults());  
//       //     }
      
//     } else{
//       // navigate(`/shop/search?keyword=${encodeURIComponent(keyword)}`);
//       navigate(`/shop/home`);

//           dispatch(resetSearchResults());
//         }
//   };

//   console.log("Search results", searchResults);

//   return (
//     // <div className="relative w-40 md:w-full md:max-w-md ">
//     //   <Input
//     //     type="text"
//     //     placeholder="Search..."
//     //     className="pl-10"
//     //   />
//     //   <Search
//     //     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//     //     size={20}
//     //   />
//     // </div>
//     <div className="relative w-44 md:w-full md:max-w-md">
//       <div
//         className="relative"
//         //    onClick={handleSearch}
//       >
//         <Input
//           type="text"
//           placeholder="Search..."
//           value={keyword}
//           name="keyword"
//           onChange={(e) => setKeyword(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger on Enter
//           className="pl-10 border border-gray-400 focus:border-primary focus:ring-2 focus:ring-ring rounded-[9px]"
//         />
//         <Search
//           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
//           size={20}
//         />
//       </div>
//     </div>
//   );
// }

// export default SearchBox;

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice';
import { useToast } from "@/hooks/use-toast";
function SearchBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
const {toast }= useToast();
  const handleSearch = () => {
    const trimmedKeyword = keyword.trim();
    
    if (trimmedKeyword.length >= 3) {
      navigate(`/shop/search?keyword=${encodeURIComponent(trimmedKeyword)}`);
      dispatch(getSearchResults(trimmedKeyword));
    } else if (trimmedKeyword.length > 0) {
      // Show error for keywords shorter than 3 characters
      toast({
        title: "Search term must be at least 3 characters long",
        variant: "warning",
        className:"text-black bg-yellow-500",
  
      })
      setKeyword('');
      // alert('Search term must be at least 3 characters long');
    } else {
      // Handle empty search
      navigate('/shop/home');
      dispatch(resetSearchResults());
    }
  };

  return (
    <div className="relative w-44 md:w-full md:max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search..."
          value={keyword}
          name="keyword"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="pl-10 border border-gray-400 focus:border-primary focus:ring-2 focus:ring-ring rounded-[9px]"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
          size={20}
        />
      </div>
    </div>
  );
}

export default SearchBox;
