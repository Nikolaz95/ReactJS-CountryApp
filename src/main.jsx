import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import './index.css'
import Root from './components/Root.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import ErrorPage from '../src/pages/ErrorPage/ErrorPage.jsx';
import CoutryDetails from './pages/ContryInfo/CoutryDetails.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: "*",
        element: <ErrorPage />
      },
      {
        path: '/country/:name',
        element: <CoutryDetails />
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
