import React from "react";
import { get, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addNewAddress,
  fetchAllAddresses,
  updateAddress,
  deleteAddress,
} from "@/store/shop/address-slice";
import AddressCard from "./AddressCard";

function Address({setCurrentSelectedAddress,selectedId}) {
  const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "State",
      name: "state",
      componentType: "input",
      type: "text",
      placeholder: "Enter your State",
    },
    {
      label: "Country",
      name: "country",
      componentType: "input",
      type: "text",
      placeholder: "Enter your Country Name",
    },
    {
      label: "Pincode",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
  ];

  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log(currentEditedId,"currentEditedId")
  const onSubmit = (data) => {
    console.log("Form Data:", data);

    if (addressList.length >= 3 && currentEditedId === null) {
      reset({
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        phone: "",
      })
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
          updateAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData: data
          })
        ).then((data) => {
          console.log("Data:", data);
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            reset({
              address: "",
              city: "",
              state: "",
              country: "",
              pincode: "",
              phone: "",
            });
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            userId: user?.id,
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            pincode: data.pincode,
            phone: data.phone,
          })
        ).then((data) => {
          console.log("Data:", data);
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            console.log("Payload after adding address:", data.payload);

            reset({
              address: "",
              city: "",
              state: "",
              country: "",
              pincode: "",
              phone: "",
            });
            toast({
              title: "Address added successfully",
            });
          }
        });
  };

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress._id);
    reset({
      address: getCurrentAddress.address,
      city: getCurrentAddress.city,
      state: getCurrentAddress.state,
      country: getCurrentAddress.country,
      pincode: getCurrentAddress.pincode,
      phone: getCurrentAddress.phone,
    });
    console.log("Form reset with values:", getCurrentAddress);
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    console.log("Delete Address:", getCurrentAddress);
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        console.log("Data after deleting address:", data.payload);
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
    console.log("Fetched address list:", addressList);
  }, [dispatch]);

  console.log(addressList, "addressList");
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2     gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                selectedId={selectedId}
                key={singleAddressItem._id}
                addressInfo={singleAddressItem}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4   ">
          {addressFormControls.map((field) => (
            <div key={field.name} className="flex flex-col">
              <Label className="mb-1 font-semibold text-[15px] ">
                {field.label}
              </Label>
              <Input
                {...register(field.name, {
                  required: `${field.label} is required`,
                })}
                type={field.type}
                placeholder={field.placeholder}
                className="p-3 border-black rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors[field.name] && (
                <span className="text-red-500 text-sm mt-1">
                  {errors[field.name].message}
                </span>
              )}
            </div>
          ))}
          <Button
            type="submit"
            className=" w-full bg-black text-white rounded hover:bg-white hover:text-black border-[1px] border-black "
          >
            {currentEditedId !== null ? "Update Address" : "Add Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Address;
