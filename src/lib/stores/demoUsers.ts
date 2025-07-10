import { writable } from 'svelte/store';
import type { User } from '../_types/massage';

// Demo users for login
export const demoUsers: User[] = [
  {
    id: '1',
    name: 'Annastasia Admin',
    email: 'admin@example.com',
    role: 'administrator'
  },
  {
    id: '2',
    name: 'Katka Operator',
    email: 'operator@example.com',
    role: 'operator'
  },
  {
    id: '3',
    name: 'Maya Masseuse',
    email: 'masseuse@example.com',
    role: 'masseuse'
  }
];

export const loggedInUser = writable<User | null>(null);
