import Cookies from "universal-cookie";

const cookies = new Cookies()

export function Check() {
  const token = cookies.get('token')
  if(token)
    return true
  else
    return false
}

export default cookies