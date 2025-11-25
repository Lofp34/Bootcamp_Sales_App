import React, { useState } from 'react';
import styles from './ColdCallSession.module.css';

const MOCK_CONTACTS = [
    { id: 1, name: 'Jean Dupont', company: 'Tech Solutions', phone: '0612345678' },
    { id: 2, name: 'Marie Martin', company: 'Innovate Corp', phone: '0798765432' },
    { id: 3, name: 'Pierre Durand', company: 'Global Services', phone: '0655443322' },
    { id: 4, name: 'Sophie Lefebvre', company: 'Creative Studio', phone: '0611223344' },
    { id: 5, name: 'Lucas Bernard', company: 'Future Systems', phone: '0755667788' },
];

import { addToHistory } from '../utils/history';

const ColdCallSession = ({ onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [status, setStatus] = useState('ready'); // 'ready', 'calling', 'qualifying', 'finished'

    const currentContact = MOCK_CONTACTS[currentIndex];

    const handleCall = () => {
        setStatus('calling');
        window.location.href = `tel:${currentContact.phone}`;
        // Simulate return from call after a short delay or user interaction
        setTimeout(() => {
            setStatus('qualifying');
        }, 2000); // In real app, this would be manual or detected
    };

    const handleQualification = (result) => {
        console.log(`Contact ${currentContact.name} - Result: ${result}`);

        // Save to history
        addToHistory({
            type: 'call',
            title: `Appel: ${currentContact.name}`,
            details: {
                status: result === 'RDV' ? 'rdv' : result === 'Refus' ? 'lost' : 'neutral',
                note: `Résultat: ${result} - Entreprise: ${currentContact.company}`
            }
        });

        if (currentIndex < MOCK_CONTACTS.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setStatus('ready');
        } else {
            setStatus('finished');
        }
    };

    if (status === 'finished') {
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>Session Terminée !</h2>
                <p className={styles.subtitle}>Bravo, vous avez traité toute la liste.</p>
                <button className={styles.closeButton} onClick={onClose}>Retour au Hub</button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.counter}>Contact {currentIndex + 1} / {MOCK_CONTACTS.length}</span>
                <button className={styles.closeIcon} onClick={onClose}>×</button>
            </div>

            <div className={styles.card}>
                <h2 className={styles.name}>{currentContact.name}</h2>
                <p className={styles.company}>{currentContact.company}</p>
                <p className={styles.phone}>{currentContact.phone}</p>

                <div className={styles.scriptBox}>
                    <p className={styles.scriptLabel}>Accroche :</p>
                    <p className={styles.scriptText}>
                        "Bonjour {currentContact.name}, je vous appelle brièvement car nous aidons les entreprises comme {currentContact.company} à..."
                    </p>
                </div>
            </div>

            <div className={styles.actions}>
                {status === 'ready' && (
                    <button className={styles.callButton} onClick={handleCall}>
                        📞 Appeler
                    </button>
                )}

                {status === 'calling' && (
                    <div className={styles.callingState}>
                        <p>Appel en cours...</p>
                        <button className={styles.qualifyButton} onClick={() => setStatus('qualifying')}>
                            Passer à la qualification
                        </button>
                    </div>
                )}

                {status === 'qualifying' && (
                    <div className={styles.qualificationGrid}>
                        <button
                            className={`${styles.qualButton} ${styles.positive}`}
                            onClick={() => handleQualification('RDV')}
                        >
                            ✅ RDV Fixé
                        </button>
                        <button
                            className={`${styles.qualButton} ${styles.negative}`}
                            onClick={() => handleQualification('Refus')}
                        >
                            ❌ Pas intéressé
                        </button>
                        <button
                            className={`${styles.qualButton} ${styles.neutral}`}
                            onClick={() => handleQualification('NRP')}
                        >
                            ⏭️ Suivant
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ColdCallSession;
