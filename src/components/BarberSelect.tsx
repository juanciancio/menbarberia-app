import React from 'react';
import { useBarber } from '../contexts/BarberContext';

const BarberSelect: React.FC = () => {
  const { barbers, selectedBarber, setSelectedBarber } = useBarber();

  return (
    <div className="mb-4">
      <label htmlFor="barber-select" className="block text-sm font-medium text-gray-700 mb-1">
        Seleccionar Barbero
      </label>
      <select
        id="barber-select"
        value={selectedBarber}
        onChange={(e) => setSelectedBarber(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
      >
        {barbers.map((barber) => (
          <option key={barber.id} value={barber.id}>
            {barber.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BarberSelect;