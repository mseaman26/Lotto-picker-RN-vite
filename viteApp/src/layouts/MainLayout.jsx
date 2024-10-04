import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../expoapp/components/Navbar/Navbar';
import { globalStyles } from '../../expoapp/styles/globalStyles';

const MainLayout = () => {
  return (
    <div style={styles.container}>
      <Navbar />  {/* This layout has the navbar */}
      <main style={{height: '100vh'}}>
        <Outlet />  {/* This renders the child routes */}
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: globalStyles.mainBG.backgroundColor,
    height: '100vh',
  },
  navbar: {
    height: '50px',
    backgroundColor: 'lightblue',
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default MainLayout;
