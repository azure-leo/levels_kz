import React from 'react'
import './App.css';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import SigninPage from './pages/SigninPage.tsx';
import EditPage from './pages/EditPage.tsx';
import CompanyPage from './pages/CompanyPage.tsx';
import Navbar from './components/Navbar.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SigninPage/>
    },
    {
      path: "/signin",
      element: <SigninPage/>
    },
    {
      path: "/signup",
      element: <SignupPage/>
    },
    {
      path: "/home",
      element: <MainPage/>
    },
    {
      path: "/edit",
      element: <EditPage/>
    },
    {
      path: "/company/:id", // New route for individual company pages
      element: <CompanyPage />
    }
  ])
  return (
     <div className="App">
      <Navbar />
      <RouterProvider router={router}/>
     </div>
   );
  }

export default App;
