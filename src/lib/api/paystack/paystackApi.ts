import { Currency } from 'react-paystack/dist/types';
import axiosInstance from '../axios/axiosInstance';

// Define the service function to fetch data from a given URL
export async function paymentComplete(
    sub: string,
    currency: Currency,
    amount: number,
    reference: string
): Promise<any> {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/paymentComplete', {
            sub,
            currency,
            amount,
            reference
        });
        console.log('Payment complete: response.data = ', response.data);
        // Return the response data
        return {
            amount: response.data.payment.amount,
            date: new Date(response.data.payment.date).toISOString()
        };
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error;
    }
}
