import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePageVite.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx';
import LoginPage from './pages/LoginPageVite.jsx';
import SignupPage from './pages/SignupPageVite.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import ProtectedRoute from './viteComponents/ProtectedRoute.jsx';
import AuthProvider from '../expoapp/context/AuthContext.jsx';
import LoggedOutLayout from './layouts/LoggedOutLayout.jsx';
import LottoGamePage from './pages/LottoGamePageVite.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Main layout for the application
    errorElement: <ErrorPage />, // Error boundary for the main layout
    children: [
      {
        index: true, // Default route for '/'
        element: <ProtectedRoute><HomePage /></ProtectedRoute>, // HomePage will be shown when at '/'
      },
      {
        path: 'lottoGame/:lottoGame', // Nested route under the main layout
        element: <ProtectedRoute><LottoGamePage /></ProtectedRoute>,
      },
      {
        path: 'profile',
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
      },
    ],
  },
  {
    path: '/login', // Dedicated route for the login page
    element: <LoggedOutLayout />, // Layout specifically for logged-out users
    children: [
      {
        index: true, // This will render the login page when navigating to '/login'
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/signup', // Dedicated route for the login page
    element: <LoggedOutLayout />, // Layout specifically for logged-out users
    children: [
      {
        index: true, // This will render the login page when navigating to '/login'
        element: <SignupPage />,
      },
    ],
  },
]);

// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
