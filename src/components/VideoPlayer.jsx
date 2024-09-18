import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoId, isOpen, onClose }) => {
if (!isOpen) return null;

  return (
    <div className={`dialog-backdrop ${isOpen ? 'open' : ''}`}>
        <dialog open={isOpen} className="dialog-container">
            <iframe className='video'
                width={500}
                height={316}
                sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                src={`https://youtube.com/embed/${videoId}?autoplay=0`}>
            </iframe>
            <button onClick={onClose}>Close</button>
        </dialog>
    </div>
  );
};

export default VideoPlayer;