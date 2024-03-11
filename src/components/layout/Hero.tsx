import {jwtDecode} from 'jwt-decode';
import cookies from '../../libs/cookies';

type User = {
  name: string;
  photo: string;
};

export default function Hero() {
  const tokenDecoded = jwtDecode<User>(cookies.get('token'));

  return (
    <div className="mr-3 flex items-center gap-3 font-roboto font-medium">
      {tokenDecoded.name}
      <img src={tokenDecoded.photo} alt="s2" className="w-9 rounded-full shadow-md" />
    </div>
  );
}
