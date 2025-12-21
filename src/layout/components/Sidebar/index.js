import style from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Sidebar() {
    return <div className={cx('sidebar')}>Sidebar</div>;
}

export default Sidebar;
