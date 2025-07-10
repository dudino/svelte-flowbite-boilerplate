export type UserRole = 'administrator' | 'operator' | 'masseuse';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Add more fields as needed (phone, area, etc)
}

export interface Schedule {
  id: string;
  masseuseId: string;
  availableFrom: string; // ISO date string
  availableTo: string;   // ISO date string
  areaId: string;
  roomId: string;
  approved: boolean;
}

export interface Booking {
  id: string;
  clientName: string;
  masseuseId: string;
  operatorId: string;
  scheduleId: string;
  time: string; // ISO date string
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
}

export interface Area {
  id: string;
  name: string;
  rooms?: Room[];
}

export interface Room {
  id: string;
  name: string;
  areaId: string;
}
