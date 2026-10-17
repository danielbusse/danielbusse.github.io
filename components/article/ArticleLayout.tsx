"use client"

import React from 'react';
import { ReactLenis } from 'lenis/react';
import OptimizedImage from '@/components/OptimizedImage';
import background4 from '../../app/assets/background4.png';
import background4Webp from '../../app/assets/background4.webp';
import styles from './ArticleLayout.module.scss';

interface ArticleLayoutProps {
    children: React.ReactNode;
}

export default function ArticleLayout({ children }: ArticleLayoutProps) {

    return (
        <ReactLenis root>
            <div className={styles.main}>
                <div className={styles.background}>
                    <OptimizedImage
                        src={background4}
                        webpSrc={background4Webp}
                        alt="Background"
                        placeholder="blur"
                        loading="eager"
                        fetchPriority="high"
                        fill
                        quality={100}
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <div className={styles.container}>
                    {children}
                </div>
            </div>
        </ReactLenis>
    );
}
