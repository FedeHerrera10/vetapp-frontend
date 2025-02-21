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
         <div className="pt-6 w-full bg-white  max-w-md mx-auto rounded-lg lg:max-w-lg ">
        <BrandLink/>
        <h2 className="mt-8 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Confirma tu Cuenta
          </h2>
        <p className="block text-center  text-gray-500 text-sm">Ingresa el codigo que recibiste por email</p>

        <form className="mt-8 flex flex-col justify-center items-center">
            <label htmlFor="" className="text-gray-800 ">Código de 6 digitos</label>
            <div className="flex justify-center gap-3 mt-5">
                <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                    <PinInputField className="size-12 p-3 rounded-lg border border-gray-400 placeholder-white outline-none focus:border-gray-700"/>
                    <PinInputField className="size-12 p-3 rounded-lg border border-gray-400 placeholder-white outline-none focus:border-gray-700"/>
                    <PinInputField className="size-12 p-3 rounded-lg border border-gray-400 placeholder-white outline-none focus:border-gray-700"/>
                    <PinInputField className="size-12 p-3 rounded-lg border border-gray-400 placeholder-white outline-none focus:border-gray-700"/>
                    <PinInputField className="size-12 p-3 rounded-lg border border-gray-400 placeholder-white outline-none focus:border-gray-700"/>
                    <PinInputField className="size-12 p-3 rounded-lg border border-gray-400 placeholder-white outline-none focus:border-gray-700"/>
                </PinInput>
            </div>
        </form>

        <nav className="my-8 pb-5 text-center">
            <Link to="/" className="block text-center mt-3 text-gray-500 hover:text-gray-600 text-sm">Solicitar nuevo código</Link>
        </nav>
    </div>
    </div>
  )
}
