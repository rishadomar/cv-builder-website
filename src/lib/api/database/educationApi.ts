import axiosInstance from '@/lib/api/axios/axiosInstance';
import { EducationEntry } from '@/lib/type';

export async function addEducationEntry(sub: string, educationEntry: EducationEntry) {
    const response = await axiosInstance.post('/education', { sub, data: educationEntry });
    console.log(response.data);
    return response.data;
}

export async function updateEducationEntry(sub: string, educationEntry: EducationEntry) {
    if (!educationEntry.id) {
        throw new Error('No education id found');
    }
    const response = await axiosInstance.put('/education', { sub, data: educationEntry });
    console.log(response.data);
    return response.data;
}

export async function deleteEducationEntry(sub: string, educationEntry: EducationEntry) {
    const response = await axiosInstance.delete('/education', {
        params: { sub, educationId: educationEntry.id }
    });
    console.log(response.data);
    return response.data;
}
