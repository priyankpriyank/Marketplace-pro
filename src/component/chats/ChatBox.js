import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';

export default function ChatBox() {
  const { userId } = useParams(); // receiver
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${user.id})`)
        .order('created_at');

      if (!error) setMessages(data);
    };

    load();
  }, [userId]);

  const sendMessage = async () => {
    const { error } = await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: userId,
      content: newMsg,
    });

    if (!error) {
      setMessages([...messages, { sender_id: user.id, receiver_id: userId, content: newMsg }]);
      setNewMsg('');
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender_id === user.id ? 'right' : 'left' }}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type a message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
