import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Following from './pages/Chat';
import DefaultLayout from './layout/DefaultLayout';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
import HeaderOnly from './layout/HeaderOnly';
function App() {
    return (
        <div className="App">
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
            </Routes>
        </div>
    );
}

export default App;
