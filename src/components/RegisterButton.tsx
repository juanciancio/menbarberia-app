import React, { useState } from 'react';
import { useBarber } from '../contexts/BarberContext';
import { Scissors } from 'lucide-react';

const RegisterButton: React.FC = () => {
  const { registerHaircut, selectedBarber, price, barbers } = useBarber();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    setError('');
    
    if (!selectedBarber) {
      setError('Por favor selecciona un barbero');
      return;
    }
    
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError('Por favor ingresa un precio válido');
      return;
    }
    
    const success = registerHaircut();
    
    if (success) {
      // Show success message briefly
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    } else {
      setError('Error al registrar el corte');
    }
  };

  // Find barber name for the message
  const barberName = barbers.find(b => b.id === selectedBarber)?.name || '';

  return (
    <div className="mb-6">
      <button
        onClick={handleRegister}
        className={`w-full p-3 flex items-center justify-center rounded-md shadow-sm text-white font-medium transition-all ${
          isSuccess 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-teal-600 hover:bg-teal-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
      >
        {isSuccess ? (
          <>
            <span className="mr-2">✓</span>
            <span>¡Registrado con éxito!</span>
          </>
        ) : (
          <>
            <Scissors className="w-5 h-5 mr-2" />
            <span>Registrar Corte</span>
          </>
        )}
      </button>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {isSuccess && price && (
        <p className="mt-2 text-sm text-green-600">
          Se registró un corte de ${price} para {barberName}
        </p>
      )}
    </div>
  );
};

export default RegisterButton;