const cloudinary =require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
    cloud_name:"dgu85mum7",
    api_key:"317341112566295",
    api_secret:"U84xx8JEefhg2nGGoWJjIUnUJGI",
})

const storage =new multer.memoryStorage();

async function ImageUploadUtil(file) {
    const result=await cloudinary.uploader.upload(file,{
        resource_type:"auto",
    })
    return result;
}

const upload= multer({storage});
module.exports={upload,ImageUploadUtil} ;