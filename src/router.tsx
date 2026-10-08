import {
  createRouter,
  createRootRoute,
  createRoute,
  createHashHistory,
  redirect,
} from '@tanstack/react-router';
import { RootLayout } from '@/components/RootLayout/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { authService } from '@/services/authService';

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    if (!authService.getCurrentUser()) {
      throw redirect({ to: '/login' });
    }
  },
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sobre',
  component: AboutPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cadastro',
  component: SignupPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  loginRoute,
  signupRoute,
]);

export const router = createRouter({
  routeTree,
  history: createHashHistory(),
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
