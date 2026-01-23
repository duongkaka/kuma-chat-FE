import httpClient from '../configurations/httpClient';
import { API } from '../configurations/configuration';
import { getToken, removeToken, setToken } from './localStorageService';

export const login = async (mail, password) => {
    const response = await httpClient.post(API.LOGIN, {
        mail: mail,
        password: password,
    });
    if (response.data.code == 200) {
        setToken(response.data?.result?.token);
    }
    return response;
};
export const logout = () => {
    removeToken();
};

export const isAuthenticated = () => {
    return getToken();
};
