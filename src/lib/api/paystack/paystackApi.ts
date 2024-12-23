import { Currency } from 'react-paystack/dist/types';
import { apiClient } from '@/lib/api/axios/apiClient';
import { ApiError } from '@/lib/api/axios/ApiError';

interface PaymentResponse {
    payment: {
        currency: Currency;
        amount: number;
        date: string;
        promoCode?: string;
    };
}

// Define the service function to fetch data from a given URL
export async function paymentComplete(
    sub: string,
    currency: Currency,
    amount: number,
    reference: string
): Promise<PaymentResponse> {
    try {
        // Make the GET request using Axios
        const response = await apiClient.request<PaymentResponse>({
            method: 'POST',
            url: '/paymentComplete',
            data: { sub, currency, amount, reference }
        });
        return response;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw ApiError.fromAxiosError(error);
    }
}

export async function validatePromoCode(sub: string, promoCode: string) {
    try {
        const response = await apiClient.request({
            method: 'POST',
            url: '/validatePromoCode',
            data: { sub, promoCode }
        });
        return response;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw ApiError.fromAxiosError(error);
    }
}

export async function applyPromoCode(sub: string, promoCode: string) {
    try {
        const response = await apiClient.request<PaymentResponse>({
            method: 'POST',
            url: '/applyPromoCode',
            data: { sub, promoCode }
        });
        return response.payment;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw ApiError.fromAxiosError(error);
    }
}
