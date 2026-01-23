import { API } from '~/configurations/configuration';
import httpClient from '~/configurations/httpClient';

export const uploadAvatar = async (formData) => {
    return await httpClient.put(API.UPDATE_AVATAR, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
