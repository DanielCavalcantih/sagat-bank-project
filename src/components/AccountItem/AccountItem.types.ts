export type ResponseAccountItem = {
    id: string;
    bank_name: string;
    bank_code: string;
    agency_number: string;
    agency_digit: string;
    account_number: string;
    account_digit: string;
    account_type: 'corrente' | 'poupança' | string;
    document: string;
    holder_name: string;
    created_at: string;
    updated_at: string;
    amount: number;
};

export type AccountItemType = {
    account: ResponseAccountItem;
    selected?: boolean;
    closeModal?: () => void;
    pressable?: boolean;
};
