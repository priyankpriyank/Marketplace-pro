import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default async function AddListing() {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUser(user);
      else navigate('/login');
    });
  }, [navigate]);

  const handleSubmit = async () => {
    const { error } = await supabase.from('listings').insert([
      {
        title,
        description,
        price,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert('Failed to add listing');
      console.error(error);
    } else {
      alert('Listing created!');
      navigate('/');
    }
  };

  const handleImageUpload = async (file) => {
  const filename = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage.from('listing-images').upload(filename, file);

  if (error) return null;
  const { data: url } = supabase.storage.from('listing-images').getPublicUrl(filename);
  return url?.publicUrl;
};

// Inside handleSubmit:
const imageFile = document.getElementById('image-input').files[0];
const imageUrl = await handleImageUpload(imageFile);

await supabase.from('listings').insert({
  title, description, price, user_id: user.id, image_url: imageUrl
});

  return (
    <div>
      <h2>Add New Listing</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDesc(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}
