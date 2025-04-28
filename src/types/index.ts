export interface Barber {
  id: string;
  name: string;
}

export interface Haircut {
  id: string;
  barberId: string;
  price: number;
  date: string;
}

export interface DailySummary {
  barberId: string;
  barberName: string;
  count: number;
  total: number;
}