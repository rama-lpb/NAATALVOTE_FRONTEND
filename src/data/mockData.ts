import mockData from './mockData.json';

// Types for the unified user model
export type UserRole = 'CITOYEN' | 'ADMIN' | 'OPERATEUR' | 'SUPERADMIN';

export interface User {
  id: string;
  cni: string;
  nom: string;
  prenom: string;
  email: string;
  telephones: string[];
  date_naissance: string;
  adresse: string;
  roles: UserRole[];
  otp: string;
}

export interface Election {
  id: string;
  titre: string;
  description: string;
  type: string;
  date_debut: string;
  date_fin: string;
  statut: 'PROGRAMMEE' | 'EN_COURS' | 'CLOTUREE';
  admin_id: string;
  candidat_ids: string[];
  region: string;
  total_electeurs: number;
  votes_count: number;
}

export interface Candidat {
  id: string;
  nom: string;
  prenom: string;
  parti_politique: string;
  biographie: string;
  photo_url: string;
  programme_url: string;
  election_id: string;
  votes_count: number;
  color: string;
}

export interface Vote {
  id: string;
  token_anonyme: string;
  candidat_id: string;
  election_id: string;
  citoyen_id: string;
  horodatage: string;
}

export interface TraceVote {
  id: string;
  citoyen_id: string;
  election_id: string;
  a_vote: boolean;
  horodatage: string | null;
}

export interface AlerteFraude {
  id: string;
  type_fraude: string;
  citoyen_id: string | null;
  election_id: string;
  description: string;
  statut: 'NOUVELLE' | 'EN_ANALYSE' | 'RESOLUE' | 'FAUSSE_ALERTE';
  date_detection: string;
  operateur_id: string | null;
  date_traitement: string | null;
  ip: string | null;
}

export interface ActionLog {
  id: string;
  type_action: string;
  utilisateur_id: string;
  description: string;
  horodatage: string;
  adresse_ip: string;
  signature_cryptographique: string;
}

export interface Suspension {
  id: string;
  citoyen_id: string;
  motif: string;
  operateur_id: string;
  superadmin_id: string | null;
  statut: 'EN_ATTENTE' | 'APPROUVEE' | 'REJETEE';
  date_creation: string;
  date_decision: string | null;
  justification: string;
}

export interface MockData {
  users: User[];
  elections: Election[];
  candidats: Candidat[];
  votes: Vote[];
  trace_votes: TraceVote[];
  alertes_fraude: AlerteFraude[];
  logs: ActionLog[];
  suspensions: Suspension[];
}

// Export the mock data
export const data: MockData = mockData as unknown as MockData;

// ============================================
// HELPER FUNCTIONS FOR AUTHENTICATION
// ============================================

/**
 * Find a user by CNI
 */
export const findUserByCNI = (cni: string): User | undefined => {
  return data.users.find(u => u.cni === cni);
};

/**
 * Get phone numbers associated with a CNI
 */
export const getPhonesByCNI = (cni: string): string[] => {
  const user = findUserByCNI(cni);
  return user?.telephones || [];
};

/**
 * Validate OTP for a user
 */
export const validateOTP = (cni: string, phone: string, otp: string): User | null => {
  const user = findUserByCNI(cni);
  if (!user) return null;
  
  // Check if phone is in user's phone list
  if (!user.telephones.includes(phone)) return null;
  
  // Check OTP
  if (user.otp !== otp) return null;
  
  return user;
};

/**
 * Check if user has multiple roles
 */
export const hasMultipleRoles = (user: User): boolean => {
  return user.roles.length > 1;
};

/**
 * Get all roles for a user
 */
export const getUserRoles = (user: User): UserRole[] => {
  return user.roles;
};

/**
 * Get the dashboard path for a role
 */
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

/**
 * Get role display name in French
 */
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

/**
 * Get role icon/class for styling
 */
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

// ============================================
// DATA RETRIEVAL FUNCTIONS
// ============================================

export const getElectionById = (id: string): Election | undefined => {
  return data.elections.find(e => e.id === id);
};

export const getCandidatById = (id: string): Candidat | undefined => {
  return data.candidats.find(c => c.id === id);
};

export const getCandidatsByElection = (electionId: string): Candidat[] => {
  return data.candidats.filter(c => c.election_id === electionId);
};

export const getOpenElections = (): Election[] => {
  return data.elections.filter(e => e.statut === 'EN_COURS');
};

export const getUpcomingElections = (): Election[] => {
  return data.elections.filter(e => e.statut === 'PROGRAMMEE');
};

export const getClosedElections = (): Election[] => {
  return data.elections.filter(e => e.statut === 'CLOTUREE');
};

export const getAllElectionsList = (): Election[] => {
  return data.elections;
};

export const getAlertesFraude = (): AlerteFraude[] => {
  return data.alertes_fraude;
};

export const getLogs = (): ActionLog[] => {
  return data.logs;
};

export default data;
