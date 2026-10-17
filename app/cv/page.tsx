"use client";

import dynamic from 'next/dynamic';
import OptimizedImage from '@/components/OptimizedImage';

import background5 from '../assets/background5.png';
import background5Webp from '../assets/background5.webp';
import styles from './cv.module.scss';

const PDFViewer = dynamic(() => import('../../components/PDFViewer'), {
    ssr: false,
});

export default function CVPage() {
    return (
        <div className={styles.main}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
                <OptimizedImage
                    src={background5}
                    webpSrc={background5Webp}
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
            <section className={styles.intro}>
                <h1>Curriculum Vitae</h1>
                <span className={styles.notice}>
                    A brief overview of my professional path, practical experience, and technical focus.
                </span>
            </section>
            <div className={styles.foreground}>
                <PDFViewer file="/pdfs/cv_eng.pdf" title="PDF Preview" />
            </div>
        </div>
    );
}