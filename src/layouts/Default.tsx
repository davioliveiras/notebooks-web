import {Navigate, Outlet} from 'react-router-dom';
import {Check} from '../libs/cookies';
import Header from '../components/layout-items/Header';
import FooterLayout from '../components/layout-items/LayoutFooter';

export default function Default() {
  if (Check()) {
    return (
      <div className="flex min-h-screen flex-col bg-neutral-200 bg-opacity-50">
        <Header />
        <div className="mb-10 mt-[64px] flex grow justify-center">
          <Outlet />
        </div>
        <FooterLayout />
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
