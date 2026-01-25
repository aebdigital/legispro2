import Link from 'next/link';
import { Locale } from '@/i18n-config';
import { getLocalizedPath } from '@/pathnames';

const icons: Record<string, React.ReactNode> = {
    'commercial-law': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 6l2 2M6 16l2 2M16 18l2-2M6 8l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    ),
    'financial-law': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M6 6h4v4H6zM14 6h4v2h-4zM14 10h4v2h-4zM6 12h12v2H6zM6 16h12v2H6z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M21 8h2v2h-2zM21 12h2v2h-2z" fill="currentColor"/>
        </svg>
    ),
    'criminal-law': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/>
        </svg>
    ),
    'litigations': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" stroke="currentColor" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
            <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
        </svg>
    ),
    'start-ups-greenfield-projects': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.663 17h4.673M12 3l1.5 4.5 4.5 1.5-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    'real-estate': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2"/>
            <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
        </svg>
    ),
    'due-diligence': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
        </svg>
    ),
    'gdpr': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="16" r="1" fill="currentColor"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
        </svg>
    ),
    'optimization-solutions': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
    ),
    'ecommerce': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
            <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="2"/>
        </svg>
    ),
    // Fallback icon
    'default': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
};

interface ServiceSidebarProps {
    dictionary: any;
    lang: Locale;
    currentSlug: string;
}

export default function ServiceSidebar({ dictionary, lang, currentSlug }: ServiceSidebarProps) {
    const services = dictionary.services.items;
    
    // Define the order of services to match the legacy sidebar if possible, or just use Object.keys
    const serviceOrder = [
        'commercial-law',
        'financial-law',
        'criminal-law',
        'litigations',
        'start-ups-greenfield-projects',
        'real-estate',
        'due-diligence',
        'gdpr',
        'optimization-solutions',
        'ecommerce'
    ];

    return (
        <div className="service-sidebar-content">
            <div className="service-navigation-card">
                <h3>{dictionary.services.title}</h3>
                <ul className="service-nav-list">
                    {serviceOrder.map((slug) => {
                        const service = services[slug];
                        if (!service) return null;
                        
                        const isActive = currentSlug === slug;
                        const icon = icons[slug] || icons['default'];

                        return (
                            <li key={slug}>
                                <Link href={`${getLocalizedPath('/services', lang)}/${slug}`} className={isActive ? 'active' : ''}>
                                    <span className="nav-icon">{icon}</span>
                                    {service.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
