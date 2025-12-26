import { Outlet } from 'react-router-dom';
import DashboardLayout from './navBar';

const Layout = () => {
  return (
    <div className="flex">
      {/* الـ Sidebar ثابت هنا */}
      <DashboardLayout /> 

      {/* المحتوى المتغير يظهر هنا */}
      <main className="flex-1 p-4 sm:mt-16">
        <Outlet /> 
      </main>
    </div>
  );
};
export default Layout;