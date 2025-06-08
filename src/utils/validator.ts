export const emailValidator = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const passwordValidator = (password: string) => {
    const hasMinLenght = password?.length >= 8
    return hasMinLenght;
};
