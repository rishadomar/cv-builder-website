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

export const formatRelativeDateTime = (date: Date): string => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const lastWeek = new Date(now);
    lastWeek.setDate(now.getDate() - 7);

    // Format time part (e.g., "9pm", "8:30am")
    const timeFormat = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: date.getMinutes() === 0 ? undefined : 'numeric'
    });
    const timeStr = timeFormat.format(date);

    // Check if date is today
    if (date.toDateString() === now.toDateString()) {
        return `Today ${timeStr}`;
    }

    // Check if date is yesterday
    if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday ${timeStr}`;
    }

    // Check if date is within the last week
    if (date > lastWeek) {
        const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
        return `Last ${dayFormat.format(date)} ${timeStr}`;
    }

    // If date is more than a week ago, show the full date
    const dateFormat = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: now.getFullYear() !== date.getFullYear() ? 'numeric' : undefined
    });

    return `${dateFormat.format(date)} ${timeStr}`;
};

export const getMonth = (monthIndex: number) => {
    const date = new Date(0, monthIndex);
    return date.toLocaleString('en-US', { month: 'short' });
};
