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
      <section className='pb-10 mb-10 space-y-4 border-b border-b-slate-300'>
        <SubHeading label='Favorites' />
      </section>

      {/* Favorites cocktails */}

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
              <CardFooter className='flex justify-center'>
                <Button onClick={() => removeFromFavorites(idDrink)} size='default' variant='outline' className='text-red-500'>
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className='flex justify-center'>No favorite cocktails found.</p>
      )}
    </>
  );
}
