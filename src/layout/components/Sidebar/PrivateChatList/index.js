import classNames from 'classnames/bind';
import styles from './PrivateChatList.module.scss';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Switch, Box } from '@mui/material';
import ChatItem from '../../ChatItem';
import { getMyPrivateConversations } from '~/services/chatService';
import { useConversation } from '~/context/ConversationContext';

const cx = classNames.bind(styles);

function PrivateChatList() {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messagesMap, setMessagesMap] = useState({});
    const { setSelectedConversationId } = useConversation();
    const fetchPrivateConversations = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getMyPrivateConversations();
            const convs = response?.data?.result || [];
            setConversations(convs);
            console.log(convs);

            // ✅ Nếu có conversation, tự động chọn cái đầu tiên
        } catch (error) {
            setError('Failed to load conversations. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPrivateConversations();
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

export default PrivateChatList;
