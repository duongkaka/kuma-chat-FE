import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import style from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx('default-layout')}>
            <Header />
            <div className={cx('layout-body')}>
                <Sidebar />
                <div className={cx('main-content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
