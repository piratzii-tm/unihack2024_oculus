import React from 'react';
import './KPLayButton.scss';

interface KPlayButtonProps {
    isPlaying: boolean;
    onClick: () => void;
}

function KPlayButton({ isPlaying, onClick })  {
    return (
        <button className="play-button" onClick={onClick}>
            {isPlaying ? 'Pause' : 'Play'}
        </button>
    )
}

export default KPlayButton;