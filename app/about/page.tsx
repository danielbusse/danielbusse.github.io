"use client"

import { ReactLenis } from 'lenis/react';
import EditNote from "@/components/EditNote";
import Button from "@/components/Button";

import styles from './About.module.scss'

export default function ProjectsPage() {
    return (
        <ReactLenis root>
            <div className={styles.main}>
                <div className={styles.about}>
                    <EditNote />
                    <h1>
                        Welcome!
                    </h1>
                    <p>
                        Thanks for checking out my little website. I&apos;m Daniel, a software engineer with a Bachelor&apos;s degree in Telematics, currently pursuing a Master&apos;s degree in the same field.
                    </p>
                    <p>
                        I love to be creative! And I express my creativity by making music, video game development and conceptualizing. I also enjoy doing team sports. The emphasis on teamwork in sports is more important to me than competition. Sports I like to play are volleyball, football (soccer) and many more — it&apos;s always fun to learn something new. Every summer, I volunteer as staff at an english camp for teenagers in a rural region of Brandenburg, as well as multiple reunions throughout the year amongst the same community.
                    </p>
                    <p>
                        I am a logical and strategic thinker. I like to play video games of different genres but mostly with strategic elements. I have a high interest in understanding things and ideas better and the relationships and connections between them. I am eager to learn more and love exchanging ideas and thoughts with others, exploring multiple perspectives to gain a deeper understanding.
                    </p>
                    <p>
                        Music is my longest-running passion. I&apos;ve been playing guitar since primary school and still jam with others regularly. Besides guitar I like playing other instruments like piano and drums, even though I&apos;m not an expert with them. And like most people, I love listening to music and discussing it with others.
                    </p>
                    <p>
                        Game development is my personal coding adventure. This multidisciplinary field of engineering leaves so much room for creative ideas and experimentation. I love being able to pack emotions, ideas, relationships and fun into a singular medium.
                    </p>
                    <p>
                        If you want to read about my professional work, feel free to check out my CV, LinkedIn and GitHub below! Or read about some project I worked on under <a>Projects section</a>.
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
        </ReactLenis>
    );
}
