import React, { useEffect, useRef, useState } from 'react';
import audioimg from '../MediaPlayer/audio1.jpg';

const MinimizedPlayer = ({ onClose, onExpand, url, type, currentTime, onCurrentTimeChange }) => {
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let currentMediaRef = mediaRef.current;
    
    if (currentMediaRef) {
      currentMediaRef.currentTime = currentTime;
      currentMediaRef.play().then(() => {
        setIsPlaying(true);
      }).catch(error => console.error('Error playing media:', error));
    }
    
    return () => {
      if (currentMediaRef) {
        currentMediaRef.pause();
      }
    };
  }, [url, type, currentTime]);
  

  useEffect(() => {
    const updateCurrentTime = () => {
      if (mediaRef.current) {
        onCurrentTimeChange(mediaRef.current.currentTime);
      }
    };

    if (isPlaying) {
      const intervalId = setInterval(updateCurrentTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isPlaying, onCurrentTimeChange]);

  const toggleExpand = () => {
    onExpand();
  };

  return (
    <div
      className="fixed bottom-2 right-2 bg-black rounded-lg overflow-hidden transition-all duration-300"
      style={{
        width: '300px',
        height: '169px',
        position: 'fixed',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {type === 'audio' ? (
          <div>
            <img src={audioimg} alt="Audio Cover" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            <audio
              ref={mediaRef}
              src={url}
              autoPlay
              className="w-full h-full outline-none"
              controls={false}
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
        ) : (
          <video
            ref={mediaRef}
            src={url}
            autoPlay
            className="w-full h-full object-cover outline-none"
            controls={false}
          />
        )}
        <div className="absolute top-2 left-2 p-2">
          <button onClick={onClose} className="text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="absolute top-2 right-2 p-2">
          <button onClick={toggleExpand} className="text-white">
            <i className="fas fa-expand"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinimizedPlayer;
