import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner({ status, message }) {
    const getStatusText = () => {
        switch (status) {
            case 'pending':
                return 'Initializing...';
            case 'generating_script':
                return 'Creating your video script...';
            case 'generating_video':
                return 'Generating your video...';
            default:
                return message || 'Processing...';
        }
    };

    return (
        <div className="loading-container">
            <div className="spinner-wrapper">
                <div className="spinner"></div>
                <div className="spinner-glow"></div>
            </div>
            <p className="loading-message">{getStatusText()}</p>
            {status === 'generating_video' && (
                <p className="loading-submessage">This may take a few minutes...</p>
            )}
        </div>
    );
}

export default LoadingSpinner;
