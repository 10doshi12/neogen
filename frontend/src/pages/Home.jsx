import React from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const sampleVideos = [
        { id: 1, prompt: 'Create a futuristic cityscape at dusk with neon skyscrapers, flying cars, and a lively digital...' },
        { id: 2, prompt: 'Create a futuristic cityscape at dusk with neon skyscrapers, flying cars, and a lively digital...' },
        { id: 3, prompt: 'Create a futuristic cityscape at dusk with neon skyscrapers, flying cars, and a lively digital...' }
    ];

    return (
        <div className="home-page">
            <div className="home-hero">
                <div className="floating-icons">
                    <div className="floating-icon icon-1">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#grad1)" strokeWidth="2" fill="none" />
                            <path d="M2 17L12 22L22 17" stroke="url(#grad1)" strokeWidth="2" fill="none" />
                            <path d="M2 12L12 17L22 12" stroke="url(#grad1)" strokeWidth="2" fill="none" />
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00FFD1" />
                                    <stop offset="100%" stopColor="#9D4EDD" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="floating-icon icon-2">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="3" fill="url(#grad2)" />
                            <circle cx="12" cy="12" r="8" stroke="url(#grad2)" strokeWidth="2" fill="none" />
                            <defs>
                                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#9D4EDD" />
                                    <stop offset="100%" stopColor="#7209B7" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="floating-icon icon-3">
                        <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
                            <path d="M15 3H9V7H15V3Z" fill="url(#grad3)" />
                            <path d="M9 21H15V17H9V21Z" fill="url(#grad3)" />
                            <path d="M7 9H3V15H7V9Z" fill="url(#grad3)" />
                            <path d="M21 9H17V15H21V9Z" fill="url(#grad3)" />
                            <defs>
                                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00C8FF" />
                                    <stop offset="100%" stopColor="#00FFD1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="floating-icon icon-4">
                        <svg width="45" height="45" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                stroke="url(#grad4)" strokeWidth="2" fill="none" />
                            <defs>
                                <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00FFD1" />
                                    <stop offset="100%" stopColor="#7209B7" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="floating-icon icon-5">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="url(#grad5)" strokeWidth="2" fill="none" />
                            <circle cx="8" cy="10" r="2" fill="url(#grad5)" />
                            <circle cx="16" cy="10" r="2" fill="url(#grad5)" />
                            <path d="M8 15C8 15 10 17 12 17C14 17 16 15 16 15" stroke="url(#grad5)" strokeWidth="2" fill="none" />
                            <defs>
                                <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#9D4EDD" />
                                    <stop offset="100%" stopColor="#00C8FF" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="floating-icon icon-6">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="7" height="7" rx="2" fill="url(#grad6)" />
                            <rect x="14" y="3" width="7" height="7" rx="2" fill="url(#grad6)" />
                            <rect x="3" y="14" width="7" height="7" rx="2" fill="url(#grad6)" />
                            <rect x="14" y="14" width="7" height="7" rx="2" fill="url(#grad6)" />
                            <defs>
                                <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#7209B7" />
                                    <stop offset="100%" stopColor="#00FFD1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                <div className="container hero-content">
                    <h1 className="hero-title">
                        Create Powerful AI Videos<br />in minutes
                    </h1>
                    <p className="hero-subtitle">
                        Create amazing videos effortlessly with AI technology. Just share your<br />
                        ideas, and watch them come to life in minutes!
                    </p>
                    <button className="btn btn-primary btn-lg" onClick={() => navigate('/generate')}>
                        Generate ✨
                    </button>
                </div>
            </div>

            <div className="home-videos">
                <div className="container">
                    <div className="videos-grid">
                        {sampleVideos.map(video => (
                            <VideoCard
                                key={video.id}
                                prompt={video.prompt}
                                onPlay={() => navigate('/generate')}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
