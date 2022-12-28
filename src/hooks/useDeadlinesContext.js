import { useContext } from 'react';
import { DeadlineContext } from '../context/DeadlineContest';

export const useDeadlinesContext = () => {
    const context = useContext(DeadlineContext);


    if (!context) {
        throw new Error('useDeadlinesContext must be used within a DeadlineContextProvider');
    }
    
    return context;
};