"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "@/data/projects.json";
import styles from "./WheelTimeline.module.scss";
import Link from "next/link";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface TimelineItem {
    type: 'date' | 'project';
    content?: string;
    data?: any;
    key: string;
    index: number;
    gapBefore: number; // Distance from previous item
    pos: number; // Absolute linear position
}

interface WheelTimelineProps {
    radius?: number; // Virtual radius of the wheel in pixels or units
    itemBaseHeight?: number; // Base unit for spacing
}

export default function WheelTimeline({ radius = 800, itemBaseHeight = 150 }: WheelTimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const [windowHeight, setWindowHeight] = useState(0);
    // Removed cached pillWidths to use direct read due to stability issues
    // const [pillWidths, setPillWidths] = useState<Record<string, number>>({});

    // Initial window size
    useEffect(() => {
        setWindowHeight(window.innerHeight);
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 1. Prepare Data
    const items = useMemo(() => {
        if (typeof window === "undefined" && windowHeight === 0) return []; // partial hydration guard

        const tempItems: any[] = [];
        
        projectsData.forEach((section) => {
            // Date Pill
            tempItems.push({
                type: 'date',
                content: section.period,
                key: `date-${section.period}`,
                data: null
            });
            // Projects
            section.projects.forEach((project, pIndex) => {
                tempItems.push({
                    type: 'project',
                    data: project,
                    content: null,
                    key: `proj-${section.period}-${pIndex}`
                });
            });
        });

        // Constants for logic
        const H_DATE = 42; // px approx
        const H_CARD = 240; // px approx
        
        // VH gaps
        const VH_DATE_PROJ = 0.05; // 5vh
        const VH_PROJ_PROJ = 0.05; // 5vh
        const VH_PROJ_DATE = 0.15; // 15vh
        const VH = windowHeight || 1080; // Fallback

        // specific gap logic requested by user
        // Gap = (HeightPrev/2) + (HeightCurr/2) + VH_Percentage * VH
        let currentPos = 0;
        
        return tempItems.map((item, i, arr) => {
            let gap = 0;
            const prev = arr[i - 1];
            
            if (prev) {
                const hPrev = prev.type === 'date' ? H_DATE : H_CARD;
                const hCurr = item.type === 'date' ? H_DATE : H_CARD;
                
                let vhGap = 0;
                
                if (prev.type === 'date' && item.type === 'project') vhGap = VH_DATE_PROJ;
                else if (prev.type === 'project' && item.type === 'project') vhGap = VH_PROJ_PROJ;
                else if (prev.type === 'project' && item.type === 'date') vhGap = VH_PROJ_DATE;
                
                // Gap logic:
                // We want the space between standard DOM flow elements to include the elements themselves?
                // No, "gap" usually means empty space. 
                // But `pos` is center-to-center distance.
                // So center-to-center = (hPrev/2) + GAP + (hCurr/2).
                
                gap = (hPrev / 2) + (hCurr / 2) + (vhGap * VH);
            } else {
                gap = 0; // First item starts at 0
            }

            currentPos += gap;

            return {
                ...item,
                index: i,
                gapBefore: gap,
                pos: currentPos
            } as TimelineItem;
        });
    }, [itemBaseHeight, windowHeight]);

    const [pillWidths, setPillWidths] = useState<Record<string, number>>({});

    // Measure pill widths once on mount/resize
    useEffect(() => {
        const measure = () => {
            const widths: Record<string, number> = {};
            items.forEach(item => {
                if (item.type === 'date') {
                    const el = document.getElementById(item.key);
                    const pill = el?.querySelector(`.${styles.datePill}`) as HTMLElement;
                    if (pill) {
                        widths[item.key] = pill.offsetWidth / 2;
                    }
                }
            });
            setPillWidths(widths);
        };
        
        // Slight delay to ensure render
        setTimeout(measure, 100);
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [items]);

    const totalDistance = items[items.length - 1]?.pos || 0;
    
    // Config for Ring Position
    const RING_X_OFFSET = 300; // Distance from center of screen to the ring plane

    // Enable CSS Scroll Snap on the document
    useEffect(() => {
        document.documentElement.style.scrollSnapType = 'y proximity'; // 'proximity' is less aggressive than 'mandatory', allows free scroll but catches alignment
        // Trying 'mandatory' for strict one-step feel
        document.documentElement.style.scrollSnapType = 'y mandatory'; 
        
        return () => {
            document.documentElement.style.scrollSnapType = '';
        };
    }, []);

    useGSAP(() => {
        if (!items.length) return;

        // Ensure container has height to scroll
        // The scrollable distance should map to the totalDistance of items
        
        const updateItems = () => {
            const scrollY = window.scrollY; // Or use a specific scroller if not window
            
            const viewportCheck = window.innerHeight;
            
            const scrollProgress = scrollY; // Pixel for Pixel mapping?
            
            // Loop through items and update their transform
            items.forEach((item, i) => {
                const el = document.getElementById(item.key);
                if (!el) return;

                // Distance from the "focus" point (current scroll position)
                const distance = item.pos - scrollProgress;
                
                // If distance is too far, hide or optimize?
                if (Math.abs(distance) > radius * 1.5) {
                    el.style.display = 'none';
                    return;
                }
                el.style.display = 'flex';

                // Physical Wheel Math
                // angle = distance / radius
                const angle = distance / radius; // radians
                const angleDeg = angle * (180 / Math.PI);

                // Y position on screen (relative to center)
                // On a wheel: Y = R * sin(angle)
                // But we want it flat at center.
                // Standard 3D wheel: 
                // z = R * (cos(angle) - 1)  (0 at center, negative away) or R * cos(angle) - R
                // y = R * sin(angle)
                
                // User wants: "focus state ... not rotated, scaled or faded ... center of screen"
                // So at distance=0 -> y=0, rot=0, scale=1
                
                const y = radius * Math.sin(angle);
                const z = radius * (Math.cos(angle) - 1);
                
                // Rotation: The element should face the center of the wheel?
                // If it's a rolodex, it rotates corresponding to the angle.
                // angle 0 -> rot 0.
                // angle positive (below) -> rot negative (tilt back/up)? 
                // Let's try `rotateX = -angleDeg`.
                const rotateX = -angleDeg;
                
                // Scale & Opacity
                // Focus: 1. Exit: scaled/faded.
                // We can base this on angle magnitude.
                const absAngle = Math.abs(angle);
                const scale = 1 - (absAngle * 0.2); // linear falloff
                const opacity = 1 - (absAngle * 0.5); // fade out
                
                // Z-Index: Closer to focus (0 angle) means higher z-index
                const zIndex = Math.floor(100 - absAngle * 10);

                // Apply
                const finalScale = Math.max(0, scale);
                gsap.set(el, {
                    y: y,
                    z: z,
                    rotationX: rotateX,
                    scale: finalScale,
                    opacity: Math.max(0, opacity),
                    zIndex: zIndex
                });

                // --- FOCUS GLOW EFFECT ---
                // Find visual target (Date Pill or Project Card)
                const datePillRef = el.querySelector(`.${styles.datePill}`) as HTMLElement;
                const projectCardRef = el.querySelector(`.${styles.projectCard}`) as HTMLElement;
                const visualTarget = datePillRef || projectCardRef;

                if (visualTarget) {
                     // 0 angle = max glow. Falloff faster than opacity.
                     const glowIntensity = Math.max(0, 1 - (absAngle * 2.5)); 
                     
                     // Define visual params
                     const isDate = !!datePillRef;
                     const color = '255, 255, 255';
                     const alpha = isDate ? 0.6 : 0.4;
                     const blur = isDate ? 15 : 25; // px
                     
                     // Match CSS base shadows
                     const baseShadow = isDate 
                        ? '0 4px 6px rgba(0,0,0,0.1)' 
                        : '0 10px 30px rgba(0,0,0,0.15)'; // Update if CSS changes!
                     
                     // Construct Shadow String: Glow Layer + Base Layer
                     // We always set it to ensure smooth transition to 0 opacity
                     const glowShadow = `0 0 ${blur}px rgba(${color}, ${alpha * glowIntensity})`;
                     
                     gsap.set(visualTarget, {
                         boxShadow: `${glowShadow}, ${baseShadow}`
                     });
                }

                // Update Connector line if Date Pill
                if (item.type === 'date') {
                    const connLine = document.getElementById(`conn-line-${item.key}`);
                    if (connLine && datePillRef) {
                        // Use the already found ref
                        let pillRadius = datePillRef.offsetWidth / 2;
                        
                        // Length = Distance - PillRadius
                        // The entire item (pill + connector) is scaled by `finalScale`.
                        // The Gap we need to cross in World Space is: RING_X_OFFSET - (pillRadius * finalScale).
                        // The Connector Line Width `w` will be visually scaled to `w * finalScale`.
                        // So: w * finalScale = RING_X_OFFSET - (pillRadius * finalScale).
                        // w = (RING_X_OFFSET / finalScale) - pillRadius.
                        
                        let safeScale = finalScale < 0.1 ? 0.1 : finalScale; // Prevent divide by zero/huge numbers
                        let length = (RING_X_OFFSET / safeScale) - pillRadius; 
                        
                        // Prevent negative length or huge spikes
                        if (length < 0) length = 0;
                        if (length > 2000) length = 2000; // Cap at reasonable visual limit?

                        gsap.set(connLine, {
                            width: length,
                            rotationX: -rotateX // Counter-rotate to keep flat and horizontal
                        });
                    }
                }
            });
        };

        // Create a Ghost Scroll trigger to drive the animation
        // The total height of the page needs to accommodate the items.
        // We set document body height or a spacer height.
        
        ScrollTrigger.create({
            trigger: document.body, // or a specific spacer
            start: "top top",
            end: "bottom bottom", 
            scrub: true, // Tied to physics
            // Snap Removed in favor of CSS Scroll Snap for "one-step" feel
            onUpdate: (self) => {
                // We can use self.scroll() or just generic listener
                requestAnimationFrame(updateItems);
            }
        });

        updateItems(); // Initial call
        window.addEventListener('scroll', updateItems); // Fallback/Additional

        return () => {
             window.removeEventListener('scroll', updateItems);
             ScrollTrigger.getAll().forEach(t => t.kill());
        };

    }, [items, totalDistance, radius]);

    return (
        <>
            {/* Height Spacer to allow scrolling with CSS Snap Points */}
            <div style={{ height: `calc(${totalDistance}px + 100vh)`, position: 'absolute', top: 0, width: '100%' }} className={styles.scrollTrack}>
                {items.map(item => (
                    <div 
                        key={`snap-${item.key}`}
                        style={{
                            position: 'absolute',
                            top: `${item.pos}px`,
                            left: 0,
                            width: '100%',
                            height: '1px',
                            scrollSnapAlign: 'start', // Aligns this div's top (item.pos) to viewport top (scrollY)
                            pointerEvents: 'none',
                        }}
                    />
                ))}
            </div>

            <div className={styles.container} ref={containerRef}>
                <div className={styles.viewport} ref={viewportRef}>
                    {/* 3D Ring Element */}
                    <div 
                        className={styles.timelineRing}
                        style={{
                            width: radius * 2, // Diameter = 2 * Radius to match the wheel curvature exactly
                            height: radius * 2,
                            // Ring Geometry:
                            // Rotated 90deg Y to be a vertical circle loop.
                            // Centered at Z = -radius (center of the timeline wheel).
                            // This puts the front edge at Z = 0 (focus plane).
                            // Translated X to sit to the left of the content.
                            transform: `translate(-50%, -50%) translateX(-${RING_X_OFFSET}px) translateZ(${-radius}px) rotateY(90deg)`
                        }}
                    />

                    {items.map((item) => (
                        <div 
                            key={item.key} 
                            id={item.key}
                            className={styles.item}
                            // Base positioning centered, then we transform
                        >
                            {item.type === 'date' ? (
                                <div className={styles.datePill}>
                                    {item.content}
                                    {/* Connector */}
                                    <div className={styles.connector}>
                                        <div className={styles.connectorLine} id={`conn-line-${item.key}`}>
                                            <div className={styles.connectorDot} />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                item.data.link ? (
                                    <Link href={item.data.link} className={styles.projectCardLink}>
                                        <div className={styles.projectCard}>
                                            <h3>{item.data.title}</h3>
                                            <p>{item.data.description}</p>
                                            <div className={styles.tags}>
                                                {item.data.tags?.map((t: string) => (
                                                    <span key={t}>{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className={styles.projectCard}>
                                        <h3>{item.data.title}</h3>
                                        <p>{item.data.description}</p>
                                        <div className={styles.tags}>
                                            {item.data.tags?.map((t: string) => (
                                                <span key={t}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
