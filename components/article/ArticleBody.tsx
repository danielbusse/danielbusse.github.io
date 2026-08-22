"use client";

import React from 'react';
import styles from './ArticleBody.module.scss';
import Link from 'next/link';
import { useTransitionRouter } from 'next-view-transitions';
import { slideRightOut } from '@/utils/animations';

interface ArticleBodyProps {
    content?: React.ReactNode;
    children?: React.ReactNode;
}

export default function ArticleBody({ content, children }: ArticleBodyProps) {
    const router = useTransitionRouter();

    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push('/projects', {
            onTransitionReady: slideRightOut,
        });
    };
    
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className={styles.content}>
            {content ?? children}
            
            <div className={styles.footer}>
                <div className={styles.backLink}>
                    <Link href="/projects" onClick={handleBackClick}>← Back to Projects</Link>
                </div>
                <div className={styles.scrollTopBtn} onClick={handleScrollToTop}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                </div>
            </div>
        </main>
    );
}
