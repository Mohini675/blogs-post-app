// Modal.js
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditBlog from "./EditBlog";
import { deleteBlog, toggleLike } from "../redux/action/BlogAction";
import Error from "./Error";
import { useToast } from "../context/ToastContext";

const ViewBlog = () => {
  //hooks
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const blogId = useParams();

  //context api for toast notification
  const { showToast } = useToast();

  //Selector for all blogs
  const posts = useSelector((state) => state.blogs);
  const allBlogs = posts.blogs;

  let currentBlog = null;

  try {
    currentBlog = allBlogs.filter((b) => b.id === parseInt(blogId.id));
  } catch (error) {
    navigate("*");
  }

  //handler to open modal
  const handleOpenModal = () => {
    modalRef.current.openModal();
  };

  //handler for delete
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteBlog(blogId.id));
    showToast("success", "Blog Deleted!!");
    navigate("/");
  };

  //handler for toogleLike
  const handleToggleLike = (blogId) => {
    dispatch(toggleLike(blogId));
  };

  if (currentBlog === null) {
    navigate("*");
  }
  return (
    <>
      {currentBlog[0] ? (
        <div className="container">
          <div
            className="card shadow mb-5 border border-2"
            style={{ marginTop: "90px", width: "80%", left: "10%" }}
          >
            <div className="row d-flex">
              <div className="col-md-7 card-header fw-bold ms-3">
                <h3 className="">{currentBlog[0].title}</h3>
              </div>
              <div className="col-md-4 mt-2 ms-1">
                <button
                  type="button"
                  className="btn btn-primary border-0"
                  onClick={() => {
                    handleToggleLike(blogId.id);
                  }}
                >
                  {currentBlog[0].isLiked ? (
                    <span>
                      <i className="fa-solid fa-thumbs-down ms-2"></i> Unlike
                    </span>
                  ) : (
                    <span>
                      <i className="fa-solid fa-thumbs-up ms-2"></i> Like
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-warning border-0 ms-2"
                  onClick={handleOpenModal}
                >
                  <i
                    className="fa-solid fa-pen-to-square"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-2 border-0"
                  onClick={handleDelete}
                >
                  <i
                    className="fa-solid fa-trash"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Delete
                </button>
              </div>
            </div>

            <div className="card-body">
              <p className="card-text text-muted">
                Last updated{" "}
                <code>{new Date(currentBlog[0].date).toUTCString()}</code> on
                Category{" "}
                <b>
                  <code>{currentBlog[0].category}</code>
                </b>
              </p>

              <img
                className="rounded w-50 shadow img-thumbnail img-fluid"
                src={
                  currentBlog[0].img
                    ? currentBlog[0].img
                    : "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt="img"
              />

              <h3 className="card-title mt-4 fw-bold">Content</h3>
              <p className="card-text">
                <span
                  dangerouslySetInnerHTML={{ __html: currentBlog[0].content }}
                ></span>
              </p>
            </div>
          </div>
          <EditBlog ref={modalRef} currentBlog={currentBlog[0]} />
        </div>
      ) : (
        <Error />
      )}
    </>
  );
};
export default ViewBlog;
