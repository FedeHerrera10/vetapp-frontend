import { Outlet } from "react-router-dom"



export const AuthLayout = () => {
  return (
    <div className="bg-red-600 min-h-screen">
        <Outlet/>
    </div>
  )
}
