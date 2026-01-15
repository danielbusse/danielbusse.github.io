"use client"

import { ReactLenis } from 'lenis/react';
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Timeline from '@/components/Timeline';
import EditNote from "@/components/EditNote";
import Image from 'next/image';
import background6 from '../assets/background6.png';

import styles from './Projects.module.scss';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function About() {
    const container = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenisRef = useRef<any>(null);

    // Lenis options for tighter control
    const lenisOptions = {
        duration: 0.6, // Default is usually ~1.2. Lower = stops faster.
        smoothWheel: true,
    };

    const handleScrollHintClick = () => {
        lenisRef.current?.lenis?.scrollTo('#timeline-start', {
            offset: 0, 
            duration: 1.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // smoother easing
        });
    };

    return (
        <ReactLenis root options={lenisOptions} ref={lenisRef}>
            <div className={styles.main} ref={container}>
                <div className={styles.background}>
                    <Image
                        src={background6}
                        alt="Background"
                        placeholder="blur"
                        fill
                        quality={100}
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                    <div className={styles.overlay} />
                </div>
                <section className={styles.intro}>
                    <h1>
                        Selected Projects
                    </h1>
                    <span className={styles.notice}>
                        Below you can find a selection of projects I have worked on in the past.
                    </span>
                    <EditNote/>
                    
                    <div className={styles.scrollHint}>
                        <div className={styles.circle} onClick={handleScrollHintClick}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3v18M19 14l-7 7-7-7"/>
                            </svg>
                        </div>
                    </div>
                </section>
                
                <div id="timeline-start" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
                    <Timeline />
                </div>
            </div>
        </ReactLenis>
    );
}