import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NewBlog from "./NewBlog";
import BlogLogo from "../assests/img/logob.jpg";
import { MenuItems } from "../jsonData/MenuItem";
import { useVisibilityContext } from "../context/VisibilityContext";


const Navbar = () => {

  const location = useLocation();//for active menu
  const modalRef = useRef(null);

  //context api for visibility of navbar and footer
  const { address } = useVisibilityContext();

  //state
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  //handler for navbar collapse
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  //handler for open a modal for new blog
  const handleOpenModal = () => {
    modalRef.current.openModal();
  };

  
  return (
    <>
      <nav
        className="navbar navbar-expand-sm fixed-top navbar-light"
        style={{
          top: "20px",
          left: "5%",
          right: "5%",
          backgroundColor: "white",
          display: address.navbar ? "block" : "none",
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand fw-bold"
            style={{ color: "#222", fontSize: "1.5rem" }}
            to="/"
          >
            <img
              src={BlogLogo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            ></img>
            Blogs
          </Link>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-bs-target="#navbar1"
            aria-controls="navbar1"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${
              isNavCollapsed ? "collapse" : ""
            } navbar-collapse justify-content-end`}
            id="navbar1"
          >
            <ul className="navbar-nav">
              {MenuItems.map((items, index) => {
                return (
                  <li
                    key={index}
                    className="nav-item"
                    style={{ marginLeft: "10px" }}
                  >
                    <Link
                      className={`nav-link ${location.pathname===items.url ? "active": ""}`}
                      style={{ whiteSpace: "nowrap" }}
                      to={items.url}
                    >
                      <i
                        className={items.icon}
                        style={{ marginRight: "10px" }}
                      ></i>
                      {items.title}
                    </Link>
                  </li>
                );
              })}
              <li className="nav-item" style={{ marginLeft: "10px" }}>
                <button
                  className="nav-link btn btn-link"
                  onClick={handleOpenModal}
                >
                  <i
                    className="fa-solid fa-blog"
                    style={{ marginRight: "10px" }}
                  ></i>
                  New Blog
                </button>
              </li>
            </ul>
          </div>
        </div>
        <NewBlog ref={modalRef} />
      </nav>
    </>
  );
};

export default Navbar;
