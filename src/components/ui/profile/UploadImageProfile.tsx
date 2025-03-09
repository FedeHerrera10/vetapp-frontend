import { useState } from "react";
import FullScreenModal from "../modal";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../Spinner";
import { MESSAGE_IMAGE_FORMAT, MESSAGE_IMAGE_NOT_SELECT, MESSAGE_IMAGE_SIZE, MESSAGE_IMAGE_UPLOAD_SUCCESS } from "../../../messages";
import { UploadImageProfileSchema } from "../../../types/index";

export const UploadImageProfile = () => 
    {
        {
            const [image, setImage] = useState("");
            const [base64Image, setBase64Image] = useState("");
            const [error, setError] = useState("");
            const navigate = useNavigate();
            const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
            const maxSize = 20 * 1024 * 1024; // 20MB en bytes
            
            const {mutate,status} = useMutation({
                mutationFn:uploadImage,
                onError:(error)=>{
                  toast.error(error.message);
                },
                onSuccess :()=>{
                  toast.success(MESSAGE_IMAGE_UPLOAD_SUCCESS);
                  navigate(`/app/profile/`);
                  
                }
              })    

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
          
            const handleUpload = async (event: React.FormEvent) => {
              event.preventDefault();
              if (!base64Image) {
                setError(MESSAGE_IMAGE_NOT_SELECT);
                return;
              }
              mutate({ userId:3, imageBase64: base64Image } as UploadImageProfileSchema);
              
            };
          
            return (
              <FullScreenModal isOpen={true} onClose={ ()=>{}} title="Subir Imagen" isBack={true}>
                <div className="flex flex-col items-center p-2 border-2 border-dashed border-gray-300 rounded-lg w-4/5 mx-auto mt-1">
                  <form onSubmit={handleUpload} className="flex flex-col items-center w-full">
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/gif, image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                      id="fileInput"
                    />
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Subir Imagen
                    </label>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {image && <img src={image} alt="Vista previa" className="mt-4 w-10/12 object-cover h-56 rounded-lg" />}
                    {status === "pending" ?  <Spinner /> :
                    base64Image && (
                      <button
                        onClick={handleUpload}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        type="submit"
                      >
                        Enviar Imagen
                      </button>
                    )
                    }
                  </form>
                </div>
              </FullScreenModal>
            );
          };
          }