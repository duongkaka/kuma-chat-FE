import Header from '../components/Header';

function HeaderOnly({ children }) {
    return (
        <div className="header-only">
            <Header />
            <div className="main-content">{children}</div>
        </div>
    );
}

export default HeaderOnly;
