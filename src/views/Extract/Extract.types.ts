type BankAccount = {
    bank_name: string;
    bank_code: string;
    agency_number: string;
    agency_digit: string;
    account_number: string;
    account_digit: string;
    account_type: 'corrente' | 'poupanca';
    document: string;
    holder_name: string;
};

export type TransferType = {
    id: number;
    was_success: boolean;
    transfer_type_text: string;
    amount_to_transfer: number;
    created_at: string;
    to_bank_account: BankAccount;
    from_user_bank_account: BankAccount;
};

export type ExtractType = {
    bank_account_transfers: TransferType[],
    current_page: number,
    per_page: number,
    total_pages: number,
    total_records: number
};
