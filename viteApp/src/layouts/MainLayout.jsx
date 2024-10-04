import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../expoapp/components/Navbar/Navbar';

const MainLayout = () => {
  return (
    <div>
      <Navbar />  {/* This layout has the navbar */}
      <main style={{height: '100vh'}}>
        <Outlet />  {/* This renders the child routes */}
      </main>
    </div>
  );
};

export default MainLayout;
