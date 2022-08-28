import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import AddBlog from './components/AddBlog';
import BlogDetail from './components/BlogDetail';
import Home from './components/Home';
import { useEffect } from "react";
import { authActions } from "./store";

function App() {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state)=> state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);
  return <React.Fragment>
    <header>
      <Header />
    </header>
    <main>
      <Routes>
      {!isLoggedIn ? <>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        </> : <>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/add" element={<AddBlog />} />
        <Route path="/myBlogs" element={<UserBlogs />} />
        <Route path="/myblogs/:id" element={<BlogDetail />} />
      </>}
      </Routes>
    </main>
  </React.Fragment>
}

export default App;
