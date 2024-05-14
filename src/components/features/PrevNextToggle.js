import React, { useEffect } from 'react';

const PrevNextToggle = ({ handlePrev, handleNext }) => {
  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'p': // 'P' key
        handlePrev(); // Play previous media
        break;
      case 'n': // 'N' key
        handleNext(); // Play next media
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener('keydown', handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handlePrev, handleNext]);

  return (
    <div className="flex items-center">
      <button onClick={handlePrev} className="btn text-white pl-6">
        <i className="fas fa-step-backward"></i>
      </button>
      <button onClick={handleNext} className="btn text-white pl-6">
        <i className="fas fa-step-forward"></i>
      </button>
    </div>
  );
};

export default PrevNextToggle;
