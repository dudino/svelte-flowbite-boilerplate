// Utility to check if user has a specific role
import type { User, UserRole } from '../_types/massage';

export function hasRole(user: User | null, role: UserRole): boolean {
  return !!user && user.role === role;
}

export function isAdmin(user: User | null): boolean {
  return hasRole(user, 'administrator');
}

export function isOperator(user: User | null): boolean {
  return hasRole(user, 'operator');
}

export function isMasseuse(user: User | null): boolean {
  return hasRole(user, 'masseuse');
}
