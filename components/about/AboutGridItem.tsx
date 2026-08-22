import Image from 'next/image';
import React from 'react';
import styles from '@/app/about/About.module.scss';
import AboutSlideshow from './AboutSlideshow';

export interface AboutGridImage {
    src: string;
    alt: string;
    width: number;
    height: number;
    focusTop?: boolean;
}

export interface AboutGridItemData {
    id: string;
    title: string;
    content: React.ReactNode;
    image?: AboutGridImage;
    images?: AboutGridImage[];
}

interface AboutGridItemProps {
    item: AboutGridItemData;
}

export default function AboutGridItem({ item }: AboutGridItemProps) {
    return (
        <div className={styles.gridItem}>
            <h3>{item.title}</h3>
            {item.images && item.images.length > 0 ? (
                <AboutSlideshow images={item.images} />
            ) : item.image ? (
                <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    className={`${styles.mediaImage} ${item.image.focusTop ? styles.focusTop : ''}`.trim()}
                />
            ) : null}
            {item.content}
        </div>
    );
}