import React from 'react';
import styles from './HomeScreen.module.css';

const HomeScreen = ({ onNavigate }) => {
    return (
        <div className={styles.container}>
            {/* Prospection Zone */}
            <div
                className={styles.prospectionZone}
                onClick={() => onNavigate('prospection')}
            >
                <div className={styles.content}>
                    <div className={styles.icon}>🎯</div>
                    <h2 className={styles.title}>PROSPECTION</h2>
                    <p className={styles.subtitle}>Générer des opportunités</p>
                </div>
            </div>

            {/* Sales Zone */}
            <div
                className={styles.salesZone}
                onClick={() => onNavigate('sales')}
            >
                <div className={styles.content}>
                    <div className={styles.icon}>🤝</div>
                    <h2 className={styles.title}>VENTE</h2>
                    <p className={styles.subtitle}>Conclure les affaires</p>
                </div>
            </div>

            {/* Suivi Zone */}
            <div
                className={styles.suiviZone}
                onClick={() => onNavigate('suivi')}
            >
                <div className={styles.content}>
                    <div className={styles.icon}>📊</div>
                    <h2 className={styles.title}>SUIVI</h2>
                    <p className={styles.subtitle}>Historique & Stats</p>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
