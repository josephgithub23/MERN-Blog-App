import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { pending, setPending, blogList, setBlogList } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blog");
    const result = await response.data;
    console.log(result);

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }

  async function handleDeleteBlog(getCurrentId) {
    const response = await axios.delete(
      `http://localhost:5000/api/blog/delete/${getCurrentId}`
    );
    const result = await response.data;

    if (result?.message) {
      fetchListOfBlogs();
      /**Other option to to update the items deleted, useNavigate(0) */
      // navigate(0);
    }
  }

  async function handleEdit(getCurrentBlogItem) {
    console.log(getCurrentBlogItem);
    navigate("/add-blog", { state: { getCurrentBlogItem } });
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1> Blog List</h1>
      {pending ? (
        <h1>Loading Blogs ! Please Wait</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div key={blogItem.id}>
                <p>{blogItem.title}</p>
                <p>{blogItem.description}</p>
                <FaEdit
                  className={classes.icon}
                  onClick={() => handleEdit(blogItem)}
                  size={30}
                />
                <FaTrash
                  className={classes.icon}
                  onClick={() => handleDeleteBlog(blogItem._id)}
                  size={30}
                />
              </div>
            ))
          ) : (
            <h3>No Blogs Added</h3>
          )}
        </div>
      )}
    </div>
  );
}
