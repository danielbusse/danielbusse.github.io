"use client";

import dynamic from 'next/dynamic';
import styles from './cv.module.scss'

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const PDFViewer = dynamic(() => import("../../components/PDFViewer"), {
    ssr: false,
});

export default function ProjectsPage() {
    return (
        <div className={styles.main}>
            <div className={styles.cv}>
                <PDFViewer file="/pdfs/cv_eng.pdf" page={1}/>
            </div>
        </div>
    );
}