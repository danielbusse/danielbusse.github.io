"use client"

import styles from './pdf.module.scss';


type PDFViewerProps = {
    file: string;
}

export default function PDFViewer({file}: PDFViewerProps) {
    return(
        <div className={styles.wrapper}>
            <object data={file} type="application/pdf">
                <embed src={file} type="application/pdf"/>
            </object>
        </div>
    );
}