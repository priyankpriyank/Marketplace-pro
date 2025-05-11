import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AddListing from './components/Listings/AddListing';
import EditListing from './components/Listings/EditListing';
import ListingDetail from './components/Listings/ListingDetail';
import ChatBox from './components/Chat/ChatBox';
import Inbox from './components/Chat/Inbox';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddListing />} />
        <Route path="/edit/:id" element={<EditListing />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/chat/:userId" element={<ChatBox />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
