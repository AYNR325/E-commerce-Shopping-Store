const Orders = require("../../models/Orders");

const Product = require("../../models/Product");
const Review = require("../../models/Review");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const orders = await Orders.findOne({
      userId,
      "cartItems.productId": productId,
    });
    

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "User didn't place this product in their cart",
      });
    }
    
    const existingReview=await Review.findOne({productId , userId});
    console.log(existingReview);
    if(existingReview){
        return res.status(409).json({
            success: false,
            message: "User has already reviewed this product",
          });
    }

    const newReview= new Review({
        productId,
        userId,
        userName,
        reviewMessage,
        reviewValue,
      });
    await newReview.save();

    const reviews= await Review.find({productId});
    const totalReviewsLength=reviews.length;
    const averageReview=reviews.reduce((acc,review)=>acc+review.reviewValue,0)/totalReviewsLength;

    await Product.findByIdAndUpdate(productId,{averageReview})
    res.status(200).json({
        success: true,
        message: "Review added successfully",
        data: newReview,
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while adding review",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const {productId}=req.params;
    const reviews= await Review.find({productId});
    res.status(200).json({
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching all reviews",
    });
  }
};

module.exports = { addProductReview, getProductReviews };
