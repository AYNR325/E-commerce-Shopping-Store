import React from 'react'
import accImg from "../../assets/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Address from '@/components/shopping-view/Address';
import ShoppingOrders from '@/components/shopping-view/ShoppingOrders';
function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8 ">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm ">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders" className="bg-[#A67A4B] text-white hover:text-[#A67A4B] hover:bg-white border-[1px] border-[#A67A4B]">Orders</TabsTrigger>
              <TabsTrigger value="address" className="bg-[#A67A4B] text-white hover:text-[#A67A4B] hover:bg-white border-[1px] border-[#A67A4B] " >Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      </div>
  )
}

export default ShoppingAccount