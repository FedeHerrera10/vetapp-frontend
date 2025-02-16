import { Link } from "react-router-dom"
import {PinInput,PinInputField} from '@chakra-ui/pin-input';
import { BrandLink } from "../../components/ui/BrandLink";
import { useState } from "react";
import { ConfirmToken } from "../../types";
 

export const ConfirmAccountView = () => {

    const[token,setToken] = useState<ConfirmToken['token']>('');
     const handleChange  = (token : ConfirmToken['token']) => {
        setToken(token);
     }

     const handleComplete = (token:ConfirmToken['token'])=>{
        console.log(token); // Llamar a la api
     }

  return (
    <div className="h-screen bg-gray-100  place-content-center p-5 ">
         <div className="pt-6 w-full bg-white  max-w-md mx-auto rounded-lg lg:w-1/2 lg:pb-4 lg:max-w-full lg:rounded-none lg:rounded-l-lg ">
        <BrandLink/>
        <h1 className="text-center mt-5 mb-2 text-2xl xl:text-3xl font-extrabold">Confirma tu Cuenta</h1>
        <p className="block text-center  text-gray-500 hover:text-gray-600 text-md">Ingresa el codigo que recibiste por email</p>

        <form className="mt-8 flex flex-col justify-center items-center">
            <label htmlFor="" className="text-gray-700">Código de 6 digitos</label>
            <div className="flex justify-center gap-3 mt-5">
                <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                    <PinInputField className="size-10 p-3 rounded-lg border-2 border-gray-500 placeholder-white"/>
                    <PinInputField className="size-10 p-3 rounded-lg border-2 border-gray-500 placeholder-white"/>
                    <PinInputField className="size-10 p-3 rounded-lg border-2 border-gray-500 placeholder-white"/>
                    <PinInputField className="size-10 p-3 rounded-lg border-2 border-gray-500 placeholder-white"/>
                    <PinInputField className="size-10 p-3 rounded-lg border-2 border-gray-500 placeholder-white"/>
                    <PinInputField className="size-10 p-3 rounded-lg border-2 border-gray-500 placeholder-white"/>
                </PinInput>
            </div>
        </form>

        <nav className="mt-8  text-center">
            <Link to="/" className="block text-center mt-3 text-gray-500 hover:text-gray-600 text-sm">Solicitar nuevo código</Link>
        </nav>
    </div>
    </div>
  )
}
