import { jwtDecode } from "jwt-decode";
import cookies from "../../libs/cookies";

type User = {
  name: string,
  photo: string
}

let tokenDecoded: User

if(cookies.get('token')){
  tokenDecoded = jwtDecode<User>(cookies.get('token'))
}

export default function Hero(){

  return(
    <div className="flex items-center gap-3 mr-5 font-medium">
      {tokenDecoded.name}
      <img src={tokenDecoded.photo} alt="s2" className="w-9 rounded-full shadow-md"/>
    </div>
  )
}