import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';

export default function EditListing() {
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      const { data, error } = await supabase.from('listings').select('*').eq('id', id).single();
      if (!error && data.user_id === user.id) setListing(data);
    };

    load();
  }, [id]);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('listings')
      .update({ title: listing.title, description: listing.description, price: listing.price })
      .eq('id', id);

    if (!error) navigate('/');
  };

  return (
    <div>
      <h2>Edit Listing</h2>
      <input value={listing.title} onChange={e => setListing({ ...listing, title: e.target.value })} />
      <textarea value={listing.description} onChange={e => setListing({ ...listing, description: e.target.value })} />
      <input type="number" value={listing.price} onChange={e => setListing({ ...listing, price: e.target.value })} />
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
}
