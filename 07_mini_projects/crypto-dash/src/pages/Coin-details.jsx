import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!res.ok) throw new Error('Failed to fetch coin data');
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  return <>{id}</>;
};

export default CoinDetailsPage;
