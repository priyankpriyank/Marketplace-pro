import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Link } from 'react-router-dom';

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadInbox = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });
      if (!error) setMessages(data);
    };
    loadInbox();
  }, []);

  return (
    <div>
      <h2>Your Inbox</h2>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>
            <Link to={`/chat/${msg.sender_id === user.id ? msg.receiver_id : msg.sender_id}`}>
              Message with {msg.sender_id === user.id ? msg.receiver_id : msg.sender_id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}