import { Box, IconButton, Typography, Popover, Avatar, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { TextFields } from '@mui/icons-material';
import { sendMessage } from '~/services/messages';
import { useConversation } from '~/context/ConversationContext';
import { io } from 'socket.io-client';
import { getToken } from '~/services/localStorageService';

function NewChatPopover({ messages }) {
    const [message, setMessage] = useState('');
    const { selectedConversationId } = useConversation();

    // Web socket message sending
    useEffect(() => {
        const socket = new io('http://localhost:8099', {
            auth: {
                token: getToken(),
            },
        });
        // Kết nối WebSocket
        socket.on('connect', () => {
            console.log('WebSocket connected', socket.id);
        });
        // Nhận tin nhắn từ WebSocket
        socket.on('message', (message) => {
            console.log('Received message:', message);
        });
        // Xử lý khi kết nối đóng
        socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });
        // cleanup function
        return () => {
            console.log('Disconnecting socket');

            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        // Scroll to bottom when messages change
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);
    const handleSendMessage = async () => {
        if (!message.trim()) return;

        try {
            await sendMessage(selectedConversationId, message);
            console.log('Message sent successfully', selectedConversationId);
            setMessage('');
        } catch (error) {
            console.error('Send message failed', error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" height={540}>
            {/* Chat content */}
            <Box p={2} flex={1} gap={2} overflow="auto">
                <Box display="flex" flexDirection="column" gap={2}>
                    {messages.map((msg) => (
                        <Box
                            key={msg.id}
                            display="flex"
                            gap={1}
                            alignItems="flex-start"
                            flexDirection={msg.isMe ? 'row-reverse' : 'row'}
                        >
                            <Avatar src={msg.avatar} />

                            <Box
                                sx={{
                                    backgroundColor: msg.isMe ? '#DCF8C6' : '#F1F1F1',
                                    borderRadius: 2,
                                    padding: '8px 12px',
                                    maxWidth: '70%',
                                }}
                            >
                                <Typography variant="subtitle2">{msg.userProfileResponse.nickname}</Typography>
                                <Typography variant="body2">{msg.content}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            {/* Send Chat */}
            <Box
                component="form"
                sx={{
                    p: 2,
                    borderTop: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    flexShrink: 0,
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    //handleSendMessage();
                }}
            >
                <TextField
                    fullWidth
                    placeholder="チャット"
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    size="small"
                    multiline
                    minRows={1}
                    maxRows={4}
                />
                <IconButton color="primary" sx={{ ml: 1 }} disabled={!message.trim()} onClick={handleSendMessage}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default NewChatPopover;
