import React from "react";
import { useState } from "react";
import './Login.css';
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const naviagte = useNavigate();
    const dispath = useDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isSignup, setIsSignup] = useState(false);
    const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };
    const sendRequest = async (type = "login") => {
        const res = await axios
        .post(`https://as-blogit-backend.herokuapp.com/api/user/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password,
        })
        .catch((err) => console.log(err));
    
        const data = await res.data;
        console.log(data);
        return data;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if (isSignup) {
          sendRequest("signup")
            .then((data) => localStorage.setItem("userId", data.user._id))
            .then(() => dispath(authActions.login()))
            .then(() => naviagte("/blogs"));
        } else {
          sendRequest()
            .then((data) => localStorage.setItem("userId", data.user._id))
            .then(() => dispath(authActions.login()))
            .then(() => naviagte("/blogs"));
        }
      };
    return (
        <form onSubmit={handleSubmit}>
        <div className="box">
            <div className="log">{isSignup ? "SIGNUP" : "LOGIN"}</div><br/>
            {isSignup && <><div><input type="text" name="name" onChange={handleChange} placeholder="NAME" value={inputs.name} /></div><br/></>}
            <div><input type="email"  name="email" onChange={handleChange} placeholder="EMAIL" value={inputs.email} /></div><br/>
            <div><input type="password" name="password" onChange={handleChange} placeholder="PASSWORD" value={inputs.password} /></div><br/>
            <div className="btnbox"><input className="btn" type="submit" value="SUBMIT" />
            <input className="btn" onClick={()=>setIsSignup(!isSignup)} type="button" value={isSignup ? "LOGIN" : "SIGNUP"} />
            </div>
        </div>
        </form> 
    )
}

export default Login;