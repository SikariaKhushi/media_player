import React, { useEffect, useCallback } from 'react';

const SkipControl = ({ mediaRef }) => {
  const handleSkip = useCallback((seconds) => {
    if (mediaRef) {
      mediaRef.currentTime += seconds;
    }
  }, [mediaRef]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.keyCode) {
        case 37:
          handleSkip(-10);
          break;
        case 39:
          handleSkip(10);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

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
