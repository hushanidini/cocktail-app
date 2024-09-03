export const ROUTES = {
  HOME_PAGE: '/',
  FAVORITE_PAGE: '/favorites'
};

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
  },
  {
    id: '2',
    title: 'Search',
    url: '/search',
    onlyMobile: false
  }
] as const;
