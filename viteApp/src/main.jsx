import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePageVite.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx';
import LoginPage from './pages/LoginPageVite.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import ProtectedRoute from './viteComponents/ProtectedRoute.jsx';
import AuthProvider from '../expoapp/context/AuthContext.jsx';
import LoggedOutLayout from './layouts/LoggedOutLayout.jsx';
import LottoGamePage from './pages/LottoGamePageVite.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoggedOutLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'lottoGame/:lottoGame',
        element: <LottoGamePage />,
      }
    ],
  },
]);

// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
