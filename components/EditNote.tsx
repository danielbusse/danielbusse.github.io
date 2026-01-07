"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './EditNote.module.scss'
import { animateHandWriting } from '../utils/animations';

export default function EditNote() {
    const noteRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const iconRef = useRef<HTMLSpanElement>(null);

    const boldText = "Work in Progress:";
    const normalText = " Slow & steady updates.";

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!textRef.current || !noteRef.current || !cursorRef.current) return;

            const tl = gsap.timeline({ delay: 1.2 });
            
            // Select only the normal text characters (exclude bold text and cursor)
            const normalChars = Array.from(textRef.current.querySelectorAll('span'))
                .filter(span => span !== cursorRef.current && !span.closest('strong'));

            // Initial state
            tl.set(normalChars, { display: 'none' }) // Hide only normal text
            .set(noteRef.current, { opacity: 0, scale: 0.9 }) // Start slightly smaller
            .set(textRef.current, { opacity: 1 }) 
            .set(cursorRef.current, { opacity: 0 }) // Cursor hidden initially

            // Step 1: Pop in with bold text visible
            .to(noteRef.current, { 
                opacity: 1, 
                scale: 1,
                duration: 0.5, 
                ease: "back.out(1.7)" 
            })
            
            // Step 2: Show cursor
            .to(cursorRef.current, { opacity: 1, duration: 0.1 })

            // Step 3: Typewriter effect for normal text
            .to(normalChars, {
                display: 'inline',
                stagger: 0.05, 
                duration: 0, 
                delay: 1
            })
            
            // Step 4: Hide cursor after typing is done
            .to(cursorRef.current, { 
                opacity: 0, 
                animation: "none", // Stop blinking so it can fade out
                duration: 0, 
                delay: 1,
            })
            
            // Step 5: Start handwriting animation
            .call(() => {
                animateHandWriting(iconRef.current, 10, 5, 2);
            });

        }, noteRef);

        return () => ctx.revert();
    }, []);

    return(
        <div className={styles.wrapper}>
            <div className={styles.note} ref={noteRef} style={{ opacity: 0 }}>
                <span className={styles.icon} ref={iconRef}>✍️</span>
                <span className={styles.text} ref={textRef}>
                    <strong>
                        {boldText.split('').map((char, i) => (
                            <span key={`b-${i}`}>{char}</span>
                        ))}
                    </strong>
                    {normalText.split('').map((char, i) => (
                        <span key={`n-${i}`} style={{ display: 'none' }}>{char}</span>
                    ))}
                    <span className={styles.cursor} ref={cursorRef} style={{ opacity: 0 }}></span>
                </span>
            </div>
        </div>
    );
}