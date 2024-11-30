import axios from 'axios';
import axiosInstance from '../axios/axiosInstance';

// Define the service function to fetch data from a given URL
export async function complete(prompt: string): Promise<string> {
    try {
        // Make the GET request using Axios
        console.log('ENV VAR API_GATEWAY', process.env.NEXT_PUBLIC_API_GATEWAY_URL);
        const response = await axios.post(process.env.NEXT_PUBLIC_API_GATEWAY_URL + '/aiTextCompletion', {
            text: prompt
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

export async function generatePersonalityText(sub: string, traits: Array<string>): Promise<string> {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/personalityText', {
            sub: sub,
            traits: traits
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

export async function improvePersonalityText(
    sub: string,
    traits: Array<string>,
    previousText: string
): Promise<string> {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/improvePersonalityText', {
            sub: sub,
            traits: traits,
            previousText: previousText
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

export async function generateHobbiesText(sub: string, hobbies: Array<string>): Promise<string> {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/hobbiesText', {
            sub: sub,
            hobbies: hobbies
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

export async function improveHobbiesText(sub: string, hobbies: Array<string>, previousText: string): Promise<string> {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/improveHobbiesText', {
            sub: sub,
            hobbies: hobbies,
            previousText: previousText
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
