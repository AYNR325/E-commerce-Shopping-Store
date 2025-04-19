import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";

function AddressCard({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  console.log("Address info:", addressInfo);
  console.log("Selected ID:", selectedId?._id, "Current address ID:", addressInfo?._id);
   const {toast }= useToast();
  const handleAddressSelection = () => {
    if (setCurrentSelectedAddress) {
      console.log("Setting selected address to:", addressInfo);
      setCurrentSelectedAddress(addressInfo);
      toast({
        title:"Address Selected Successfully",
        type: "success",
        duration: 5000,
        className:"bg-green-500"
      })
    }
  };
  
  return (
    <Card
      onClick={handleAddressSelection}
      className={`cursor-pointer border-none bg-white`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>State: {addressInfo?.state}</Label>
        <Label>Country: {addressInfo?.country}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        {location.pathname === "/shop/account" ? (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                handleEditAddress(addressInfo);
              }}
              className="bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border-[1px] border-[#A67A4B] "
            >
              Edit
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                handleDeleteAddress(addressInfo);
              }}
              className="bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border-[1px] border-[#A67A4B] "
            >
              Delete
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent double selection
                handleAddressSelection();
              }}
              className="bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border-[1px] border-[#A67A4B]  mt-5"
            >
              Select Address
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
