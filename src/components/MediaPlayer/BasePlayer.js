import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { playPause, prevMedia, nextMedia } from '../../redux/mediaSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import audioimg from "./audio1.jpg";
import FullScreenToggle from '../features/FullScreen.js';
import PlaybackSpeedControl from '../features/PlaybackSpeed.js';
import SkipControl from '../features/SkipControl.js';
import VolumeControl from '../features/VolumeControl.js';
import PrevNextToggle from '../features/PrevNextToggle.js';
import PlayPauseToggle from '../features/PlayPauseToggle.js';
import ProgressBar from '../features/ProgressBar.js';
import MinimizedPlayer from './MinimizedPlayer.js';

const BasePlayer = ({ url, type }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.media.isPlaying);
  const [mediaRef, setMediaRef] = useState(null);
  const trackRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleClose = () => {
    setIsMinimized(false);
  };

  const handleExpand = () => {
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleCurrentTimeChange = (time) => {
    setCurrentTime(time);
  };

  const handleTotalTimeChange = (time) => {
    setTotalTime(time);
  };

  const handleMinimizedCurrentTimeChange = (time) => {
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleMediaLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (mediaRef) {
      mediaRef.addEventListener('loadedmetadata', handleMediaLoaded);

      if (isPlaying) {
        mediaRef.currentTime = currentTime; // Set current playback position
        mediaRef.play().catch(error => console.error('Error playing media:', error));
      } else {
        mediaRef.pause();
      }

      return () => {
        mediaRef.removeEventListener('loadedmetadata', handleMediaLoaded);
      };
    }
  }, [mediaRef, handleMediaLoaded, isPlaying, currentTime]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'w') {
        handleMinimize();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setShowControls(!isLoading);
  }, [isLoading]);

  return (
    <div className="relative h-screen bg-black" onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <ClipLoader color="#ffffff" loading={true} />
        </div>
      )}
      {!isMinimized ? (
        <div ref={trackRef} className="absolute inset-0 overflow-hidden">
          {type === 'audio' ? (
            <div className="relative h-full">
              <img src={audioimg} alt="Audio Cover" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
              <audio
                ref={(element) => setMediaRef(element)}
                src={url}
                autoPlay
                className="w-full outline-none"
                volume={volume}
                controls={false}
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
          ) : (
            <div className="relative h-full">
              <video
                ref={(element) => setMediaRef(element)}
                src={url}
                autoPlay
                className="absolute inset-0 w-full h-full object-cover outline-none"
                volume={volume}
              />
            </div>
          )}
          {showControls && (
            <ProgressBar
              mediaRef={mediaRef}
              onCurrentTimeChange={handleCurrentTimeChange}
              onTotalTimeChange={handleTotalTimeChange}
            />
          )}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 flex justify-between items-center">
              <div className="flex items-center">
                <PlayPauseToggle isPlaying={isPlaying} handlePlayPause={() => dispatch(playPause())} />
                <PrevNextToggle handlePrev={() => dispatch(prevMedia())} handleNext={() => dispatch(nextMedia())} />
                <VolumeControl
                  mediaRef={mediaRef}
                  volume={volume}
                  setVolume={setVolume}
                />
                <div className="text-gray-400 mr-2 pl-4">
                  {formatTime(currentTime)} / {formatTime(totalTime)}
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={handleMinimize}>
                  <FontAwesomeIcon icon={faCompressAlt} style={{ color: 'white', paddingRight: "2rem" }} />
                </button>
                <SkipControl mediaRef={mediaRef} />
                <PlaybackSpeedControl
                  playbackRate={playbackRate}
                  setPlaybackRate={setPlaybackRate}
                  mediaRef={mediaRef}
                />
                <FullScreenToggle trackRef={trackRef} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <MinimizedPlayer
          onClose={handleClose}
          onExpand={handleExpand}
          url={url}
          type={type}
          currentTime={currentTime}
          onCurrentTimeChange={handleMinimizedCurrentTimeChange}
        />
      )}
    </div>
  );
};

export default BasePlayer;
