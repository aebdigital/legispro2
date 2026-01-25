'use client';

import { useState } from 'react';

interface LocationProps {
    dictionary: any;
}

export default function Location({ dictionary }: LocationProps) {
    const [isMapActive, setIsMapActive] = useState(false);

    return (
        <section className="location">
            <div className="location-background"></div>
            <div className="container">
                <div className="location-content">
                    <div className="location-info">
                        <div className="location-item">
                            <h4>{dictionary.contact.address}</h4>
                            <p>
                                <a href="https://maps.google.com/?q=Sládkovičova+1+949+01+Nitra" target="_blank" rel="noopener noreferrer">
                                    Sládkovičova 1, 949 01 Nitra, Slovak Republic
                                </a>
                            </p>
                        </div>
                        <div className="location-item">
                            <h4>{dictionary.contact.formTitle}</h4>
                            <p><a href="mailto:office@legispro.sk">office@legispro.sk</a></p>
                            <p><a href="tel:+421948528265">+421 948 528 265</a></p>
                        </div>
                    </div>
                    <div className="map">
                        {!isMapActive && (
                            <div
                                className="map-overlay"
                                id="mapOverlayHome"
                                onClick={() => setIsMapActive(true)}
                            >
                                <div className="map-overlay-content">
                                    <h4>{dictionary.contact.mapInteraction || 'Click to interact with map'}</h4>
                                </div>
                            </div>
                        )}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10498.640103596685!2d18.084437315673!3d48.3146597792368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f11.1!3m3!1m2!1s0x476a89e6a5a3a2b7%3A0x400f7d1c69788a0!2sSl%C3%A1dkovi%C4%8Dova%201%2C%20949%2001%20Nitra-Chrenov%C3%A1%2C%20Slovakia!5e0!3m2!1sen!2sus!4v1609452345678"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
