import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Cocktail } from '@/types/types';
import { FAVORITES_LS } from '@/constants';

interface FavoritesContextType {
  favorites: Cocktail[];
  addToFavorites: (cocktail: Cocktail) => void;
  removeFromFavorites: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Cocktail[]>(() => {
    try {
      // initial
      const storedFavorites = localStorage.getItem(FAVORITES_LS);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_LS, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (cocktail: Cocktail) => {
    if (!favorites.some((fav) => fav.idDrink === cocktail.idDrink)) {
      setFavorites((prevFavorites) => [...prevFavorites, cocktail]);
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((cocktail) => cocktail.idDrink !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
