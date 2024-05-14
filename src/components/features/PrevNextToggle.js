import React, { useEffect } from 'react';

const PrevNextToggle = ({ handlePrev, handleNext }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'p':
          handlePrev(); 
          break;
        case 'n': 
          handleNext(); 
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

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
