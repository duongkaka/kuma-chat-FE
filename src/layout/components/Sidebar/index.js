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

const cx = classNames.bind(style);

function Sidebar() {
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
    const handleCreateGroup = () => {
        if (!groupName.trim()) {
            alert('グループ名を入力してください');
            return;
        }

        if (selectedUsers.length === 0) {
            alert('メンバーを選択してください');
            return;
        }

        const payload = {
            name: groupName,
            members: selectedUsers.map((u) => u.id),
        };

        console.log('Create Group:', payload);
        handleClose();
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

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <aside className={cx('sidebar')}>
            {/* Top Themme */}
            <div className={cx('top')}>
                <ThemeToggle />
            </div>
            {/* Chat content */}
            <div className={cx('content')}>
                <div className={cx('group-chat-wrapper')}>
                    <div className={cx('chat-header')}>
                        <div className={cx('title')}>Group Chat</div>
                        <Tippy theme="light" content="グループチャット作成" placement="bottom" arrow={true} delay={100}>
                            <Button variant="outlined">
                                {' '}
                                <FontAwesomeIcon icon={faPlus} className={cx('icon')} />
                            </Button>
                        </Tippy>
                    </div>
                    <ChatGroupList />
                </div>
                <div className={cx('private-chat-wrapper')}>
                    {/* Title */}
                    <div className={cx('chat-header')}>
                        <div className={cx('title')}>Private Chat</div>
                        <Tippy theme="light" content="チャット作成" placement="bottom" arrow={true} delay={100}>
                            <Button variant="outlined" onClick={handleOpen}>
                                {' '}
                                <FontAwesomeIcon icon={faPlus} className={cx('icon')} />
                            </Button>
                        </Tippy>
                    </div>
                    {/* Private Chat */}
                    <PrivateChatList />
                </div>
            </div>
            {/* Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>グループチャット作成</DialogTitle>
                <DialogContent>
                    <TextField
                        label="グループ名"
                        fullWidth
                        margin="normal"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    {/* 🔍 Search user */}
                    <TextField
                        label="メンバー検索"
                        fullWidth
                        margin="normal"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {loading && <CircularProgress size={20} />}
                    {/* 🔽 Search result */}

                    <List>
                        {users.map((user) => (
                            <ListItem button key={user.id} onClick={() => addUser(user)}>
                                <ListItemText primary={user.name} secondary={user.email} />
                            </ListItem>
                        ))}
                    </List>
                    {/* ✅ Selected users */}
                    {selectedUsers.map((user) => (
                        <Chip
                            key={user.id}
                            label={user.name}
                            onDelete={() => removeUser(user.id)}
                            sx={{ mr: 1, mb: 1 }}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button variant="contained" color="primary">
                        作成
                    </Button>
                </DialogActions>
            </Dialog>
        </aside>
    );
}

export default Sidebar;
