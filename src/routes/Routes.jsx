import { Suspense, lazy } from 'react';

import Loading from '../components/Loading';
import RequireAuth from '../components/RequireAuth';

import { ROUTES_PATH } from '../constants';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

const ProductListPage = Loadable(lazy(() => import('../pages/ProductListPage')));
const ProductDetailPage = Loadable(lazy(() => import('../pages/ProductDetailPage')));
const ShoppingCartPage = Loadable(lazy(() => import('../pages/ShoppingCartPage')));
const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
const SignUpPage = Loadable(lazy(() => import('../pages/SignUpPage')));
const UserInfoPage = Loadable(lazy(() => import('../pages/UserInfoPage')));
const ModifyPasswordPage = Loadable(lazy(() => import('../pages/ModifyPasswordPage')));
const ModifyUserInfoPage = Loadable(lazy(() => import('../pages/ModifyUserInfoPage')));

const routes = [
  {
    path: ROUTES_PATH.HOME,
    element: <ProductListPage />,
  },
  {
    path: ROUTES_PATH.DETAIL,
    element: <ProductDetailPage />,
  },
  {
    path: ROUTES_PATH.CART,
    element: <ShoppingCartPage />,
  },
  {
    path: ROUTES_PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES_PATH.SIGN_UP,
    element: <SignUpPage />,
  },
  {
    path: ROUTES_PATH.USER_INFO,
    element: (
      <RequireAuth>
        <UserInfoPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTES_PATH.MODIFY_PASSWORD,
    element: (
      <RequireAuth>
        <ModifyPasswordPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTES_PATH.MODIFY_USER_INFO,
    element: (
      <RequireAuth>
        <ModifyUserInfoPage />
      </RequireAuth>
    ),
  },
];

export default routes;
