import BlogReducer from '../reducer/BlogReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer:{
      blogs: BlogReducer
    }
  })