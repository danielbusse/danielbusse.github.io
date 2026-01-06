// based on Jonas Joseph's Respopnsive Timeline Concept
"use client";

import React, { useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "@/data/projects.json";
import styles from "./Timeline.module.scss";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const dateRefs = useRef<(HTMLDivElement | null)[]>([]);
    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const timelineItems = useMemo(() => {
        const items: any[] = [];
        projectsData.forEach((section) => {
            // 1. The Date Pill itself is an item
            items.push({
                type: 'date',
                content: section.period,
                key: `date-${section.period}`
            });
            // 2. The Projects are subsequent items
            section.projects.forEach((project, index) => {
                items.push({
                    type: 'project',
                    data: project,
                    key: `proj-${section.period}-${index}`   
                });
            });
        });
        return items;
    }, []);

    // Helper to determine spacing based on relationship between current item and next item
    const getSpacing = (currentItem: any, nextItem: any) => {
        if (!currentItem || !nextItem) return 150; // Default deep off-screen

        // Date -> Project = Match the Px->Date spacing to ensure consistent "throw"
        if (currentItem.type === 'date' && nextItem.type === 'project') return 25;
        
        // Project -> Project = Wider gap between cards in same period
        if (currentItem.type === 'project' && nextItem.type === 'project') return 40;
        
        // Project -> Date = Large Gap (Period Change) - This is the "Good" one we are mimicking
        if (currentItem.type === 'project' && nextItem.type === 'date') return 50;

        return 60; // Fallback
    };

    // Helper to calculate curve X position based on Y (0-1 normalized height)
    // Curve: Starts at x=120, curves left to x=80 at center, back to x=120
    // Using Quadratic Bezier alignment: x = 120 - 160*t + 160*t*t
    const getCurveX = (t: number) => {
        return 120 - (160 * t) + (160 * t * t);
    };

    useGSAP(() => {
        // Use refs instead of querySelector to ensure we get the elements
        const sections = sectionRefs.current; // Don't filter, we need index correspondence
        
        // Physics Consts (Log curvature)
        // Adjust these to change the "tightness" of the wheel
        // Updated for "Slower" tilt and larger radius feel
        const DEG_PER_VH = 0.12;      // Reduced to tilt slower
        const SCALE_PER_VH = 0.002; 
        const Z_PER_VH = 0.4;        // Reduced depth push

        if (sections.length === 0) return;

        // Initial setup
        sections.forEach((section, i) => {
            if (!section) return;
            gsap.set(section, { transformPerspective: 1000, transformStyle: "preserve-3d" });
            
            if (i === 0) {
                // Active: Center, Flat, Full Size
                gsap.set(section, { y: 0, autoAlpha: 1, scale: 1, rotationX: 0, z: 0 });
            } else if (i === 1) {
                // Next Peek: Calculated based on its specific gap
                const gap = getSpacing(timelineItems[0], timelineItems[1]);
                
                const rot = -gap * DEG_PER_VH;
                const sc = 1 - (gap * SCALE_PER_VH);
                const zDist = -gap * Z_PER_VH;

                gsap.set(section, { 
                    y: `${gap}vh`, 
                    autoAlpha: 0.5, 
                    scale: sc, 
                    rotationX: rot, 
                    z: zDist, 
                    transformOrigin: "center top" 
                });
            } else {
                // Deep: Generic starting point - Pushed further down/back
                gsap.set(section, { y: '120vh', autoAlpha: 0, scale: 0.7, rotationX: -30, z: -100, transformOrigin: "center top" });
            }
        });
        
        // Master Pinned Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current, 
                start: "top top", 
                end: "+=" + (sections.length * 1000), // Increased scroll speed (reduced distance)
                scrub: 1,
                pin: true,
            }
        });

        // Animation Loop - Rolling Log Effect
        timelineItems.forEach((item, i) => {
            if (i >= sections.length || !sections[i]) return;
            const currentSection = sections[i];
            const nextItem = timelineItems[i + 1];
            
            // Determine the "step size" for this scroll segment based on the gap to the next item
            const gap = (item && nextItem) ? getSpacing(item, nextItem) : 60;
            const duration = gap / 30; // Normalizes speed
            
            // Calculate specific physics for THIS gap
            const rot = gap * DEG_PER_VH;
            const sc = 1 - (gap * SCALE_PER_VH);
            const zDist = -(gap * Z_PER_VH);

            // Universal Easing: power1.inOut creates a "Slow Start / Slow End" curve
            // This makes the element linger in the center ("focus") and move faster through the transition
            const scrollEase = "power1.inOut";

            // 1. Current Item: Rolls UP from Center to Top (Exit)
            tl.to(currentSection, {
                y: `-${gap}vh`,      // Move up by gap
                rotationX: rot,      // Tilt forward (+X)
                scale: sc,           // Shrink
                z: zDist,            // Move back
                autoAlpha: 0.3,      // Kept partially visible (Fade out later)
                transformOrigin: "center bottom", 
                ease: scrollEase,        
                duration: duration 
            });

            // 2. Next Item: Rolls UP from Bottom (Peek) to Center (Active)
            if (i < timelineItems.length - 1) {
                const nextSection = sections[i + 1];
                if (nextSection) {
                    tl.to(nextSection, 
                        { 
                            y: 0, 
                            rotationX: 0, 
                            scale: 1, 
                            z: 0, 
                            autoAlpha: 1, 
                            ease: scrollEase, 
                            duration: duration 
                        },
                        "<" 
                    );
                }
            }

            // 3. Next-Next Item: Rolls UP from Deep Bottom (Hidden) to Bottom (Peek)
            if (i < timelineItems.length - 2) {
                const nextNextSection = sections[i + 2];
                const itemAfterNext = timelineItems[i + 2];
                const itemNext = timelineItems[i + 1];
                
                // It needs to end up at the gap distance from the NEW center (valleys are relative)
                const nextGap = getSpacing(itemNext, itemAfterNext);
                
                // Calculate target state for the "Peek" position
                const nextRot = -nextGap * DEG_PER_VH;
                const nextSc = 1 - (nextGap * SCALE_PER_VH);
                const nextZ = -nextGap * Z_PER_VH;

                if (nextNextSection) {
                    tl.fromTo(nextNextSection, 
                        { 
                            y: `${nextGap + 60}vh`, // Start MUCH further down (Move further)
                            rotationX: nextRot - 10, 
                            scale: nextSc - 0.1, 
                            z: nextZ - 30, // Less aggressive depth push
                            autoAlpha: 0 
                        },
                        {
                            y: `${nextGap}vh`,    // Land exactly at gap
                            rotationX: nextRot,   // Land exactly at calculated tilt
                            scale: nextSc,        // Land exactly at calculated scale
                            z: nextZ,             // Land exactly at calculated z
                            autoAlpha: 0.5,
                            ease: scrollEase,
                            duration: duration
                        }, "<");
                }
            }
            
            // 4. Previous Item: Rolls UP from Top (Exit) to Deep Top (Hidden)
            if (i > 0) {
                 const prevSection = sections[i-1];
                 if(prevSection) {
                     // Move further UP relative to current pos
                     // We just fade it out and push it further along the curve
                     tl.to(prevSection, {
                         y: `-=${gap + 20}vh`, // Move FURTHER up (Accelerate away)
                         rotationX: rot + 10, 
                         scale: sc - 0.1,    
                         z: zDist - 30,       
                         autoAlpha: 0,        // Fade out completely HERE (Later)
                         ease: scrollEase,
                         duration: duration
                     }, "<");
                 }
            }
        });

        // Connector Animation Loop
        const updateConnectors = () => {
             const containerRect = containerRef.current?.getBoundingClientRect();
             if (!containerRect) return;

             dateRefs.current.forEach((dateEl, i) => {
                 if (!dateEl) return; // Only exists for 'date' items
                 const dotEl = dotRefs.current[i];
                 const lineEl = lineRefs.current[i];
                 if (!dotEl || !lineEl) return;

                 const rect = dateEl.getBoundingClientRect();
                 
                 // Calculate coordinates relative to the Container, not Viewport
                 // This allows proper functioning regardless of content above/below or pinning state
                 const localY = (rect.top - containerRect.top) + (rect.height / 2);
                 const localLeft = rect.left - containerRect.left;

                 // t is ratio of vertical position within the viewport/container height
                 // Since container is 100vh, localY gives us the position relative to the "screen" frame of the container
                 const t = Math.max(0, Math.min(1, localY / window.innerHeight));
                 
                 const curveX = getCurveX(t); 
 
                 // Update positions using Local Coordinates (dotEl is absolute inside relative container)
                 dotEl.style.transform = `translate(${curveX}px, ${localY}px) translate(-50%, -50%)`;
                 
                 // Calculate line length to reach date pill with a small gap
                 const distToDate = localLeft - curveX;
                 const extendedLength = distToDate * 0.9; // 20px gap prevents touching
                 
                 lineEl.style.width = `${Math.max(0, extendedLength)}px`;
                 lineEl.style.transform = `translate(${curveX}px, ${localY}px)`;
                 
                 // Sync opacity with parent section
                 // Use inline style set by GSAP, fallback to 1 if not set (default visible)
                 const currentSection = sectionRefs.current[i];
                 // Force visibility to visible once positioned, assuming section is visible
                 const sectionOpacity = currentSection?.style.opacity || (i === 0 ? "1" : "0"); 
                 
                 lineEl.style.opacity = sectionOpacity;
                 dotEl.style.opacity = sectionOpacity;
                 
                 // Ensure visibility is turned on after first positioning (fixes flash)
                 dotEl.style.visibility = "visible";
                 lineEl.style.visibility = "visible";
             });
        };

        // Run once immediately to set initial positions before frame paint
        updateConnectors();

        gsap.ticker.add(updateConnectors);
        return () => gsap.ticker.remove(updateConnectors);

    }, { scope: containerRef });

    return (
        <div style={{ width: '100%', minHeight: '100vh' }}>
            <div className={styles.timeline} ref={containerRef}>
                {/* Fixed Background Curve Container */}
                <div className={styles.curveContainer} style={{ width: '250px' }}>
                <svg className={styles.curveSvg} viewBox="0 0 250 1000" preserveAspectRatio="none">
                     <defs>
                        <linearGradient id="fade-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="white" stopOpacity="0"/>
                            <stop offset="20%" stopColor="white" stopOpacity="0.5"/>
                            <stop offset="80%" stopColor="white" stopOpacity="0.5"/>
                            <stop offset="100%" stopColor="white" stopOpacity="0"/>
                        </linearGradient>
                        <mask id="fade-mask">
                            <rect x="0" y="0" width="100%" height="100%" fill="url(#fade-gradient)"/>
                        </mask>
                    </defs>
                    {/* Curve Path */}
                    <path d="M 120,0 Q 40,500 120,1000" stroke="white" strokeWidth="2" fill="none" mask="url(#fade-mask)" vectorEffect="non-scaling-stroke" />
                </svg>
                {/* Connectors - Only for Date Items */}
                {timelineItems.map((item, i) => (
                    item.type === 'date' ? (
                        <React.Fragment key={`connector-${i}`}>
                            <div 
                                ref={el => { dotRefs.current[i] = el; }} 
                                className={styles.connectorDot}
                                style={{position: 'absolute', top: 0, left: 0, visibility: 'hidden'}} 
                            />
                            <div 
                                ref={el => { lineRefs.current[i] = el; }} 
                                className={styles.connectorLine}
                                style={{position: 'absolute', top: 0, left: 0, visibility: 'hidden'}} 
                            />
                        </React.Fragment>
                    ) : null
                ))}
            </div>

            {timelineItems.map((item, index) => (
                <div 
                    key={item.key} 
                    className={styles.section}
                    ref={el => { sectionRefs.current[index] = el; }}
                >
                    <div className={styles.sectionContent}>
                        {item.type === 'date' ? (
                           <div 
                                className={styles.date}
                                ref={el => { dateRefs.current[index] = el; }}
                            >
                                📆 {item.content}
                            </div>
                        ) : (
                            <div className={styles.row} style={{ width: '100%', margin: 0, justifyContent: 'flex-start' }}>
                                <div className={styles.col} style={{ width: '100%', maxWidth: '450px', margin: 0 }}>
                                    <Link href={item.data.link || "#"} className={styles.cardLink}>
                                        <div className={styles.card}>
                                            <div className={styles.thumbnailStub}>
                                                <span className={styles.placeholderIcon}>🖼️</span>
                                            </div>
                                            <div className={styles.contentWrapper}>
                                                <div className={styles.title}>
                                                    {item.data.title}
                                                </div>
                                                <div className={styles.content}>
                                                    {item.data.description}
                                                </div>
                                                <div className={styles.footer}>
                                                    {item.data.tags.join(", ")}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}