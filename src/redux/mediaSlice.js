// src/redux/mediaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  media: [
    { id: 1, type: 'audio', url: '/assets/audioFiles/audio1.mp3' },
    { id: 2, type: 'video', url: '/assets/videoFiles/video1.mp4' },
    { id: 3, type: 'audio', url: '/assets/audioFiles/audio2.mp3' },
    { id: 4, type: 'audio', url: '/assets/audioFiles/audio3.mp3' },
    { id: 5, type: 'video', url: '/assets/videoFiles/video2.mp4' },
  ],
  currentMediaIndex: 0,
  isPlaying: false,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    playPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    nextMedia: (state) => {
      state.currentMediaIndex = (state.currentMediaIndex + 1) % state.media.length;
    },
    prevMedia: (state) => {
      state.currentMediaIndex = (state.currentMediaIndex - 1 + state.media.length) % state.media.length;
    },
  },
});

export const { playPause, nextMedia, prevMedia } = mediaSlice.actions;
export default mediaSlice.reducer;
