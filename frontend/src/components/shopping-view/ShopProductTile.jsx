import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

import { Badge } from "../ui/badge";

function ShopProductTile({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) {
  return (
//     <Card className="w-full max-w-sm mx-auto bg-[#F0F0F0] cursor-pointer ">
//       <div onClick={() => handleGetProductDetails(product?._id)}>
//         <div className="relative">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full h-[300px] object-fill rounded-t-lg  border-[#F0F0F0] border-[7px]"
//           />
//           {product?.totalStock === 0 ? (
//             <Badge className="absolute top-2 left-2 bg-slate-900 hover:bg-slate-800 text-white ">
//               Out Of Stock
//             </Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge className="absolute top-2 left-2 bg-slate-900 hover:bg-slate-800 text-white">
//               {`Only ${product?.totalStock} items left`}
//             </Badge>
//           ) : product?.salePrice > 0 ? (
//             <Badge className="absolute top-2 left-2 bg-slate-900 hover:bg-slate-800 text-white">
//               Sale
//             </Badge>
//           ) : null}
//         </div>
//         {/* <CardContent className="p-4 ">
//           <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-[16px] text-muted-foreground">
//               {product?.category}
//             </span>
//             <span className="text-[16px] text-muted-foreground">
//               {product?.brand}
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//               } text-lg font-semibold text-primary`}
//             >
//                ₹{product?.price}
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-lg font-semibold text-primary">
//                  ₹{product?.salePrice}
//               </span>
//             ) : null}
//           </div>
//         </CardContent> */}
//         <CardContent className="p-4 flex flex-col items-center text-center">
//   {/* Product Title */}
//   <h2 className="text-xl font-bold mb-2">{product?.title}</h2>

//   {/* Display Either Sale Price or Regular Price */}
//   <div className="flex flex-col items-center">
//     {product?.salePrice > 0 ? (
//       <>
//         <span className="text-lg font-semibold text-muted-foreground line-through">
//           ₹{product?.price}
//         </span>
//         <span className="text-xl font-bold text-primary">₹{product?.salePrice}</span>
//       </>
//     ) : (
//       <span className="text-xl font-bold text-primary">₹{product?.price}</span>
//     )}
//   </div>
// </CardContent>

//       </div>
//       {/* <CardFooter>
//         {product?.totalStock === 0 ? (
//           <Button className="w-full bg-black text-white opacity-60 border-black border-[1px] cursor-not-allowed hover:text-black hover:rounded-xl">
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             className="w-full bg-black text-white hover:bg-white hover:text-black hover:rounded-xl border-[1px] border-black"
//             onClick={() => handleAddToCart(product?._id)}
//           >
//             Add to cart
//           </Button>
//         )}
//       </CardFooter> */}
//     </Card>
<Card className="w-full max-w-[250px] mx-auto bg-[#F0F0F0] cursor-pointer hover:shadow-md transition-shadow">
  <div onClick={() => handleGetProductDetails(product?._id)}>
    {/* Image Section */}
    <div className="relative">
      <img
        src={product?.image}
        alt={product?.title}
        className="w-full h-[220px] object-fill  border-[#F0F0F0] border-[7px]"
      />
      {product?.totalStock === 0 ? (
        <Badge className="absolute top-2 left-2 bg-[#A67A4B] hover:bg-[#A67A4B] rounded-none  text-white ">
          Out Of Stock
        </Badge>
      ) : product?.totalStock < 10 ? (
        <Badge className="absolute top-2 left-2 bg-[#A67A4B] hover:bg-[#A67A4B] rounded-none  text-white">
          {`Only ${product?.totalStock} left`}
        </Badge>
      ) : product?.salePrice > 0 ? (
        <Badge className="absolute top-2 left-2 bg-[#A67A4B] hover:bg-[#A67A4B] rounded-none text-white">
          Sale
        </Badge>
      ) : null}
    </div>

    {/* Content Section */}
    <CardContent className="p-3 flex flex-col items-center text-center">
      {/* Title */}
      <h2 className="text-lg font-semibold mb-1">{product?.title}</h2>

      {/* Price Section */}
      <div className="flex flex-col items-center">
        {product?.salePrice > 0 ? (
          <>
            <span className="text-sm font-semibold text-muted-foreground line-through">
              ₹{product?.price}
            </span>
            <span className="text-lg font-bold text-primary">₹{product?.salePrice}</span>
          </>
        ) : (
          <span className="text-lg font-bold text-primary">₹{product?.price}</span>
        )}
      </div>
    </CardContent>
  </div>

  {/* Optional: Add to Cart Button */}
  {/* <CardFooter>
    {product?.totalStock === 0 ? (
      <Button className="w-full bg-black text-white opacity-60 border-black border-[1px] cursor-not-allowed hover:text-black hover:rounded-xl">
        Out Of Stock
      </Button>
    ) : (
      <Button
        className="w-full bg-black text-white hover:bg-white hover:text-black hover:rounded-xl border-[1px] border-black"
        onClick={() => handleAddToCart(product?._id)}
      >
        Add to cart
      </Button>
    )}
  </CardFooter> */}
</Card>

  );
}

export default ShopProductTile;
