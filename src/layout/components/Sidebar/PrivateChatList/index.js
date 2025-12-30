import classNames from 'classnames/bind';
import styles from './PrivateChatList.module.scss';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Switch, Box } from '@mui/material';
import ChatItem from '../../ChatItem';

const cx = classNames.bind(styles);

function PrivateChatList() {
    // fakePersonalChats.js
    const fakePersonalChats = [
        {
            id: 1,
            name: 'Alice Nguyen',
            avatar: 'https://i.pravatar.cc/150?img=5',
            lastMessage: 'Hey, tối nay đi xem phim không?',
            isRead: false,
            timestamp: '2025-12-29T10:15:00', // ISO string
        },
        {
            id: 2,
            name: 'Bob Tran',
            avatar: 'https://i.pravatar.cc/150?img=6',
            lastMessage: 'Mình đã gửi file báo cáo nhé.',
            isRead: true,
            timestamp: '2025-12-28T14:45:00',
        },
        {
            id: 3,
            name: 'Charlie Le',
            avatar: 'https://i.pravatar.cc/150?img=7',
            lastMessage: 'Sáng mai có họp zoom không?',
            isRead: false,
            timestamp: '2025-12-29T08:30:00',
        },
        {
            id: 4,
            name: 'Diana Pham',
            avatar: 'https://i.pravatar.cc/150?img=8',
            lastMessage: 'Cập nhật lại project nhé.',
            isRead: true,
            timestamp: '2025-12-27T18:20:00',
        },
    ];

    return (
        <div className={cx('section')}>
            <ul className={cx('list')}>
                {fakePersonalChats.map((conversation) => (
                    <li className={cx('item')} key={conversation.id}>
                        <ChatItem conversation={conversation} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PrivateChatList;
