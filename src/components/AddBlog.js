import React from 'react';
import { useState } from "react";
import axios from "axios";
import './AddBlog.css';
import { useNavigate } from "react-router-dom";


const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("https://as-blogit-backend.herokuapp.com/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };
  return ( 
    <div>        
    <form onSubmit={handleSubmit}>
    <div className="box2">
        <div className="log2">POST BLOG</div><br/>
        TITLE <br />
        <textarea className="inp2" name="title" onChange={handleChange} value={inputs.title} rows="3"></textarea><br />
        DESCRIPTION <br />
        <textarea className="inp2" name="description" onChange={handleChange} value={inputs.description} rows="6"></textarea><br/>
        IMAGE URL <br />
        <textarea className="inp2" name="image" onChange={handleChange} value={inputs.image} rows="3"></textarea><br /><br />
        <div className="btnbox2"><input className="btn2" type="submit" value="POST"/></div>
    </div>
    </form> 
    </div>
  )
}

export default AddBlog;