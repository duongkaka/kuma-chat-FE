import Chat from '~/pages/Chat';
import Home from '~/pages/Home';
import Login from '~/pages/Login';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/login', component: Login, layout: 1 },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
