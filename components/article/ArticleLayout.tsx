"use client"

import React from 'react';
import { ReactLenis } from 'lenis/react';
import Image from 'next/image';
import background4 from '../../app/assets/background4.png';
import styles from './ArticleLayout.module.scss';

interface ArticleLayoutProps {
    children: React.ReactNode;
}

export default function ArticleLayout({ children }: ArticleLayoutProps) {
    return (
        <ReactLenis root>
            <div className={styles.main}>
                <div className={styles.background}>
                    <Image
                        src={background4}
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
                <div className={styles.container}>
                    {children}
                </div>
            </div>
        </ReactLenis>
    );
}
