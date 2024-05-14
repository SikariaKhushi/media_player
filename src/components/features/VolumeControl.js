import React, { useState, useEffect, useCallback } from 'react';

const VolumeControl = ({ mediaRef, volume, setVolume }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleMuteToggle = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setVolume(newMuted ? 0 : volume);
    if (mediaRef && mediaRef.current) {
      mediaRef.current.muted = newMuted;
    }
  }, [isMuted, setIsMuted, setVolume, volume, mediaRef]);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (mediaRef && mediaRef.current) {
      mediaRef.current.volume = newVolume;
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
      if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 77) {
        event.preventDefault();
      }

      switch (event.keyCode) {
        case 38:
          handleVolumeChange(Math.min(volume + 0.1, 1));
          break;
        case 40:
          handleVolumeChange(Math.max(volume - 0.1, 0));
          break;
        case 77: 
          handleMuteToggle(); 
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

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
        step="0.01"
        value={volume}
        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
        disabled={isMuted}
        className={`w-full focus:outline-none rounded-full px-3 py-1 ${showVolumeSlider ? '' : 'hidden'}`}
      />
    </div>
  );
};

export default VolumeControl;
