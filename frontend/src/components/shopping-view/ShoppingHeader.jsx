// import React  from 'react'
// import websiteLogo from "../../assets/website_logo.webp"
// import { Link, Links } from 'react-router-dom'
// import { HousePlug,Menu } from 'lucide-react'
// import { Sheet, SheetTrigger,SheetContent } from '../ui/sheet'
// import { Button } from '../ui/button'
// import MenuItems from './MenuItems'
// import { useSelector } from 'react-redux'
// import HeaderRightContent from './HeaderRightContent'
// import SearchBox from './SearchBox'
// import { useState } from 'react'
// function ShoppingHeader() {
//   const {isAuthenticated,user}=useSelector((state)=>state.auth)
//   console.log(isAuthenticated,user)
  
//   const [isSheetOpen, setIsSheetOpen] = useState(false);

//   const closeSheet = () => setIsSheetOpen(false);

//   return (
//     <header className="sticky top-0 z-40 w-full border-b bg-[#F0F0F0] ">
//       <div className="flex h-16 items-center justify-between px-4 md:px-6">
//       <Link to="/shop/home" className="flex items-center gap-2">
//           <HousePlug className="h-6 w-6" />
//           {/* <img src={websiteLogo} alt="website logo" className="h-16 w-17" /> */}
//           <span className="font-bold text-lg tracking-wide">Ecommerce</span>
//         </Link>
//         <div>
//           <SearchBox />
//         </div>
//         <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//           <SheetTrigger asChild>
//           <Button variant="outline" size="icon" className="lg:hidden">
//               <Menu className="h-6 w-6" />
//               <span className="sr-only">Toggle header menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-full max-w-xs bg-[#F0F0F0]">
//             <MenuItems closeSheet={closeSheet}/>
//             <HeaderRightContent closeSheet={closeSheet} isSheetOpen={isSheetOpen}/>
//           </SheetContent>
//         </Sheet>
        
//         <div className="hidden lg:block">
//           <MenuItems />
//         </div>
        
//         <div className="hidden lg:block">
//           <HeaderRightContent />
//         </div>
        
//       </div>
//     </header>
//   )
// }

// export default ShoppingHeader

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { HousePlug, Menu } from 'lucide-react';
// import { Sheet, SheetTrigger, SheetContent } from '../ui/sheet';
// import { Button } from '../ui/button';
// import MenuItems from './MenuItems';
// import { useSelector } from 'react-redux';
// import HeaderRightContent from './HeaderRightContent';
// import SearchBox from './SearchBox';
// import CartWrapper from './CartWrapper';
// import websiteLogo from '../../assets/website_name2.png';

// function ShoppingHeader() {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   console.log(isAuthenticated, user);

//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const [openCartSheet, setOpenCartSheet] = useState(false); // Moved to header
//   const { cartItems } = useSelector((state) => state.shoppingCart);
//   const closeSheet = () => setIsSheetOpen(false);
//   const closeCartSheet = () => setOpenCartSheet(false);

//   return (
//     // <header className="sticky top-0 z-40 w-full border-b bg-[#F0F0F0]">
//     //   <div className="flex h-[70px] items-center justify-between px-4 md:px-6">
//     //     <Link to="/shop/home" className="flex items-center ">
//     //       <img src={websiteLogo} alt="website logo" className="h-[70px] w-17" />
//     //       {/* <span className="font-bold text-lg tracking-wide ">Wearlo</span> */}
//     //     </Link>

//     //     <div>
//     //       <SearchBox />
//     //     </div>

//     //     {/* Main Navigation Sheet */}
//     //     <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//     //       <SheetTrigger asChild>
//     //         <Button variant="outline" size="icon" className="lg:hidden">
//     //           <Menu className="h-6 w-6" />
//     //           <span className="sr-only">Toggle header menu</span>
//     //         </Button>
//     //       </SheetTrigger>
//     //       <SheetContent side="left" className="w-full max-w-xs bg-[#F0F0F0]">
//     //         <MenuItems closeSheet={closeSheet} />
//     //         <HeaderRightContent
//     //           closeSheet={closeSheet}
//     //           isSheetOpen={isSheetOpen}
//     //           setOpenCartSheet={setOpenCartSheet} // Pass function to open cart sheet
//     //         />
//     //       </SheetContent>
//     //     </Sheet>

//     //     <div className="hidden lg:block">
//     //       <MenuItems />
//     //     </div>

//     //     <div className="hidden lg:block">
//     //       <HeaderRightContent setOpenCartSheet={setOpenCartSheet} />
//     //     </div>
//     //   </div>

//     //   {/* Cart Sheet Moved Here */}
//     //   <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
//     //     <SheetContent className="bg-[#F0F0F0] sm:max-w-md h-full overflow-auto">
//     //       <CartWrapper setOpenCartSheet={setOpenCartSheet} closeSheet={closeCartSheet} cartItems={
//     //          cartItems && cartItems.items && cartItems.items.length > 0
//     //            ? cartItems.items
//     //            : []
//     //        } />
//     //     </SheetContent>
//     //   </Sheet>
//     // </header>

//     <header className="sticky top-0 z-50 w-full border-b bg-[#F0F0F0] shadow-md">
//       <div className="flex h-[70px] items-center justify-between px-4 md:px-6">
        
//         {/* Logo */}
//         <Link to="/shop/home" className="flex items-center">
//           <img src={websiteLogo} alt="Website Logo" className="h-[50px] w-auto" />
//         </Link>

//         {/* Search Box (Visible on all screen sizes) */}
//         <div className="w-full max-w-[300px]">
//           <SearchBox />
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="lg:hidden flex items-center">
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" onClick={() => setIsSheetOpen(true)}>
//               <Menu className="h-6 w-6" />
//             </Button>
//           </SheetTrigger>
//         </div>

//         {/* Desktop Navigation & Header Right Content */}
//         <div className="hidden lg:flex lg:items-center gap-6">
//           <MenuItems />
//           <HeaderRightContent setOpenCartSheet={setOpenCartSheet} />
//         </div>
//       </div>

//       {/* Mobile Menu Drawer */}
//       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//         <SheetContent side="left" className="w-full max-w-xs bg-[#F0F0F0] p-4">
//           <MenuItems closeSheet={() => setIsSheetOpen(false)} />
//           <HeaderRightContent setOpenCartSheet={setOpenCartSheet} />
//         </SheetContent>
//       </Sheet>
//     </header>
//   );
// }

// export default ShoppingHeader;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import MenuItems from './MenuItems';
import { useSelector } from 'react-redux';
import HeaderRightContent from './HeaderRightContent';
import SearchBox from './SearchBox';
import CartWrapper from './CartWrapper';
import websiteLogo from '../../assets/website_name2.png';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);
  const closeCartSheet = () => setOpenCartSheet(false);

  return (
    // <header className="sticky top-0 z-50 w-full border-b bg-[#F0F0F0] shadow-md">
    //   <div className="flex h-[70px] items-center justify-between px-4 md:px-6">
        
    //     {/* Logo */}
    //     <Link to="/shop/home" className="flex items-center">
    //       <img src={websiteLogo} alt="Website Logo" className="h-[50px] w-auto" />
    //     </Link>

    //     {/* Search Box */}
    //     <div className="w-full max-w-[300px]">
    //       <SearchBox />
    //     </div>

    //     {/* Mobile Navigation Sheet */}
    //     <div className="lg:hidden flex items-center">
    //       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
    //         <SheetTrigger asChild>
    //           <Button variant="outline" size="icon">
    //             <Menu className="h-6 w-6" />
    //             <span className="sr-only">Toggle header menu</span>
    //           </Button>
    //         </SheetTrigger>
    //         <SheetContent side="left" className="w-full max-w-xs bg-[#F0F0F0] p-4">
    //           <MenuItems closeSheet={closeSheet} />
    //           <HeaderRightContent setOpenCartSheet={setOpenCartSheet} />
    //         </SheetContent>
    //       </Sheet>
    //     </div>

    //     {/* Desktop Navigation */}
    //     <div className="hidden lg:flex lg:items-center gap-6">
    //       <MenuItems />
    //       <HeaderRightContent setOpenCartSheet={setOpenCartSheet} />
    //     </div>
    //   </div>

    //   {/* Cart Sheet */}
    //   <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
    //     <SheetContent className="bg-[#F0F0F0] sm:max-w-md h-full overflow-auto">
    //       <CartWrapper
    //         setOpenCartSheet={setOpenCartSheet}
    //         closeSheet={closeCartSheet}
    //         cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
    //       />
    //     </SheetContent>
    //   </Sheet>
    // </header>

//     <header className="sticky top-0 z-50 w-full border-b bg-[#F0F0F0] shadow-md">
//   <div className="flex h-[70px] items-center justify-between px-4 md:px-6 overflow-hidden">

//     {/* Logo */}
//     <Link to="/shop/home" className="flex-shrink-0">
//       <img src={websiteLogo} alt="Website Logo" className="h-10 md:h-12 w-auto" />
//     </Link>

//     {/* Search Box */}
//     <div className="flex-grow px-2 max-w-[160px] xs:max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">
//       <SearchBox />
//     </div>

//     {/* Right Side: Cart & User always visible + Mobile Menu Trigger */}
//     <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">

//       {/* Cart & User */}
//       <HeaderRightContent setOpenCartSheet={setOpenCartSheet} />

//       {/* Mobile Navigation Sheet Trigger */}
//       <div className="lg:hidden">
//         <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
//               <Menu className="h-5 w-5 sm:h-6 w-6" />
//               <span className="sr-only">Toggle header menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-full max-w-xs bg-[#F0F0F0] p-4">
//             <MenuItems closeSheet={closeSheet} />
//           </SheetContent>
//         </Sheet>
//       </div>

//     </div>
//   </div>

//   {/* Desktop Navigation */}
//   <div className="hidden lg:flex lg:items-center gap-6 px-4 md:px-6">
//     <MenuItems />
//   </div>

//   {/* Cart Sheet */}
//   <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
//     <SheetContent className="bg-[#F0F0F0] sm:max-w-md h-full overflow-auto">
//       <CartWrapper
//         setOpenCartSheet={setOpenCartSheet}
//         closeSheet={closeCartSheet}
//         cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
//       />
//     </SheetContent>
//   </Sheet>
// </header>

<header className="sticky top-0 z-50 w-full border-b bg-[#F0F0F0] shadow-md">
  <div className="flex h-[70px] items-center justify-between px-2 md:px-6 gap-3 flex-nowrap">

    {/* Logo */}
    <Link to="/shop/home" className="flex-shrink-0">
      <img src={websiteLogo} alt="Website Logo" className="h-10 md:h-12 w-auto" />
    </Link>

    {/* Search Box */}
    <div className="flex-grow max-w-[160px] xs:max-w-[200px] sm:max-w-[250px] md:max-w-[300px] px-2">
      <SearchBox />
    </div>

    {/* MenuItems: Show only on lg+ */}
    <div className="hidden lg:flex lg:items-center gap-6 flex-shrink-0">
      <MenuItems />
    </div>

    {/* Right Side: Cart & User + Mobile Menu Trigger */}
    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">

      {/* Cart & User */}
      <HeaderRightContent setOpenCartSheet={setOpenCartSheet} />

      {/* Mobile Nav Trigger */}
      <div className="lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            {/* <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <Menu className="h-5 w-5 sm:h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button> */}
            <Button
  variant="outline"
  size="icon"
  className="h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9 p-0 min-w-0"
>
  <Menu className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
  <span className="sr-only">Toggle header menu</span>
</Button>

          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-[#F0F0F0] p-4">
            <MenuItems closeSheet={closeSheet} />
          </SheetContent>
        </Sheet>
      </div>
    </div>

  </div>

  {/* Cart Sheet */}
  <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
    {/* Visually Hidden Title */}
    <VisuallyHidden>
      <SheetTitle>Your Cart</SheetTitle>
    </VisuallyHidden>
    <SheetContent className="bg-[#F0F0F0] sm:max-w-md h-full overflow-auto">
      <CartWrapper
      openCartSheet={openCartSheet}
        setOpenCartSheet={setOpenCartSheet}
        closeSheet={closeCartSheet}
        cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
      />
    </SheetContent>
  </Sheet>
</header>



  );
}

export default ShoppingHeader;
