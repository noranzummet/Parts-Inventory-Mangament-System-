import { Outlet } from 'react-router-dom';
import Navbar from './navBar';

const Layout = () => (
  <>
    <Navbar />
    <main className="pt-20">
      <Outlet />
    </main>
  </>
);

export default Layout;
