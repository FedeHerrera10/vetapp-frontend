import { MESSAGE_IMAGE_FORMAT, MESSAGE_IMAGE_SIZE } from '../messages';
import React,{ useState } from 'react'


export const UseImageToBase64 = () => {
    const [image, setImage] = useState("");
    const [base64Image, setBase64Image] = useState("");
    const [error, setError] = useState("");
    const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 20 * 1024 * 1024; // 20MB en bytes

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        
        if (selectedFile) {
          if (!allowedFormats.includes(selectedFile.type)) {
            setImage("");
            setBase64Image("");
            setError(MESSAGE_IMAGE_FORMAT);
            return;
          }
      
          if (selectedFile.size > maxSize) {
            setImage("");
            setBase64Image("");
            setError(MESSAGE_IMAGE_SIZE);
            return;
          }
      
          const reader = new FileReader();
          reader.onloadend = () => {
            const imageResult = reader.result as string;
            setBase64Image(imageResult);
          };
          reader.readAsDataURL(selectedFile);
      
          setImage(URL.createObjectURL(selectedFile));
          setError("");
          
        }
      };

      return {
        image,
        base64Image,
        error,
        handleImageChange
      };
}
