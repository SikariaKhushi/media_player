// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import mediaReducer from './mediaSlice';

export default configureStore({
  reducer: {
    media: mediaReducer,
  },
});
