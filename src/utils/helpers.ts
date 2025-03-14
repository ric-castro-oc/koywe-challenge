export const generateUniqueId = (): string => {
    return 'id-' + Math.random().toString(36).substr(2, 9);
};

export const calculateTimestamp = (date: Date): number => {
    return Math.floor(date.getTime() / 1000);
};