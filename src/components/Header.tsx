import React from 'react';
import { Scissors } from 'lucide-react';

const Header: React.FC = () => {
  // Get current date in Spanish format
  const today = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Capitalize first letter
  const formattedDate = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <header className="p-4 mb-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center mr-3">
            <Scissors className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Gestión de Barbería</h1>
            <p className="text-sm text-gray-600">{formattedDate}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;