import axiosInstance from '@/lib/api/axios/axiosInstance';
import { CvData, KeyValuePairArray } from '@/lib/type';

export async function createRecord(details: CvData) {
    const response = await axiosInstance.post('/createRecord', details);
    console.log(response.data);
    return response.data;
}

export async function readRecord(sub: string, email: string) {
    const response = await axiosInstance.get(`/readRecord?sub=${sub}&email=${email}`);
    console.log(response.data);
    return response.data;
}

export async function save(sub: string, data: KeyValuePairArray) {
    const response = await axiosInstance.post('/saveData', { sub, data });
    console.log(response.data);
    return response.data;
}
