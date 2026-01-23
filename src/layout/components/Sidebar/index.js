import ThemeToggle from '~/layout/components/Sidebar/ThemeToggle';
import style from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import ChatGroupList from './ChatGroupList';
import PrivateChatList from './PrivateChatList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import {
    Button,
    Checkbox,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CreateGroupChatDialog from '~/components/CreateGroupChatDialog';
import CreatePrivateChatDialog from '~/components/CreatePrivateChatDialog';

const cx = classNames.bind(style);

function Sidebar({ setSelectedConversation }) {
    const [openCreateGroup, setOpenCreateGroup] = useState(false);
    const [openCreatePrivate, setOpenCreatePrivate] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔍 Debounce search
    useEffect(() => {
        if (!search.trim()) {
            setUsers([]);
            return;
        }

        const timeout = setTimeout(() => {
            fetchUsers();
        }, 500); // 500ms debounce

        return () => clearTimeout(timeout);
    }, [search]);

    const addUser = (user) => {
        if (selectedUsers.find((u) => u.id === user.id)) return;
        setSelectedUsers([...selectedUsers, user]);
        setSearch('');
        setUsers([]);
    };

    const removeUser = (userId) => {
        setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);

            // 👉 THAY URL BẰNG API CỦA BẠN
            const res = await fetch(`/api/users/search?q=${search}`);
            const data = await res.json();

            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleUser = (userId) => {
        setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
    };

    const handleRefreshGroups = () => {
        // trigger reload group list
        // ví dụ dùng context hoặc callback
    };

    const handleRefreshPrivates = () => {
        // trigger reload private list
        // ví dụ dùng context hoặc callback
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <aside className={cx('sidebar')}>
            {/* Top Themme */}
            <div className={cx('top')}>
                <ThemeToggle />
            </div>

            <div className={cx('content')}>
                {/* Group Chat */}
                <div className={cx('group-chat-wrapper')}>
                    <div className={cx('chat-header')}>
                        <div className={cx('title')}>Group Chat</div>
                        <Tippy theme="light" content="グループチャット作成" placement="bottom" arrow={true} delay={100}>
                            <Button variant="outlined" onClick={() => setOpenCreateGroup(true)}>
                                {' '}
                                <FontAwesomeIcon icon={faPlus} className={cx('icon')} />
                            </Button>
                        </Tippy>
                    </div>
                    <ChatGroupList setSelectedConversation={setSelectedConversation} />
                </div>
                {/* Private Chat */}
                <div className={cx('private-chat-wrapper')}>
                    {/* Title */}
                    <div className={cx('chat-header')}>
                        <div className={cx('title')}>Private Chat</div>
                        <Tippy theme="light" content="チャット作成" placement="bottom" arrow={true} delay={100}>
                            <Button variant="outlined" onClick={() => setOpenCreatePrivate(true)}>
                                {' '}
                                <FontAwesomeIcon icon={faPlus} className={cx('icon')} />
                            </Button>
                        </Tippy>
                    </div>
                    {/* Private Chat */}
                    <PrivateChatList setSelectedConversation={setSelectedConversation} />
                </div>
            </div>
            {/* Dialog */}
            <CreateGroupChatDialog
                open={openCreateGroup}
                onClose={() => setOpenCreateGroup(false)}
                onSuccess={handleRefreshGroups}
            />

            {/* Dialog */}
            <CreatePrivateChatDialog
                open={openCreatePrivate}
                onClose={() => setOpenCreatePrivate(false)}
                onSuccess={handleRefreshPrivates}
            />
        </aside>
    );
}

export default Sidebar;
