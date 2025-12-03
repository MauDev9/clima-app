import React from 'react';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p className="footer-text">
                © {currentYear} Weather App. All rights reserved.
            </p>
            <p className="footer-text">
                Developed by{' '}
                <a 
                    href="https://maudev.co" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    maudev.co
                </a>
            </p>
        </footer>
    );
}

export default Footer;

