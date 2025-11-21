import React, { useRef, useEffect } from 'react';
import './VideoPlayer.css';

function VideoPlayer({ videoUrl, autoPlay = true }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && autoPlay) {
            videoRef.current.play().catch(error => {
                console.log('Autoplay prevented:', error);
            });
        }
    }, [videoUrl, autoPlay]);

    return (
        <div className="video-player-wrapper gradient-border">
            <div className="gradient-border-content">
                <video
                    ref={videoRef}
                    className="video-player"
                    controls
                    src={videoUrl}
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

export default VideoPlayer;
