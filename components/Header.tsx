'use client';

import { useTransitionRouter } from "next-view-transitions";
//import { useEffect, useState } from "react";
import styles from './Header.module.scss';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { usePathname } from "next/navigation";
import { slideInOut, slideInDown } from '../utils/animations';

export default function Header() {
    const links = ["/", "/about", "/projects", "/contact"];
    const currentPath = usePathname();

    const hasAnimated = useRef(false);
    const navbarRef = useRef<HTMLDivElement>(null)
    
    useGSAP(() => {
        if (currentPath == "/") {
            // Initial state is handled by the tween now, or we can set it if needed to prevent flash
            gsap.set("#navbar", {y:-200}) 
            
            const onMouseMove = () => {
                if (!hasAnimated.current && navbarRef.current) {
                    hasAnimated.current = true;
                    slideInDown("#navbar");
                }
            };
            
            window.addEventListener('mousemove', onMouseMove, { once: true });
            return () => window.removeEventListener('mousemove', onMouseMove);
        }
    }, []);
    

    /**
     * For site transitions
     */
    const router = useTransitionRouter();

    return (
        <nav className={styles.nav} id="navbar" ref={navbarRef}>
            <div className={styles.logo}>
                <div className="link">
                    <a 
                        onClick={(e) => {
                            if (currentPath != links[0]) {
                                e.preventDefault();
                                router.push(links[0], {
                                    onTransitionReady: slideInOut,
                                });
                            } else {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }}
                        href={links[0]}>&rsaquo; Hello World</a>
                        <span className={styles.breadcrumb}>{currentPath}</span>
                </div>
            </div>
            <div className="links">
                <div className="link">
                    <a 
                        onClick={(e) => {
                            if (currentPath != links[1]) {
                                e.preventDefault();
                                router.push(links[1], {
                                    onTransitionReady: slideInOut,
                                });
                            } else {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }}
                        href={links[1]}>&rsaquo; About Me</a>
                </div>
                <div className="link">
                    <a 
                        onClick={(e) => {
                            if (currentPath != links[2]) {
                                e.preventDefault();
                                router.push(links[2], {
                                    onTransitionReady: slideInOut,
                                });
                            } else {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }}
                        href={links[2]}>&rsaquo; Projects</a>
                </div>
            </div>
        </nav>
    );
}