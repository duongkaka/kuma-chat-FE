import { getMyProfile } from '~/services/user';

const { createContext, useState, useEffect, useContext } = require('react');

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [myInfo, setMyInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const profile = await getMyProfile();
                setMyInfo(profile);
            } catch (error) {
                console.error('Failed to fetch profile', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyInfo();
    }, []);

    return <AuthContext.Provider value={{ myInfo, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
