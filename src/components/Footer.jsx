import React from "react";
import { useVisibilityContext } from "../context/VisibilityContext";

const Footer = () => {

   //context api for visibility of navbar and footer
  const{address} = useVisibilityContext();

  const hrStyle={
    border: "1px solid black",
    right: "5%" ,
    marginTop:"10px",
    marginBottom:"10px",
  }
  return (
    <div style={{display: address.footer ? 'block' : 'none'}}>
    <div ><hr style={hrStyle}/></div>
      <footer>
        <div className="container-fluid bg-dark py-1">
          <p className="text-white text-center text-capitalize">
            all rights reserved &copy;2023
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
