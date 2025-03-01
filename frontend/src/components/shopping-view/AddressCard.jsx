import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  console.log(addressInfo,"ayush");
  console.log(selectedId, addressInfo._id,"ayush");
  // const handleAddressSelection=()=>{
  //   setCurrentSelectedAddress
  //         ? () => setCurrentSelectedAddress(addressInfo)
  //         : null
  // }
  return (
    <Card
      // onClick={
      //   setCurrentSelectedAddress
      //     ? () => setCurrentSelectedAddress(addressInfo)
      //     : null
      // }
      className={`cursor-pointer rounded-[7px]  border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-700 border-[4px]"
          : "border-gray-400"
      }`}
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
              onClick={() => handleEditAddress(addressInfo)}
              className="bg-black text-white hover:text-black border-[1px] border-black rounded-[7px]"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDeleteAddress(addressInfo)}
              className="bg-black text-white hover:text-black border-[1px] border-black rounded-[7px]"
            >
              Delete
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={
                setCurrentSelectedAddress
                  ? () => setCurrentSelectedAddress(addressInfo)
                  : null
              }
              className="bg-black text-white hover:text-black border-[1px] border-black rounded-[7px] mt-5"
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
