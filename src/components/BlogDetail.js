import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`https://as-blogit-backend.herokuapp.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`https://as-blogit-backend.herokuapp.com/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(blog);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
  };
  
  return (
    <div>
    {inputs &&      
    <form onSubmit={handleSubmit}>
    <div className="box2">
        <div className="log2">POST BLOG</div><br/>
        TITLE <br />
        <textarea className="inp2" name="title" onChange={handleChange} value={inputs.title} rows="3"></textarea><br />
        DESCRIPTION <br />
        <textarea className="inp2" name="description" onChange={handleChange} value={inputs.description} rows="6"></textarea><br/><br/>
        <div className="btnbox2"><input className="btn2" type="submit" value="POST"/></div>
    </div>
    </form> }
    </div>
  )
}

export default BlogDetail;