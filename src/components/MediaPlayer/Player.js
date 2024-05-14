// src/components/Player.js
import React from 'react';
import { useSelector } from 'react-redux';
import BasePlayer from './BasePlayer';

function Player() {
  const { media, currentMediaIndex } = useSelector((state) => state.media); // Destructure media and currentMediaIndex
  const currentMedia = media[currentMediaIndex]; // Access currentMedia using currentMediaIndex

  const renderPlayer = () => {
    if (!currentMedia) {
      return <div>Loading...</div>; // Add a loading state or handle if currentMedia is not available
    }

    switch (currentMedia.type) {
      case 'audio':
        return <BasePlayer url={currentMedia.url} type="audio" />;
      case 'video':
        return <BasePlayer url={currentMedia.url} type="video"/>;
      default:
        return <div>Unsupported media type</div>;
    }
  };

  return (
    <div className="player-container">
      {renderPlayer()}
    </div>
  );
}

export default Player;
