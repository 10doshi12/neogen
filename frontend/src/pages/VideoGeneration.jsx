import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateVideo, pollStatus } from '../utils/api';
import './VideoGeneration.css';

function VideoGeneration() {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [duration, setDuration] = useState(20);
    const [orientation, setOrientation] = useState('horizontal');
    const [isGenerating, setIsGenerating] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [showDurationMenu, setShowDurationMenu] = useState(false);

    const durationOptions = [10, 20, 30, 40, 50, 60];

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt');
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {
            // Start video generation
            const response = await generateVideo(prompt, duration, orientation);
            const taskId = response.task_id;

            // Start polling for status updates
            await pollStatus(
                taskId,
                (statusUpdate) => {
                    setStatus(statusUpdate);
                },
                2000, // Poll every 2 seconds
                600000 // Timeout after 10 minutes
            );

            // Generation complete - navigate to result page
            navigate(`/result/${taskId}`);
        } catch (err) {
            console.error('Video generation error:', err);
            setError(err.message || 'Failed to generate video. Please try again.');
            setIsGenerating(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleGenerate();
        }
    };

    const selectDuration = (value) => {
        setDuration(value);
        setShowDurationMenu(false);
    };

    return (
        <div className="video-generation-page">
            <div className="container">
                <h2 className="page-title">Create Your Video</h2>

                {!isGenerating ? (
                    <div className="generation-form">
                        <div className="prompt-card glass">
                            <label className="prompt-label">Prompt</label>
                            <textarea
                                className="prompt-input"
                                placeholder="Create a futuristic cityscape at dusk with neon skyscrapers, flying cars, and a lively digital atmosphere..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyPress={handleKeyPress}
                                rows={8}
                            />

                            <div className="prompt-actions">
                                <div className="duration-selector">
                                    <button
                                        className="btn-icon"
                                        onClick={() => setShowDurationMenu(!showDurationMenu)}
                                        title={`Duration: ${duration}s`}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>

                                    {showDurationMenu && (
                                        <div className="duration-menu">
                                            <div className="duration-menu-header">Video Duration</div>
                                            {durationOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    className={`duration-option ${duration === option ? 'active' : ''}`}
                                                    onClick={() => selectDuration(option)}
                                                >
                                                    {option} seconds
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="btn-icon"
                                    onClick={() => setOrientation(orientation === 'horizontal' ? 'vertical' : 'horizontal')}
                                    title={orientation === 'horizontal' ? 'Horizontal' : 'Vertical'}
                                >
                                    {orientation === 'horizontal' ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    )}
                                </button>

                                <button className="btn-icon" title="Settings">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                        <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button className="btn btn-primary generate-btn" onClick={handleGenerate}>
                            Generate ✨
                        </button>

                        <p className="helper-text">
                            Duration: <strong>{duration}s</strong> · Orientation: <strong>{orientation}</strong>
                        </p>
                    </div>
                ) : (
                    <LoadingSpinner status={status?.status} message={status?.message} />
                )}
            </div>
        </div>
    );
}

export default VideoGeneration;
