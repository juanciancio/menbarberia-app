import React from 'react';
import { BarberProvider } from './contexts/BarberContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BarberProvider>
      <Dashboard />
    </BarberProvider>
  );
}

export default App;