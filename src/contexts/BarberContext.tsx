import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Barber, Haircut, DailySummary } from '../types';
import { getBarbers, getHaircuts, addHaircut, getTodayHaircuts } from '../utils/storage';

interface BarberContextType {
  barbers: Barber[];
  todayHaircuts: Haircut[];
  dailySummary: DailySummary[];
  selectedBarber: string;
  price: string;
  setSelectedBarber: (barberId: string) => void;
  setPrice: (price: string) => void;
  registerHaircut: () => boolean;
  refreshData: () => void;
}

const BarberContext = createContext<BarberContextType | undefined>(undefined);

export const useBarber = () => {
  const context = useContext(BarberContext);
  if (!context) {
    throw new Error('useBarber must be used within a BarberProvider');
  }
  return context;
};

interface BarberProviderProps {
  children: ReactNode;
}

export const BarberProvider: React.FC<BarberProviderProps> = ({ children }) => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [todayHaircuts, setTodayHaircuts] = useState<Haircut[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [dailySummary, setDailySummary] = useState<DailySummary[]>([]);

  // Load initial data
  useEffect(() => {
    refreshData();
  }, []);

  // Calculate daily summary whenever today's haircuts change
  useEffect(() => {
    calculateDailySummary();
  }, [todayHaircuts, barbers]);

  const refreshData = () => {
    const loadedBarbers = getBarbers();
    setBarbers(loadedBarbers);
    
    if (loadedBarbers.length > 0 && !selectedBarber) {
      setSelectedBarber(loadedBarbers[0].id);
    }
    
    setTodayHaircuts(getTodayHaircuts());
  };

  const calculateDailySummary = () => {
    const summary = barbers.map(barber => {
      const barberHaircuts = todayHaircuts.filter(haircut => haircut.barberId === barber.id);
      const count = barberHaircuts.length;
      const total = barberHaircuts.reduce((sum, haircut) => sum + haircut.price, 0);
      
      return {
        barberId: barber.id,
        barberName: barber.name,
        count,
        total
      };
    });
    
    setDailySummary(summary);
  };

  const registerHaircut = (): boolean => {
    if (!selectedBarber || !price || isNaN(Number(price)) || Number(price) <= 0) {
      return false;
    }
    
    addHaircut({
      barberId: selectedBarber,
      price: Number(price)
    });
    
    // Reset price input after registration
    setPrice('');
    
    // Refresh data
    refreshData();
    
    return true;
  };

  const value = {
    barbers,
    todayHaircuts,
    dailySummary,
    selectedBarber,
    price,
    setSelectedBarber,
    setPrice,
    registerHaircut,
    refreshData
  };

  return (
    <BarberContext.Provider value={value}>
      {children}
    </BarberContext.Provider>
  );
};