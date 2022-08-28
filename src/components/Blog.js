import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ title, description, image, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = () => { 
    navigate(`/myBlogs/${id}`);
  };
  
  const deleteRequest = async () => {
    const res = await axios 
      .delete(`https://as-blogit-backend.herokuapp.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          mt: 2,
          padding: 2,
          border:"2px black solid",
          borderRadius: "10px",
          ":hover": {
            boxShadow: "10px 10px 20px black",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="error" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              // className={classes.font}
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            >
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={userName}
        />
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt="img"
        />

        <CardContent>
          <br />
          <Typography
            // className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b><h1>{title}</h1></b>
            <br />
            {description}
          </Typography>
        </CardContent>
      </Card>
      {" "}
    </div>
  );
};

export default Blog;