import classNames from 'classnames/bind';
import styles from './ThemeToggle.module.scss';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Switch, Box } from '@mui/material';

const cx = classNames.bind(styles);

function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);
    //Load them từ localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setIsDark(savedTheme === 'dark');
    }, []);

    // Apply theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <div className={cx('theme-slider')}>
            <FontAwesomeIcon icon={faSun} className={cx('icon', 'sun')} />
            <Switch
                checked={isDark}
                onChange={() => setIsDark(!isDark)}
                sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#fff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#333', // dark
                    },
                    '& .MuiSwitch-track': {
                        backgroundColor: '#ccc', // light
                    },
                }}
            />
            <FontAwesomeIcon icon={faMoon} className={cx('icon', 'moon')} />
        </div>
    );
}

export default ThemeToggle;
