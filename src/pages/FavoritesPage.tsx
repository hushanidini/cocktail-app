import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui';
import SubHeading from '@/components/molecules/SubHeading';
import { useFavorites } from '../FavoritesContext';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  return (
    <>
      <section className='space-y-4 mb-10 pb-10 border-b border-b-slate-300'>
        <SubHeading label='Favorites' />
      </section>

      {/* Favorites cocktails */}
      <div className='flex items-center gap-4 pb-4'>
        <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
          Favorite Cocktails
        </h1>
      </div>

      {favorites.length > 0 ? (
        <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-5'>
          {favorites.map(({ idDrink, strDrink, strCategory, strDrinkThumb }, index) => (
            <Card key={`key-${index}-${idDrink}`} className='mb-4'>
              <CardHeader>
                <CardTitle>{strDrink}</CardTitle>
                <CardDescription>{strCategory}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={strDrinkThumb} alt={strDrink} className='w-full h-auto rounded-md' />
              </CardContent>
              <CardFooter>
                <Button onClick={() => removeFromFavorites(idDrink)} size='sm' variant='outline'>
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p>No favorite cocktails found.</p>
      )}
    </>
  );
}
