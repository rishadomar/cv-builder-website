import axiosInstance from '../axios/axiosInstance';

// Define the service function to fetch data from a given URL
export async function generatePDF(sub: string): Promise<string> {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/generatePDF', {
            sub
        });
        console.log(response.data);
        // Return the response data
        return response.data;
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
