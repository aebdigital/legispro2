'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocalizedPath, getInternalPath } from '@/pathnames';

type Locale = 'en' | 'sk' | 'de' | 'fr';

interface HeaderProps {
    lang: Locale;
    dictionary: any;
}

export default function Header({ lang, dictionary }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    // Exclude 'business-package' and 'training-webinars' from dropdown
    const dropdownServices = Object.entries(dictionary.services.items).filter(([slug]) =>
        !['business-package', 'training-webinars', 'podnikatelsky-balicek', 'skolenia-webinare'].includes(slug)
    );

    const [servicesOpen, setServicesOpen] = useState(false);
    const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleServicesEnter = () => {
        if (servicesTimeoutRef.current) {
            clearTimeout(servicesTimeoutRef.current);
        }
        setServicesOpen(true);
    };

    const handleServicesLeave = () => {
        servicesTimeoutRef.current = setTimeout(() => {
            setServicesOpen(false);
        }, 300);
    };

    // Helper to check if a path is active
    const isPathActive = (internalPath: string) => {
        const localizedPath = getLocalizedPath(internalPath, lang);
        return pathname === localizedPath || pathname.startsWith(localizedPath + '/');
    };

    // Get localized service URL
    const getServiceUrl = (slug: string) => {
        return `${getLocalizedPath('/services', lang)}/${slug}`;
    };

    const getServiceIcon = (slug: string) => {
        switch (slug) {
            case 'commercial-law':
            case 'obchodne-pravo':
            case 'handelsrecht':
            case 'droit-commercial':
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
            case 'financial-law':
            case 'danove-pravo':
            case 'steuerrecht':
            case 'droit-financier':
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
            case 'criminal-law':
            case 'trestne-pravo':
            case 'strafrecht':
            case 'droit-penal':
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2L2 10l5 5L15 7l-5-5z"></path><path d="M7 10l5 5"></path><path d="M22 22l-8-8"></path></svg>;
            case 'start-ups-greenfield-projects':
            case 'start-upy-greenfieldy':
            case 'startups':
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>;
            case 'real-estate':
            case 'reality':
            case 'immobilien':
            case 'immobilier':
            case 'biens-immobiliers':
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
            case 'due-diligence':
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
            case 'gdpr':
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
            case 'litigations':
            case 'sporove-zastupovanie':
            case 'litiges':
            case 'streitigkeiten':
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>;
            case 'optimization-solutions':
            case 'optimalizacie':
            case 'solutions-optimisation':
            case 'optimierungen':
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>;
            case 'ecommerce':
            case 'e-commerce':
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
            default:
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
        }
    };

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
                <div className="nav-container">
                    <div className="logo">
                        <Link href={`/${lang}`}>
                            <img src="/sources/logo.png" alt="LegisPro" className="logo-image" />
                            <div className="logo-text">
                                <h3>LegisPro</h3>
                                <span className="logo-subtitle">{dictionary.nav.subtitle}</span>
                            </div>
                        </Link>
                    </div>

                    <div className="nav-menu" id="navMenu">
                        <Link href={`/${lang}`} className={`nav-link ${pathname === `/${lang}` ? 'active' : ''}`}>
                            {dictionary.nav.home}
                        </Link>

                        <div
                            className="nav-dropdown"
                            onMouseEnter={handleServicesEnter}
                            onMouseLeave={handleServicesLeave}
                        >
                            <span
                                className={`nav-link dropdown-toggle ${isPathActive('/services') ? 'active' : ''}`}
                                style={{ cursor: 'default' }}
                                onClick={(e) => e.preventDefault()}
                            >
                                {dictionary.nav.services}
                                <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <div className={`dropdown-menu ${servicesOpen ? 'active' : ''}`}>
                                <div className="dropdown-grid">
                                    {dropdownServices.map(([slug, item]: [string, any]) => (
                                        <Link key={slug} href={getServiceUrl(slug)} className="dropdown-item">
                                            <div className="item-icon-wrapper">
                                                {getServiceIcon(slug)}
                                            </div>
                                            <div className="dropdown-text">
                                                <div className="dropdown-title">{item.title}</div>
                                                <div className="dropdown-desc">{item.category}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link href={getLocalizedPath('/podnikatelsky-balik', lang)} className={`nav-link ${isPathActive('/podnikatelsky-balik') ? 'active' : ''}`}>
                            {dictionary.nav.business_package}
                        </Link>

                        <Link href={getLocalizedPath('/skolenia-webinare', lang)} className={`nav-link ${isPathActive('/skolenia-webinare') ? 'active' : ''}`}>
                            {dictionary.nav.training}
                        </Link>

                        <Link href={getLocalizedPath('/blog', lang)} className={`nav-link ${isPathActive('/blog') ? 'active' : ''}`}>
                            {dictionary.blog.title}
                        </Link>
                    </div>

                    <div className="nav-actions">
                        <LanguageSwitcher currentLang={lang} />

                        <Link href={getLocalizedPath('/contact', lang)} className="btn btn-primary">
                            {dictionary.nav.contact}
                        </Link>

                        <div className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-header">
                    <div className="mobile-logo">
                        <img src="/sources/logo.png" alt="LegisPro" className="logo-image" style={{ height: '40px' }} />
                        <div className="logo-text">
                            <h3>LegisPro</h3>
                            <span className="logo-subtitle">{dictionary.nav.subtitle}</span>
                        </div>
                    </div>
                    <button className="mobile-menu-close" onClick={toggleMobileMenu}>✕</button>
                </div>

                <Link href={`/${lang}`} className="nav-link" onClick={toggleMobileMenu}>{dictionary.nav.home}</Link>

                <div className="mobile-dropdown">
                    <button className="mobile-dropdown-toggle" onClick={(e) => {
                        const content = e.currentTarget.nextElementSibling as HTMLElement;
                        const arrow = e.currentTarget.querySelector('.dropdown-arrow');
                        content.classList.toggle('active');
                        arrow?.classList.toggle('rotated');
                    }}>
                        {dictionary.nav.services}
                        <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="mobile-dropdown-content">
                        {dropdownServices.map(([slug, item]: [string, any]) => (
                            <Link key={slug} href={getServiceUrl(slug)} className="mobile-dropdown-item" onClick={toggleMobileMenu}>
                                <span className="mobile-service-icon">{getServiceIcon(slug)}</span>
                                <span className="mobile-service-title">{item.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <Link href={getLocalizedPath('/podnikatelsky-balik', lang)} className="nav-link" onClick={toggleMobileMenu}>{dictionary.nav.business_package}</Link>
                <Link href={getLocalizedPath('/skolenia-webinare', lang)} className="nav-link" onClick={toggleMobileMenu}>{dictionary.nav.training}</Link>
                <Link href={getLocalizedPath('/blog', lang)} className="nav-link" onClick={toggleMobileMenu}>{dictionary.blog.title}</Link>
                <Link href={getLocalizedPath('/contact', lang)} className="btn btn-primary" onClick={toggleMobileMenu} style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}>
                    {dictionary.nav.contact}
                </Link>
            </div>
        </>
    );
}

function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const flags = {
        sk: 'https://flagicons.lipis.dev/flags/4x3/sk.svg',
        en: 'https://flagicons.lipis.dev/flags/4x3/gb.svg',
        de: 'https://flagicons.lipis.dev/flags/4x3/de.svg',
        fr: 'https://flagicons.lipis.dev/flags/4x3/fr.svg'
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const redirectedPathName = (targetLocale: Locale) => {
        if (!pathname) return `/${targetLocale}`;

        // Get path after locale
        const segments = pathname.split('/').filter(Boolean);
        if (segments.length === 0) return `/${targetLocale}`;

        // First segment is current locale
        const pathAfterLocale = '/' + segments.slice(1).join('/');

        if (pathAfterLocale === '/' || segments.length === 1) {
            return `/${targetLocale}`;
        }

        // Convert current path to internal path, then to target locale path
        const internalPath = getInternalPath(pathAfterLocale, currentLang);
        return getLocalizedPath(internalPath, targetLocale);
    };

    return (
        <div className="language-toggle" onClick={toggleDropdown} onBlur={() => setTimeout(() => setIsOpen(false), 200)} tabIndex={0}>
            <div className="current-language">
                <img src={flags[currentLang]} alt={currentLang} className="current-flag" width="20" height="15" />
                <span className="current-lang">{currentLang.toUpperCase()}</span>
                <svg className="lang-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div className={`language-dropdown ${isOpen ? 'active' : ''}`}>
                {(Object.keys(flags) as Locale[]).map((locale) => (
                    <Link key={locale} href={redirectedPathName(locale)} className="lang-option">
                        <img src={flags[locale]} alt={locale} width="20" height="15" />
                        <span>{locale.toUpperCase()}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
