import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import type { UserRole } from './roles';

/**
 * Garde de navigation (ajoutée lors de l'audit E221) : redirige vers /login si aucune session
 * et vers /portal si le rôle courant ne correspond pas à l'espace demandé.
 * Elle améliore l'ergonomie et évite d'afficher des écrans inutilisables ; la SÉCURITÉ reste
 * assurée côté serveur (contrôle des rôles par Spring Security sur chaque endpoint).
 */
export function RequireRole({ role, children }: { role: UserRole; children: ReactNode }) {
  const location = useLocation();
  const user = useAppSelector((s) => s.auth.user);
  const currentRole = useAppSelector((s) => s.auth.currentRole);
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (!user.roles.includes(role) || currentRole !== role) {
    return <Navigate to="/portal" replace />;
  }
  return <>{children}</>;
}
