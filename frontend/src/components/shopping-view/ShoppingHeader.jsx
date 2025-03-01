import React  from 'react'
import websiteLogo from "../../assets/website_logo.webp"
import { Link, Links } from 'react-router-dom'
import { HousePlug,Menu } from 'lucide-react'
import { Sheet, SheetTrigger,SheetContent } from '../ui/sheet'
import { Button } from '../ui/button'
import MenuItems from './MenuItems'
import { useSelector } from 'react-redux'
import HeaderRightContent from './HeaderRightContent'
import SearchBox from './SearchBox'
import { useState } from 'react'
function ShoppingHeader() {
  const {isAuthenticated,user}=useSelector((state)=>state.auth)
  console.log(isAuthenticated,user)
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
      <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          {/* <img src={websiteLogo} alt="website logo" className="h-16 w-17" /> */}
          <span className="font-bold text-lg tracking-wide">Ecommerce</span>
        </Link>
        <div>
          <SearchBox />
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-white">
            <MenuItems closeSheet={closeSheet}/>
            <HeaderRightContent closeSheet={closeSheet}/>
          </SheetContent>
        </Sheet>
        
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
        
      </div>
    </header>
  )
}

export default ShoppingHeader