import React from 'react';
import Link from 'next/link';
import type { AboutGridItemData } from '@/components/about/AboutGridItem';

export const aboutSections: AboutGridItemData[] = [
    {
        id: 'career-experience',
        title: '💼 Career & Experience',
        content: (
            <p>
                During my studies, I have gained practical experience through internships and working student positions. 
				<br/><br/>
				I have worked for the university data center deploying and maintaining servers and services. I also worked for an engineering office developing solutions for RFID applications.  
				<br/><br/>
				During my <b>bachelor thesis</b> and beyond I worked for Wildauer Maschinen Werke on <b>lane detection algorithms</b> using <b>computer vision</b> for trucks in a 14:1 scale model.  
				<br/><br/>
				My <b>master thesis</b> has been conducted with <b>John Deere</b> focusing on the transfer of <b>multimodal machine learning</b> models into the agricultural domain.
            </p>
        ),
    },
    {
        id: 'personality',
        title: '🧠 Personality',
        content: (
            <p>
                I am a logical and strategic thinker. I like to play video games of different genres, mostly with strategic elements. 
				<br/><br/>
				I have a high interest in understanding ideas better and exploring the relationships between them. 
				<br/><br/>
				I am eager to learn and enjoy exchanging thoughts with others, especially when multiple perspectives help deepen understanding.
            </p>
        ),
    },
    {
        id: 'game-development',
        title: '🎮 Game Development',
        image: {
            src: '/assets/IMG_3928.png',
            alt: 'Game Development Screenshot',
            width: 800,
            height: 450,
        },
        content: (
            <p>
                Game development is my biggest personal coding adventure. This multidisciplinary field leaves room for creative ideas and experimentation. I love being able to pack emotions, ideas, relationships, and fun into a single medium.
				<br/><br/>
				My games are mostly small, private projects that I develop in my free time. I enjoy the process of creating something for my friends to enjoy.
            </p>
        ),
    },
    {
        id: 'music-passion',
        title: '🎸 Music Passion',
        image: {
            src: '/assets/IMG_1804.png',
            alt: 'Playing Guitar on Stage',
            width: 800,
            height: 450,
            focusTop: true,
        },
        content: (
            <p>
                Music is my longest-running passion. I&apos;ve been playing guitar, especially the electric guitar, since primary school. 
				<br/><br/>
				I play with others regularly in some fix and some loose constellations. Besides guitar, I like playing other instruments like piano and drums too. 
				<br/><br/>
				And like most people, I love listening to music and talking about it with others.
            </p>
        ),
    },
    {
        id: 'community',
        title: '👥 Creativity & Community',
        content: (
            <p>
                I love being creative, and I express it through music, video game development, and conceptual design. 
				<br/><br/>
				I also enjoy team based activities like sports where collaboration matters more than competition but also collaborative boardgames. I like to play volleyball, soccer, roundnet and many more. 
				<br/><br/>
				Every summer, I volunteer as staff at an english summer camp for teenagers in a rural area of Brandenburg, plus multiple reunions with the same community throughout the year. I also participate in local youth groups and events in my hometown. I enjoy being part of a community and contributing to it in a meaningful way.
            </p>
        ),
    },
];