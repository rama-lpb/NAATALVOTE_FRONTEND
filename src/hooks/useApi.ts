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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    api.elections.get(id)
      .then(setElection)
      .catch(e => setError(e instanceof Error ? e.message : 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [id]);

  return { election, loading, error };
}

export function useElectionCandidates(electionId: string) {
  const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!electionId) return;
    setLoading(true);
    setError(null);
    api.elections.getCandidates(electionId)
      .then(setCandidates)
      .catch(e => setError(e instanceof Error ? e.message : 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [electionId]);

  return { candidates, loading, error };
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    api.candidats.get(id)
      .then(setCandidate)
      .catch(e => setError(e instanceof Error ? e.message : 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [id]);

  return { candidate, loading, error };
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!electionId) return;
    setLoading(true);
    setError(null);
    api.admin.stats(electionId)
      .then(setStats)
      .catch(e => setError(e instanceof Error ? e.message : 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [electionId]);

  return { stats, loading, error };
}

export function useVoteResults(electionId: string) {
  const [results, setResults] = useState<{
    election_id: string;
    total_votes: number;
    results: { candidat_id: string; votes: number; percent: number }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!electionId) return;
    setLoading(true);
    setError(null);
    api.votes.results(electionId)
      .then(setResults)
      .catch(e => setError(e instanceof Error ? e.message : 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [electionId]);

  return { results, loading, error };
}

export function usePagedElections(page = 0, size = 20) {
  const [response, setResponse] = useState<PagedResponse<ElectionDto> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.elections.listPaged(page, size)
      .then(setResponse)
      .catch(e => setError(e instanceof Error ? e.message : 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [page, size]);

  return { response, loading, error };
}
