import { Cost } from '@/constants';
import { Currency } from 'react-paystack/dist/types';

const CurrencyToSymbolMap: Record<Currency, string> = {
    NGN: '₦',
    USD: '$',
    ZAR: 'R',
    GHS: 'GH₵',
    KES: 'KSh',
    XOF: 'CFA'
};

export const formatProductCost = () => {
    return formatAmount(Cost.currency as Currency, Cost.amount, false);
};

export const formatAmount = (currency: Currency, amount: number, showCents: boolean) => {
    const amountToShow = amount / 100;

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: showCents ? 2 : 0,
        maximumFractionDigits: showCents ? 2 : 0
    });

    return formatter.format(amountToShow);
};
