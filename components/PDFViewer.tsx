"use client"

import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import './pdf.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type PDFViewerProps = {
    file: string;
    page?: number;
}

export default function PDFViewer({file, page=0}: PDFViewerProps) {
    return(
        <div className="pdf">
            <Document file={file}>
                <Page pageNumber={page} width={500}/>
            </Document>
        </div>
    );
}