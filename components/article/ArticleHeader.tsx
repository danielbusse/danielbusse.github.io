"use client"

import React from 'react';
import Link from 'next/link';
import { useTransitionRouter } from 'next-view-transitions';
import { slideRightOut } from '@/utils/animations';
import styles from './ArticleHeader.module.scss';

interface ArticleHeaderProps {
    title: string;
    period: string;
    tags: string[];
}

export default function ArticleHeader({ title, period, tags }: ArticleHeaderProps) {
    const router = useTransitionRouter();

    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push('/projects', {
            onTransitionReady: slideRightOut,
        });
    };

    return (
        <>
            <div className={styles.backLink}>
                <Link href="/projects" onClick={handleBackClick}>← Back to Projects</Link>
            </div>
            <header className={styles.header}>
                <span className={styles.period}>{period}</span>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.tags}>
                    {tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            </header>
        </>
    );
}
