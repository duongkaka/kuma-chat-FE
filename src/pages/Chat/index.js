import { Box, IconButton, Typography } from '@mui/material';
import style from './Chat.module.scss';
import classNames from 'classnames/bind';
import AddIcon from '@mui/icons-material/Add';
import NewChatPopover from '~/layout/components/NewChatPopover';
const cx = classNames.bind(style);
const fakeChatMessages = [
    {
        id: 1,
        senderName: 'Nguyễn Văn A',
        avatar: 'https://i.pravatar.cc/150?img=1',
        message: 'Chào bạn, bạn khỏe không?',
        isMe: false,
    },
    {
        id: 2,
        senderName: 'Trần Thị B',
        avatar: 'https://i.pravatar.cc/150?img=2',
        message: 'Mình khỏe, còn bạn thì sao?',
        isMe: true,
    },
    {
        id: 3,
        senderName: 'Nguyễn Văn A',
        avatar: 'https://i.pravatar.cc/150?img=1',
        message: 'Mình cũng ổn, đang làm project React.',
        isMe: false,
    },
];

function Chat() {
    return (
        <Box>
            <NewChatPopover messages={fakeChatMessages} />
        </Box>
    );
}

export default Chat;
