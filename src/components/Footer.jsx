import React, { useMemo } from 'react';
import './Footer.css';

const Footer = React.memo(() => {
    const currentYear = useMemo(() => new Date().getFullYear(), []);

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
                    aria-label="Visit developer website"
                >
                    maudev.co
                </a>
            </p>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;

