import React, { useState, useEffect, Fragment, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";
import parse from "html-react-parser";
import Bookmark from "../assets/bookmark.png";
import Snackbar from "@mui/material/Snackbar";
import { API } from "../config/api";

export default function Posts() {
  const [post, setPost] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClick = async () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <button onClick={handleClose}>close</button>
    </React.Fragment>
  );

  const getPosts = async () => {
    try {
      const response = await API.get("/posts");
      setPost(response.data.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmark = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await API.post("/addBookmark", config);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="md:mt-10">
        <h2 className="mb-4">All Post</h2>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Saved to bookmark."
          action={action}
        />

        <div className="grid grid-cols-4 gap-8 relative">
          {post.map((items, index) => (
            <div className="relative">
              <div
                onClick={handleBookmark}
                className="absolute z-10 top-48 right-0 cursor-pointer"
              >
                <img onClick={handleClick} src={Bookmark} alt="" />
              </div>
              <Link key={index} to={`/detail/${items.id}`}>
                <div>
                  <div>
                    <img src={items.thumbnail} alt="" className="h-44 w-full" />
                  </div>
                  <div className="md:mt-4">
                    <h3 className="text-xl">{items.title}</h3>
                  </div>
                  <div className="">
                    <p className="text-gray-500">
                      {dateFormat(items.createdAt, "mediumDate")},{" "}
                      {items.user.name}
                    </p>
                  </div>
                  <div className="md:my-4">
                    <p className="line-clamp-3">{parse(items.description)}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
