import { v2 as cloudinary } from 'cloudinary';

export const cloudinary =() => {
    try {
        cloudinary.config({
          cloud_name: process.env.CLOUD_SECRET_NAME_123,
          api_key:    process.env.CLOUD_SECRET_API_SECRET_123,
          api_secret: process.env.CLOUD_SECRET_API_KEY_123
        });
    } catch (error) {
        console.log("Cloudinary error" , error.message);
        
    }
}
