import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ChatItem.module.scss';
import classNames from 'classnames/bind';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
const cx = classNames.bind(styles);
function ChatItem({ conversation }) {
    return (
        <Link className={cx('wrapper')}>
            <Avatar src={conversation.avatar} alt="" className={cx('avatar')} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>{conversation.conversationName}</h4>
                <span className={cx('last-message')}>{conversation.lastMessage}</span>
            </div>
            {conversation.isRead && <FontAwesomeIcon icon={faCircle} className={cx('status-icon')} />}
        </Link>
    );
}

export default ChatItem;
