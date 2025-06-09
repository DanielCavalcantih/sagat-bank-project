import { authenticatedClient } from "./api";

export const fetchAccounts = async () => {
    try {
        const { data } = await authenticatedClient.get('/users/bank_accounts');
        return data;
    } catch (error) {
        return error;
    }
};

export type BankTransfer = {
    bank_account_transfer: {
        to_user_bank_account_id: number;
        from_user_bank_account_id: number;
        transfer_type: number;
        amount_to_transfer: number;
    };
    make_success: boolean;
};

export const trasnfer = async (body: BankTransfer) => {
    try {
        const { data } = await authenticatedClient.post(
            '/users/bank_account_transfers',
            body
        );
        return data;
    } catch (error) {
        return error;
    }
};

export const fetchExtract = async (page: number) => {
    try {
        const { data } = await authenticatedClient.get(
            `/users/bank_account_transfers/statements?start_date=&end_date=&min_value=&transfer_type=&page=${page}&per_page=${10}`
        );
        return data;
    } catch (error) {
        return error;
    }
};
