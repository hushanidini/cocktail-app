import  { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button, Input } from '@/components/ui';
import { Cocktail } from '@/types/types';
import { Search } from 'lucide-react';
import { useFavorites } from '@/FavoritesContext';

export default function HomePage() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Cocktail[]>([]);
  const { addToFavorites, favorites } = useFavorites();

  const searchCocktails = async () => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setResults(data.drinks || []);
    } catch (error) {
      console.error('Error fetching search products');
    }
  };

  const fetchRandomCocktails = async () => {
    try {
      const promises = Array(5)
        .fill(null)
        .map(() => fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php'));
      const responses = await Promise.all(promises);

      const data = await Promise.all(responses?.map((res) => res.json()));
      setCocktails(data?.map((d) => d.drinks[0]));
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  useEffect(() => {
    fetchRandomCocktails();
  }, []);

  return (
    <div className='flex flex-col'>
      {/* search cocktails */}
      <div className='flex items-center gap-4 pb-4'>
        <div className='items-center hidden gap-2 md:ml-auto md:flex'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search products...'
            className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={searchCocktails} size='sm' variant='outline'>
            Search
          </Button>
        </div>
      </div>
      {/* random cocktails */}
      <div className='flex items-center gap-4 pb-4'>
        <h1 className='flex-1 text-xl font-semibold tracking-tight shrink-0 whitespace-nowrap sm:grow-0'>
          Random Cocktails
        </h1>

        <div className='items-center hidden gap-2 md:ml-auto md:flex'>
          <Button onClick={() => fetchRandomCocktails()} size='sm' variant='outline'>
            Refresh
          </Button>
        </div>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-5'>
        {cocktails?.map((cocktail, index) => (
          <Card key={`key-${index}-${cocktail?.idDrink}`} className='mb-4'>
            <CardHeader>
              <CardTitle>{cocktail?.strDrink}</CardTitle>
              <CardDescription>{cocktail?.strCategory}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={cocktail?.strDrinkThumb}
                alt={cocktail?.strDrink}
                className='w-full h-auto rounded-md'
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* search cocktails */}
      {results?.length > 0 ? (
        <div className='flex items-center gap-4 pb-4'>
          <h1 className='flex-1 text-xl font-semibold tracking-tight shrink-0 whitespace-nowrap sm:grow-0'>
            Search Products
          </h1>
        </div>
      ) : null}

      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-5'>
        {results?.map((cocktail, index) => {
          const isFavorite = favorites.some((fav) => fav?.idDrink === cocktail?.idDrink);
          return (
            <Card key={`key-${index}-${cocktail?.idDrink}`} className='mb-4'>
              <CardHeader>
                <CardTitle>{cocktail?.strDrink}</CardTitle>
                <CardDescription>{cocktail?.strCategory}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={cocktail?.strDrinkThumb}
                  alt={cocktail?.strDrink}
                  className='w-full h-auto rounded-md'
                />
              </CardContent>
              <CardFooter>
                {isFavorite ? null : (
                  <Button onClick={() => addToFavorites(cocktail)} size='sm' variant='outline'>
                    Add to Favorites
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
