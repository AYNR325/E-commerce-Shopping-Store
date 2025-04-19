import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({ product, onEdit, onDelete }) {
  return (
    // <Card className="w-full max-w-[250px] mx-auto bg-[white] cursor-pointer hover:shadow-md transition-shadow ">
    //   <div>
    //     <div className="relative">
    //       <img
    //         src={product?.image}
    //         alt={product?.title}
    //         className="w-full h-[220px] object-fill "
    //       />
    //     </div>
    //     <CardContent className="p-4 flex flex-col items-center text-center ">
    //       <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
    //       <div className="flex flex-col justify-between items-center mb-2">
    //         <span
    //           className={`${
    //             product?.salePrice > 0 ? "line-through" : ""
    //           } text-lg font-semibold text-primary`}
    //         >
    //            ₹{product?.price}
    //         </span>
    //         {product?.salePrice > 0 ? (
    //           <span className="text-lg font-bold"> ₹{product?.salePrice}</span>
    //         ) : null}
    //       </div>
    //     </CardContent>
    //     <CardFooter className="flex justify-between items-center">
    //       <Button
    //         onClick={onEdit}
    //         className="bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border-[1px] border-[#A67A4B] rounded-[6px]"
    //       >
    //         Edit
    //       </Button>
    //       <Button
    //         variant="destructive"
    //         onClick={onDelete}
    //         className="bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border-[1px] border-[#A67A4B] rounded-[6px]"
    //       >
    //         Delete
    //       </Button>
    //     </CardFooter>
    //   </div>
    // </Card>

    <Card className="w-full max-w-[300px] sm:max-w-[250px] mx-auto bg-white cursor-pointer hover:shadow-md transition-shadow rounded-lg flex flex-col h-full">
  <div className="flex flex-col flex-grow">
    {/* Image */}
    <div className="relative">
      <img
        src={product?.image}
        alt={product?.title}
        className="w-full h-[220px] sm:h-[180px] object-contain rounded-t-lg"
      />
    </div>

    {/* Content */}
    <CardContent className="p-4 flex flex-col items-center text-center flex-grow">
      <h2 className="text-lg sm:text-base md:text-lg font-bold mb-2 mt-2">
        {product?.title}
      </h2>
      <div className="flex flex-col justify-between items-center mb-2">
        <span
          className={`${
            product?.salePrice > 0 ? "line-through" : ""
          } text-lg sm:text-base font-semibold text-primary`}
        >
          ₹{product?.price}
        </span>
        {product?.salePrice > 0 ? (
          <span className="text-lg sm:text-base font-bold"> ₹{product?.salePrice}</span>
        ) : null}
      </div>
    </CardContent>

    {/* Footer (Fixed Position) */}
    <CardFooter className="flex justify-center gap-4 items-center p-2 mt-auto">
      <Button
        onClick={onEdit}
        className="text-sm sm:text-xs px-4 sm:px-3 py-2 sm:py-1 bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border border-[#A67A4B] rounded-md"
      >
        Edit
      </Button>
      <Button
        variant="destructive"
        onClick={onDelete}
        className="text-sm sm:text-xs px-4 sm:px-3 py-2 sm:py-1 bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border border-[#A67A4B] rounded-md"
      >
        Delete
      </Button>
    </CardFooter>
  </div>
</Card>

  );
}

export default AdminProductTile;
