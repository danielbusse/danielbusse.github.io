'use client';

import { useTransitionRouter } from "next-view-transitions";
//import { useEffect, useState } from "react";
import styles from './Header.module.scss';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { usePathname } from "next/navigation";

export default function Header() {
    const links = ["/", "/about", "/projects", "/contact"];
    const currentPath = usePathname();

    const hasAnimated = useRef(false);
    const navbarRef = useRef<HTMLDivElement>(null)
    
    useGSAP(() => {
        if (currentPath == "/") {
            gsap.set("#navbar", {y:-200})
            
            const onMouseMove = () => {
                if (!hasAnimated.current && navbarRef.current) {
                    hasAnimated.current = true;

                    gsap.to("#navbar", {y:0, duration: 1, ease:"power4.out"});
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

    function slideInOut() {
        document.documentElement.animate(
            [
                {
                    opacity: 1,
                    transform: "translateY(0)",
                },
                {
                    opacity: 0.2,
                    transform: "translateY(-35%)",
                }
            ], {
                duration: 1500,
                easing: "cubic-bezier(0.87, 0, 0.13, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
        });

        document.documentElement.animate(
            [
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                },
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                }
            ], {
                duration: 1500,
                easing: "cubic-bezier(0.87, 0, 0.13, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
        });
    }

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