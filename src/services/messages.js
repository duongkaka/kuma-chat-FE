import { API } from '~/configurations/configuration';
import httpClient from '~/configurations/httpClient';
import { getToken } from './localStorageService';
export async function sendMessage(conversationId, content) {
    return await httpClient.post(
        API.SEND_MESSAGE,
        {
            conversationId,
            content,
            type: 'TEXT',
        },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        },
    );
}
