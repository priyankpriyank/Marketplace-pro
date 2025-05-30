import { useState } from 'react';
import { supabase } from '../../services/supabaseClient.js';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) navigate('/login');
    else alert(error.message);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input className="w-full border p-2 mb-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input className="w-full border p-2 mb-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button className="bg-blue-600 text-white w-full p-2" onClick={handleRegister}>Register</button>
    </div>
  );
}
