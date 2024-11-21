import { Currency } from 'react-paystack/dist/types';

const CurrencyToSymbolMap: Record<Currency, string> = {
    NGN: '₦',
    USD: '$',
    ZAR: 'R',
    GHS: 'GH₵',
    KES: 'KSh',
    XOF: 'CFA'
};

export const formatAmount = (currency: Currency, amount: number) => {
    const symbol = CurrencyToSymbolMap[currency];
    return symbol + ' ' + (amount / 100).toFixed(2);
};
