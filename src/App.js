import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import { privateRoutes, publicRoutes } from './routes';
import HeaderOnly from './layout/HeaderOnly';

import { isLoggedIn } from './services/localStorageService';
import { Login } from '@mui/icons-material';
import { ConversationProvider } from './context/ConversationContext';
function App() {
    return (
        <div className="App">
            {/* PUBLIC ROUTES */}
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout === 1 ? HeaderOnly : DefaultLayout;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {/* PRIVATE ROUTE */}
                {privateRoutes.map((route, index) => {
                    const Page = route.component;

                    const Layout = route.layout === 1 ? HeaderOnly : DefaultLayout;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                isLoggedIn() ? (
                                    <ConversationProvider>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ConversationProvider>
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
