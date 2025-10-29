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
      <h1>Crypto Dash</h1>

      <div className='top-controls'>
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelecor limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {loading && <p>Loading...</p>}
      {error && (
        <div className='error'>
          <p>❌ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <main className='grid'>
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <p>No coins match your filter.</p>
          )}
        </main>
      )}
    </div>
  );
};

export default App;
