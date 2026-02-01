import axios from 'axios';
import { getToken } from './localStorageService';
import { API } from '~/configurations/configuration';
import httpClient from '~/configurations/httpClient';

export const searchUsers = async (search) => {
    return await httpClient.get(`${API.SEARCH_USER}`, {
        params: {
            keyword: search,
        },
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const getMyProfile = async () => {
    const response = await httpClient.get(`${API.MY_PROFILE}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
};
