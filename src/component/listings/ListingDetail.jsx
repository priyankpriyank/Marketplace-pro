import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data, error } = await supabase.from('listings').select('*').eq('id', id).single();
      if (!error) setListing(data);
    };

    fetchData();
  }, [id]);

  if (!listing) return <div>Loading...</div>;

  return (
    <div>
      <h2>{listing.title}</h2>
      <p>{listing.description}</p>
      <p>Price: ${listing.price}</p>
      {listing.image_url && <img src={listing.image_url} alt="Listing" style={{ maxWidth: '300px' }} />}
      {user?.id === listing.user_id && <Link to={`/edit/${id}`}>Edit Listing</Link>}
      {user?.id !== listing.user_id && <Link to={`/chat/${listing.user_id}`}>Message Seller</Link>}
    </div>
  );
}
