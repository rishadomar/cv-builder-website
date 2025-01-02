import { AvailablePDFTemplates } from '@/lib/type';
import axiosInstance from '../axios/axiosInstance';

// Define the service function to fetch data from a given URL
export async function generatePDF(sub: string, template: AvailablePDFTemplates): Promise<string> {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/generatePDF', {
            sub,
            template
        });
        return response.data.pdf_id;
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function downloadPDF(sub: string): Promise<string> {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/downloadPDF', {
            sub
        });
        console.log(response.data);
        // Return the response data
        return response.data.url;
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error;
    }
}
