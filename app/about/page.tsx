"use client"

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ReactLenis } from 'lenis/react';
import { useTransitionRouter } from 'next-view-transitions';
import Image from 'next/image';
import EditNote from "@/components/EditNote";
import Button from "@/components/Button";
import { animateWave, slideInOut } from '@/utils/animations';
import background2 from '../assets/background2.png';

import styles from './About.module.scss'

export default function ProjectsPage() {
    const waveRef = useRef(null);
    const router = useTransitionRouter();

    useGSAP(() => {
        animateWave(waveRef.current, 1.0);
    });

    const handleProjectClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push('/projects', {
            onTransitionReady: slideInOut,
        });
    };

    return (
        <ReactLenis root>
            <div className={styles.main}>
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                    <Image
                        src={background2}
                        alt="Background"
                        placeholder="blur"
                        fill
                        quality={100}
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <div className={styles.about}>
                    <EditNote />
                    
                    <div className={styles.profileSection}>
                        <div className={styles.imageWrapper}>
                            <Image 
                                src="/assets/IMG_2256.png" 
                                alt="Daniel Busse" 
                                width={400} 
                                height={400} 
                                className={styles.profileImage}
                                priority
                            />
                        </div>
                        <div className={styles.introText}>
                            <h1><span ref={waveRef} style={{ display: 'inline-block', transformOrigin: '70% 70%' }}>👋</span> Welcome!</h1>
                            <p>
                                Thanks for checking out my little website. I&apos;m Daniel, a software engineer with a Bachelor&apos;s degree in Telematics, currently pursuing a Master&apos;s degree in the same field.
                            </p>
                        </div>
                    </div>

                    <div className={styles.gridSection}>
                        <div className={styles.gridItem}>
                            <h3>💼 Career & Experience</h3>
                            <p>
                                During my studies, I have gained practical experience through internships and working student positions. I have worked for the university data center doploying and maintaining servers and services. I also worked for a engineering office developing solutions for RFID applications. During my bachelor thesis and beyond I worked for the Wildauer Maschinen Werke on lane detection algorithms using computer vision for Trucks in the scale of 14:1. My master Thesis has been conducted with John Deere focusing on the transfer of multimodal machine learning models into the agricultural domain. You can read my CV <a href="/cv" onClick={handleProjectClick}>here</a> and find some more of my projects <a href="/projects" onClick={handleProjectClick}>here</a>.
                            </p>
                        </div>

                        <div className={styles.gridItem}>
                            <h3>🧠 Personality</h3>
                            <p>
                                I am a logical and strategic thinker. I like to play video games of different genres but mostly with strategic elements. I have a high interest in understanding things and ideas better and the relationships and connections between them. I am eager to learn more and love exchanging ideas and thoughts with others, exploring multiple perspectives to gain a deeper understanding.
                            </p>
                        </div>

                        <div className={styles.gridItem}>
                            <h3>🎮 Game Development</h3>
                            <Image 
                                src="/assets/IMG_3928.png" 
                                alt="Game Development Screenshot" 
                                width={800} 
                                height={450} 
                                className={styles.mediaImage}
                            />
                            <p>
                                Game development is my personal coding adventure. This multidisciplinary field of engineering leaves so much room for creative ideas and experimentation. I love being able to pack emotions, ideas, relationships and fun into a singular medium.
                            </p>
                        </div>

                        <div className={styles.gridItem}>
                            <h3>🎸 Music Passion</h3>
                            <Image 
                                src="/assets/IMG_1804.png" 
                                alt="Playing Guitar on Stage" 
                                width={800} 
                                height={450} 
                                className={`${styles.mediaImage} ${styles.focusTop}`}
                            />
                            <p>
                                Music is my longest-running passion. I&apos;ve been playing guitar since primary school and still jam with others regularly. Besides guitar I like playing other instruments like piano and drums, even though I&apos;m not an expert with them. And like most people, I love listening to music and discussing it with others.
                            </p>
                        </div>

                        <div className={styles.gridItem}>
                            <h3>👥 Creativity & Community</h3>
                            <p>
                                I love to be creative! And I express my creativity by making music, video game development and conceptualizing. I also enjoy doing team sports. The emphasis on teamwork in sports is more important to me than competition. Sports I like to play are volleyball, football (soccer), spikeball and many more — it&apos;s always fun to learn something new. Every summer, I volunteer as staff at an english camp for teenagers in a rural region of Brandenburg, as well as multiple reunions throughout the year amongst the same community.
                            </p>
                        </div>
                    </div>

                    <div className={styles.outroSection}>
                        <p>
                            If you want to read about my professional work, feel free to check out my CV, LinkedIn and GitHub below! Or read about some projects I worked on under <a href="/projects" onClick={handleProjectClick}>Projects section</a>.
                        </p>
                        <div className={styles.buttons}>
                            <Button 
                                href="/cv" 
                                id="cv-button"
                                className={styles.cta}
                            >
                                Read my CV
                            </Button>
                            <Button 
                                href="https://www.linkedin.com/in/danielbusse97" 
                                id="linkedin-button"
                                className={styles.cta}
                            >
                                Visit my LinkedIn
                            </Button>
                            <Button 
                                href="https://github.com/danielbusse/" 
                                id="github-button"
                                className={styles.cta}
                            >
                                Check out my Github
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactLenis>
    );
}
