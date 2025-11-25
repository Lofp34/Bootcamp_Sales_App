import React, { useState, useEffect } from 'react';
import { addToHistory } from '../utils/history';
import styles from './SalesGuide.module.css';

const STEPS = [
    { id: 1, title: 'Prise de Contact' },
    { id: 2, title: 'Découverte' },
    { id: 3, title: 'Argumentation' },
    { id: 4, title: 'Objection' },
    { id: 5, title: 'Closing' },
];

const SalesGuide = ({ onBack }) => {
    // Start Modal State
    const [showStartModal, setShowStartModal] = useState(true);
    const [sessionData, setSessionData] = useState({
        clientName: '',
        date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([]);

    // State for Step 2 (Discovery)
    const [discoveryNotes, setDiscoveryNotes] = useState('');
    const [discoveryChecks, setDiscoveryChecks] = useState({
        challenge: false,
        decision: false,
        budget: false
    });

    // State for Step 5 (Closing)
    const [closingStatus, setClosingStatus] = useState(null); // 'signed', 'rdv', 'lost'

    const handleStartSession = (e) => {
        e.preventDefault();
        if (sessionData.clientName) {
            setShowStartModal(false);
        }
    };

    const handleNext = () => {
        if (currentStep < 5) {
            setCompletedSteps([...completedSteps, currentStep]);
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleFinish = () => {
        // Generate summary
        const summary = `
RÉSUMÉ ENTRETIEN
----------------
Client: ${sessionData.clientName}
Date: ${sessionData.date}

Découverte:
- Défi Principal: ${discoveryChecks.challenge ? 'Oui' : 'Non'}
- Décideur: ${discoveryChecks.decision ? 'Oui' : 'Non'}
- Budget: ${discoveryChecks.budget ? 'Oui' : 'Non'}

Notes:
${discoveryNotes}

Statut Final: ${closingStatus === 'signed' ? 'SIGNÉ 🚀' : closingStatus === 'rdv' ? 'RDV FIXÉ 📅' : 'PERDU ❌'}
    `.trim();

        // Save to History
        addToHistory({
            type: 'sales',
            title: `Vente: ${sessionData.clientName}`,
            timestamp: new Date(sessionData.date).toISOString(), // Use selected date
            details: {
                summary: summary,
                status: closingStatus,
                note: discoveryNotes
            }
        });

        // Copy to clipboard or alert
        alert("Entretien terminé et archivé !");
        onBack();
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: // Contact
                return (
                    <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>Checklist de Démarrage</h3>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" /> Briser la glace (Ice breaker)
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" /> Valider le timing (15 min ?)
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" /> Présenter l'ordre du jour
                        </label>
                    </div>
                );
            case 2: // Discovery
                return (
                    <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>Questions Clés</h3>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={discoveryChecks.challenge}
                                onChange={(e) => setDiscoveryChecks({ ...discoveryChecks, challenge: e.target.checked })}
                            />
                            Quel est votre défi principal actuel ?
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={discoveryChecks.decision}
                                onChange={(e) => setDiscoveryChecks({ ...discoveryChecks, decision: e.target.checked })}
                            />
                            Qui prend la décision finale ?
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={discoveryChecks.budget}
                                onChange={(e) => setDiscoveryChecks({ ...discoveryChecks, budget: e.target.checked })}
                            />
                            Avez-vous un budget alloué ?
                        </label>

                        <div className={styles.notesArea}>
                            <label className={styles.label}>Notes Rapides</label>
                            <textarea
                                className={styles.textarea}
                                value={discoveryNotes}
                                onChange={(e) => setDiscoveryNotes(e.target.value)}
                                placeholder="Réponses du client..."
                            />
                        </div>
                    </div>
                );
            case 3: // Argumentation
                return (
                    <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>Points Forts</h3>
                        <div className={styles.bulletPoint}>
                            <span className={styles.bulletIcon}>🚀</span>
                            <p>Gain de productivité immédiat (+30%)</p>
                        </div>
                        <div className={styles.bulletPoint}>
                            <span className={styles.bulletIcon}>💰</span>
                            <p>ROI garanti sous 3 mois</p>
                        </div>
                        <div className={styles.bulletPoint}>
                            <span className={styles.bulletIcon}>🔒</span>
                            <p>Sécurité des données maximale</p>
                        </div>
                    </div>
                );
            case 4: // Objection
                return (
                    <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>Traitement des Objections</h3>
                        <details className={styles.accordion}>
                            <summary>"C'est trop cher"</summary>
                            <p>Comparé à quoi ? Si on regarde le coût de l'inaction...</p>
                        </details>
                        <details className={styles.accordion}>
                            <summary>"Je dois réfléchir"</summary>
                            <p>Qu'est-ce qui vous retient exactement ? Est-ce le prix ou...</p>
                        </details>
                        <details className={styles.accordion}>
                            <summary>"Envoyez-moi une doc"</summary>
                            <p>Avec plaisir, mais pour envoyer la bonne doc, j'ai besoin de savoir...</p>
                        </details>
                    </div>
                );
            case 5: // Closing
                return (
                    <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>Conclusion</h3>
                        <div className={styles.statusGrid}>
                            <button
                                className={`${styles.statusButton} ${closingStatus === 'signed' ? styles.selectedSigned : ''}`}
                                onClick={() => setClosingStatus('signed')}
                            >
                                Signé 🚀
                            </button>
                            <button
                                className={`${styles.statusButton} ${closingStatus === 'rdv' ? styles.selectedRdv : ''}`}
                                onClick={() => setClosingStatus('rdv')}
                            >
                                RDV Fixé 📅
                            </button>
                            <button
                                className={`${styles.statusButton} ${closingStatus === 'lost' ? styles.selectedLost : ''}`}
                                onClick={() => setClosingStatus('lost')}
                            >
                                Perdu ❌
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            {showStartModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalTitle}>Nouvel Entretien</h2>
                        <form onSubmit={handleStartSession}>
                            <div className={styles.field}>
                                <label>Date</label>
                                <input
                                    type="date"
                                    value={sessionData.date}
                                    onChange={(e) => setSessionData({ ...sessionData, date: e.target.value })}
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Nom du Client / Prospect</label>
                                <input
                                    type="text"
                                    value={sessionData.clientName}
                                    onChange={(e) => setSessionData({ ...sessionData, clientName: e.target.value })}
                                    className={styles.input}
                                    placeholder="Ex: Entreprise ABC"
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" onClick={onBack} className={styles.cancelButton}>Annuler</button>
                                <button type="submit" className={styles.startButton}>Commencer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <header className={styles.header}>
                <button onClick={onBack} className={styles.backButton}>←</button>
                <h1 className={styles.pageTitle}>Guide d'Entretien</h1>
            </header>

            <div className={styles.stepper}>
                {STEPS.map((step) => (
                    <div
                        key={step.id}
                        className={`
              ${styles.stepIndicator} 
              ${currentStep === step.id ? styles.active : ''}
              ${completedSteps.includes(step.id) ? styles.completed : ''}
            `}
                    >
                        <div className={styles.stepCircle}>
                            {completedSteps.includes(step.id) ? '✓' : step.id}
                        </div>
                        <span className={styles.stepLabel}>{step.title}</span>
                    </div>
                ))}
            </div>

            <div className={styles.contentContainer}>
                {renderStepContent()}
            </div>

            <div className={styles.footer}>
                {currentStep < 5 ? (
                    <button className={styles.nextButton} onClick={handleNext}>
                        Étape Suivante →
                    </button>
                ) : (
                    <button
                        className={styles.finishButton}
                        onClick={handleFinish}
                        disabled={!closingStatus}
                    >
                        Terminer l'entretien
                    </button>
                )}
            </div>
        </div>
    );
};

export default SalesGuide;
