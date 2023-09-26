// Modal.js
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import JoditEditor from "jodit-react";
import { addBlog } from "../redux/action/BlogAction";
import { useToast } from "../context/ToastContext";

const NewBlog = forwardRef((props, ref) => {

  //hooks
  const editor = useRef(null);//for jodit editor
  const dispatch = useDispatch();

  //Selecctors for categories and allblogs
  const posts = useSelector((state) => state.blogs);
  const categories = useSelector((state) => state.blogs.categories);
  const allBlogs = posts.blogs
 
  //context Api for toast message
  const { showToast,validateFields } = useToast();

  //States
  const [isOpen, setIsOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    id: allBlogs.length !==0 ? allBlogs[allBlogs.length - 1].id +1 : 1,
    title: "",
    category: "",
    content: "",
    date: Date.now(),
  })
 
  
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

  //Function for fields change
  const onChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

   //Function for content change
   const contentFieldChanged = (data) => {
    setNewBlog({ ...newBlog, 'content': data});
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateFields(newBlog.title,newBlog.content,newBlog.category);
    console.log(error);
    if(error!== null){
    if(error.title){
      showToast('error',error.title[0]);
    }
    if(error.content){
      showToast('error',error.content[0]);
    }
    if(error.category){
      showToast('error',error.category[0]);
    }
  }
  else{
    dispatch(addBlog(newBlog));
    showToast('success',"Blog Created..")
    setIsOpen(false);
    clearModal();
  }
  
  };

   //Function to clear the form
   const clearModal = ()=>{
    setNewBlog({
      id: allBlogs.length !==0 ? allBlogs[allBlogs.length-1].id +1 : 1, 
      title:"",
      category: "",
      content: "",
      date: Date.now(),
    });
  }

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
              <h5 className="modal-title fw-bold" style={{color:"#da3524"}}><i class="fa-solid fa-plus"></i> Add Blog</h5>
              <button
                type="button"
                onClick={closeModal}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="container my-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={onChange}
                    value={newBlog.title}
                    aria-describedby="emailHelp"
                    placeholder="Enter here..."
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    onChange={onChange}
                    value={newBlog.category}
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
                    value={newBlog.content}
                    onChange={contentFieldChanged}
                  />
                </div>
                <div className="modal-footer justify-content-center">
            <button
                type="submit"
                className="btn btn-danger"
              >
                Add Blog
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
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
});

export default NewBlog;

