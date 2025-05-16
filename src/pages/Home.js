import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Link } from 'react-router-dom';

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
      if (!error) setListings(data);
    };
    fetchListings();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Marketplace Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map(listing => (
          <Link key={listing.id} to={`/listing/${listing.id}`} className="border rounded p-4 shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">{listing.title}</h3>
            <p className="text-blue-600">${listing.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
