import { Box } from '@mui/material';
import style from './Chat.module.scss';
import classNames from 'classnames/bind';
import NewChatPopover from '~/layout/components/NewChatPopover';
import { useEffect, useState } from 'react';
import { getMessages } from '~/services/chatService';
import { useConversation } from '~/context/ConversationContext';
const cx = classNames.bind(style);

function Chat() {
    const { selectedConversationId } = useConversation();
    const [messagesMap, setMessagesMap] = useState({});

    // console.log('conversationID : ' + selectedConversationId);

    useEffect(() => {
        const fetchMessages = async (selectedConversationId) => {
            if (!messagesMap[selectedConversationId]) {
                try {
                    if (!selectedConversationId) return;
                    const response = await getMessages(selectedConversationId);
                    if (response?.data?.result) {
                        const sortedMessages = [...response.data.result].sort(
                            (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
                        );
                        setMessagesMap((prev) => ({
                            ...prev,
                            [selectedConversationId]: sortedMessages,
                        }));
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchMessages(selectedConversationId);
    }, [selectedConversationId, messagesMap]);

    const currentMessages = selectedConversationId ? messagesMap[selectedConversationId] || [] : [];

    return (
        <Box className={cx('chat-container')}>
            {selectedConversationId ? (
                <NewChatPopover messages={currentMessages} />
            ) : (
                <Box sx={{ padding: 2 }}>Chọn một cuộc trò chuyện để bắt đầu chat</Box>
            )}
        </Box>
    );
}

export default Chat;
