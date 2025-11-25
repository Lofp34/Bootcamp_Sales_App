const STORAGE_KEY = 'sales_flow_history';

export const getHistory = () => {
    try {
        const history = localStorage.getItem(STORAGE_KEY);
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Error reading history:', error);
        return [];
    }
};

export const addToHistory = (action) => {
    // action: { type: 'call' | 'networking' | 'sales', date: ISOString, title: string, details: object }
    try {
        const history = getHistory();
        const newEntry = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...action
        };
        const updatedHistory = [newEntry, ...history];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
        return newEntry;
    } catch (error) {
        console.error('Error saving history:', error);
        return null;
    }
};

export const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
};
