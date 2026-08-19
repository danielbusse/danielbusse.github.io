"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from './Button';
import styles from './pdf.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PDFViewerProps = {
    file: string;
    title?: string;
};

export default function PDFViewer({ file, title = 'PDF preview' }: PDFViewerProps) {
    const frameRef = useRef<HTMLDivElement>(null);
    const [frameWidth, setFrameWidth] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        setCurrentPage(1);
        setPageCount(0);
        setLoadError(null);
    }, [file]);

    useEffect(() => {
        const node = frameRef.current;
        if (!node) return;

        const updateWidth = () => {
            setFrameWidth(node.clientWidth);
        };

        updateWidth();

        const observer = new ResizeObserver(updateWidth);
        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    const pageWidth = useMemo(() => {
        if (!frameWidth) return 0;

        return Math.max(280, Math.floor(frameWidth - 32));
    }, [frameWidth]);

    return (
        <section className={styles.shell} aria-label={title}>
            <div className={styles.toolbar}>
                <div className={styles.meta}>
                    <span className={styles.label}>CV</span>
                    <h2 className={styles.title}>{title}</h2>
                </div>
                <div className={styles.actions}>
                    <Button href={file} useTransition={false} target="_blank" rel="noopener noreferrer">
                        Open PDF in new Tab
                    </Button>
                    <Button href={file} useTransition={false} download>
                        Download PDF
                    </Button>
                </div>
            </div>
            <div className={styles.frame} ref={frameRef}>
                {loadError ? (
                    <div className={styles.status}>
                        <p className={styles.errorTitle}>Preview unavailable</p>
                        <p className={styles.errorText}>{loadError}</p>
                    </div>
                ) : (
                    <Document
                        file={file}
                        className={styles.document}
                        loading={<div className={styles.status}>Loading CV preview…</div>}
                        error={<div className={styles.status}>Unable to load the PDF preview.</div>}
                        onLoadError={(error) => setLoadError(error.message)}
                        onLoadSuccess={({ numPages }) => {
                            setPageCount(numPages);
                            setCurrentPage((page) => Math.min(Math.max(page, 1), numPages));
                        }}
                    >
                        {pageCount > 1 && (
                            <div className={styles.pagination}>
                                <button
                                    type="button"
                                    className={styles.pageButton}
                                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <span className={styles.pageIndicator}>Page {currentPage} / {pageCount}</span>
                                <button
                                    type="button"
                                    className={styles.pageButton}
                                    onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                                    disabled={currentPage === pageCount}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                        <Page
                            key={`page_${currentPage}`}
                            pageNumber={currentPage}
                            width={pageWidth || undefined}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className={styles.page}
                        />
                    </Document>
                )}
            </div>
            <p className={styles.fallback}>
                If the preview looks cramped, use the buttons above to open or download the file directly.
            </p>
        </section>
    );
}