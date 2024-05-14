import React, { useState, useEffect, useCallback } from 'react';

const VolumeControl = ({ mediaRef, volume, setVolume }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleMuteToggle = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setVolume(newMuted ? 0 : volume); // Set volume to 0 if muted, otherwise keep the current volume
    if (mediaRef && mediaRef.current) {
      mediaRef.current.muted = newMuted;
    }
  }, [isMuted, setIsMuted, setVolume, volume, mediaRef]);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume); // Update the volume state
    setIsMuted(newVolume === 0); // Update the mute state based on the new volume
    if (mediaRef && mediaRef.current) {
      mediaRef.current.volume = newVolume; // Set the volume on the media element
    }
  }, [setVolume, setIsMuted, mediaRef]);

  const handleMouseEnterVolume = () => {
    setShowVolumeSlider(true);
  };

  const handleMouseLeaveVolume = () => {
    setShowVolumeSlider(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent default behavior of Up and Down arrow keys
      if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 77) {
        event.preventDefault();
      }

      switch (event.keyCode) {
        case 38: // Up arrow key
          handleVolumeChange(Math.min(volume + 0.1, 1)); // Increase volume by 0.1
          break;
        case 40: // Down arrow key
          handleVolumeChange(Math.max(volume - 0.1, 0)); // Decrease volume by 0.1
          break;
        case 77: // M key
          handleMuteToggle(); // Toggle mute
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
  }, [volume, handleMuteToggle, handleVolumeChange]);

  useEffect(() => {
    const handleVolumeChangeOnMedia = () => {
      const newVolume = mediaRef.current.volume;
      setVolume(newVolume);
    };

    if (mediaRef) {
      mediaRef.addEventListener('volumechange', handleVolumeChangeOnMedia);

      return () => {
        mediaRef.removeEventListener('volumechange', handleVolumeChangeOnMedia);
      };
    }
  }, [mediaRef, setVolume]);

  return (
    <div className="flex items-center pl-6" onMouseLeave={handleMouseLeaveVolume}>
      <button
        type="button"
        className="text-white hover:text-indigo-700 rounded-full px-2 py-1 mr-2"
        onMouseEnter={handleMouseEnterVolume}
        onClick={handleMuteToggle}
      >
        <i className={isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'}></i>
      </button>
      <input
        type="range"
        id="volumeSlider"
        min="0"
        max="1"
        step="0.01" // Use a smaller step for smoother volume control
        value={volume}
        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
        disabled={isMuted}
        className={`w-full focus:outline-none rounded-full px-3 py-1 ${showVolumeSlider ? '' : 'hidden'}`}
      />
    </div>
  );
};

export default VolumeControl;
