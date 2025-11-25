import React, { useState } from 'react';
import styles from './LinkedinChecklist.module.css';

const INITIAL_TASKS = [
    { id: 1, text: 'Envoyer 5 demandes de connexion', completed: false },
    { id: 2, text: 'Commenter 3 posts de prospects', completed: false },
    { id: 3, text: 'Publier un post expert', completed: false },
    { id: 4, text: 'Répondre aux messages en attente', completed: false },
    { id: 5, text: 'Visiter 10 profils cibles', completed: false },
];

const LinkedinChecklist = ({ onClose }) => {
    const [tasks, setTasks] = useState(INITIAL_TASKS);

    const toggleTask = (id) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = (completedCount / tasks.length) * 100;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>LinkedIn To-Do</h2>
                <button className={styles.closeIcon} onClick={onClose}>×</button>
            </div>

            <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className={styles.progressText}>{completedCount} / {tasks.length} tâches</p>
            </div>

            <div className={styles.list}>
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
                        onClick={() => toggleTask(task.id)}
                    >
                        <div className={styles.checkbox}>
                            {task.completed && '✓'}
                        </div>
                        <span className={styles.taskText}>{task.text}</span>
                    </div>
                ))}
            </div>

            {progress === 100 && (
                <div className={styles.successMessage}>
                    🎉 Session terminée !
                </div>
            )}
        </div>
    );
};

export default LinkedinChecklist;
