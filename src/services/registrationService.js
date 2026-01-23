import axios from 'axios';
import { API } from '~/configurations/configuration';
import httpClient from '~/configurations/httpClient';

export const register = async ({ mail, password, nickname }) => {
    const formData = new FormData();
    formData.append('mail', mail);
    formData.append('password', password);
    formData.append('nickname', nickname);

    try {
        const response = await httpClient.post(API.REGISTER, formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
