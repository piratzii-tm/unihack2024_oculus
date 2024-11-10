import {forwardRef, useImperativeHandle, useState} from 'react';
import KProgressSlider from './KProgressSlider';
import './KSoundProgressPicker.scss';

const KSoundProgressPicker = forwardRef((_, ref)=> {
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    useImperativeHandle(ref, () => ({
        setProgress, setDuration: (param: number) => {
            console.log('setdurcalled')
            setDuration(param)
        }
    }));

    const formatTime = (seconds: number): string => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="sound-progress-picker">
            <KProgressSlider
                progress={progress}
                duration={duration}
                onChange={() => {}}
            />
            <span className="time">
                {formatTime(progress)} / {formatTime(duration)}
            </span>
        </div>
    );
})

export default KSoundProgressPicker;