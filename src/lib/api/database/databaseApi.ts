import axiosInstance from '../axios/axiosInstance';
import { CvData, WorkExperienceEntry } from '../../type';

export async function createRecord(details: CvData) {
    try {
        const response = await axiosInstance.post('/createRecord', details);
        console.log(response.data);
        // Return the response data
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
}

export async function readRecord(sub: string) {
    try {
        const response = await axiosInstance.get(`/readRecord?sub=${sub}`);
        console.log(response.data);
        // Return the response data
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
}

export async function addWorkExperienceEntry(sub: string, workExperienceEntry: WorkExperienceEntry) {
    try {
        const response = await axiosInstance.post('/workExperience', { sub, data: workExperienceEntry });
        console.log(response.data);
        // Return the response data
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
}

export async function updateWorkExperienceEntry(sub: string, workExperienceEntry: WorkExperienceEntry) {
    try {
        if (!workExperienceEntry.id) {
            throw new Error('No work experience id found');
        }
        const response = await axiosInstance.put('/workExperience', { sub, data: workExperienceEntry });
        console.log(response.data);
        // Return the response data
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
}

export async function deleteWorkExperienceEntry(sub: string, workExperienceEntry: WorkExperienceEntry) {
    try {
        const response = await axiosInstance.delete('/workExperience', {
            params: { sub, workExperienceId: workExperienceEntry.id }
        });
        console.log(response.data);
        // Return the response data
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
}

export async function save(sub: string, data: any) {
    try {
        const response = await axiosInstance.post('/saveData', { sub, data });
        console.log(response.data);
        // Return the response data
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
}
