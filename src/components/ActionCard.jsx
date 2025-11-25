import React from 'react';
import styles from './ActionCard.module.css';

const ActionCard = ({ icon, title, actionText, onAction, colorTheme = 'orange' }) => {
    return (
        <div className={`${styles.card} ${styles[colorTheme]}`}>
            <div className={styles.header}>
                <span className={styles.icon}>{icon}</span>
                <h3 className={styles.title}>{title}</h3>
            </div>
            <button className={styles.actionButton} onClick={onAction}>
                {actionText}
            </button>
        </div>
    );
};

export default ActionCard;
