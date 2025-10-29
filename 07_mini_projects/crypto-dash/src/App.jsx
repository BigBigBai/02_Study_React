import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Header from './components/Header';
import NotFound from './pages/Not-found';
import CoinDetailsPage from './pages/Coin-details';

const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // fetch(API_URL)
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error('Failed to fetch data');
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setCoins(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //     setLoading(false);
    //   });

    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [limit]);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />

        <Route path='/about' element={<AboutPage />} />
        <Route path='/coin/:id' element={<CoinDetailsPage />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
