import axiosInstance from '@/lib/api/axios/axiosInstance';
import { WorkExperienceEntry } from '@/lib/type';

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
