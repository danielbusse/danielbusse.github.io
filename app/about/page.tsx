"use client"

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ReactLenis } from 'lenis/react';
import { useTransitionRouter } from 'next-view-transitions';
import Image from 'next/image';
import EditNote from "@/components/EditNote";
import Button from "@/components/Button";
import AboutGridItem from '@/components/about/AboutGridItem';
import { aboutSections } from '@/content/about/sections';
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
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
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
                <br />
                <div className={styles.about} style={{ position: 'relative', zIndex: 1 }}>
                    
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
                                Thanks for checking out my little website. I&apos;m Daniel, a software engineer with a master&apos;s degree in Telematics. I am experienced in computer vision, machine learning, and some web development. <br/><br/>
                                I enjoy working on projects that challenge me to learn new things and push the boundaries of what is possible with technology.
                            </p>
                        </div>
                    </div>

                    <div className={styles.gridSection}>
                        {aboutSections.map((item) => (
                            <AboutGridItem key={item.id} item={item} />
                        ))}
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
