'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SlideData {
    id: string;
    title: string;
    description: string;
    image: string;
    primaryBtnText: string;
    secondaryBtnText: string;
    primaryHref: string;
    secondaryHref: string;
}

interface ServiceNavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

interface HeroSliderProps {
    dictionary: any;
    lang: string;
}

export default function HeroSlider({ dictionary, lang }: HeroSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState(0);

    const slides: SlideData[] = [
        {
            id: 'general',
            title: dictionary.hero.title,
            description: dictionary.hero.description,
            image: '/sources/images/legal-office-1.jpg',
            primaryBtnText: dictionary.hero.bookBtn,
            secondaryBtnText: dictionary.hero.learnMoreBtn,
            primaryHref: `/${lang}/contact`,
            secondaryHref: '#about',
        },
        {
            id: 'commercial-law',
            title: dictionary.services.items['commercial-law'].title,
            description: dictionary.services.items['commercial-law'].description,
            image: '/sources/images/debt-collection-1.jpg',
            primaryBtnText: dictionary.nav.contact,
            secondaryBtnText: dictionary.services.moreInfoBtn,
            primaryHref: `/${lang}/contact`,
            secondaryHref: `/${lang}/services/commercial-law`,
        },
        {
            id: 'financial-law',
            title: dictionary.services.items['financial-law'].title,
            description: dictionary.services.items['financial-law'].description,
            image: '/sources/images/tax-law-1.jpg',
            primaryBtnText: dictionary.nav.contact,
            secondaryBtnText: dictionary.services.moreInfoBtn,
            primaryHref: `/${lang}/contact`,
            secondaryHref: `/${lang}/services/financial-law`,
        },
        {
            id: 'criminal-law',
            title: dictionary.services.items['criminal-law'].title,
            description: dictionary.services.items['criminal-law'].description,
            image: '/sources/images/criminal-law-1.jpg',
            primaryBtnText: dictionary.nav.contact,
            secondaryBtnText: dictionary.services.moreInfoBtn,
            primaryHref: `/${lang}/contact`,
            secondaryHref: `/${lang}/services/criminal-law`,
        },
        {
            id: 'litigations',
            title: dictionary.services.items['litigations'].title,
            description: dictionary.services.items['litigations'].description,
            image: '/sources/images/litigation-1.jpg',
            primaryBtnText: dictionary.nav.contact,
            secondaryBtnText: dictionary.services.moreInfoBtn,
            primaryHref: `/${lang}/contact`,
            secondaryHref: `/${lang}/services/litigations`,
        },
        {
            id: 'start-ups-greenfield-projects',
            title: dictionary.services.items['start-ups-greenfield-projects'].title,
            description: dictionary.services.items['start-ups-greenfield-projects'].description,
            image: '/sources/greenfield.jpg',
            primaryBtnText: dictionary.nav.contact,
            secondaryBtnText: dictionary.services.moreInfoBtn,
            primaryHref: `/${lang}/contact`,
            secondaryHref: `/${lang}/services/start-ups-greenfield-projects`,
        },
        {
            id: 'real-estate',
            title: dictionary.services.items['real-estate'].title,
            description: dictionary.services.items['real-estate'].description,
            image: '/sources/images/real-estate-1.jpg',
            primaryBtnText: dictionary.nav.contact,
            secondaryBtnText: dictionary.services.moreInfoBtn,
            primaryHref: `/${lang}/contact`,
            secondaryHref: `/${lang}/services/real-estate`,
        },
        {
            id: 'due-diligence',
            title: dictionary.services.items['due-diligence'].title,
            description: dictionary.services.items['due-diligence'].description,
            image: '/sources/images/due-diligence-1.jpg',
            primaryBtnText: dictionary.nav.contact,
            secondaryBtnText: dictionary.services.moreInfoBtn,
            primaryHref: `/${lang}/contact`,
            secondaryHref: `/${lang}/services/due-diligence`,
        },
        {
            id: 'gdpr',
            title: dictionary.services.items['gdpr'].title,
            description: dictionary.services.items['gdpr'].description,
            image: '/sources/images/privacy-gdpr-1.jpg',
            primaryBtnText: dictionary.nav.contact,
            secondaryBtnText: dictionary.services.moreInfoBtn,
            primaryHref: `/${lang}/contact`,
            secondaryHref: `/${lang}/services/gdpr`,
        },
        {
            id: 'optimization-solutions',
            title: dictionary.services.items['optimization-solutions'].title,
            description: dictionary.services.items['optimization-solutions'].description,
            image: '/sources/images/optimization-1.jpg',
            primaryBtnText: dictionary.nav.contact,
            secondaryBtnText: dictionary.services.moreInfoBtn,
            primaryHref: `/${lang}/contact`,
            secondaryHref: `/${lang}/services/optimization-solutions`,
        },
        {
            id: 'ecommerce',
            title: dictionary.services.items['ecommerce'].title,
            description: dictionary.services.items['ecommerce'].description,
            image: '/sources/images/ecommerce-1.jpg',
            primaryBtnText: dictionary.nav.contact,
            secondaryBtnText: dictionary.services.moreInfoBtn,
            primaryHref: `/${lang}/contact`,
            secondaryHref: `/${lang}/services/ecommerce`,
        },
    ];

    const serviceNavItems: ServiceNavItem[] = [
        {
            id: 'commercial-law',
            label: dictionary.services.items['commercial-law'].title,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
        },
        {
            id: 'financial-law',
            label: dictionary.services.items['financial-law'].title,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
            ),
        },
        {
            id: 'criminal-law',
            label: dictionary.services.items['criminal-law'].title,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
            ),
        },
        {
            id: 'litigations',
            label: dictionary.services.items['litigations'].title,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
            ),
        },
        {
            id: 'start-ups-greenfield-projects',
            label: dictionary.services.items['start-ups-greenfield-projects'].title,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
            ),
        },
        {
            id: 'real-estate',
            label: dictionary.services.items['real-estate'].title,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            ),
        },
        {
            id: 'due-diligence',
            label: dictionary.services.items['due-diligence'].title,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            ),
        },
        {
            id: 'gdpr',
            label: dictionary.services.items['gdpr'].title,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
            ),
        },
        {
            id: 'optimization-solutions',
            label: dictionary.services.items['optimization-solutions'].title,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="20" x2="12" y2="10"></line>
                    <line x1="18" y1="20" x2="18" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="16"></line>
                </svg>
            ),
        },
        {
            id: 'ecommerce',
            label: dictionary.services.items['ecommerce'].title,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            ),
        },
    ];

    const handleNext = useCallback(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const handlePrev = useCallback(() => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const goToSlide = (slideId: string) => {
        const index = slides.findIndex((s) => s.id === slideId);
        if (index !== -1) {
            setDirection(index > currentSlide ? 1 : -1);
            setCurrentSlide(index);
        }
    };

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [handleNext, isPaused]);

    // Handle click outside to reset to general
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.hero-slider-container')) {
                if (currentSlide !== 0) {
                    setDirection(-1);
                    setCurrentSlide(0);
                }
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [currentSlide]);

    return (
        <section
            className="hero hero-slider-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentSlide}
                    custom={direction}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="hero-slide active"
                >
                    {/* Background */}
                    <div className="hero-background">
                        <img
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                        />
                    </div>
                    <div className="hero-overlay"></div>

                    {/* Content */}
                    <div className="hero-content" style={{ marginBottom: '14rem' }}>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="hero-text"
                        >
                            <h1>{slides[currentSlide].title}</h1>
                            <p>{slides[currentSlide].description}</p>

                            <div className="hero-buttons">
                                <Link
                                    href={slides[currentSlide].primaryHref}
                                    className="btn btn-primary"
                                >
                                    {slides[currentSlide].primaryBtnText}
                                </Link>
                                <Link
                                    href={slides[currentSlide].secondaryHref}
                                    className="btn btn-secondary"
                                >
                                    {slides[currentSlide].secondaryBtnText}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Service Navigation - Bottom */}
            <div className="hero-services">
                <div className="service-row">
                    {serviceNavItems.slice(0, 5).map((item) => (
                        <Link
                            key={item.id}
                            href={`/${lang}/services/${item.id}`}
                            className={`service-box ${slides[currentSlide].id === item.id ? 'active' : ''}`}
                        >
                            <div className="service-icon">
                                {item.icon}
                            </div>
                            <div className="service-name">
                                {item.label}
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="service-row">
                    {serviceNavItems.slice(5, 10).map((item) => (
                        <Link
                            key={item.id}
                            href={`/${lang}/services/${item.id}`}
                            className={`service-box ${slides[currentSlide].id === item.id ? 'active' : ''}`}
                        >
                            <div className="service-icon">
                                {item.icon}
                            </div>
                            <div className="service-name">
                                {item.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </section>
    );
}
