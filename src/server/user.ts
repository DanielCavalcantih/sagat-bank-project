import { authenticatedClient } from "./api"

export const fetchUserInfo = async () => {
    try {
        const { data } = await authenticatedClient.get('/users/infos');
        return data;
    } catch (error) {
        return error;
    }
};

export const fetchUserAccounts = async () => {
    try {
        const { data } = await authenticatedClient.get('/users/bank_accounts/my');
        return data;
    } catch (error) {
        return error;
    }
};
