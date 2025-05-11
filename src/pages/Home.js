import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Link } from 'react-router-dom';

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
      if (error) console.error(error);
      else setListings(data);
    };

    fetchListings();
  }, []);

  return (
    <div>
      <h1>Marketplace</h1>
      <Link to="/add">Add New Listing</Link>
      <ul>
        {listings.map(listing => (
          <li key={listing.id}>
            <Link to={`/listing/${listing.id}`}>
              <h3>{listing.title}</h3>
              <p>${listing.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
