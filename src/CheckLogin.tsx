import { Navigate } from "react-router-dom";
import { Check } from "./libs/cookies";
import Login from "./pages/Login";

export function CheckLogin(){
  return(
    <>
      {Check() ? <Navigate to='/'/> : <Login/>}
    </>
  )
}