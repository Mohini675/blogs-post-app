// Modal.js
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import JoditEditor from "jodit-react";
import { useParams } from "react-router-dom";
import { updateBlog } from "../redux/action/BlogAction";
import { useToast } from "../context/ToastContext";

const EditBlog = forwardRef((props, ref) => {

  const editor = useRef(null);//for jodit editor
  const dispatch = useDispatch();

  //Selectors
  const categories = useSelector((state) => state.blogs.categories);
  const blogId = useParams();
  const { title, category, content, img } = props.currentBlog;

   //context Api for toast message
   const { showToast, validateFields } = useToast();

  //States
  const [isOpen, setIsOpen] = useState(false);//to open or close modal
  const [eBlog, seteBlog] = useState({
    id: parseInt(blogId.id),
    etitle: title,
    ecategory: category,
    econtent: content,
    edate: Date.now(),
    eimg: img,
  });


  // Function to open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Expose the openModal and closeModal functions via ref
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  //On text change 
  const onChange = (e) => {
    seteBlog({ ...eBlog, [e.target.name]: e.target.value });
  };

  //on content change
  const contentFieldChanged = (data) => {
    seteBlog({ ...eBlog, econtent: data });
  };

  //handler for update blog
  const handleEdit = (e) => {
    e.preventDefault();
    const error = validateFields(eBlog.etitle, eBlog.econtent, eBlog.ecategory);
    if (error !== null) {
      if (error.title) {
        showToast("error", error.title[0]);
      }
      if (error.content) {
        showToast("error", error.content[0]);
      }
      if (error.category) {
        showToast("error", error.category[0]);
      }
    } else {
      const updatedBlog = [];
      updatedBlog.id = eBlog.id;
      updatedBlog.title = eBlog.etitle;
      updatedBlog.category = eBlog.ecategory;
      updatedBlog.content = eBlog.econtent;
      updatedBlog.img = eBlog.eimg;
      updatedBlog.date = eBlog.edate;
      dispatch(updateBlog(updatedBlog));
      setIsOpen(false);
      showToast("success", "Blog updated!!!");
    }
  };
  
  //Function to clear the form
  const clearModal = () => {
    seteBlog({
      id: parseInt(blogId.id),
      etitle: "",
      ecategory: "",
      econtent: "",
      edate: Date.now(),
      eimg: "",
    });
  };
  
  return (
    <div>
      <button className="d-none" onClick={openModal}>
        Open Modal
      </button>

      <div
        className={`modal ${isOpen ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border rounded shadow border-secondary">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" style={{ color: "#da3524" }}>
                <i class="fa-solid fa-user-pen"></i> Edit Blog
              </h5>
              <button
                type="button"
                onClick={closeModal}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="container my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="etitle"
                    value={eBlog.etitle}
                    onChange={onChange}
                    aria-describedby="emailHelp"
                    placeholder="Enter here"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    name="ecategory"
                    value={eBlog.ecategory}
                    onChange={onChange}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option disabled value="">
                      --Select Category--
                    </option>
                    {categories.map((category, index) => {
                      return (
                        <option key={index} value={category.value}>
                          {category.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>

                  <JoditEditor
                    ref={editor}
                    value={eBlog.econtent}
                    tabIndex={1}
                    onChange={contentFieldChanged}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                onClick={handleEdit}
                type="button"
                className="btn btn-danger"
              >
                Update
              </button>
              <button
                onClick={clearModal}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Clear
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default EditBlog;
