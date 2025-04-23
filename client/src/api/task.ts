import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Replace with env if needed

// Create a task
export const createTask = async (name: string, userId: any) => {
    const response = await axios.post(`${BASE_URL}/addTask`, {
        name,
        userId,
    });
    return response.data;
};

// Get all tasks
export const getAllTasks = async () => {
    const response = await axios.get(`${BASE_URL}/getAllTasks`);
    return response.data;
};


// Get my tasks
export const getMyTasks = async (userId: string) => {
    const response = await axios.get(`${BASE_URL}/tasks/my/${userId}`)
    return response.data;
};


// Get shared tasks
export const getSharedTasks = async (userId: string) => {
    const response = await axios.get(`${BASE_URL}/shareByMe/${userId}`);
    return response.data;
};

// Get shared to me tasks
export const getSharedToMeTasks = async (userId: string) => {
    const response = await axios.get(`${BASE_URL}/shareToMe/${userId}`);
    return response.data;
};


// Get all users
export const getAllUsers = async () => {
    const response = await axios.get(`${BASE_URL}/api/allUsers`);
    return response.data;
};


// Share task
export const shareTask = async (taskId: string, sharedTo: string, shareBy: any) => {
    console.log(taskId, shareBy, sharedTo);

    const response = await axios.post(`${BASE_URL}/shareTask`, {
        taskId: taskId,
        sharedBy: shareBy,
        sharedTo: sharedTo
    });
    return response.data;
};