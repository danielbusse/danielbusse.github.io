"use client"

import ReactLenis from "@studio-freight/react-lenis";
import React from "react";

import Timeline from '@/components/Timeline';
import styles from './Projects.module.scss';

export default function About() {
    return (
        <ReactLenis root>
            <div className={styles.main}>
                <section className={styles.intro}>
                    <h1>
                        Selected Projects
                    </h1>
                    <span className={styles.notice}>
                        Below you can find a selection of projects I have worked on in the past. Feel free to read them.
                    </span>
                </section>
                
                <Timeline />
            </div>
        </ReactLenis>
    );
}