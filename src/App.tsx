import '@/App.css';
import Routers from '@/routers';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';

function App() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <Routers />
      <Footer />
    </div>
  );
}

export default App;
