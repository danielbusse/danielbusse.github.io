"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '@/app/about/About.module.scss';
import type { AboutGridImage } from './AboutGridItem';

interface AboutSlideshowProps {
    images: AboutGridImage[];
    intervalMs?: number;
}

export default function AboutSlideshow({ images, intervalMs = 4000 }: AboutSlideshowProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (images.length <= 1 || isPaused) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, intervalMs);

        return () => clearInterval(timer);
    }, [images.length, intervalMs, isPaused]);

    return (
        <div
            className={styles.mediaSlideshow}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {images.map((image, index) => (
                <Image
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className={[
                        styles.slideshowImage,
                        image.focusTop ? styles.focusTop : '',
                        index === activeIndex ? styles.slideshowImageActive : '',
                    ].filter(Boolean).join(' ')}
                />
            ))}
            {images.length > 1 && (
                <div className={styles.slideshowDots}>
                    {images.map((image, index) => (
                        <button
                            key={image.src}
                            type="button"
                            aria-label={`Show slide ${index + 1}`}
                            className={[
                                styles.slideshowDot,
                                index === activeIndex ? styles.slideshowDotActive : '',
                            ].filter(Boolean).join(' ')}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
