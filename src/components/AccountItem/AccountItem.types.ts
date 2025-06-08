export type ResponseAccountItem = {
    id: number;
    bank_name: string;
    bank_code: string;
    agency_number: string;
    agency_digit: string;
    account_number: string;
    account_digit: string;
    account_type: 'corrente' | 'poupança' | string; // você pode especificar mais tipos se quiser
    document: string;
    holder_name: string;
    created_at: string; // ou Date, se você parsear
    updated_at: string; // ou Date, se você parsear
    amount: number;
};

export type AccountItemType = {
    account: ResponseAccountItem;
    selected?: boolean;
    closeModal: () => void;
};
