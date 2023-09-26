import React from "react";

const ImgItem = (props) => {
  return (
    <>
      <div className="container-fluid px-0 py-0">
        <div id="main-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner position-relative">
            <div className="carousel-item active position-relative">
              <img
                src={props.backImg}
                className="d-block w-100 img-fluid object-fit-cover"
                alt="..."
                style={{height:"495px"}}
              />
              <div className="carousel-caption d-md-block">
                <h5 className={props.cname}>
                  {props.backTitle}
                </h5>
                <div className="text-left">
                  <p className="lead">
                   {props.slideContent}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
          </div>
       
        </div>
      </div>
    </>
  );
};

export default ImgItem;
