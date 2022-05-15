import { createLog } from '../data/logs/index.js';

async function addLog(data) {
    try {
        return await createLog(data);
    } catch (error) {
        throw new Error(error.message);
    }
}

export  {
    addLog
};