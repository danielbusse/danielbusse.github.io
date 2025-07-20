'use client';

import { motion } from 'framer-motion';
import { useTransitionRouter } from "next-view-transitions";
import ReactLenis from '@studio-freight/react-lenis';
import { usePathname } from "next/navigation";

import styles from './home.module.scss';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

gsap.registerPlugin(SplitText)

export default function HomePage() {

  const container = useRef<HTMLElement | null>(null);
  const router = useTransitionRouter();
  const links = ["/", "/about", "/projects", "/contact"];
  const currentPath = usePathname();

  useGSAP(() => {
    let split = SplitText.create("#fancytitle", { type: "words, chars" });
    const tl = gsap.timeline();
    tl.add("bluespin", 1)
      .from(split.words, { duration: 1, y: 100, autoAlpha: 0, stagger: 0.4}, 0.2)
      .from("#signature", { duration: 1, y: 100, autoAlpha: 0}, 2)
      .from("#projects-button", { duration: 1, y: 100, autoAlpha: 0}, 4)
      .fromTo("#projects-shimmer", {x: 350, rotation: 30}, {x:0, rotation: 30}, 4.5)
      .from("#github-button", { duration: 1, y: 100, autoAlpha: 0}, 5)
      .fromTo("#github-shimmer", {x: 350, rotation: 30}, {x:0, rotation: 30}, 5.5);
  })

  /**
     * For site transitions
     */

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
    <ReactLenis root>
      <main className={styles.home} ref={container}>
        <div className={styles.hero}>
          <h1 className={styles.fancytitle} id="fancytitle">Hi, my name is</h1>
          <h1 className={styles.signature} id="signature">Daniel</h1>
        </div>
        <div className={styles.buttons}>
          <a onClick={(e) => { e.preventDefault(); router.push("/projects", { onTransitionReady: slideInOut, }); }} href="/projects" className={styles.cta} id="projects-button">
            <div>
              <div className={styles.shimmer} id="projects-shimmer"></div>
              Check out my Projects
            </div>
          </a>
          <a href="https://github.com/danielbusse/" className={styles.cta} id="github-button">
            <div>
              <div className={styles.shimmer} id="github-shimmer"></div>
              Check out my Github
            </div>
          </a>
        </div>
      </main>
    </ReactLenis>
  );
}