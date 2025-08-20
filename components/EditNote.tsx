import { style } from 'framer-motion/client';
import styles from './EditNote.module.scss'

export default function EditNote() {
    return(
        <div className={styles.wrapper}>
            <div className={styles.note}>
                <div className={styles.icon}>
                    ✍️
                </div>
                <div className={styles.text}>
                    Edit Note: <br/>
                    This page is currently still beeing edited (slow and steady).
                </div>
            </div>
        </div>
    );
}