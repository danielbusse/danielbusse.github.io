import React from 'react';
import styles from './ArticleBody.module.scss';

interface ArticleBodyProps {
    children: React.ReactNode;
}

export default function ArticleBody({ children }: ArticleBodyProps) {
    return (
        <main className={styles.content}>
            {children}
        </main>
    );
}
