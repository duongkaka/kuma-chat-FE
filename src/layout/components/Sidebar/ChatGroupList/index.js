import classNames from 'classnames/bind';
import styles from './ChatGroupList.module.scss';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Switch, Box } from '@mui/material';
import ChatItem from '../../ChatItem';

const cx = classNames.bind(styles);
// API fake
const fakeConversations = [
    {
        id: 1,
        name: 'Frontend Team',
        avatar: 'https://i.pravatar.cc/150?img=1',
        lastMessage: 'Hoàn thành UI chưa?',
        isRead: true,
    },
    {
        id: 2,
        name: 'Backend Team',
        avatar: 'https://i.pravatar.cc/150?img=2',
        lastMessage: 'API đã deploy xong',
        isRead: false,
    },
    {
        id: 3,
        name: 'UI/UX Team',
        avatar: 'https://i.pravatar.cc/150?img=3',
        lastMessage: 'Check lại màu dark mode nhé, sao mai chưa xong vây?????',
        isRead: true,
    },
    {
        id: 4,
        name: 'Mobile Team',
        avatar: 'https://i.pravatar.cc/150?img=4',
        lastMessage: 'Build iOS bị lỗi',
        isRead: false,
    },
];

function ChatGroupList() {
    return (
        <div className={cx('section')}>
            <ul className={cx('list')}>
                {fakeConversations.map((conversation) => (
                    <li className={cx('item')} key={conversation.id}>
                        <ChatItem conversation={conversation} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatGroupList;
