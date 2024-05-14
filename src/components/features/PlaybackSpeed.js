import React, { useState } from 'react';

const PlaybackSpeed = ({ playbackRate, setPlaybackRate, mediaRef }) => {
  const [showPlaybackSpeedOptions, setShowPlaybackSpeedOptions] = useState(false);

  const togglePlaybackSpeedOptions = () => {
    setShowPlaybackSpeedOptions(!showPlaybackSpeedOptions);
  };

  const playbackSpeedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const handlePlaybackSpeedSelect = (speed) => {
    handlePlaybackRateChange({ target: { value: speed } });
    setShowPlaybackSpeedOptions(false); // Close the dropdown after selecting an option
  };

  const handlePlaybackRateChange = (e) => {
    const newPlaybackRate = parseFloat(e.target.value);
    setPlaybackRate(newPlaybackRate);
    if (mediaRef) {
      mediaRef.playbackRate = newPlaybackRate;
    }
  };

  return (
    <div className="relative pl-6">
      {showPlaybackSpeedOptions && (
        <ul
          className="absolute bottom-full left-0 bg-gray-800 text-white p-2 rounded"
          onMouseEnter={() => setShowPlaybackSpeedOptions(true)} // Keep the dropdown open when hovering over it
          onMouseLeave={() => setShowPlaybackSpeedOptions(false)} // Close the dropdown when leaving it
        >
          {playbackSpeedOptions.map((speed, index) => (
            <li key={index} onClick={() => handlePlaybackSpeedSelect(speed)} className="cursor-pointer">
              {speed}x
            </li>
          ))}
        </ul>
      )}
      <button
        onMouseEnter={() => setShowPlaybackSpeedOptions(true)} // Open the dropdown when hovering over the button
        onMouseLeave={() => setShowPlaybackSpeedOptions(false)} // Close the dropdown when leaving the button
        onClick={togglePlaybackSpeedOptions}
        className="btn text-white relative"
      >
        <i className="fas fa-tachometer-alt"></i>
      </button>
    </div>
  );
};

export default PlaybackSpeed;
