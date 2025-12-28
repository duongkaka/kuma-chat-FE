import ThemeToggle from '~/components/ThemeToggle';
import style from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Sidebar() {
    return (
        <div className={cx('sidebar')}>
            <ThemeToggle />
        </div>
    );
}

export default Sidebar;
