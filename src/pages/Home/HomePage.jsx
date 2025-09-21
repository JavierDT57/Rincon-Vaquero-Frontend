// src/pages/Home/HomePage.jsx
import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import HomeContainer from '../../containers/Home/HomeContainer';

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();



  return <HomeContainer />;
}
