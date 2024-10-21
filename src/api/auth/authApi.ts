import axios from 'axios';

export type GoogleLoginResponse = {
    access_token: string;
    id_token: string;
    refresh_token: string;
    sub: string;
    email: string;
};

// Define the service function to fetch data from a given URL
export async function validateGoogleLogin(code: string): Promise<GoogleLoginResponse> {
    try {
        // Make the GET request using Axios
        console.log('ENV VAR API_GATEWAY', process.env.NEXT_PUBLIC_API_GATEWAY_URL);
        const response = await axios.post(process.env.NEXT_PUBLIC_API_GATEWAY_URL + '/validateGoogleLogin', {
            code
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
