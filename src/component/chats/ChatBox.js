import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';

export default function ChatBox() {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchChat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${userId}`)
        .order('created_at');
      if (!error) setMessages(data);
    };
    fetchChat();
  }, [userId]);

  const handleSend = async () => {
    const { error } = await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: userId,
      content: text,
    });
    if (!error) setText('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map(msg => (
          <div key={msg.id} style={{ textAlign: msg.sender_id === user.id ? 'right' : 'left' }}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}