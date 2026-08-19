'use client';

import { useTransitionRouter } from 'next-view-transitions';
import styles from './Header.module.scss';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { usePathname } from 'next/navigation';
import { slideInOut, slideInDown } from '../utils/animations';

export default function Header() {
    const links = ['/', '/about', '/projects', '/cv'];
    const currentPath = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    const hasAnimated = useRef(false);
    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateScrolledState = () => {
            setIsScrolled(window.scrollY > 12);
        };

        updateScrolledState();
        window.addEventListener('scroll', updateScrolledState, { passive: true });

        return () => window.removeEventListener('scroll', updateScrolledState);
    }, []);

    useGSAP(() => {
        if (currentPath === '/') {
            gsap.set('#navbar', { y: -200 });

            const onMouseMove = () => {
                if (!hasAnimated.current && navbarRef.current) {
                    hasAnimated.current = true;
                    slideInDown('#navbar');
                }
            };

            window.addEventListener('mousemove', onMouseMove, { once: true });
            return () => window.removeEventListener('mousemove', onMouseMove);
        }
    }, []);

    const router = useTransitionRouter();
    const headerStyle: React.CSSProperties = {
        backgroundColor: isScrolled ? 'rgba(5, 5, 5, var(--header-bg-alpha))' : 'rgba(5, 5, 5, 0)',
        backdropFilter: isScrolled
            ? 'blur(var(--header-blur)) saturate(125%) brightness(0.84)'
            : 'blur(0px) saturate(100%) brightness(1)',
        WebkitBackdropFilter: isScrolled
            ? 'blur(var(--header-blur)) saturate(125%) brightness(0.84)'
            : 'blur(0px) saturate(100%) brightness(1)',
    };

    return (
        <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`} id="navbar" ref={navbarRef} style={headerStyle}>
            <div className={styles.backdrop} aria-hidden="true" />
            <div className={styles.content}>
                <div className={styles.logo}>
                    <div className="link">
                        <a className={styles.brand} 
                            onClick={(e) => {
                                if (currentPath !== links[0]) {
                                    e.preventDefault();
                                    router.push(links[0], {
                                        onTransitionReady: slideInOut,
                                    });
                                } else {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }}
                            href={links[0]}
                        >
                            &rsaquo; Hello World
                        </a>
                        <span className={styles.breadcrumb}>{currentPath}</span>
                    </div>
                </div>
                <div className="links">
                    <div className="link">
                        <a
                            onClick={(e) => {
                                if (currentPath !== links[1]) {
                                    e.preventDefault();
                                    router.push(links[1], {
                                        onTransitionReady: slideInOut,
                                    });
                                } else {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }}
                            href={links[1]}
                        >
                            &rsaquo; About Me
                        </a>
                    </div>
                    <div className="link">
                        <a
                            onClick={(e) => {
                                if (currentPath !== links[2]) {
                                    e.preventDefault();
                                    router.push(links[2], {
                                        onTransitionReady: slideInOut,
                                    });
                                } else {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }}
                            href={links[2]}
                        >
                            &rsaquo; Projects
                        </a>
                    </div>
                    <div className="link">
                        <a
                            onClick={(e) => {
                                if (currentPath !== links[3]) {
                                    e.preventDefault();
                                    router.push(links[3], {
                                        onTransitionReady: slideInOut,
                                    });
                                } else {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }}
                            href={links[3]}
                        >
                            &rsaquo; CV
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}