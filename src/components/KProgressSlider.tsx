import React from 'react';
import './KProgressSlider.scss';

function KProgressSlider({ progress, duration, onChange}) {
    return (
        <input
            type="range"
            min="0"
            max={duration}
            step="0.01"
            value={progress}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="progress-slider"
        />
    );
}

export default KProgressSlider;