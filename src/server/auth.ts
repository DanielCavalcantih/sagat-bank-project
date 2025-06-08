import { AxiosError } from "axios";
import { apiClient } from "./api";

type LoginUser = {
    email: string;
    password: string;
};

type NewUser = LoginUser & {
    name?: string
}

export const login = async (user: LoginUser) => {
    try {
        const { data } = await apiClient.put('/auth/sign_in', { user });
        return { data };
    } catch (error) {
        console.log(error);

        return error;
    }
};

export const createAccount = async (newUser: NewUser) => {
    try {
        const { data } = await apiClient.post('/auth/sign_up', { user: newUser });
        return { data };
    } catch (error) {
        return error;
    }
};
