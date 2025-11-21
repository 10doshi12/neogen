import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { getVideoUrl, downloadVideo } from '../utils/api';
import './VideoResult.css';

function VideoResult() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [showCopied, setShowCopied] = useState(false);

    const videoUrl = getVideoUrl(taskId, 'final_video.mp4');

    const handleDownload = () => {
        downloadVideo(taskId, 'final_video.mp4');
    };

    const handleShare = async () => {
        const shareUrl = window.location.href;

        try {
            await navigator.clipboard.writeText(shareUrl);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleCreateNew = () => {
        navigate('/generate');
    };

    return (
        <div className="video-result-page">
            <div className="container">
                <VideoPlayer videoUrl={videoUrl} autoPlay={true} />

                <div className="result-actions">
                    <button className="btn btn-secondary action-btn" onClick={handleDownload}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Download
                    </button>

                    <button className="btn btn-secondary action-btn" onClick={handleShare}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
                            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                            <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
                            <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Share
                    </button>

                    <button className="btn btn-primary action-btn" onClick={handleCreateNew}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Create New
                    </button>
                </div>

                {showCopied && (
                    <div className="toast">
                        Link copied to clipboard!
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoResult;
