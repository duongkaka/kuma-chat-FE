import { useEffect, useState } from 'react';
import style from './Login.module.scss';
import classNames from 'classnames/bind';
import { isAuthenticated, login } from '~/services/login';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material';
import { isLoggedIn } from '~/services/localStorageService';

const cx = classNames.bind(style);
function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/chat');
        }
    }, [navigate]);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const res = await login(mail, password);
            console.log(res);
            if (res.data.code === 200) navigate('/chat');
            else {
                console.log('Chạy vao day r');
                setSnackBarOpen(true);
                setErrorMessage('メールアドレス又は、パスワードが間違いあります。');
            }
        } catch (error) {
            console.log(error);
            setSnackBarOpen(true);
            setErrorMessage('システムエラー発生しています。');
        }
    };

    return (
        <div className={cx('container')}>
            <form className={cx('box')} onSubmit={handleSubmit}>
                <Typography variant="h5">Chat App</Typography>
                <LockOutlinedIcon sx={{ fontSize: 50, color: '#667eea', mb: 1 }} />

                {errorMessage && (
                    <Snackbar
                        open={snackBarOpen}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackBar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert sx={{ width: '100%' }} severity="error" variant="filled" onClose={handleCloseSnackBar}>
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                )}
                <TextField
                    label="メールアドレス"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2, mt: 4 }}
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
                <TextField
                    type="password"
                    sx={{ mb: 2 }}
                    label="パスワード"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    登録
                </Button>
            </form>
        </div>
    );
}

export default Login;
