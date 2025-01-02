import React, { useEffect, useState } from 'react'


//import css
import "./Footer.css"

//import picture
import Gmail from "../../assets/icon-gmail.png";
import GitHub from "../../assets/icon-github.png";
import LinkeDin from "../../assets/icon-linkedin.png";
import CopyRight from "../../assets/icon-copyrights.png";

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const updateYear = setInterval(() => {
            const newYear = new Date().getFullYear();
            if (newYear !== currentYear) {
                setCurrentYear(newYear);
            }
        }, 1000) // Check for updates every second

        return () => {
            clearInterval(updateYear);
        };
    }, [currentYear]);
    return (
        <footer className="footer-content">
            <div className="content-footer">
                <div className='footer-mainContent'>
                    <div className="addres">
                        <h1>Address:</h1>
                        <div className="addres-loc">
                            <address>Stockholm, Sweden <a href="https://www.google.com/maps/place/Stockholm/@59.0968211,17.5065602,7.75z/data=!4m6!3m5!1s0x465f763119640bcb:0xa80d27d3679d7766!8m2!3d59.3293235!4d18.0685808!16zL20vMDZteHM?entry=ttu" target="_blank"> <img src={Location} alt="" /> </a></address>
                        </div>
                    </div>
                    <div className="copy-right">
                        <p> <img src={CopyRight} alt="" className='copyrght-img' /> Copyright {currentYear} </p>
                        <p>by Nikola Zovko.</p>
                    </div>

                    <div className="contact-footer">
                        <h1>Contact:</h1>
                        <div className="contactFooter-link">
                            <a href="mailto:nikolajoe95@gmail.com" target="_blank">
                                <img src={Gmail} alt="" className='contact-img' title="Gmail" />
                            </a>
                            <a href="https://github.com/Nikolaz95" target="_blank">
                                <img src={GitHub} alt="" className='contact-img' title="GitHub" />
                            </a>
                            <a href="https://www.linkedin.com/in/nikola-zovko-a50779247/" target="_blank">
                                <img src={LinkeDin} alt="" className='contact-img' title="Linkedin" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer