import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Header.css';
import { Outlet, Link} from "react-router-dom";
import { authActions } from '../store';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=> state.isLoggedIn);
  return (
    <>
    <div className='nav'>
        <div className='logo'>Blog<span className='it'>it</span></div>
        <div className='link'>
          {!isLoggedIn && <Link to="/"><div className='lin'>HOME</div></Link>}
          {isLoggedIn && <Link to="/blogs"><div className='lin'>ALL BLOGS</div></Link>}
          {isLoggedIn && <Link to="/myBlogs"><div className='lin'>MY BLOGS</div></Link>}
          {isLoggedIn && <Link to="/blogs/add"><div className='lin'>ADD BLOG</div></Link>}
          {!isLoggedIn && <Link to="/auth"><div className='lin'>LOGIN</div></Link>}
          {isLoggedIn && <Link to="/auth" onClick={()=>dispatch(authActions.logout())}><div className='lin'>LOGOUT</div></Link>}
          <Outlet />
        </div>
    </div>
    </>
  )
}
export default Header;
