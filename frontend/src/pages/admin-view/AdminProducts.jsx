import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ProductImageUpload from "@/components/admin-view/ProductImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
} from "@/store/Admin/product-slice";
import AdminProductTile from "@/components/admin-view/AdminProductTile";
function AdminProducts() {
  const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];

  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditedProduct, setCurrentEditedProduct] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const onSubmit = (data) => {
    if (isEditing) {
      dispatch(
        editProduct({
          _id: currentEditedProduct._id,
          title: data.title,
          description: data.description,
          category: data.category,
          brand: data.brand,
          price: data.price,
          salePrice: data.salePrice,
          totalStock: data.totalStock,
          image: uploadedImageUrl || currentEditedProduct.image,
        })
      ).then((res) => {
        if (res?.payload?.success) {
          toast({
            title: "Success",
            description: "Product updated successfully!",
            className:"text-white bg-green-500",
          });
          dispatch(fetchAllProducts());

          reset({
            title: "",
            description: "",
            category: "",
            brand: "",
            price: "",
            salePrice: "",
            totalStock: "",
            image: "",
          });
          setImageFile(null);
          setOpenCreateProductsDialog(false);
          console.log("upadted product", data);
        }
      });
    } else {
      dispatch(
        addNewProduct({
          title: data.title,
          description: data.description,
          category: data.category,
          brand: data.brand,
          price: data.price,
          salePrice: data.salePrice,
          totalStock: data.totalStock,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        console.log("Form Data:", data);
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setImageFile(null);
          // Show toast message
          toast({
            title: "Success",
            description: "Product added successfully!",
            className:"text-white bg-green-500",
          });

          reset({
            title: "",
            description: "",
            category: "",
            brand: "",
            price: "",
            salePrice: "",
            totalStock: "",
            image: "",
          }); // Reset form to empty for new product
        }
      });
    }
  };
  const handleEdit = (product) => {
    setIsEditing(true);
    setOpenCreateProductsDialog(true);
    setCurrentEditedProduct(product);
    setUploadedImageUrl(product.image);
    reset({
      ...product,
    }); // Populate form with product data
    console.log("Editing Product:", product._id);
  };

  // const handleDelete = (_id) => {
  //   if (!_id) {
  //     console.error("Product ID is undefined!");
  //     return;
  //   }

  //   if (window.confirm("Are you sure you want to delete this product?")) {
  //     dispatch(deleteProduct(_id)).then((res) => {
  //       if (res?.payload?.success) {
  //         dispatch(fetchAllProducts());
  //         toast({
  //           variant: "destructive",
  //           description:"Product deleted successfully!" ,
  //         });
  //         console.log("Deleted product", _id);

  //       } else {
  //         alert("Failed to delete the product.");
  //       }
  //     });
  //   }
  // };

  // const handleDelete = (_id) => {
  //   if(openDeleteDialog){
  //   if (_id) {
  //     dispatch(deleteProduct(_id)).then((res) => {
  //       if (res?.payload?.success) {
  //         toast({
  //           variant: "destructive",
  //           description: "Product deleted successfully!",
  //         });
  //         dispatch(fetchAllProducts());
  //       } else {
  //         toast({
  //           variant: "destructive",
  //           description: "Failed to delete the product.",
  //         });
  //       }
  //       setOpenDeleteDialog(false);
  //     });
  //   }
  // }
  // };

  const handleDeleteClick = (productId) => {
    // Set the product ID to be deleted and open the dialog
    setProductIdToDelete(productId);
    setOpenDeleteDialog(true);
  };

  const handleDelete = (_id) => {
    if (!_id) {
      console.error("Product ID is undefined!");
      toast({
        variant: "destructive",
        description: "Failed to delete the product. Product ID is missing.",
        className:"text-white bg-red-500",
      });
      return;
    }

    dispatch(deleteProduct(_id)).then((res) => {
      if (res?.payload?.success) {
        toast({
          variant: "destructive",
          description: "Product deleted successfully!",
          className:"text-white bg-green-500",
        });
        dispatch(fetchAllProducts());
      } else {
        toast({
          variant: "destructive",
          description: "Failed to delete the product. Please try again.",
          className:"text-white bg-red-500",
        });
      }
      setOpenDeleteDialog(false); // Close dialog after operation
    });
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  console.log(productList, uploadedImageUrl, "productList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setIsEditing(false);
          }}
          className="bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border-[1px] border-[#A67A4B]  rounded-[6px]"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                product={productItem}
                onEdit={() => handleEdit(productItem)}
                // onDelete={() => {
                //   setOpenDeleteDialog(true);
                //   handleDelete(productItem._id);
                // }}
                onDelete={() => handleDeleteClick(productItem._id)} // Trigger the delete dialog
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>
              {/* {currentEditedId !== null ? "Edit Product" : "Add New Product"} */}
              Add New Product
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />
          <div className="py-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {addProductFormElements.map((element) => {
                const {
                  label,
                  name,
                  componentType,
                  type,
                  placeholder,
                  options,
                } = element;

                return (
                  <div key={name} className="space-y-2">
                    <Label htmlFor={name}>{label}</Label>

                    {componentType === "input" && (
                      <Input
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        {...register(
                          name,
                          name === "salePrice"
                            ? {}
                            : { required: `${label} is required` }
                        )}
                      />
                    )}

                    {componentType === "textarea" && (
                      <Textarea
                        id={name}
                        placeholder={placeholder}
                        {...register(name, {
                          required: `${label} is required`,
                        })}
                      />
                    )}

                    {/* {componentType === "select" && (
                    <Select onValueChange={(value) => setValue(name, value)}>
                      <SelectTrigger id={name} className="w-full">
                        <span className="text-gray-500">
                          Select {label.toLowerCase()}
                        </span>
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {options.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )} */}
                    {componentType === "select" && (
                      <Select onValueChange={(value) => setValue(name, value)}>
                        <SelectTrigger id={name} className="w-full bg-white">
                          <span className="text-black">
                            {watch(name)
                              ? options.find((opt) => opt.id === watch(name))
                                  ?.label
                              : `Select ${label.toLowerCase()}`}
                          </span>
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {options.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {errors[name] && (
                      <p className="text-sm text-red-500">
                        {errors[name].message}
                      </p>
                    )}
                  </div>
                );
              })}

              <Button
                type="submit"
                className="w-full bg-[#A67A4B] text-white hover:text-white hover:bg-[#ad8050] border-[1px] border-[#A67A4B] rounded-[6px]"
              >
                
                { isEditing ? <span>Edit</span> : <span>Submit</span>}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent className="bg-[#A67A4B] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this product?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The product will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDelete(productIdToDelete); // Delete product after confirmation
                setOpenDeleteDialog(false); // Close dialog
              }}
              className="hover:bg-white hover:text-black"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}

export default AdminProducts;
