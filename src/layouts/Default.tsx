import {Navigate, Outlet} from 'react-router-dom';
import {Check} from '../libs/cookies';
import Header from '../components/layout/Header';
import FooterLayout from './FooterLayout';

export default function Default() {
  if (Check()) {
    return (
      <div className="flex min-h-screen flex-col bg-neutral-200 bg-opacity-50">
        <Header />
        <div className="mt-[64px]">
          <Outlet />
        </div>
        <FooterLayout />
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
