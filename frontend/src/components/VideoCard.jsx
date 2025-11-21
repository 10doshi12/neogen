import React from 'react';
import './VideoCard.css';

function VideoCard({ prompt, thumbnailUrl, onPlay }) {
    return (
        <div className="video-card">
            <div className="video-card-thumbnail">
                {thumbnailUrl ? (
                    <img src={thumbnailUrl} alt="Video thumbnail" />
                ) : (
                    <div className="video-card-placeholder"></div>
                )}
                <button className="play-button" onClick={onPlay}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                    </svg>
                </button>
            </div>
            <div className="video-card-content">
                <div className="video-card-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="url(#gradient)" />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00FFD1" />
                                <stop offset="100%" stopColor="#9D4EDD" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span>Prompt</span>
                </div>
                <p className="video-card-prompt">{prompt}</p>
            </div>
        </div>
    );
}

export default VideoCard;
