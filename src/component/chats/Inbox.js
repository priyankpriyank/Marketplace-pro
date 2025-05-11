import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Link } from 'react-router-dom';

export default function Inbox() {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      const { data, error } = await supabase
        .from('messages')
        .select('sender_id, receiver_id')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

      if (error) return console.error(error);

      const contactIds = Array.from(
        new Set(data.flatMap(msg =>
          msg.sender_id === user.id ? [msg.receiver_id] : [msg.sender_id]
        ))
      );

      setContacts(contactIds);
    };

    load();
  }, []);

  return (
    <div>
      <h2>Your Inbox</h2>
      {contacts.map(id => (
        <div key={id}>
          <Link to={`/chat/${id}`}>Chat with user: {id}</Link>
        </div>
      ))}
    </div>
  );
}
