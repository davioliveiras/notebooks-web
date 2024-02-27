import { Navigate, Outlet } from "react-router-dom"
import {Check} from "../libs/cookies"
import Header from "../components/layout/Header"

export default function Default(){

  return(
    <>
      {Check() ? 
        <div className="flex flex-col bg-neutral-200 bg-opacity-50 my-screen">
          <Header/>
          <div className="flex flex-col pb-16 grow w-full h-full">
            <Outlet/>
          </div>
        </div>

      : <Navigate to='/login'/> }
    </>
  )
}