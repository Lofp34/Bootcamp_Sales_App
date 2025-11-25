import React, { useState } from 'react';
import styles from './NetworkingForm.module.css';

import { addToHistory } from '../utils/history';

const NetworkingForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        note: ''
    });
    const [isRecording, setIsRecording] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMicClick = () => {
        // Mock recording functionality
        setIsRecording(!isRecording);
        if (!isRecording) {
            // Start recording simulation
            setTimeout(() => {
                setFormData(prev => ({ ...prev, note: prev.note + " (Note vocale simulée: Intéressé par nos services...)" }));
                setIsRecording(false);
            }, 2000);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save to LocalStorage (Contacts List)
        const existingContacts = JSON.parse(localStorage.getItem('networking_contacts') || '[]');
        const newContact = { ...formData, id: Date.now(), date: new Date().toISOString() };
        localStorage.setItem('networking_contacts', JSON.stringify([...existingContacts, newContact]));

        // Save to History
        addToHistory({
            type: 'networking',
            title: `Rencontre: ${formData.name}`,
            details: {
                note: formData.note,
                summary: `Entreprise: ${formData.company}`
            }
        });

        alert('Contact sauvegardé !');
        onClose();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Nouveau Contact</h2>
                <button className={styles.closeIcon} onClick={onClose}>×</button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label className={styles.label}>Nom</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Ex: Jean Dupont"
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Entreprise</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Ex: Tech Corp"
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Note Vocale / Rapide</label>
                    <div className={styles.noteContainer}>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            className={styles.textarea}
                            placeholder="Notes..."
                        />
                        <button
                            type="button"
                            className={`${styles.micButton} ${isRecording ? styles.recording : ''}`}
                            onClick={handleMicClick}
                        >
                            🎤
                        </button>
                    </div>
                </div>

                <button type="submit" className={styles.submitButton}>
                    Sauvegarder
                </button>
            </form>
        </div>
    );
};

export default NetworkingForm;
