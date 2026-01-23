import classNames from 'classnames/bind';
import styles from './CreateGroupChatDialog.module.scss';
import { useEffect, useState } from 'react';
import { createGroupConversation } from '~/services/chatService';
import { searchUsers } from '~/services/user';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Avatar,
    IconButton,
    Box,
    CircularProgress,
    Typography,
    Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const cx = classNames.bind(styles);
function CreateGroupChatDialog({ open, onClose, onSuccess }) {
    // ConversationName
    const [conversationName, setConversationName] = useState('');
    // 検索
    const [search, setSearch] = useState('');
    // ユーザー
    const [users, setUsers] = useState([]);
    // Participants
    const [participants, setParticipants] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    /* ================= USER SEARCH ================= */
    useEffect(() => {
        if (!search.trim()) {
            setUsers([]);
            return;
        }

        const timer = setTimeout(async () => {
            const res = await searchUsers(search);
            setUsers(res.data.result);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);
    /* ================= PARTICIPANT ================= */
    const addParticipant = (user) => {
        if (participants.find((u) => u.id === user.id)) return;
        setParticipants((prev) => [...prev, user]);
        setSearch('');
        setUsers([]);
    };

    // ユーザー削除
    const removeParticipant = (userId) => {
        setParticipants((prev) => prev.filter((u) => u.id !== userId));
    };

    /* ================= CREATE ================= */
    const handleCreate = async () => {
        if (!conversationName || participants.length < 2) {
            setError('グループチャットは3人以上お願いいたします。');
            return;
        }
        console.log(participants);
        setLoading(true);
        try {
            const payload = {
                conversationName,
                participants: participants.map((user) => ({
                    userId: user.userId,
                    role: 'MEMBER',
                })),
            };

            await createGroupConversation(payload);

            onSuccess?.();
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Reset Form

    return (
        <Dialog open={open} onClose={onClose}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {/* Title */}
            <DialogTitle>
                グループチャット作成
                <IconButton onClick={onClose} sx={{ marginLeft: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* Content */}
            <DialogContent dividers>
                {/* Group 名 */}
                <TextField
                    fullWidth
                    label="グループ名"
                    margin="dense"
                    value={conversationName}
                    onChange={(e) => setConversationName(e.target.value)}
                />
                {/* Search */}
                <TextField
                    fullWidth
                    label="2人以上選択してください"
                    margin="dense"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {loading && (
                    <CircularProgress
                        size={20}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    />
                )}
                {/* Search result */}
                {users.length > 0 && (
                    <List dense>
                        {users
                            .filter((user) => !participants.find((p) => p.id === user.id))
                            .map((user) => (
                                <ListItem key={user.id} button onClick={() => addParticipant(user)}>
                                    <Avatar src={user.avatar} sx={{ mr: 1 }} />
                                    <ListItemText primary={user.nickname} secondary={user.mail} />
                                </ListItem>
                            ))}
                    </List>
                )}
                {/* Selected users */}
                {participants.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            参加者
                        </Typography>
                        <List dense>
                            {participants.map((user) => (
                                <ListItem
                                    key={user.id}
                                    secondaryAction={
                                        <IconButton edge="end" onClick={() => removeParticipant(user.id)}>
                                            ✕
                                        </IconButton>
                                    }
                                >
                                    <Avatar src={user.avatar} sx={{ mr: 1 }} />
                                    <ListItemText primary={user.nickname} secondary={user.mail} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </DialogContent>
            {/* Actions */}
            <DialogActions>
                <Button onClick={onClose}>キャンセル</Button>
                <Button
                    variant="contained"
                    disabled={!conversationName || participants.length < 2}
                    onClick={handleCreate}
                >
                    作成
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateGroupChatDialog;
