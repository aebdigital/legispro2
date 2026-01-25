'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useLenis } from 'lenis/react';

interface SmoothScrollLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
}

export default function SmoothScrollLink({ href, children, className }: SmoothScrollLinkProps) {
    const lenis = useLenis();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (lenis && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement);
            }
        }
    };

    return (
        <Link href={href} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
}
