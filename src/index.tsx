import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AlgoContext from './components/context/AlgoContext';
import Root from './components/Root';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Root/>
  },
  {
    path:"/sortingAlgos",
    element:<App/>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <React.StrictMode>
    <AlgoContext>
    
    <RouterProvider router={router} />
    </AlgoContext>
  </React.StrictMode>

);
  
reportWebVitals();
