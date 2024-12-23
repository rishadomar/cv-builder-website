import { Currency } from 'react-paystack/dist/types';
import axiosInstance from '@/lib/api/axios/axiosInstance';
import { apiClient } from '@/lib/api/axios/apiClient';
import { ApiError } from '@/lib/api/axios/ApiError';

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
            currency: response.data.payment.currency,
            amount: response.data.payment.amount,
            date: new Date(response.data.payment.date).toISOString()
        };
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function validatePromoCode(sub: string, promoCode: string) {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/validatePromoCode', {
            sub,
            promoCode
        });
        console.log('Validate promo code: response.data = ', response.data);
        // Return the response data
        return response.data;
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function applyPromoCode(sub: string, promoCode: string) {
    try {
        const payment = await apiClient.request({
            method: 'POST',
            url: '/applyPromoCode',
            data: { sub, promoCode }
        });
        return payment;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw ApiError.fromAxiosError(error);
    }
}
