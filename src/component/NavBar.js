import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🛒 Marketplace</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/add" className="hover:underline">Add Listing</Link>
        <Link to="/inbox" className="hover:underline">Inbox</Link>
        <Link to="/login" className="hover:underline">Logout</Link>
      </div>
    </nav>
  );
}
