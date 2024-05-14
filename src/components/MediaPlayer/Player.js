import React from 'react';
import { useSelector } from 'react-redux';
import BasePlayer from './BasePlayer';

function Player() {
  const { media, currentMediaIndex } = useSelector((state) => state.media);
  const currentMedia = media[currentMediaIndex];

  const renderPlayer = () => {
    if (!currentMedia) {
      return <div>Loading...</div>;
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
