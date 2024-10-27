import axiosInstance from '@/lib/api/axios/axiosInstance';
import { CvData, WorkExperienceEntry } from '../../type';

export async function createRecord(details: CvData) {
    const response = await axiosInstance.post('/createRecord', details);
    console.log(response.data);
    return response.data;
}

export async function readRecord(sub: string) {
    const response = await axiosInstance.get(`/readRecord?sub=${sub}`);
    console.log(response.data);
    return response.data;
}

export async function addWorkExperienceEntry(sub: string, workExperienceEntry: WorkExperienceEntry) {
    const response = await axiosInstance.post('/workExperience', { sub, data: workExperienceEntry });
    console.log(response.data);
    return response.data;
}

export async function updateWorkExperienceEntry(sub: string, workExperienceEntry: WorkExperienceEntry) {
    if (!workExperienceEntry.id) {
        throw new Error('No work experience id found');
    }
    const response = await axiosInstance.put('/workExperience', { sub, data: workExperienceEntry });
    console.log(response.data);
    return response.data;
}

export async function deleteWorkExperienceEntry(sub: string, workExperienceEntry: WorkExperienceEntry) {
    const response = await axiosInstance.delete('/workExperience', {
        params: { sub, workExperienceId: workExperienceEntry.id }
    });
    console.log(response.data);
    return response.data;
}

export async function save(sub: string, data: any) {
    const response = await axiosInstance.post('/saveData', { sub, data });
    console.log(response.data);
    return response.data;
}
