import React from 'react';
import styles from './ArticleBody.module.scss';

interface ArticleBodyProps {
    content?: React.ReactNode;
    children?: React.ReactNode;
}

export default function ArticleBody({ content, children }: ArticleBodyProps) {
    return (
        <main className={styles.content}>
            {content ?? children}
        </main>
    );
}
