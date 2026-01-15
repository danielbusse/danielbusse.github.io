"use client";

import dynamic from 'next/dynamic';
import Image from 'next/image';
import EditNote from '@/components/EditNote';

import background5 from '../assets/background5.png';
import styles from './cv.module.scss';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const PDFViewer = dynamic(() => import("../../components/PDFViewer"), {
    ssr: false,
});

export default function ProjectsPage() {
    return (
        <div className={styles.main}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
                <Image
                    src={background5}
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
            <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <EditNote />
                <div className={styles.cv}>
                    <PDFViewer file="/pdfs/cv_eng.pdf"/>
                </div>
            </div>
        </div>
    );
}