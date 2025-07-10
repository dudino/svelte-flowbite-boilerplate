import {writable} from "svelte/store";
import autoFillStore from "../utils/autoFillStore";
import type {Writable} from "svelte/store";
import type { User, UserRole } from '../_types/massage';

export const user: Writable<User | null> = writable(
  typeof window !== 'undefined' && typeof sessionStorage.user !== 'undefined'
    ? JSON.parse(sessionStorage.user)
    : null
);

export const users: Writable<User[]> = writable([], () => autoFillStore(users, '/users'));