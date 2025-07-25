import {v2 as cloudinary} from "cloudinary"
import "dotenv/config";
import fs from "fs"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// console.log(process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET)

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        })

        // file has been uplaoded successfully
        // console.log("uploaded on cloudinary",response.url)
        fs.unlinkSync(localFilePath)
        // console.log(response)
        return response 
        
        
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        console.log(error)
        return null;
    }
}



export {uploadOnCloudinary}