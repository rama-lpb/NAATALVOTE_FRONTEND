export type UserRole = 'CITOYEN' | 'ADMIN' | 'OPERATEUR' | 'SUPERADMIN';

export const getRoleDashboardPath = (role: UserRole): string => {
  switch (role) {
    case 'CITOYEN':
      return '/citoyen/dashboard';
    case 'ADMIN':
      return '/admin/dashboard';
    case 'OPERATEUR':
      return '/operateur/dashboard';
    case 'SUPERADMIN':
      return '/superadmin/console';
    default:
      return '/';
  }
};

export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case 'CITOYEN':
      return 'Citoyen';
    case 'ADMIN':
      return 'Administrateur';
    case 'OPERATEUR':
      return 'Opérateur de Sécurité';
    case 'SUPERADMIN':
      return 'Super Administrateur';
    default:
      return role;
  }
};

export const getRoleColor = (role: UserRole): string => {
  switch (role) {
    case 'CITOYEN':
      return 'rgba(31, 90, 51, 0.8)';
    case 'ADMIN':
      return 'rgba(38, 76, 140, 0.8)';
    case 'OPERATEUR':
      return 'rgba(138, 90, 16, 0.8)';
    case 'SUPERADMIN':
      return 'rgba(91, 95, 101, 0.8)';
    default:
      return 'rgba(31, 90, 51, 0.8)';
  }
};

