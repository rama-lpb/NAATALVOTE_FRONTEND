const API_ORIGIN = import.meta.env.VITE_API_ORIGIN as string | undefined;
const API_BASE = `${API_ORIGIN ? API_ORIGIN.replace(/\/$/, '') : ''}/api/v1`;

type StoredAuth = { auth?: { token?: string | null } } | { token?: string | null } | null;
type StoredAuthObject = { token?: string | null; auth?: { token?: string | null } };

const getToken = () => {
  const raw = sessionStorage.getItem('naatalvote.auth');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredAuth;
    const auth = (parsed ?? null) as StoredAuthObject | null;
    const token = auth?.token ?? auth?.auth?.token ?? null;
    return typeof token === 'string' && token.trim() ? token : null;
  } catch {
    return null;
  }
};

const authHeaders = () => {
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export interface ElectionDto {
  id: string;
  titre: string;
  description: string;
  type: string;
  statut: string;
  date_debut: string;
  date_fin: string;
  admin_id: string;
  candidat_ids: string[];
  region: string;
  total_electeurs: number;
  votes_count: number;
}

export interface CandidateDto {
  id: string;
  election_id: string;
  nom: string;
  prenom: string;
  parti_politique: string;
  biographie: string;
  photo_url: string;
  programme_url: string;
  votes_count: number;
  color: string;
}

export interface UserDto {
  id: string;
  cni: string;
  nom: string;
  prenom: string;
  email: string;
  telephones: string[];
  date_naissance: string;
  adresse: string;
  roles: string[];
}

export interface VoteResultDto {
  election_id: string;
  total_votes: number;
  results: VoteResultLineDto[];
}

export interface VoteResultLineDto {
  candidat_id: string;
  votes: number;
  percent: number;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface AdminCreationHistoryDto {
  id: string;
  type_action: 'CREATE_ELECTION' | 'CREATE_CANDIDATE' | string;
  description: string;
  horodatage: string;
  utilisateur_id: string;
}

const readBody = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    const text = await response.text();
    return text.trim() ? text : null;
  }
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  const body = await readBody(response);
  if (!response.ok) {
    if (typeof body === 'string' && body.trim()) {
      throw new Error(body);
    }
    if (body && typeof body === 'object' && 'message' in body && typeof (body as { message?: unknown }).message === 'string') {
      throw new Error((body as { message: string }).message);
    }
    throw new Error(`HTTP ${response.status}`);
  }
  return body as T;
};

export const api = {
  elections: {
    list: async (): Promise<ElectionDto[]> => {
      const res = await fetch(`${API_BASE}/elections`, { headers: authHeaders() });
      return handleResponse(res);
    },
    listPaged: async (page = 0, size = 20): Promise<PagedResponse<ElectionDto>> => {
      const res = await fetch(`${API_BASE}/elections/paged?page=${page}&size=${size}`, { headers: authHeaders() });
      return handleResponse(res);
    },
    get: async (id: string): Promise<ElectionDto> => {
      const res = await fetch(`${API_BASE}/elections/${id}`, { headers: authHeaders() });
      return handleResponse(res);
    },
    getCandidates: async (electionId: string): Promise<CandidateDto[]> => {
      const res = await fetch(`${API_BASE}/elections/${electionId}/candidats`, { headers: authHeaders() });
      return handleResponse(res);
    },
    create: async (data: {
      titre: string;
      description: string;
      type: string;
      date_debut: string;
      date_fin: string;
      admin_id: string;
      region: string;
      total_electeurs: number;
    }): Promise<{ id: string }> => {
      const res = await fetch(`${API_BASE}/elections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    update: async (id: string, data: Partial<{
      titre: string;
      description: string;
      type: string;
      date_debut: string;
      date_fin: string;
      region: string;
      total_electeurs: number;
    }>): Promise<{ success: boolean }> => {
      const res = await fetch(`${API_BASE}/elections/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
  },

  candidats: {
    list: async (): Promise<CandidateDto[]> => {
      const res = await fetch(`${API_BASE}/candidats`, { headers: authHeaders() });
      return handleResponse(res);
    },
    listPaged: async (page = 0, size = 20): Promise<PagedResponse<CandidateDto>> => {
      const res = await fetch(`${API_BASE}/candidats/paged?page=${page}&size=${size}`, { headers: authHeaders() });
      return handleResponse(res);
    },
    get: async (id: string): Promise<CandidateDto> => {
      const res = await fetch(`${API_BASE}/candidats/${id}`, { headers: authHeaders() });
      return handleResponse(res);
    },
    create: async (data: {
      election_id: string;
      nom: string;
      prenom: string;
      parti_politique: string;
      biographie: string;
      photo_url: string;
      programme_url: string;
    }): Promise<{ id: string }> => {
      const res = await fetch(`${API_BASE}/candidats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    update: async (id: string, data: Partial<{
      election_id: string;
      nom: string;
      prenom: string;
      parti_politique: string;
      biographie: string;
      photo_url: string;
      programme_url: string;
    }>): Promise<{ success: boolean }> => {
      const res = await fetch(`${API_BASE}/candidats/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    delete: async (id: string): Promise<{ success: boolean }> => {
      const res = await fetch(`${API_BASE}/candidats/${id}`, { method: 'DELETE', headers: authHeaders() });
      return handleResponse(res);
    },
  },

  votes: {
    cast: async (data: {
      election_id: string;
      candidat_id: string;
      citoyen_id?: string;
      token_anonyme?: string;
    }): Promise<{ success: boolean; confirmation_number: string; horodatage: string }> => {
      const res = await fetch(`${API_BASE}/votes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    verify: async (token: string): Promise<{
      success: boolean;
      election_id: string;
      candidat_id: string;
      horodatage: string;
    }> => {
      const res = await fetch(`${API_BASE}/votes/verify/${token}`, { headers: authHeaders() });
      return handleResponse(res);
    },
    results: async (electionId: string): Promise<VoteResultDto> => {
      const res = await fetch(`${API_BASE}/votes/election/${electionId}/results`, { headers: authHeaders() });
      return handleResponse(res);
    },
  },

  auth: {
    lookupPhones: async (cni: string): Promise<{ success: boolean; telephones: string[]; message: string }> => {
      const res = await fetch(`${API_BASE}/auth/lookup?cni=${encodeURIComponent(cni)}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return handleResponse(res);
    },
    login: async (cni: string, telephone: string): Promise<{
      success: boolean;
      message: string;
      requiresOtp: boolean;
      otp?: string;
    }> => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cni, telephone }),
      });
      return handleResponse(res);
    },
    sendOtp: async (cni: string, telephone: string): Promise<{
      success: boolean;
      message: string;
    }> => {
      const res = await fetch(`${API_BASE}/auth/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cni, telephone }),
      });
      return handleResponse(res);
    },
    verifyOtp: async (cni: string, telephone: string, otp: string): Promise<{
      success: boolean;
      token: string;
      user: UserDto;
    }> => {
      const res = await fetch(`${API_BASE}/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cni, telephone, otp }),
      });
      return handleResponse(res);
    },
    logout: async (): Promise<{ success: boolean }> => {
      const res = await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: authHeaders(),
      });
      if (!res.ok) return { success: false };
      return res.json();
    },
  },

  admin: {
    listElections: async (adminId?: string): Promise<ElectionDto[]> => {
      const url = adminId ? `${API_BASE}/admin/elections?adminId=${adminId}` : `${API_BASE}/admin/elections`;
      const res = await fetch(url, { headers: authHeaders() });
      return handleResponse(res);
    },
    stats: async (electionId: string): Promise<{
      election_id: string;
      titre: string;
      total_votes: number;
      participation_rate: number;
      candidate_votes: { candidat_id: string; votes: number }[];
      statut: string;
    }> => {
      const res = await fetch(`${API_BASE}/admin/elections/${electionId}/stats`, { headers: authHeaders() });
      return handleResponse(res);
    },
    close: async (electionId: string): Promise<{ success: boolean }> => {
      const res = await fetch(`${API_BASE}/admin/elections/${electionId}/close`, { method: 'POST', headers: authHeaders() });
      return handleResponse(res);
    },
    listCreationHistory: async (adminId?: string, limit = 25): Promise<AdminCreationHistoryDto[]> => {
      const params = new URLSearchParams();
      if (adminId) params.set('adminId', adminId);
      params.set('limit', String(limit));
      const res = await fetch(`${API_BASE}/admin/historique-creation?${params.toString()}`, { headers: authHeaders() });
      return handleResponse(res);
    },
  },

  operateur: {
    listAlerts: async (): Promise<{
      id: string;
      type_fraude: string;
      citoyen_id: string | null;
      election_id: string | null;
      description: string;
      statut: string;
      date_detection: string;
      operateur_id: string | null;
      date_traitement: string | null;
      ip: string | null;
    }[]> => {
      const res = await fetch(`${API_BASE}/operateur/alertes`, { headers: authHeaders() });
      return handleResponse(res);
    },
    treatAlert: async (id: string, data: {
      statut: string;
      operateur_id?: string;
      description?: string;
    }): Promise<{ success: boolean }> => {
      const res = await fetch(`${API_BASE}/operateur/alertes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    listSuspensions: async (): Promise<{
      id: string;
      citoyen_id: string;
      motif: string;
      operateur_id: string;
      statut: string;
      date_creation: string;
    }[]> => {
      const res = await fetch(`${API_BASE}/operateur/suspensions`, { headers: authHeaders() });
      return handleResponse(res);
    },
    recommendSuspension: async (data: {
      citoyen_id: string;
      motif: string;
      operateur_id: string;
    }): Promise<{ success: boolean; id: string; statut: string }> => {
      const res = await fetch(`${API_BASE}/operateur/suspensions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
  },

  superadmin: {
    listUsers: async (): Promise<UserDto[]> => {
      const res = await fetch(`${API_BASE}/superadmin/users`, { headers: authHeaders() });
      return handleResponse(res);
    },
    updateRoles: async (id: string, roles: string[]): Promise<{ success: boolean }> => {
      const res = await fetch(`${API_BASE}/superadmin/users/${id}/roles`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ roles }),
      });
      return handleResponse(res);
    },
    listLogs: async (): Promise<{
      id: string;
      type_action: string;
      utilisateur_id: string;
      description: string;
      horodatage: string;
      adresse_ip: string;
      signature_cryptographique: string;
    }[]> => {
      const res = await fetch(`${API_BASE}/superadmin/logs`, { headers: authHeaders() });
      return handleResponse(res);
    },
    listSuspensions: async (): Promise<{
      id: string;
      citoyen_id: string;
      motif: string;
      operateur_id: string;
      superadmin_id: string | null;
      statut: string;
      date_creation: string;
      date_decision: string | null;
      justification: string;
    }[]> => {
      const res = await fetch(`${API_BASE}/superadmin/suspensions`, { headers: authHeaders() });
      return handleResponse(res);
    },
    decideSuspension: async (id: string, data: {
      statut: string;
      superadmin_id?: string;
      justification: string;
    }): Promise<{ success: boolean }> => {
      const res = await fetch(`${API_BASE}/superadmin/suspensions/${id}/decision`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
  },

  citoyen: {
    profile: async (id: string): Promise<UserDto> => {
      const res = await fetch(`${API_BASE}/citoyen/${id}/profile`, { headers: authHeaders() });
      return handleResponse(res);
    },
    voteStatus: async (id: string, electionId?: string): Promise<{
      citoyen_id: string;
      election_id: string;
      a_vote: boolean;
      horodatage?: string;
    }> => {
      const url = electionId ? `${API_BASE}/citoyen/${id}/vote-status?electionId=${electionId}` : `${API_BASE}/citoyen/${id}/vote-status`;
      const res = await fetch(url, { headers: authHeaders() });
      return handleResponse(res);
    },
    history: async (id: string): Promise<{
      id: string;
      election_id: string;
      a_vote: boolean;
      horodatage: string | null;
    }[]> => {
      const res = await fetch(`${API_BASE}/citoyen/${id}/history`, { headers: authHeaders() });
      return handleResponse(res);
    },
  },
};
