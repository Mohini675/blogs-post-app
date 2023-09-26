import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NewBlog from "./NewBlog";


const Blogs = () => {
 //useRef for new blog modal
  const modalRef = useRef(null);

  //selector to get a all blogs
  const posts = useSelector((state) => state.blogs);
  const allBlogs = posts.blogs;

  //handler to open a modal of new blog if there is no blog in page page 
  const handleOpenModal = () => {
    modalRef.current.openModal();
  };
  
  return (
    <>
      <div
        className="container-fluid p-5"
      >
         <h1 className="fw-bold mb-4">Blogs Posts</h1>
        {allBlogs.length !== 0 ? <div className="row">
          {allBlogs.map((blog, index) => {
            return (
              <div key={index} className="col-lg-3 mb-4">
                <div className="card h-card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      position: "absolute",
                      right: "0",
                    }}
                  >
                    <span className=" badge rounded-pill text-bg-warning" style={{fontSize:".8rem"}}>
                      {blog.category}
                    </span>
                  </div>
                  <img
                    src={
                      blog.img
                        ? blog.img
                        : "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    }
                    alt="img"
                    className="card-img-top"
                    style={{ width: "100%", height: "250px" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="text-muted text-uppercase">
                      posted on {new Date(blog.date).toGMTString()}
                    </h6>
                    <h5 className="card-title text-uppercase">{blog.title.length>25 ? blog.title.substring(0,20)+"..." : blog.title}</h5>
                    <div className="text-muted">
                      <p className="class-text"><span dangerouslySetInnerHTML={{__html:blog.content.substring(0,195)+"..."}}></span></p>
                      <div className="p text-capitalize">
                        <Link className="btn btn-sm btn-dark" to={`/viewblog/${blog.id}`}>
                          Continue Reading{" "}
                          <i className="fas fa-long-arrow-alt-right ml-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        
        </div>
: <h3><i className="fa-regular fa-face-frown-open"></i> No Blogs !!<button className="btn btn-link" style={{fontSize:"26px",marginBottom:"10px"}} onClick={handleOpenModal}>Add it First</button></h3>}
      <NewBlog ref={modalRef} />
      </div>
      
    </>
  );
};

export default Blogs;
