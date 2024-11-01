export const formatAmount = (amount: number) => {
    return 'R' + (amount / 100).toFixed(2);
};
