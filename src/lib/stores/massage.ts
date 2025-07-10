import { writable, type Writable } from 'svelte/store';
import type { Schedule, Booking, Area } from '../_types/massage';

export const schedules: Writable<Schedule[]> = writable([]);
export const bookings: Writable<Booking[]> = writable([]);
export const areas: Writable<Area[]> = writable([]);
