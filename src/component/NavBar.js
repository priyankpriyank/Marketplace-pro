import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="font-bold text-xl">Marketplace</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/add">Add</Link>
        <Link to="/inbox">Inbox</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
