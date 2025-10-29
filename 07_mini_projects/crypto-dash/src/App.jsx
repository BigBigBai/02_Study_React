import { useEffect, useState } from 'react';
import CoinCard from './components/CoinCard';

const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          `${API_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
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
  }, []);

  return (
    <div>
      <h1>Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && (
        <div className='error'>
          <p>❌ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <main className='grid'>
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
