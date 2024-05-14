import React, { useEffect } from 'react';

const PlayPauseToggle = ({ isPlaying, handlePlayPause }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 32) {
        handlePlayPause();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePlayPause]);

  return (
    <button onClick={handlePlayPause} className="btn text-white">
      {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
    </button>
  );
};

export default PlayPauseToggle;
