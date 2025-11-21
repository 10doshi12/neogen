import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VideoGeneration from './pages/VideoGeneration';
import VideoResult from './pages/VideoResult';
import './styles/index.css';

function App() {
    return (
        <Router>
            <div className="app-background"></div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/generate" element={<VideoGeneration />} />
                <Route path="/result/:taskId" element={<VideoResult />} />
            </Routes>
        </Router>
    );
}

export default App;
