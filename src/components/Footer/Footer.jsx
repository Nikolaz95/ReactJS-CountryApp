import React from 'react'
import { FiBriefcase, FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi'

//import css
import "./Footer.css"

const STOCKHOLM_MAP = "https://www.google.com/maps/place/Stockholm/@59.3293235,18.0685808,10z";
const PORTFOLIO_URL = "https://nikolazovkoportfolio.netlify.app/#home";
const REPO_URL = "https://github.com/Nikolaz95/ReactJS-CountryApp";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-content">
            <div className="container footer-inner">
                <div className="footer-brand">
                    <p className="footer-title">Where in the world?</p>
                    <p className="footer-note">
                        Data: mledoze/countries, World Bank & Wikidata. Flags by flagcdn.com.
                    </p>
                    <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="footer-repo">
                        <FiGithub /> View source on GitHub
                    </a>
                </div>

                <div className="footer-meta">
                    <a href={STOCKHOLM_MAP} target="_blank" rel="noopener noreferrer" className="footer-location">
                        <FiMapPin /> Stockholm, Sweden
                    </a>
                    <p>© {currentYear} Nikola Zovko</p>
                </div>

                <div className="footer-social">
                    <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary footer-portfolio">
                        <FiBriefcase /> Portfolio
                    </a>
                    <a href="mailto:nikolajoe95@gmail.com" className="icon-btn" aria-label="Email" title="Email">
                        <FiMail />
                    </a>
                    <a href="https://github.com/Nikolaz95" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub" title="GitHub">
                        <FiGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/nikola-zovko-a50779247/" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn" title="LinkedIn">
                        <FiLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
