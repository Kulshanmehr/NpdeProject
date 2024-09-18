import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCLoudinary = async (localfilePath) => {
    try {
        if(!localfilePath) return null;
        // Upload file on cloudinary
        const response = await cloudinary.uploader.upload(localfilePath, {
            resource_type:"auto"
        })
    // file has been uploaded Successfully
        console.log("file is uploaded on cloudinary");
        response.url();
        fs.unlinkSync(localfilePath);
        return response;        
    } catch (error) {
        fs.unlinkSync(localfilePath);
        return null;
    }
}

export {uploadCLoudinary}
// cloudinary.uploader.upload(
//     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//         public_id: 'shoes',
//     },
//     function(error,result){
//         console.log(result);
        
//     }
// )