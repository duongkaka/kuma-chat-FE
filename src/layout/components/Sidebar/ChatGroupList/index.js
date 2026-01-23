import classNames from 'classnames/bind';
import styles from './ChatGroupList.module.scss';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Switch, Box } from '@mui/material';
import ChatItem from '../../ChatItem';
import { useEffect, useState } from 'react';
import { getMessages, getMyGroupConversations } from '~/services/chatService';
import { useConversation } from '~/context/ConversationContext';

const cx = classNames.bind(styles);

// API fake

function ChatGroupList() {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messagesMap, setMessagesMap] = useState({});
    const { setSelectedConversationId } = useConversation();

    const fetchGroupConversations = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getMyGroupConversations();
            const convs = response?.data?.result || [];
            setConversations(convs);
            // ✅ Nếu có conversation, tự động chọn cái đầu tiên
        } catch (error) {
            setError('Failed to load conversations. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroupConversations();
    }, []);

    return (
        <div className={cx('section')}>
            <ul className={cx('list')}>
                {conversations.map((conversation) => (
                    <li
                        className={cx('item')}
                        key={conversation.id}
                        onClick={() => setSelectedConversationId(conversation.id)}
                    >
                        <ChatItem conversation={conversation} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatGroupList;
