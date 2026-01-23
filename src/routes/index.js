import Chat from '~/pages/Chat';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Registration from '~/pages/Registration';

const publicRoutes = [
    { path: '/', component: Login, layout: 1 },

    { path: '/login', component: Login, layout: 1 },
    { path: '/logout', component: Login, layout: 1 },
    { path: '/registration', component: Registration, layout: 1 },
];
const privateRoutes = [{ path: '/chat', component: Chat }];
export { publicRoutes, privateRoutes };
