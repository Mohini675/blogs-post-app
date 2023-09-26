import {
  ADD_BLOG,
  DELETE_BLOG,
  TOGGLE_LIKE,
  UPDATE_BLOG,
} from "./actionTypes/BlogTypes";

//action creators
export const addBlog = (blog) => {
  return {
    type: ADD_BLOG,
    payload: blog,
  };
};

export const updateBlog = (updatedBlog) => {
  return {
    type: UPDATE_BLOG,
    payload: updatedBlog,
  };
};

export const deleteBlog = (blogId) => {
  return {
    type: DELETE_BLOG,
    payload: blogId,
  };
};

export const toggleLike = (blogId) => {
  return {
    type: TOGGLE_LIKE,
    payload: blogId,
  };
};
