"use-client"

import styles from './cv.module.scss'

export default function ProjectsPage() {
    return (
        <div className={styles.main}>
            <div className={styles.cv}>
                <embed
                    type='application/pdf'
                    src='/pdfs/cv_eng.pdf'
                />
            </div>
        </div>
    );
}