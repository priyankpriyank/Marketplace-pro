import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/NavBar.jsx';
import Home from './pages/Home';
import Login from './component/auth/login.jsx';
import Register from './component/auth/register.jsx';
import AddListing from './component/listings/AddListing.jsx';
import ListingDetail from './component/listings/ListingDetail.jsx';
import EditListing from './component/listings/EditListing.jsx';
import Inbox from './component/chats/Inbox.jsx';
import ChatBox from './component/chats/ChatBox.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddListing />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/edit/:id" element={<EditListing />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/chat/:userId" element={<ChatBox />} />
      </Routes>
    </BrowserRouter>
  );
}
