import React from 'react';
import BarberSelect from '../components/BarberSelect';
import PriceInput from '../components/PriceInput';
import RegisterButton from '../components/RegisterButton';
import DailySummary from '../components/DailySummary';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-sm min-h-screen">
        <Header />
        
        <main className="p-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Registrar Corte</h2>
              
              <BarberSelect />
              <PriceInput />
              <RegisterButton />
            </div>
            
            <DailySummary />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;