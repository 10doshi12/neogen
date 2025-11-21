import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Neo<span className="logo-highlight">Gen</span>
                </Link>

                <div className="navbar-nav">
                    <Link
                        to="/"
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/generate"
                        className={`nav-link ${location.pathname === '/generate' ? 'active' : ''}`}
                    >
                        Video generation
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
