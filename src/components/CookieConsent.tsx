"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n-config';
import './CookieConsent.css';

interface CookiePreferences {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
}

interface ConsentData {
    timestamp: string;
    preferences: CookiePreferences;
    version: string;
}

const translations = {
    sk: {
        banner: {
            title: 'Súbory cookies a ochrana súkromia',
            description: 'Používame súbory cookies na zlepšenie vašej skúsenosti na našej webovej stránke. Niektoré sú nevyhnutné pre fungovanie stránky, iné nám pomáhajú analyzovať a zlepšovať naše služby.',
            acceptAll: 'Prijať všetko',
            rejectAll: 'Odmietnuť všetko',
            settings: 'Nastavenia',
            privacyPolicy: 'Zásady ochrany súkromia'
        },
        modal: {
            title: 'Nastavenia súborov cookies',
            description: 'Spravujte svoje preferencie súborov cookies. Môžete povoliť alebo zakázať rôzne typy súborov cookies podľa svojich potrieb.',
            save: 'Uložiť nastavenia',
            acceptAll: 'Prijať všetko',
            rejectAll: 'Odmietnuť všetko',
            close: 'Zavrieť'
        },
        categories: {
            essential: {
                title: 'Nevyhnutné súbory cookies',
                description: 'Tieto súbory cookies sú nevyhnutné pre základnú funkcionalitu webovej stránky a nemožno ich zakázať.'
            },
            analytics: {
                title: 'Analytické súbory cookies',
                description: 'Tieto súbory cookies nám pomáhajú pochopiť, ako návštevníci používajú našu webovú stránku zbieraním a hlásením informácií anonymne.'
            },
            marketing: {
                title: 'Marketingové súbory cookies',
                description: 'Tieto súbory cookies sa používajú na sledovanie návštevníkov naprieč webovými stránkami na účely zobrazovania relevantných a zaujímavých reklám.'
            }
        }
    },
    en: {
        banner: {
            title: 'Cookies and Privacy',
            description: 'We use cookies to improve your experience on our website. Some are essential for site functionality, others help us analyze and improve our services.',
            acceptAll: 'Accept All',
            rejectAll: 'Reject All',
            settings: 'Settings',
            privacyPolicy: 'Privacy Policy'
        },
        modal: {
            title: 'Cookie Settings',
            description: 'Manage your cookie preferences. You can enable or disable different types of cookies according to your needs.',
            save: 'Save Settings',
            acceptAll: 'Accept All',
            rejectAll: 'Reject All',
            close: 'Close'
        },
        categories: {
            essential: {
                title: 'Essential Cookies',
                description: 'These cookies are necessary for the basic functionality of the website and cannot be disabled.'
            },
            analytics: {
                title: 'Analytics Cookies',
                description: 'These cookies help us understand how visitors use our website by collecting and reporting information anonymously.'
            },
            marketing: {
                title: 'Marketing Cookies',
                description: 'These cookies are used to track visitors across websites for the purpose of displaying relevant and engaging advertisements.'
            }
        }
    },
    de: {
        banner: {
            title: 'Cookies und Datenschutz',
            description: 'Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Einige sind für die Website-Funktionalität unerlässlich, andere helfen uns bei der Analyse und Verbesserung unserer Services.',
            acceptAll: 'Alle akzeptieren',
            rejectAll: 'Alle ablehnen',
            settings: 'Einstellungen',
            privacyPolicy: 'Datenschutzrichtlinie'
        },
        modal: {
            title: 'Cookie-Einstellungen',
            description: 'Verwalten Sie Ihre Cookie-Präferenzen. Sie können verschiedene Arten von Cookies je nach Ihren Bedürfnissen aktivieren oder deaktivieren.',
            save: 'Einstellungen speichern',
            acceptAll: 'Alle akzeptieren',
            rejectAll: 'Alle ablehnen',
            close: 'Schließen'
        },
        categories: {
            essential: {
                title: 'Erforderliche Cookies',
                description: 'Diese Cookies sind für die grundlegende Funktionalität der Website erforderlich und können nicht deaktiviert werden.'
            },
            analytics: {
                title: 'Analyse-Cookies',
                description: 'Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen, indem sie Informationen anonym sammeln und melden.'
            },
            marketing: {
                title: 'Marketing-Cookies',
                description: 'Diese Cookies werden verwendet, um Besucher über Websites hinweg zu verfolgen, um relevante und ansprechende Werbung anzuzeigen.'
            }
        }
    },
    fr: {
        banner: {
            title: 'Cookies et confidentialité',
            description: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site web. Certains sont essentiels pour le fonctionnement du site, d\'autres nous aident à analyser et améliorer nos services.',
            acceptAll: 'Tout accepter',
            rejectAll: 'Tout refuser',
            settings: 'Paramètres',
            privacyPolicy: 'Politique de confidentialité'
        },
        modal: {
            title: 'Paramètres des cookies',
            description: 'Gérez vos préférences de cookies. Vous pouvez activer ou désactiver différents types de cookies selon vos besoins.',
            save: 'Sauvegarder les paramètres',
            acceptAll: 'Tout accepter',
            rejectAll: 'Tout refuser',
            close: 'Fermer'
        },
        categories: {
            essential: {
                title: 'Cookies essentiels',
                description: 'Ces cookies sont nécessaires pour la fonctionnalité de base du site web et ne peuvent pas être désactivés.'
            },
            analytics: {
                title: 'Cookies analytiques',
                description: 'Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site web en collectant et rapportant des informations de manière anonyme.'
            },
            marketing: {
                title: 'Cookies marketing',
                description: 'Ces cookies sont utilisés pour suivre les visiteurs sur les sites web dans le but d\'afficher des publicités pertinentes et attrayantes.'
            }
        }
    }
};

const privacyPolicyPaths: Record<Locale, string> = {
    sk: '/sk/privacy-policy',
    en: '/en/privacy-policy',
    de: '/de/privacy-policy',
    fr: '/fr/privacy-policy'
};

const COOKIE_NAME = 'legispro_cookie_consent';
const COOKIE_EXPIRY = 365;

export default function CookieConsent({ lang }: { lang: Locale }) {
    const [showBanner, setShowBanner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        essential: true,
        analytics: false,
        marketing: false
    });
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    const t = translations[lang] || translations.sk;

    const getCookie = useCallback((name: string): string | null => {
        if (typeof document === 'undefined') return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    }, []);

    const setCookie = useCallback((name: string, value: string, days: number) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }, []);

    const deleteCookie = useCallback((name: string) => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    }, []);

    const getConsent = useCallback((): ConsentData | null => {
        const consent = getCookie(COOKIE_NAME);
        if (consent) {
            try {
                return JSON.parse(consent);
            } catch {
                return null;
            }
        }
        return null;
    }, [getCookie]);

    const setConsent = useCallback((prefs: CookiePreferences) => {
        const consentData: ConsentData = {
            timestamp: new Date().toISOString(),
            preferences: prefs,
            version: '1.0'
        };
        setCookie(COOKIE_NAME, JSON.stringify(consentData), COOKIE_EXPIRY);
    }, [setCookie]);

    useEffect(() => {
        const consent = getConsent();
        if (!consent) {
            setShowBanner(true);
        } else {
            setPreferences(consent.preferences);
        }

        // Expose openCookieSettings globally
        (window as any).openCookieSettings = () => setShowModal(true);

        return () => {
            delete (window as any).openCookieSettings;
        };
    }, [getConsent]);

    const handleAcceptAll = () => {
        const prefs: CookiePreferences = {
            essential: true,
            analytics: true,
            marketing: true
        };
        setPreferences(prefs);
        setConsent(prefs);
        setShowBanner(false);
        setShowModal(false);
    };

    const handleRejectAll = () => {
        const prefs: CookiePreferences = {
            essential: true,
            analytics: false,
            marketing: false
        };
        setPreferences(prefs);
        setConsent(prefs);
        setShowBanner(false);
        setShowModal(false);
        // Delete analytics cookies
        deleteCookie('_ga');
        deleteCookie('_gid');
    };

    const handleSaveSettings = () => {
        setConsent(preferences);
        setShowBanner(false);
        setShowModal(false);

        if (!preferences.analytics) {
            deleteCookie('_ga');
            deleteCookie('_gid');
        }
    };

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const handleEscKey = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setShowModal(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [handleEscKey]);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showModal]);

    return (
        <>
            {/* Cookie Banner */}
            {showBanner && (
                <div className={`cookie-banner ${showBanner ? 'show' : ''}`}>
                    <div className="cookie-banner-content">
                        <div className="cookie-banner-text">
                            <h4>{t.banner.title}</h4>
                            <p>
                                {t.banner.description}{' '}
                                <Link href={privacyPolicyPaths[lang]}>{t.banner.privacyPolicy}</Link>
                            </p>
                        </div>
                        <div className="cookie-banner-actions">
                            <button
                                className="cookie-btn cookie-btn-text"
                                onClick={() => setShowModal(true)}
                            >
                                {t.banner.settings}
                            </button>
                            <button
                                className="cookie-btn cookie-btn-secondary"
                                onClick={handleRejectAll}
                            >
                                {t.banner.rejectAll}
                            </button>
                            <button
                                className="cookie-btn cookie-btn-primary"
                                onClick={handleAcceptAll}
                            >
                                {t.banner.acceptAll}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cookie Settings Modal */}
            {showModal && (
                <div
                    className={`cookie-modal ${showModal ? 'show' : ''}`}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowModal(false);
                    }}
                >
                    <div className="cookie-modal-content">
                        <div className="cookie-modal-header">
                            <h3>{t.modal.title}</h3>
                            <button
                                className="cookie-modal-close"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="cookie-modal-body">
                            <p className="cookie-description">{t.modal.description}</p>

                            {/* Essential Cookies */}
                            <div className={`cookie-category cookie-category-essential ${expandedCategories.essential ? 'expanded' : ''}`}>
                                <div
                                    className="cookie-category-header"
                                    onClick={() => toggleCategory('essential')}
                                >
                                    <h4 className="cookie-category-title">{t.categories.essential.title}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="cookie-toggle">
                                            <input type="checkbox" checked disabled />
                                            <span className="cookie-toggle-slider"></span>
                                        </div>
                                        <svg className="cookie-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="6,9 12,15 18,9"></polyline>
                                        </svg>
                                    </div>
                                </div>
                                <div className="cookie-category-content">
                                    <p className="cookie-category-description">{t.categories.essential.description}</p>
                                </div>
                            </div>

                            {/* Analytics Cookies */}
                            <div className={`cookie-category ${expandedCategories.analytics ? 'expanded' : ''}`}>
                                <div
                                    className="cookie-category-header"
                                    onClick={() => toggleCategory('analytics')}
                                >
                                    <h4 className="cookie-category-title">{t.categories.analytics.title}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="cookie-toggle" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                checked={preferences.analytics}
                                                onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                                            />
                                            <span className="cookie-toggle-slider"></span>
                                        </div>
                                        <svg className="cookie-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="6,9 12,15 18,9"></polyline>
                                        </svg>
                                    </div>
                                </div>
                                <div className="cookie-category-content">
                                    <p className="cookie-category-description">{t.categories.analytics.description}</p>
                                </div>
                            </div>

                            {/* Marketing Cookies */}
                            <div className={`cookie-category ${expandedCategories.marketing ? 'expanded' : ''}`}>
                                <div
                                    className="cookie-category-header"
                                    onClick={() => toggleCategory('marketing')}
                                >
                                    <h4 className="cookie-category-title">{t.categories.marketing.title}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="cookie-toggle" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                checked={preferences.marketing}
                                                onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                                            />
                                            <span className="cookie-toggle-slider"></span>
                                        </div>
                                        <svg className="cookie-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="6,9 12,15 18,9"></polyline>
                                        </svg>
                                    </div>
                                </div>
                                <div className="cookie-category-content">
                                    <p className="cookie-category-description">{t.categories.marketing.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="cookie-modal-footer">
                            <button className="cookie-btn cookie-btn-reject-all" onClick={handleRejectAll}>
                                {t.modal.rejectAll}
                            </button>
                            <button className="cookie-btn cookie-btn-save" onClick={handleSaveSettings}>
                                {t.modal.save}
                            </button>
                            <button className="cookie-btn cookie-btn-accept-all" onClick={handleAcceptAll}>
                                {t.modal.acceptAll}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
