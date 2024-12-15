export const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-ZA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};

export const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-ZA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }).format(date);
};

export const getMonth = (monthIndex: number) => {
    const date = new Date(0, monthIndex);
    return date.toLocaleString('en-US', { month: 'short' });
};
