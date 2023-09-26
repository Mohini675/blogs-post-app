import React from "react";
import ImgItem from "../components/ImgItem";
import Blogs from "../components/Blogs";
import { useEffect } from "react";
import { useVisibilityContext } from "../context/VisibilityContext";

const Home = () => {
  //context api for navbar and footer
  const { address, setAddress } = useVisibilityContext();

  useEffect(() => {
    setAddress({ ...address, footer: true, navbar: true });
    console.log("");
  }, []);

  return (
    <>
      <ImgItem
        backImg="https://images.unsplash.com/photo-1682685796852-aa311b46f50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        backTitle="Take the first step of your Blog"
        slideContent="Stay Curious. Stay Inspired. Explore the World."
        cname="display-4 text-uppercase"
      />
      <Blogs />
    </>
  );
};

export default Home;
