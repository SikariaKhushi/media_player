import React, { useEffect, useCallback, useState } from 'react';

const ProgressBar = ({ mediaRef, onCurrentTimeChange, onTotalTimeChange }) => {
  const [progress, setProgress] = useState(0);

  const updateTime = useCallback(() => {
    if (mediaRef) {
      const currentTime = mediaRef.currentTime;
      const duration = mediaRef.duration;
      setProgress((currentTime / duration) * 100 || 0);
      onCurrentTimeChange(currentTime); 
      onTotalTimeChange(duration);
    }
  }, [mediaRef, onCurrentTimeChange, onTotalTimeChange]);

  useEffect(() => {
    if (mediaRef) {
      mediaRef.addEventListener('timeupdate', updateTime);
      return () => {
        mediaRef.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [mediaRef, updateTime]);

  const handleSeek = (e) => {
    if (mediaRef) {
      const rect = e.target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = offsetX / width;
      const duration = mediaRef.duration;
      mediaRef.currentTime = duration * percentage;
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-16 flex justify-between items-center">
      <div className="relative w-full">
        <div className="h-1 bg-gray-300 cursor-pointer" onClick={handleSeek}>
          <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
