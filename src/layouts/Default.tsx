import { Navigate, Outlet } from "react-router-dom"
import {Check} from "../libs/cookies"
import Header from "../components/layout/Header"

export default function Default(){

  return(
    <>
      {Check() ? 
        <div className="flex flex-col bg-neutral-200 bg-opacity-50 my-screen">
          <Header/>
          <Outlet/>
        </div>

      : <Navigate to='/login'/> }
    </>
  )
}