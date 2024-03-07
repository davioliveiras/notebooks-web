import {Navigate, Outlet} from 'react-router-dom';
import {Check} from '../libs/cookies';
import Header from '../components/layout/Header';

export default function Default() {
  if (Check()) {
    return (
      <div className="my-screen flex flex-col bg-neutral-200 bg-opacity-50">
        <Header />
        <div className="mt-[60px] flex h-full w-full grow flex-col items-center p-1">
          <Outlet />
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
