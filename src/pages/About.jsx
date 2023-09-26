import React from "react";
import ImgItem from "../components/ImgItem";
import { AboutData } from "../jsonData/AboutData";
import { useEffect } from "react";
import { useVisibilityContext } from "../context/VisibilityContext";

const About = () => {
  
  //context api for visibility of navbar and footer
  const { address, setAddress } = useVisibilityContext();

  useEffect(() => {
    const setVisibility = () => {
      setAddress({ ...address, footer: true, navbar: true });
      console.log("");
    };
    setVisibility();
  }, []);

  return (
    <>
      <div>
        <ImgItem
          backImg="https://images.unsplash.com/photo-1612565775767-97a9fffef857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1804&q=80"
          backTitle="About"
          slideContent="Join us and share personal experiences."
          cname="display-4 text-uppercase fw-bold"
        />
      </div>
      <div className="container p-5">
        {AboutData.map((aboutdata, index) => {
          return (
            <div key={index} className="card mb-5 shadow">
              <div key={index} className="row g-0">
                <div className="col-md-4">
                  <img
                    src={aboutdata.imgsrc}
                    className="img-fluid rounded- w-100"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h3 className="card-title text-uppercase fw-bold">
                      {aboutdata.title}
                    </h3>
                    <p className="card-text">{aboutdata.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default About;
