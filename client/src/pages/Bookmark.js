import React, { useState, useContext, useEffect } from "react";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import parse from "html-react-parser";

const Bookmark = () => {
  const [post, setPost] = useState([]);
  const [state] = useContext(UserContext);
  // const [user, setUser] = useState([]);

  const path = "http://localhost:5000/uploads/";

  const getBookmark = async () => {
    try {
      const response = await API.get(`/getBookmark/${state.user.id}`);
      setPost(response.data.bookmarkData);
      // setUser(response.data.bookmarkData);
      console.log(response.data.bookmarkData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookmark();
  }, []);

  return (
    <div className="md:w-9/12 md:m-auto">
      <div className="md:mt-10">
        <h1 className="text-3xl">My Bookmark</h1>
      </div>

      <div className="grid grid-cols-4 gap-8 relative">
        {post.map((items, index) => (
          <div className="relative shadow-lg p-2">
            <div
              // onClick={() => handleBookmark(items.id)}
              className="absolute z-10 top-48 right-0 cursor-pointer"
            >
              <img
                // onClick={handleClick}
                src={Bookmark}
                alt=""
              />
            </div>
            <Link key={index} to={`/detail/${items.id}`}>
              <div>
                <div>
                  <img
                    src={path + items.bookmark.thumbnail}
                    alt=""
                    className="h-44 w-full object-cover"
                  />
                </div>
                <div className="md:mt-4">
                  <h3 className="text-xl">{items.bookmark.title}</h3>
                </div>
                <div className="">
                  <p className="text-gray-500">
                    {dateFormat(items.createdAt, "mediumDate")},
                    {items.user.name}
                  </p>
                </div>
                <div className="md:my-4">
                  <p className="line-clamp-3">
                    {parse(items.bookmark.description)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
