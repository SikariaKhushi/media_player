import React, { useEffect } from 'react';

const PlayPauseToggle = ({ isPlaying, handlePlayPause }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 32) {
        // Spacebar key pressed
        handlePlayPause();
      }
    };

    // Add event listener when component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePlayPause]);

  return (
    <button onClick={handlePlayPause} className="btn text-white">
      {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
    </button>
  );
};

export default PlayPauseToggle;
