import React from 'react';
import './KProgressSlider.scss';

function KProgressSlider({ progress, duration, onChange }) {
    const progressPercentage = (progress / duration) * 100 + '%';

    return (
        <input
            type="range"
            min="0"
            max={duration}
            step="0.01"
            value={progress}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="progress-slider"
            style={{ '--progress': progressPercentage }}
        />
    );
}

export default KProgressSlider;