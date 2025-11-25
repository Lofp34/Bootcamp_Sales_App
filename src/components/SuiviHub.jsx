import React, { useState, useEffect } from 'react';
import { getHistory } from '../utils/history';
import styles from './SuiviHub.module.css';

const SuiviHub = ({ onBack }) => {
    const [history, setHistory] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'call', 'sales', 'networking'

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getIcon = (type) => {
        switch (type) {
            case 'call': return '📞';
            case 'networking': return '💬';
            case 'sales': return '🤝';
            default: return '📝';
        }
    };

    const filteredHistory = history.filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    });

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <button onClick={onBack} className={styles.backButton}>←</button>
                    <h1 className={styles.pageTitle}>Suivi d'Activité</h1>
                </div>
            </header>

            <div className={styles.filterContainer}>
                <button
                    className={`${styles.filterPill} ${filter === 'all' ? styles.active : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Tout
                </button>
                <button
                    className={`${styles.filterPill} ${filter === 'call' ? styles.active : ''}`}
                    onClick={() => setFilter('call')}
                >
                    Appels
                </button>
                <button
                    className={`${styles.filterPill} ${filter === 'sales' ? styles.active : ''}`}
                    onClick={() => setFilter('sales')}
                >
                    Ventes
                </button>
                <button
                    className={`${styles.filterPill} ${filter === 'networking' ? styles.active : ''}`}
                    onClick={() => setFilter('networking')}
                >
                    Réseau
                </button>
            </div>

            <div className={styles.content}>
                {filteredHistory.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Aucune activité trouvée pour ce filtre.</p>
                    </div>
                ) : (
                    <div className={styles.list}>
                        {filteredHistory.map((item) => (
                            <div key={item.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.icon}>{getIcon(item.type)}</span>
                                    <div className={styles.meta}>
                                        <span className={styles.date}>{formatDate(item.timestamp)}</span>
                                        <h3 className={styles.title}>{item.title}</h3>
                                    </div>
                                </div>
                                {item.details && (
                                    <div className={styles.details}>
                                        {item.details.summary && <p className={styles.summary}>{item.details.summary}</p>}
                                        {item.details.note && <p className={styles.note}>Note: {item.details.note}</p>}
                                        {item.details.status && <span className={`${styles.status} ${styles[item.details.status]}`}>{item.details.status}</span>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuiviHub;
