import { useState } from 'react';
import style from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Header() {
    // Login
    const login = useState(false);

    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>Kuma Chat</div>
                <div className={cx('search')}>
                    <input type="text" placeholder="Search..." />
                </div>
                {login ? (
                    <div className={cx('actions')}>
                        <button className={cx('action-btn')}>Profile</button>
                        <button className={cx('action-btn')}>Logout</button>
                    </div>
                ) : (
                    <div className={cx('actions')}>
                        <button className={cx('action-btn')}>登録</button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
