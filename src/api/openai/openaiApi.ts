import axios from 'axios';

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
