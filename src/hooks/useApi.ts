import { useState, useEffect, useCallback } from 'react';
import { api, type ElectionDto, type CandidateDto, type PagedResponse } from '../services/api';

export function useElections() {
  const [elections, setElections] = useState<ElectionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchElections = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.elections.list();
      setElections(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchElections();
  }, [fetchElections]);

  return { elections, loading, error, refetch: fetchElections };
}

export function useElection(id: string) {
  const [election, setElection] = useState<ElectionDto | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  const fetchElection = useCallback(async () => {
    if (!id) {
      setElection(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await api.elections.get(id);
      setElection(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchElection();
  }, [fetchElection]);

  return { election, loading, error, refetch: fetchElection };
}

export function useElectionCandidates(electionId: string) {
  const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  const [loading, setLoading] = useState(Boolean(electionId));
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = useCallback(async () => {
    if (!electionId) {
      setCandidates([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await api.elections.getCandidates(electionId);
      setCandidates(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [electionId]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  return { candidates, loading, error, refetch: fetchCandidates };
}

export function useCandidates() {
  const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.candidats.list();
      setCandidates(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  return { candidates, loading, error, refetch: fetchCandidates };
}

export function useCandidate(id: string) {
  const [candidate, setCandidate] = useState<CandidateDto | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = useCallback(async () => {
    if (!id) {
      setCandidate(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await api.candidats.get(id);
      setCandidate(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCandidate();
  }, [fetchCandidate]);

  return { candidate, loading, error, refetch: fetchCandidate };
}

export function useElectionStats(electionId: string) {
  const [stats, setStats] = useState<{
    election_id: string;
    titre: string;
    total_votes: number;
    participation_rate: number;
    candidate_votes: { candidat_id: string; votes: number }[];
    statut: string;
  } | null>(null);
  const [loading, setLoading] = useState(Boolean(electionId));
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!electionId) {
      setStats(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await api.admin.stats(electionId);
      setStats(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [electionId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}

export function useVoteResults(electionId: string) {
  const [results, setResults] = useState<{
    election_id: string;
    total_votes: number;
    results: { candidat_id: string; votes: number; percent: number }[];
  } | null>(null);
  const [loading, setLoading] = useState(Boolean(electionId));
  const [error, setError] = useState<string | null>(null);

  const fetchResults = useCallback(async () => {
    if (!electionId) {
      setResults(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await api.votes.results(electionId);
      setResults(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [electionId]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return { results, loading, error, refetch: fetchResults };
}

export function usePagedElections(page = 0, size = 20) {
  const [response, setResponse] = useState<PagedResponse<ElectionDto> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPagedElections = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.elections.listPaged(page, size);
      setResponse(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchPagedElections();
  }, [fetchPagedElections]);

  return { response, loading, error, refetch: fetchPagedElections };
}
