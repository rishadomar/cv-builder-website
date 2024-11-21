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
    const symbol = CurrencyToSymbolMap[currency];
    const amountToShow = showCents ? amount : Math.floor(amount / 100);
    if (symbol.length === 1) {
        return symbol + amountToShow;
    }
    return symbol + ' ' + amountToShow;
};
