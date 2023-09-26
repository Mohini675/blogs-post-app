import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import '../assests/css/Error.css'
import { useVisibilityContext } from "../context/VisibilityContext";

const Error = () => {

  //context api for visibility of navbar and footer
  const { address, setAddress } = useVisibilityContext();

  useEffect(() => {
    setAddress({ ...address, footer: false, navbar: false });
    console.log(address);
  }, []);

  {
    return (
     
      <div className="error">
        <div className="mars"></div>
        <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404" />
        <img
          src="https://assets.codepen.io/1538474/meteor.svg"
          className="meteor"
        />
        <p className="title">Oh no!!</p>
        <p className="subtitle">
        
          You’re either misspelling the URL <br /> or requesting a page that's
          no longer here.
        </p>
        <div align="center">
         
          <Link className="btn-back" to="/">
            Back to previous page
          </Link>
        </div>
        <img
          src="https://assets.codepen.io/1538474/astronaut.svg"
          className="astronaut"
        />
        <img
          src="https://assets.codepen.io/1538474/spaceship.svg"
          className="spaceship"
        />
      </div>
    );
  }
};

export default Error;
