import { BlogsData, Categories } from "../../jsonData/BlogData";
import {
  ADD_BLOG,
  DELETE_BLOG,
  TOGGLE_LIKE,
  UPDATE_BLOG,
} from "../action/actionTypes/BlogTypes";

const initialState = { blogs: BlogsData, categories: Categories };

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BLOG:
      const newBlog = action.payload;
      return {
        ...state,
        blogs: [...state.blogs, newBlog],
      };
    case UPDATE_BLOG:
      const updatedBlog = action.payload;
      console.log(updatedBlog);
      const updatedBlogs = state.blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      return {
        ...state,
        blogs: updatedBlogs,
      };

    case DELETE_BLOG:
      const deletedBlogId = action.payload;
      const updateBlogs = state.blogs.filter(
        (blog) => blog.id !== parseInt(deletedBlogId)
      );
      return {
        ...state,
        blogs: updateBlogs,
      };
    case TOGGLE_LIKE:
      const toggledBlogId = action.payload;
      const likedBlogs = state.blogs.map((blog) =>
        blog.id === parseInt(toggledBlogId)
          ? { ...blog, isLiked: !blog.isLiked }
          : blog
      );
      console.log(likedBlogs);
      return {
        ...state,
        blogs: likedBlogs,
      };
    default:
      return state;
  }
};

export default reducers;
