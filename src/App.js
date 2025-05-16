import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddListing from './components/Listings/AddListing';
import ListingDetail from './components/Listings/ListingDetail';
import EditListing from './components/Listings/EditListing';
import Inbox from './components/Chat/Inbox';
import ChatBox from './components/Chat/ChatBox';

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
