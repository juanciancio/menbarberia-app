import React from 'react';
import { useBarber } from '../contexts/BarberContext';

const PriceInput: React.FC = () => {
  const { price, setPrice } = useBarber();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and a single decimal point
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="price-input" className="block text-sm font-medium text-gray-700 mb-1">
        Precio (MXN)
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
        <input
          id="price-input"
          type="text"
          inputMode="decimal"
          value={price}
          onChange={handlePriceChange}
          placeholder="0.00"
          className="w-full p-2 pl-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
        />
      </div>
    </div>
  );
};

export default PriceInput;