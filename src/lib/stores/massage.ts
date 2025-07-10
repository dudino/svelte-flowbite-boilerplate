import { writable, type Writable } from 'svelte/store';
import type { Schedule, Booking, Area, Room } from '../_types/massage';

export const schedules: Writable<Schedule[]> = writable([]);
export const bookings: Writable<Booking[]> = writable([]);
export const areas: Writable<Area[]> = writable([
  { id: '1', name: 'Koubkova' },
  { id: '2', name: 'Halkova' }
]);
export const rooms: Writable<Room[]> = writable([
  { id: '1', name: 'Room 1', areaId: '1' },
  { id: '2', name: 'Room 2', areaId: '1' },
  { id: '3', name: 'Room 3', areaId: '2' },
  { id: '4', name: 'Room 4', areaId: '2' }
]);
