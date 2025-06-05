import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { ObservationProvider } from './context/ObservationContext';
import { UrlProvider } from './context/UrlContext';

function App() {
  return (
    <UrlProvider>
      <ObservationProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Routes>
      </ObservationProvider>
    </UrlProvider>
  );
}

export default App;