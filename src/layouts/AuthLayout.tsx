import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'

export const AuthLayout = () => {
  return (
    <div className="bg-gray-100">
        <Outlet/>
        <ToastContainer
      pauseOnHover={false}
      pauseOnFocusLoss={false}/>
    </div>
  )
}
