import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { enablePageScroll } from 'scroll-lock';
import { NAVIGATION_ITEMS, ROUTES } from '@/constants';
import { Button } from '@/components/ui';
import { Menu, CupSoda, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LabelWithIcon from '@/components/molecules/LabelWithIcon';
import { useFavorites } from '@/FavoritesContext';

export default function Header() {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const { favorites } = useFavorites();

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <header className='sticky top-0 flex items-center h-16 gap-4 px-4 text-white bg-gray-900 border-b bg-background md:px-6'>
      <nav className='flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link to='/' className='flex items-center gap-2 text-lg font-semibold md:text-base'>
          <CupSoda className='w-10 h-10' />
        </Link>

        {NAVIGATION_ITEMS.map((item) => (
          <Link
            key={item.id}
            to={item.url}
            onClick={handleClick}
            className='text-lg transition-colors text-foreground hover:text-foreground'
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='w-5 h-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link to='/' className='flex items-center gap-2 text-lg font-semibold'>
              <CupSoda className='w-10 h-10' />
            </Link>
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={handleClick}
                className={cn(
                  'p-2 md:px-4 md:py-2 text-lg md:text-base hover:bg-gray-700 rounded text-white',
                  pathname.pathname === item.url ? 'bg-gray-700' : ''
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <form className='flex-1 ml-auto sm:flex-initial'></form>

        <Link to={ROUTES.FAVORITE_PAGE}>
          <Button variant='secondary' size='icon' className='text-lg rounded-full'>
            <LabelWithIcon
              Icon={Heart}
              label={String(favorites?.length)}
              bgColorClass={'w-7 h-7'}
              textColorClass={`font-bold text-white text-lg`}
            />
          </Button>
        </Link>
      </div>
    </header>
  );
}
