import { Navigate, Outlet } from "react-router-dom"
import {Check} from "../libs/cookies"
import Header from "../components/layout/Header"
import { EditProvider } from "../contexts/EditContext"

export default function Default(){

  if(Check()){
    return(
      <div className="flex flex-col bg-neutral-200 bg-opacity-50 my-screen">
        <Header/>
        <div className="flex flex-col p-5 grow w-full h-full">
          <EditProvider>
            <Outlet/>
          </EditProvider>          
        </div>
      </div>
    )
  }
  else{
    return <Navigate to='/login'/>
  }

}