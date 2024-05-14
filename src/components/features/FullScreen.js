import React, { useEffect, useCallback } from 'react';

const FullScreen = ({ trackRef }) => {

  const enterFullscreen = useCallback(() => {
    const elem = trackRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { 
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { 
      elem.webkitRequestFullscreen();
    }
  }, [trackRef]);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }, []);

  const handleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  }, [enterFullscreen, exitFullscreen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        exitFullscreen();
      } else if (event.keyCode === 70) {
        handleFullScreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleFullScreen, exitFullscreen]);

  return (
    <button onClick={handleFullScreen} className="btn text-white pl-6">
      <i className="fas fa-expand"></i>
    </button>
  );
};

export default FullScreen;
