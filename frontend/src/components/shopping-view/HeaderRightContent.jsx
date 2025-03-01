import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, ShoppingCart, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import { logoutUser } from "@/store/authSlice/authSlice";
import { Sheet } from "../ui/sheet";
import CartWrapper from "./CartWrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";

function HeaderRightContent({ closeSheet }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shoppingCart);

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  console.log(cartItems, "cartItems");
  console.log(cartItems.items, "cartItems");
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        {/* <Button onClick={() => setOpenCartSheet(true)} 
        size="icon"
        className="relative"
          >
          <ShoppingCart className="w-6 h-6 "  />
          <span className="absolute top-[-2px] right-[1px] font-bold text-sm">{cartItems?.items?.length || 0}</span>
          <span className="sr-only">User cart</span>
        </Button> */}
        <Button
          onClick={() =>{ setOpenCartSheet(true)
            closeSheet();

          }}
          size="icon"
          className="relative bg-black text-white hover:bg-white hover:text-black border border-black rounded-full p-2 shadow-md transition-transform hover:scale-105"
        >
          <ShoppingCart className="w-6 h-6 " />
          <span className="absolute top-[-4px] right-[-4px] bg-white text-black font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>

        <CartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold hover:bg-white hover:text-black border-black border-[1px]">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-white">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() =>{ navigate("/shop/account")
            closeSheet()
          }}>
            <UserCog className="mr-2 h-4 w-4 cursor-pointer" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4 cursor-pointer" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderRightContent;
