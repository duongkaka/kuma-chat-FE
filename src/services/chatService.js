import httpClient from '~/configurations/httpClient';
import { getToken } from './localStorageService';
import { API } from '~/configurations/configuration';

export const getMyGroupConversations = async () => {
    return await httpClient.get(API.MY_GROUP_CONVERSATIONS, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};
export const getMyPrivateConversations = async () => {
    return await httpClient.get(API.MY_PRIVATE_CONVERSATIONS, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const getMessages = async (conversationId) => {
    return await httpClient.get(`${API.GET_CONVERSATION_MESSAGES}?conversationId=${conversationId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const createGroupConversation = async (formData) => {
    return await httpClient.post(`${API.CREATE_GROUP_CONVERSATION}`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        },
    });
};

export const createPrivateConversation = async (formData) => {
    return await httpClient.post(`${API.CREATE_PRIVATE_CONVERSATION}`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        },
    });
};
