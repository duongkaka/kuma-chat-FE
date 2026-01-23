import React, { useState } from 'react';
import style from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faRightFromBracket, faSignOut, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // CSS mặc định
import 'tippy.js/themes/light.css';
import Button from '~/components/Button';
import { logout } from '~/services/login';
import { isLoggedIn } from '~/services/localStorageService';

const cx = classNames.bind(style);

function Header() {
    // Login
    const login = useState(true)[0];
    const ForwardedImage = React.forwardRef((props, ref) => <Image {...props} ref={ref} />);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/logout');
    };
    const handleRegistration = () => {
        navigate('/registration');
    };
    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <Tippy theme="light" content="Home" placement="bottom" arrow={true} delay={100} asChild>
                    {/* <Link to={'/'} className={cx('logo')}>
                        <img src={images.logo} alt="Logo" />
                    </Link> */}
                    <div className={cx('chatTitle')}> KUMA Chat Web</div>
                </Tippy>

                {isLoggedIn() ? (
                    <div className={cx('actions')}>
                        {/* Profile */}
                        <Tippy theme="light" content="Profile" placement="bottom" arrow={true} delay={100} asChild>
                            <ForwardedImage
                                className={cx('user-avatar')}
                                src="https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223"
                                alt="Nguyen Van A"
                            />
                        </Tippy>
                        {/* Logout */}
                        <Tippy theme="light" content="Logout" placement="bottom" arrow={true} delay={100}>
                            <Button className={cx('logout-btn')} onClick={handleLogout}>
                                <FontAwesomeIcon icon={faSignOut} />
                                {/* ログアウト */}
                            </Button>
                        </Tippy>
                    </div>
                ) : (
                    <div className={cx('actions')}>
                        <Tippy theme="light" content="登録" placement="bottom" arrow={true} delay={100}>
                            <Button
                                onClick={handleRegistration}
                                small
                                primary
                                outline
                                text
                                className={cx('action-btn')}
                            >
                                登 録
                            </Button>
                        </Tippy>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
