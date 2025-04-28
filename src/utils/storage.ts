import { Barber, Haircut } from '../types';

const BARBERS_KEY = 'barbers';
const HAIRCUTS_KEY = 'haircuts';

// Default barbers if none exist in storage
const defaultBarbers: Barber[] = [
  { id: '1', name: 'Carlos' },
  { id: '2', name: 'Miguel' },
  { id: '3', name: 'Javier' }
];

// Get barbers from localStorage
export const getBarbers = (): Barber[] => {
  try {
    const storedBarbers = localStorage.getItem(BARBERS_KEY);
    if (storedBarbers) {
      return JSON.parse(storedBarbers);
    }
    // Initialize with default barbers if none exist
    localStorage.setItem(BARBERS_KEY, JSON.stringify(defaultBarbers));
    return defaultBarbers;
  } catch (error) {
    console.error('Error getting barbers from storage:', error);
    return defaultBarbers;
  }
};

// Save barbers to localStorage
export const saveBarbers = (barbers: Barber[]): void => {
  try {
    localStorage.setItem(BARBERS_KEY, JSON.stringify(barbers));
  } catch (error) {
    console.error('Error saving barbers to storage:', error);
  }
};

// Get haircuts from localStorage
export const getHaircuts = (): Haircut[] => {
  try {
    const storedHaircuts = localStorage.getItem(HAIRCUTS_KEY);
    if (storedHaircuts) {
      return JSON.parse(storedHaircuts);
    }
    return [];
  } catch (error) {
    console.error('Error getting haircuts from storage:', error);
    return [];
  }
};

// Save haircuts to localStorage
export const saveHaircuts = (haircuts: Haircut[]): void => {
  try {
    localStorage.setItem(HAIRCUTS_KEY, JSON.stringify(haircuts));
  } catch (error) {
    console.error('Error saving haircuts to storage:', error);
  }
};

// Get haircuts for today only
export const getTodayHaircuts = (): Haircut[] => {
  const today = new Date().toISOString().split('T')[0];
  return getHaircuts().filter(haircut => haircut.date.startsWith(today));
};

// Add a new haircut
export const addHaircut = (haircut: Omit<Haircut, 'id' | 'date'>): Haircut => {
  const newHaircut: Haircut = {
    ...haircut,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  
  const haircuts = getHaircuts();
  const updatedHaircuts = [...haircuts, newHaircut];
  saveHaircuts(updatedHaircuts);
  
  return newHaircut;
};