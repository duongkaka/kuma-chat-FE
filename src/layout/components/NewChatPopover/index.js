import { Box, IconButton, Typography, Avatar, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useCallback, useEffect, useRef, useState } from 'react';
import { sendMessage } from '~/services/messages';
import { useConversation } from '~/context/ConversationContext';
import { io } from 'socket.io-client';
import { getToken } from '~/services/localStorageService';
import { useAuth } from '~/context/AuthContext';

function NewChatPopover({ messages }) {
    const { myInfo } = useAuth();
    const [messagesList, setMessagesList] = useState([]);
    const [message, setMessage] = useState('');
    const { selectedConversationId } = useConversation();
    const socketRef = useRef(null);
    const messageContainerRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, []);

    // 1. Cập nhật danh sách khi đổi hội thoại hoặc nhận tin nhắn mới
    const handleIncomingMessage = useCallback((incomingData) => {
        setMessagesList((prev) => {
            // Kiểm tra trùng lặp dựa trên messageId (tên biến từ Java Backend)
            const isExisted = prev.some((m) => (m.id || m.messageId) === (incomingData.id || incomingData.messageId));
            if (isExisted) return prev;

            const newList = [...prev, incomingData].sort(
                (a, b) => new Date(a.createdAt || a.createdDate) - new Date(b.createdAt || b.createdDate),
            );
            return newList;
        });
    }, []);

    // 2. Đồng bộ props messages từ ngoài vào
    useEffect(() => {
        if (Array.isArray(messages)) {
            setMessagesList(messages);
        } else if (messages && selectedConversationId) {
            setMessagesList(messages[selectedConversationId] || []);
        }
    }, [messages, selectedConversationId]);

    // 3. Quản lý WebSocket
    useEffect(() => {
        if (!selectedConversationId) return;

        socketRef.current = io('http://localhost:8099', {
            query: { token: getToken() },
        });

        socketRef.current.on('message', (data) => {
            console.log('Dữ liệu thô từ Socket:', data);

            // Tự động parse nếu backend gửi String
            const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

            if (parsedData.conversationId === selectedConversationId) {
                handleIncomingMessage(parsedData);
            }
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, [selectedConversationId, handleIncomingMessage]);

    useEffect(() => {
        scrollToBottom();
    }, [messagesList, scrollToBottom]);

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!message.trim() || !selectedConversationId) return;

        const currentMsgText = message;
        const userId = myInfo?.result?.userId;

        // Optimistic UI
        const tempMessage = {
            messageId: Date.now(), // Tạm thời dùng làm key
            content: currentMsgText,
            senderId: userId,
            avatar: myInfo?.result?.avatar,
            userProfileResponse: { nickname: myInfo?.result?.nickname },
            createdAt: new Date().toISOString(),
            conversationId: selectedConversationId,
        };

        setMessagesList((prev) => [...prev, tempMessage]);
        setMessage('');

        try {
            // Gửi API (Backend của bạn sẽ lo việc gửi Socket cho đối phương)
            await sendMessage(selectedConversationId, currentMsgText);
        } catch (error) {
            console.error('Lỗi gửi tin nhắn:', error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" height={540}>
            <Box
                ref={messageContainerRef}
                p={2}
                flex={1}
                sx={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                {messagesList.map((msg) => {
                    const isMe = myInfo && msg.senderId === myInfo.result.userId;
                    return (
                        <Box
                            key={msg.id || msg.messageId}
                            display="flex"
                            gap={1}
                            flexDirection={isMe ? 'row-reverse' : 'row'}
                            alignItems="flex-start"
                        >
                            <Avatar src={msg.avatar} sx={{ width: 32, height: 32 }} />
                            <Box
                                sx={{
                                    backgroundColor: isMe ? '#DCF8C6' : '#F1F1F1',
                                    borderRadius: 2,
                                    padding: '8px 12px',
                                    maxWidth: '70%',
                                }}
                            >
                                {!isMe && (
                                    <Typography sx={{ fontWeight: 800, fontSize: '0.75rem' }}>
                                        {msg.userProfileResponse?.nickname}
                                    </Typography>
                                )}
                                <Typography variant="body2">{msg.content}</Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            <Box
                component="form"
                sx={{ p: 2, borderTop: 1, borderColor: 'divider', display: 'flex' }}
                onSubmit={handleSendMessage}
            >
                <TextField
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    size="small"
                    multiline
                    maxRows={4}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <IconButton color="primary" sx={{ ml: 1 }} disabled={!message.trim()} onClick={handleSendMessage}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default NewChatPopover;
