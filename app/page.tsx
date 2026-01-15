'use client';

//import { motion } from 'framer-motion';
//import { useTransitionRouter } from "next-view-transitions";
import { ReactLenis } from 'lenis/react';
//import { usePathname } from "next/navigation";

import styles from './home.module.scss';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { fadeInUp } from '../utils/animations';
import Button from '@/components/Button';
import Image from 'next/image';
import background1 from './assets/background1.png';

gsap.registerPlugin(SplitText)

export default function HomePage() {

  const container = useRef<HTMLElement | null>(null);
  //const links = ["/", "/about", "/projects", "/contact"];
  //const currentPath = usePathname();

  useGSAP(() => {
    const split = SplitText.create("#fancytitle", { type: "words, chars" });
    const tl = gsap.timeline();
    tl.add("bluespin", 1)
      .from(split.words, { duration: 1, y: 100, autoAlpha: 0, stagger: 0.4}, 0.2)
      .add(fadeInUp("#signature"), 2)
      .add(fadeInUp("#projects-button"), 4)
      .add(fadeInUp("#github-button"), 5)
  })

  return (
    <ReactLenis root>
      <main className={styles.home} ref={container}>
        <Image
          src={background1}
          alt="Background"
          placeholder="blur"
          fill
          quality={100}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            // zIndex: -1 removed to prevent hiding behind body background
          }}
        />
        <div className={styles.hero} style={{ position: 'relative', zIndex: 1 }}>
          <h1 className={styles.fancytitle} id="fancytitle">Hi, my name is</h1>
          <h1 className={styles.signature} id="signature">Daniel</h1>
        </div>
        <div className={styles.buttons}>
          <Button 
            href="/projects" 
            id="projects-button"
            className={styles.cta}
            animateOnLoad={true}
            delay={4.5}
          >
            Check out my Projects
          </Button>
          <Button 
            href="https://github.com/danielbusse/" 
            id="github-button"
            className={styles.cta}
            animateOnLoad={true}
            delay={5.5}
          >
            Check out my Github
          </Button>
        </div>
      </main>
    </ReactLenis>
  );
}