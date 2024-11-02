import axiosInstance from '../axios/axiosInstance';

// Define the service function to fetch data from a given URL
export async function paymentComplete(sub: string, amount: number, reference: string): Promise<any> {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/paymentComplete', {
            sub,
            amount,
            reference
        });
        console.log('Payment complete: response.data = ', response.data);
        // Return the response data
        return {
            amount: response.data.payment.amount,
            date: new Date(response.data.payment.date)
        };
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error;
    }
}
