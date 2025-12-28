import classNames from 'classnames/bind';
import styles from './ThemeToggle.module.scss';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Switch, Box } from '@mui/material';

const cx = classNames.bind(styles);

function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setIsDark(savedTheme === 'dark');
    }, []);

    return (
        <div className={cx('theme-slider')} onClick={() => toggleTheme()}>
            <FontAwesomeIcon icon={faMoon} className={cx('icon', 'moon')} />

            <Switch checked={isDark} onChange={() => setIsDark(!isDark)} color="default" />

            <FontAwesomeIcon icon={faSun} className={cx('icon', 'sun')} />
        </div>
    );
}

export default ThemeToggle;
