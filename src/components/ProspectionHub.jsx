import React, { useState } from 'react';
import ActionCard from './ActionCard';
import ColdCallSession from './ColdCallSession';
import NetworkingForm from './NetworkingForm';
import LinkedinChecklist from './LinkedinChecklist';
import styles from './ProspectionHub.module.css';

const ProspectionHub = ({ onBack }) => {
    const [activeModal, setActiveModal] = useState(null); // 'coldcall', 'networking', 'linkedin'

    const handleColdCall = () => {
        console.log("Open Cold Call Modal");
        setActiveModal('coldcall');
    };

    const handleNetworking = () => {
        console.log("Open Networking Modal");
        setActiveModal('networking');
    };

    const handleLinkedin = () => {
        console.log("Open LinkedIn Modal");
        setActiveModal('linkedin');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button onClick={onBack} className={styles.backButton}>←</button>
                <h1 className={styles.pageTitle}>Prospection Hub</h1>
            </header>

            <div className={styles.content}>
                <ActionCard
                    icon="📞"
                    title="Cold Call"
                    actionText="Lancer Session"
                    onAction={handleColdCall}
                />

                <ActionCard
                    icon="💬"
                    title="Réseautage"
                    actionText="Ajouter Contact Rapide"
                    onAction={handleNetworking}
                    colorTheme="blue"
                />

                <ActionCard
                    icon="👔"
                    title="LinkedIn"
                    actionText="Traiter la To-Do List"
                    onAction={handleLinkedin}
                />
            </div>

            {/* Modals */}
            {activeModal === 'coldcall' && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <ColdCallSession onClose={() => setActiveModal(null)} />
                    </div>
                </div>
            )}

            {activeModal === 'networking' && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <NetworkingForm onClose={() => setActiveModal(null)} />
                    </div>
                </div>
            )}

            {activeModal === 'linkedin' && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <LinkedinChecklist onClose={() => setActiveModal(null)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProspectionHub;
