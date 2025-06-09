export const getFirstName = (name?: string) => {
    if (!name) return '';
    const words = name.trim().split(/\s+/);
    return words[0];
};

export const formatCurrency = (value: number | undefined, locale = 'pt-BR', currency = 'BRL') => {
    if (value) {
        const formatted = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            minimumFractionDigits: 2,
        }).format(value);

        return formatted.replace(/[^0-9.,-]+/g, '').trim();
    }

    return value;
};

export const formatCurrencyToNumber = (value: string): number => {
    if (!value) return 0;

    const clean = value
        .replace(/\s/g, '')
        .replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.');

    return parseFloat(clean) || 0;
};

export const maskCpfHidden = (cpf: string): string => {
    const onlyNumbers = cpf.replace(/\D/g, '');

    if (onlyNumbers.length !== 11) return cpf;

    const middle = onlyNumbers.slice(3, 9);

    return `***.${middle.slice(0, 3)}.${middle.slice(3, 6)}-**`;
};
