import { useRef, useState, useEffect } from 'react';
import ReactHowler from 'react-howler';
import KPlayButton from './KPlayButton';
import KProgressSlider from './KProgressSlider';
import './KSoundProgressPicker.scss';

function KSoundProgressPicker() {
    const soundRef = useRef<ReactHowler | null>(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        soundRef.current = new ReactHowler({
            src: ['path/to/your/sound.mp3'],
            onLoad: () => setDuration(soundRef.current!.duration()),
            onEnd: () => setIsPlaying(false),
        });
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(soundRef.current!.seek() as number);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleProgressChange = (newProgress: number) => {
        setProgress(newProgress);
        soundRef.current!.seek(newProgress);
    };

    return (
        <div className="sound-progress-picker">
            <ReactHowler
                src="path/to/your/sound.mp3"
                playing={isPlaying}
                ref={soundRef}
                onLoad={() => setDuration(soundRef.current!.duration())}
                onEnd={() => setIsPlaying(false)}
            />
            <KPlayButton isPlaying={isPlaying} onClick={() => setIsPlaying(!isPlaying)} />
            <KProgressSlider
                progress={progress}
                duration={duration}
                onChange={handleProgressChange}
            />
            <span className="time">
                {progress.toFixed(2)} / {duration.toFixed(2)} seconds
            </span>
        </div>
    );
}

export default KSoundProgressPicker;