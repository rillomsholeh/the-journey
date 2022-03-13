import React, { useState, useContext, useEffect } from "react";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import parse from "html-react-parser";

const Bookmark = () => {
  const [post, setPost] = useState([]);
  const [state] = useContext(UserContext);

  const getPosts = async () => {
    try {
      const response = await API.get(`/getBookmark/${state.user.id}`);
      setPost(response.data.data);
      //   console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return getPosts();
  }, []);

  return (
    <div className="md:w-9/12 md:m-auto">
      <div>My Bookmark</div>

      <div></div>
    </div>
  );
};

export default Bookmark;
