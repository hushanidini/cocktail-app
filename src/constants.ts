export const ROUTES = {
  HOME_PAGE: '/',
  FAVORITE_PAGE: '/favorites'
};

export const FAVORITES_LS = 'favorites';

export const NAVIGATION_ITEMS = [
  {
    id: '0',
    title: 'Home',
    url: '/',
    onlyMobile: false
  },
  {
    id: '1',
    title: 'Favorites',
    url: '/favorites',
    onlyMobile: false
  }
] as const;
