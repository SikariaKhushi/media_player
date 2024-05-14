import React, { useEffect } from 'react';

const SkipControl = ({ mediaRef }) => {
  const handleSkip = (seconds) => {
    if (mediaRef) {
      mediaRef.currentTime += seconds;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.keyCode) {
        case 37: // Left arrow key
          handleSkip(-10); // Skip backward by 10 seconds
          break;
        case 39: // Right arrow key
          handleSkip(10); // Skip forward by 10 seconds
          break;
        default:
          break;
      }
    };

    // Add event listener when component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSkip]);

  return (
    <>
      <button onClick={() => handleSkip(-10)} className="btn text-white">
        <i className="fas fa-backward"></i>
      </button>
      <button onClick={() => handleSkip(10)} className="btn text-white pl-6">
        <i className="fas fa-forward"></i>
      </button>
    </>
  );
};

export default SkipControl;
