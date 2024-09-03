import { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants';
import AppLayout from '@/components/templates/AppLayout';

const HomePage = lazy(() => import('@/pages/HomePage'));
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME_PAGE}
        element={
          <AppLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </AppLayout>
        }
      >
        <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES.FAVORITE_PAGE} element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
