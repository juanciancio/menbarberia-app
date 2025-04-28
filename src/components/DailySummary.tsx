import React from 'react';
import { useBarber } from '../contexts/BarberContext';
import { DollarSign, ScissorsLineDashed, TrendingUp as Trending } from 'lucide-react';

const DailySummary: React.FC = () => {
  const { dailySummary } = useBarber();
  
  // Calculate totals
  const totalHaircuts = dailySummary.reduce((sum, barber) => sum + barber.count, 0);
  const totalRevenue = dailySummary.reduce((sum, barber) => sum + barber.total, 0);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Resumen del Día</h2>
      
      <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
        {/* Summary header with totals */}
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="flex items-center">
              <ScissorsLineDashed className="w-5 h-5 text-teal-600 mr-2" />
              <span className="font-medium">Total Cortes: {totalHaircuts}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-teal-600 mr-2" />
              <span className="font-medium">Total Ingresos: ${totalRevenue.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Barber-specific stats */}
        <div className="divide-y divide-gray-200">
          {dailySummary.map((summary) => (
            <div key={summary.barberId} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{summary.barberName}</h3>
                  <div className="mt-1 flex items-center text-sm text-gray-600">
                    <ScissorsLineDashed className="w-4 h-4 mr-1" />
                    <span className="mr-4">{summary.count} cortes</span>
                    
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span>${summary.total.toFixed(2)}</span>
                  </div>
                </div>
                
                {summary.count > 0 && (
                  <div className="text-right">
                    <div className="flex items-center text-sm font-medium text-teal-600">
                      <Trending className="w-4 h-4 mr-1" />
                      <span>${(summary.total / summary.count).toFixed(2)} promedio</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {dailySummary.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No hay datos para mostrar hoy
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailySummary;