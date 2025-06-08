export const getFirstName = (name?: string) => {
    if (!name) return '';
    const words = name.trim().split(/\s+/);
    return words[0];
};
