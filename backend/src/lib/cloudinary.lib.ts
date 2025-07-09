import {v2 as cloudinary} from 'cloudinary'
import { API_KEY, API_SECRET, CLOUDINARY_NAME } from '../constants/env'


cloudinary.config({
    cloud_name: CLOUDINARY_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET
})

export default cloudinary