import React, { useEffect, useCallback } from 'react';

const FullScreen = ({ trackRef }) => {

  const enterFullscreen = useCallback(() => {
    const elem = trackRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
    }
  }, [trackRef]); // Memoize the function and include dependencies

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    }
  }, []); // Memoize the function

  const handleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  }, [enterFullscreen, exitFullscreen]); // Memoize the function and include dependencies

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        // Esc key pressed
        exitFullscreen();
      } else if (event.keyCode === 70) {
        // F key pressed
        handleFullScreen();
      }
    };

    // Add event listener when component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleFullScreen, exitFullscreen]); // Include handleFullScreen and exitFullscreen in the dependency array

  return (
    <button onClick={handleFullScreen} className="btn text-white pl-6">
      <i className="fas fa-expand"></i>
    </button>
  );
};

export default FullScreen;
