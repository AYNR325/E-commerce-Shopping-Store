import ProductImageUpload from "@/components/admin-view/ProductImageUpload";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common";
import {  useToast } from "@/hooks/use-toast";
function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const {toast}=useToast();

  function handleUploadFeatureImage() {
    if(imageFile){
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        toast({
          title: "Image uploaded successfully",
          variant: "success",
          className:"text-white bg-green-500",
        })
      }
    });
  } else{
    toast({
      title: "Please upload an image",
      variant: "warning",
      className:"text-white bg-red-500",

    })
  }
  }

  function handleDeleteFeatureImage(_id) {
    console.log(_id, "handleDeleteFeatureImage");
    dispatch(deleteFeatureImage(_id)).then((data) => {
      if (data?.payload?.success) {
        console.log(data);
        dispatch(getFeatureImages());
        toast({
          title: "Image deleted successfully",
          variant: "success",
          className:"text-white bg-green-500",
        })
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");
  return (
    <div className="w-full  text-center mx-auto ">
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
      />

      <Button onClick={handleUploadFeatureImage} className="mt-5 w-1/2 bg-black text-white hover:bg-white hover:text-black border-[1px] border-black rounded-[6px]">
        Upload
      </Button>

      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <Button
                  onClick={()=>handleDeleteFeatureImage(featureImgItem._id)}
                  className="mt-5 w-1/2 bg-black text-white hover:bg-white hover:text-black border-[1px] border-black rounded-[6px]"
                >
                  Delete
                </Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
