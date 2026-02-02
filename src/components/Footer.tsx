'use client';

import Link from 'next/link';
import { Locale } from '../i18n-config';
import { getLocalizedPath } from '../pathnames';

interface FooterProps {
    lang: Locale;
    dictionary: any;
}

export default function Footer({ lang, dictionary }: FooterProps) {
    const d = dictionary.footer;

    // Helper to get service links with localized path
    const getServiceLink = (slug: string) => `${getLocalizedPath('/services', lang)}/${slug}`;

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-main">
                        <h5>{d.need_help}</h5>
                    </div>
                    <div className="footer-emergency">
                        <a href="tel:+421948528265" className="footer-phone-btn">+421 948 528 265</a>
                    </div>
                </div>
                <div className="footer-links">
                    <div className="footer-column">
                        <h5>{d.company}</h5>
                        <nav>
                            <Link href={`/${lang}`}>{d.home}</Link>
                            <Link href={getLocalizedPath('/contact', lang)}>{d.contact}</Link>
                            <Link href={getLocalizedPath('/contact', lang)}>{d.consultation}</Link>
                            <Link href={getLocalizedPath('/blog', lang)}>{d.blog}</Link>
                        </nav>
                    </div>
                    <div className="footer-column">
                        <h5>{d.services}</h5>
                        <nav>
                            <Link href={getServiceLink('start-ups-greenfield-projects')}>{d.startups}</Link>
                            <Link href={getServiceLink('gdpr')}>{d.gdpr}</Link>
                            <Link href={getServiceLink('real-estate')}>{d.real_estate}</Link>
                            <Link href={getServiceLink('ecommerce')}>{d.ecommerce}</Link>
                        </nav>
                    </div>
                    <div className="footer-column">
                        <h5>{d.legal_areas}</h5>
                        <nav>
                            <Link href={getServiceLink('litigations')}>{d.disputes}</Link>
                            <Link href={getServiceLink('criminal-law')}>{d.criminal}</Link>
                            <Link href={getServiceLink('financial-law')}>{d.financial}</Link>
                            <Link href={getServiceLink('commercial-law')}>{d.debt}</Link>
                        </nav>
                    </div>
                    <div className="footer-column">
                        <h5>{d.other_services}</h5>
                        <nav>
                            <Link href={getServiceLink('optimization-solutions')}>{d.optimization}</Link>
                            <Link href={getServiceLink('due-diligence')}>{d.due_diligence}</Link>
                        </nav>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>© {new Date().getFullYear()} LegisPro, s.r.o. {d.all_rights} | <Link href={`/${lang}/privacy-policy`}>{d.privacy_policy}</Link> | <a href="#" onClick={(e) => { e.preventDefault(); if (typeof window !== 'undefined' && (window as any).openCookieSettings) { (window as any).openCookieSettings(); } }}>{d.cookies}</a></p>
                        <p><a href="https://aebdigital.sk" target="_blank" rel="noopener noreferrer">{d.website_by}</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
