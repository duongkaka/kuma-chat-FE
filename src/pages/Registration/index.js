import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Stack, Paper } from '@mui/material';
import { register } from '~/services/registrationService';

function Registration() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // ✅ Validate password confirm
        if (password !== confirmPassword) {
            alert('パスワードが一致しません');
            return;
        }

        const payload = {
            mail,
            password,
            nickname,
        };

        try {
            const response = await register(payload);
            console.log('response :' + response);

            alert('登録成功 🎉');
        } catch (err) {
            const status = err;
            const message = err.message;
            console.log(err);
            if (status === 409) {
                alert('Email đã tồn tại');
            } else {
                alert('ユーザーが既に登録した。メールアドレスを確認してください。');
                console.log(err.message);
            }
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
            <Paper elevation={3} sx={{ p: 4, width: 420 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    登録
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="メール"
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        required
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="パスワード"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="パスワード確認"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        error={Boolean(confirmPassword && password !== confirmPassword)}
                        helperText={confirmPassword && password !== confirmPassword ? 'パスワードが一致しません' : ''}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="ニックネーム"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />

                    <Stack spacing={2} mt={3}>
                        <Button type="submit" variant="contained" fullWidth>
                            登録
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

export default Registration;
