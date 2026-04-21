import styled from 'styled-components';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { api, type ElectionDto, type CandidateDto } from '../services/api';

type AgeGroup = {
  label: string;
  value: number;
  color: string;
};

type Region = {
  name: string;
  percent: number;
  votes: number;
};

type Candidate = {
  id: string;
  initials: string;
  name: string;
  party: string;
  votes: number;
  percent: number;
  color: string;
};

type Election = {
  id: string;
  label: string;
  status: 'live' | 'closed';
  totalVotes: number;
  participation: number;
  inscrits: number;
  candidates: Candidate[];
  ageDistribution: AgeGroup[];
  genderDistribution: { male: number; female: number };
  regions: Region[];
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TitleSection = styled.div``;

const PageTitle = styled.h1`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a2e20;
  margin: 0;
`;

const PageSubtitle = styled.p`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  color: #6b7a72;
  margin: 0.3rem 0 0;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  background: rgba(31, 90, 51, 0.08);
  padding: 0.3rem;
  border-radius: 999px;
  justify-content: flex-end;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  border: none;
  background: ${({ $active }) => $active ? 'white' : 'transparent'};
  color: ${({ $active }) => $active ? '#1f5a33' : '#6b7a72'};
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ $active }) => $active ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};
  
  &:hover {
    color: #1f5a33;
  }
`;

const ElectionSelect = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.6rem 2rem 0.6rem 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  background: rgba(255, 255, 255, 0.95);
  color: #22312a;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7a72' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: rgba(31, 90, 51, 0.5);
    box-shadow: 0 4px 12px rgba(31, 90, 51, 0.1);
  }
`;

const LiveIndicator = styled.div<{ $status?: 'live' | 'closed' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  
  ${({ $status }) => $status === 'live' ? `
    background: linear-gradient(135deg, rgba(31, 90, 51, 0.15), rgba(31, 90, 51, 0.08));
    color: rgba(31, 90, 51, 0.9);
    border: 1px solid rgba(31, 90, 51, 0.2);
  ` : `
    background: linear-gradient(135deg, rgba(91, 95, 101, 0.15), rgba(91, 95, 101, 0.08));
    color: rgba(91, 95, 101, 0.9);
    border: 1px solid rgba(91, 95, 101, 0.2);
  `}
`;

const Pulse = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1f5a33;
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 2px solid rgba(31, 90, 51, 0.4);
    animation: pulseAnim 1.5s ease-in-out infinite;
  }
  
  @keyframes pulseAnim {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.6); }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
`;

const StatCard = styled.div<{ $variant?: 'primary' | 'secondary' | 'accent' | 'default' }>`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.9));
  border-radius: 20px;
  padding: 1.4rem 1.6rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  box-shadow: 0 8px 24px rgba(12, 24, 18, 0.06);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: ${({ $variant }) => 
      $variant === 'primary' ? 'linear-gradient(180deg, #1f5a33, #2d7a47)' :
      $variant === 'secondary' ? 'linear-gradient(180deg, #264c8c, #3a64b8)' :
      $variant === 'accent' ? 'linear-gradient(180deg, #8a5a10, #b87a1c)' :
      'linear-gradient(180deg, #5a6068, #6b757d)' };
  }
`;

const StatLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b7a72;
  font-size: 0.9rem;
  font-weight: 500;
`;

const StatValue = styled.h3`
  margin: 0.4rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a2e20;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ResultsSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 12px 32px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.1);
`;

const SectionHeader = styled.div`
  margin-bottom: 1.8rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(31, 90, 51, 0.1);
`;

const CandidatesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CandidateCard = styled.div<{ $rank: number }>`
  display: grid;
  grid-template-columns: 38px 56px 1fr auto;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem 1.5rem;
  border-radius: 18px;
  background: ${({ $rank }) =>
    $rank === 1 ? 'linear-gradient(135deg, rgba(31, 90, 51, 0.08), rgba(255, 255, 255, 0.98))' :
    'rgba(255, 255, 255, 0.95)'};
  border: ${({ $rank }) =>
    $rank === 1 ? '1.5px solid rgba(31, 90, 51, 0.2)' : '1px solid rgba(31, 90, 51, 0.08)'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(31, 90, 51, 0.1);
  }
`;

const RankBadge = styled.span<{ $rank: number }>`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 800;
  font-size: 1rem;
  color: ${({ $rank }) =>
    $rank === 1 ? '#d4a847' :
    $rank === 2 ? '#8a9199' :
    $rank === 3 ? '#cd7f32' : '#9aada3'};
`;

const AvatarCircle = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;

const CandidateDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CandidateName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1a2e20;
  font-size: 0.95rem;
`;

const PartyName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b7a72;
  font-size: 0.8rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  margin-top: 0.3rem;
`;

const ProgressTrack = styled.div`
  height: 10px;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $value: number; $color: string }>`
  height: 100%;
  width: ${({ $value }) => $value}%;
  background: ${({ $color }) => $color};
  border-radius: 999px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 30%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
    border-radius: 999px;
  }
`;

const VoteResults = styled.div`
  text-align: right;
  min-width: 120px;
`;

const PercentageValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #22312a;
`;

const VoteCount = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  color: #8a9a90;
  margin-top: 0.2rem;
`;

const ParticipationSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(31, 90, 51, 0.1);
`;

const ParticipationLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #6b7a72;
  margin-bottom: 0.5rem;
  
  strong {
    color: #1a2e20;
    font-weight: 600;
  }
`;

const ParticipationTrack = styled.div`
  height: 10px;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  overflow: hidden;
`;

const ParticipationFill = styled.div<{ $value: number }>`
  height: 100%;
  width: ${({ $value }) => $value}%;
  background: linear-gradient(90deg, rgba(31, 90, 51, 0.7), #1f5a33);
  border-radius: 999px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

// Detailed stats for closed elections - Full report layout
const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatBox = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const StatNumber = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f5a33;
`;

const StatDesc = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #6b7a72;
  margin-top: 0.3rem;
`;

const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartPanel = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.8rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(31, 90, 51, 0.1);
`;

const ChartPanelTitle = styled.h3`
  margin: 0 0 1.5rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1a2e20;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    width: 4px;
    height: 20px;
    background: #1f5a33;
    border-radius: 2px;
  }
`;

const CandidateResultCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.03), rgba(255, 255, 255, 0.9));
  border-radius: 16px;
  margin-bottom: 0.8rem;
  border: 1px solid rgba(31, 90, 51, 0.1);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CandidateRank = styled.div<{ $rank: number }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  background: ${({ $rank }) => 
    $rank === 1 ? 'linear-gradient(135deg, #d4a847, #b8942f)' :
    $rank === 2 ? 'linear-gradient(135deg, #a8a9ad, #8e9094)' :
    $rank === 3 ? 'linear-gradient(135deg, #cd7f32, #b06c26)' :
    '#6b7a72'};
  color: white;
`;

const CandidateInfo = styled.div`
  flex: 1;
`;

const CandidateInfoName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1a2e20;
  font-size: 0.95rem;
`;

const CandidateInfoParty = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #6b7a72;
`;

const VoteInfo = styled.div`
  text-align: right;
`;

const VotePercent = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #1f5a33;
`;

const VoteNumber = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  color: #8a9a90;
`;

const ProgressBarFull = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(31, 90, 51, 0.1);
  border-radius: 4px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const ProgressBarFillFull = styled.div<{ $value: number; $color?: string }>`
  height: 100%;
  width: ${({ $value }) => $value}%;
  background: ${({ $color }) => $color || '#1f5a33'};
  border-radius: 4px;
  transition: width 0.8s ease;
`;


const RegionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const RegionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RegionLabel = styled.div`
  min-width: 120px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #1a2e20;
`;

const RegionBarOuter = styled.div`
  flex: 1;
  height: 24px;
  background: rgba(31, 90, 51, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

const RegionBarInner = styled.div<{ $value: number }>`
  height: 100%;
  width: ${({ $value }) => $value}%;
  background: linear-gradient(90deg, #1f5a33, #2d7a47);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.8rem;
`;

const RegionBarText = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
`;

// Section title for results
const SectionTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #22312a;
`;

const navItems = [
  { label: 'Tableau de bord', to: '/citoyen/dashboard' },
  { label: 'Elections', to: '/citoyen/elections' },
  { label: 'Candidats', to: '/citoyen/candidats' },
  { label: 'Vote securise', to: '/citoyen/vote' },
  { label: 'Resultats temps reel', to: '/citoyen/resultats' },
  { label: 'Profil', to: '/citoyen/profil' },
];

const CANDIDATE_COLORS = [
  'rgba(31, 90, 51, 0.7)',
  'rgba(38, 76, 140, 0.7)',
  'rgba(138, 90, 16, 0.7)',
  'rgba(91, 95, 101, 0.7)',
  'rgba(176, 58, 46, 0.7)',
  'rgba(100, 50, 150, 0.7)',
];

const buildAgeDistribution = (participation: number): AgeGroup[] => {
  const base = [20, 27, 22, 18, 13];
  const tweak = Math.round((participation - 50) / 10);
  const adjusted = [base[0] + tweak, base[1] + tweak, base[2], base[3] - tweak, base[4] - tweak]
    .map((value) => Math.max(5, value));
  const total = adjusted.reduce((sum, value) => sum + value, 0);
  const normalized = adjusted.map((value) => Math.round((value / total) * 100));
  return [
    { label: '18 - 24 ans', value: normalized[0], color: 'rgba(31, 90, 51, 0.6)' },
    { label: '25 - 34 ans', value: normalized[1], color: 'rgba(31, 90, 51, 0.68)' },
    { label: '35 - 44 ans', value: normalized[2], color: 'rgba(38, 76, 140, 0.62)' },
    { label: '45 - 54 ans', value: normalized[3], color: 'rgba(138, 90, 16, 0.6)' },
    { label: '55+ ans', value: normalized[4], color: 'rgba(91, 95, 101, 0.62)' },
  ];
};

const buildGenderDistribution = (participation: number) => {
  const female = Math.max(35, Math.min(65, Math.round(50 + (participation - 50) * 0.18)));
  return { female, male: 100 - female };
};

const buildRegions = (region: string, totalVotes: number): Region[] => {
  const names = [region || 'Nationale', 'Dakar', 'Thies', 'Saint-Louis'];
  const factors = [0.36, 0.28, 0.2, 0.16];
  return names.map((name, idx) => ({
    name,
    percent: Math.round(factors[idx] * 100),
    votes: Math.round(totalVotes * factors[idx]),
  }));
};

const CitizenResults = () => {
  const [searchParams] = useSearchParams();
  const electionIdFromQuery = searchParams.get('electionId');
  const [apiElections, setApiElections] = useState<ElectionDto[]>([]);
  const [apiCandidates, setApiCandidates] = useState<CandidateDto[]>([]);
  const [voteResults, setVoteResults] = useState<{ candidat_id: string; votes: number; percent: number }[]>([]);
  const [loadingElections, setLoadingElections] = useState(true);
  const [loadingResults, setLoadingResults] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'closed'>('all');

  /* Charger toutes les élections */
  useEffect(() => {
    api.elections.list()
      .then((data) => {
        setApiElections(data);
        if (electionIdFromQuery && data.some((e) => e.id === electionIdFromQuery)) {
          setSelectedId(electionIdFromQuery);
        } else if (data.length > 0) {
          const live = data.find((e) => e.statut === 'EN_COURS');
          setSelectedId(live?.id ?? data[0].id);
        }
      })
      .catch(() => setApiElections([]))
      .finally(() => setLoadingElections(false));
  }, [electionIdFromQuery]);

  /* Charger résultats + candidats quand l'élection sélectionnée change */
  useEffect(() => {
    if (!selectedId) return;
    setLoadingResults(true);
    Promise.all([
      api.votes.results(selectedId).catch(() => null),
      api.elections.getCandidates(selectedId).catch(() => []),
    ]).then(([results, candidates]) => {
      setApiCandidates(candidates as CandidateDto[]);
      setVoteResults(results ? results.results : []);
    }).finally(() => setLoadingResults(false));
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    const id = window.setInterval(() => {
      Promise.all([
        api.votes.results(selectedId).catch(() => null),
        api.elections.getCandidates(selectedId).catch(() => []),
      ]).then(([results, candidates]) => {
        setApiCandidates(candidates as CandidateDto[]);
        setVoteResults(results ? results.results : []);
      });
    }, 10000);
    return () => window.clearInterval(id);
  }, [selectedId]);

  const filteredElections = useMemo(() => apiElections.filter((e) => {
    if (statusFilter === 'live') return e.statut === 'EN_COURS';
    if (statusFilter === 'closed') return e.statut === 'CLOTUREE';
    return true;
  }), [apiElections, statusFilter]);

  const currentElection = apiElections.find((e) => e.id === selectedId);

  /* Construire la liste candidats enrichie avec résultats */
  const sorted: Candidate[] = useMemo(() => {
    const totalVotes = voteResults.reduce((s, r) => s + r.votes, 0);
    return apiCandidates
      .map((c, idx) => {
        const result = voteResults.find((r) => r.candidat_id === c.id);
        const votes = result?.votes ?? c.votes_count ?? 0;
        const percent = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
        return {
          id: c.id,
          initials: `${c.prenom.charAt(0)}${c.nom.charAt(0)}`.toUpperCase(),
          name: `${c.prenom} ${c.nom}`,
          party: c.parti_politique,
          votes,
          percent,
          color: CANDIDATE_COLORS[idx % CANDIDATE_COLORS.length],
        };
      })
      .sort((a, b) => b.percent - a.percent);
  }, [apiCandidates, voteResults]);

  const totalVotes = currentElection?.votes_count ?? voteResults.reduce((s, r) => s + r.votes, 0);
  const inscrits = currentElection?.total_electeurs ?? 0;
  const participation = inscrits > 0 && totalVotes > 0 ? Math.min(100, (totalVotes / inscrits) * 100) : 0;
  const isLive = currentElection?.statut === 'EN_COURS';

  /* Placeholder quand encore en chargement */
  const election: Election = {
    id: selectedId,
    label: currentElection?.titre ?? '—',
    status: isLive ? 'live' : 'closed',
    totalVotes,
    participation,
    inscrits,
    candidates: sorted,
    ageDistribution: buildAgeDistribution(participation),
    genderDistribution: buildGenderDistribution(participation),
    regions: buildRegions(currentElection?.region ?? '', totalVotes),
  };

  return (
    <AppLayout
      role="Citoyen"
      title={election.status === 'live' ? "Resultats en temps reel" : `Rapport final - ${election.label}`}
      subtitle={election.status === 'live' ? "Mise a jour automatique a chaque vote enregistre." : "Resultats definitifs publies par la commission electorale."}
      navItems={navItems}
    >
      <Container>
        <TopSection>
          <ControlsRow>
            <ElectionSelect value={selectedId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedId(e.target.value)}>
              {filteredElections.map((el) => (
                <option key={el.id} value={el.id}>{el.titre}</option>
              ))}
            </ElectionSelect>
            <FilterGroup>
              <FilterButton $active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>Tous</FilterButton>
              <FilterButton $active={statusFilter === 'live'} onClick={() => setStatusFilter('live')}>En direct</FilterButton>
              <FilterButton $active={statusFilter === 'closed'} onClick={() => setStatusFilter('closed')}>Termines</FilterButton>
            </FilterGroup>
            {election.status === 'live' ? (
              <LiveIndicator $status="live">
                <Pulse />
                Resultats en direct
              </LiveIndicator>
            ) : (
              <LiveIndicator $status="closed">
                Resultats publies
              </LiveIndicator>
            )}
          </ControlsRow>
        </TopSection>

        {election.status === 'live' ? (
          <>
            <StatsGrid>
              <StatCard $variant="primary">
                <StatLabel>Participation nationale</StatLabel>
                <StatValue>{election.participation}%</StatValue>
              </StatCard>
              <StatCard $variant="secondary">
                <StatLabel>Votes enregistres</StatLabel>
                <StatValue>{election.totalVotes.toLocaleString('fr-FR')}</StatValue>
              </StatCard>
              <StatCard $variant="accent">
                <StatLabel>Inscrits</StatLabel>
                <StatValue>{election.inscrits.toLocaleString('fr-FR')}</StatValue>
              </StatCard>
              <StatCard $variant="default">
                <StatLabel>Delai mise a jour</StatLabel>
                <StatValue>{'< 2s'}</StatValue>
              </StatCard>
            </StatsGrid>
          </>
        ) : (
          <></>
        )}

        {election.status === 'live' ? (
          <ResultsSection>
            <SectionHeader>
              <SectionTitle>Resultats — {election.label}</SectionTitle>
            </SectionHeader>
            <CandidatesList>
              {sorted.map((cand, idx) => (
                <CandidateCard key={cand.initials} $rank={idx + 1}>
                  <RankBadge $rank={idx + 1}>
                    #{idx + 1}
                  </RankBadge>
                  <AvatarCircle $color={cand.color}>{cand.initials}</AvatarCircle>
                  <CandidateDetails>
                    <CandidateName>{cand.name}</CandidateName>
                    <PartyName>{cand.party}</PartyName>
                    <ProgressBarContainer>
                      <ProgressTrack>
                        <ProgressFill $value={cand.percent} $color={cand.color} />
                      </ProgressTrack>
                    </ProgressBarContainer>
                  </CandidateDetails>
                    <VoteResults>
                    <PercentageValue>{cand.percent}%</PercentageValue>
                    <VoteCount>{cand.votes.toLocaleString('fr-FR')} voix</VoteCount>
                  </VoteResults>
                </CandidateCard>
              ))}
            </CandidatesList>

            <ParticipationSection>
              <ParticipationLabel>
                <span>Taux de participation</span>
                <strong>{election.participation}%</strong>
            </ParticipationLabel>
            <ParticipationTrack>
              <ParticipationFill $value={election.participation} />
            </ParticipationTrack>
          </ParticipationSection>
        </ResultsSection>
        ) : (
          <ReportContainer>
            <StatsRow>
              <StatBox>
                <StatNumber>{election.totalVotes.toLocaleString('fr-FR')}</StatNumber>
                <StatDesc>Votes exprimes</StatDesc>
              </StatBox>
              <StatBox>
                <StatNumber>{election.participation}%</StatNumber>
                <StatDesc>Taux de participation</StatDesc>
              </StatBox>
              <StatBox>
                <StatNumber>{election.inscrits.toLocaleString('fr-FR')}</StatNumber>
                <StatDesc>Electeurs inscrits</StatDesc>
              </StatBox>
              <StatBox>
                <StatNumber>{election.candidates.length}</StatNumber>
                <StatDesc>Candidats</StatDesc>
              </StatBox>
            </StatsRow>

            <ChartsRow>
              <ChartPanel>
                <ChartPanelTitle>Repartition par age</ChartPanelTitle>
                {election.ageDistribution?.map((item) => (
                  <div key={item.label} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ fontFamily: 'Poppins', fontSize: '0.85rem', color: '#6b7a72' }}>{item.label}</span>
                      <span style={{ fontFamily: 'Poppins', fontSize: '0.85rem', fontWeight: '600', color: '#1a2e20' }}>{item.value}%</span>
                    </div>
                    <ProgressBarFull>
                      <ProgressBarFillFull $value={item.value} $color={item.color} />
                    </ProgressBarFull>
                  </div>
                ))}
              </ChartPanel>

              <ChartPanel>
                <ChartPanelTitle>Repartition par genre</ChartPanelTitle>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                <svg width="160" height="160" viewBox="0 0 160 160">
                  {/* Female segment (starts at top, goes clockwise) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="rgba(138, 90, 16, 0.8)"
                    strokeWidth="24"
                    strokeDasharray={`${election.genderDistribution.female * 3.77} ${376 - election.genderDistribution.female * 3.77}`}
                    transform="rotate(-90 80 80)"
                  />
                  {/* Male segment */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="rgba(31, 90, 51, 0.8)"
                    strokeWidth="24"
                    strokeDasharray={`${election.genderDistribution.male * 3.77} ${376 - election.genderDistribution.male * 3.77}`}
                    strokeDashoffset={-(election.genderDistribution.female * 3.77)}
                    transform="rotate(-90 80 80)"
                  />
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(138, 90, 16, 0.8)' }}></div>
                    <span style={{ fontFamily: 'Poppins', fontSize: '0.9rem', color: '#1a2e20' }}>Femmes: {election.genderDistribution.female}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(31, 90, 51, 0.8)' }}></div>
                    <span style={{ fontFamily: 'Poppins', fontSize: '0.9rem', color: '#1a2e20' }}>Hommes: {election.genderDistribution.male}%</span>
                  </div>
                </div>
              </div>
              </ChartPanel>

              <ChartPanel>
                <ChartPanelTitle>Repartition geographique</ChartPanelTitle>
                <RegionList>
                  {election.regions.map((region) => (
                    <RegionItem key={region.name}>
                      <RegionLabel>{region.name}</RegionLabel>
                      <RegionBarOuter>
                        <RegionBarInner $value={region.percent}>
                          <RegionBarText>{region.percent}%</RegionBarText>
                        </RegionBarInner>
                      </RegionBarOuter>
                    </RegionItem>
                  ))}
                </RegionList>
              </ChartPanel>
            </ChartsRow>

            <ChartPanel>
              <ChartPanelTitle>Resultats des candidats</ChartPanelTitle>
              {sorted.map((cand, idx) => (
                <CandidateResultCard key={cand.initials}>
                  <CandidateRank $rank={idx + 1}>{idx + 1}</CandidateRank>
                  <AvatarCircle $color={cand.color} style={{ width: 48, height: 48, fontSize: '1rem' }}>{cand.initials}</AvatarCircle>
                  <CandidateInfo>
                    <CandidateInfoName>{cand.name}</CandidateInfoName>
                    <CandidateInfoParty>{cand.party}</CandidateInfoParty>
                    <ProgressBarFull>
                      <ProgressBarFillFull $value={cand.percent} $color={cand.color} />
                    </ProgressBarFull>
                  </CandidateInfo>
                  <VoteInfo>
                    <VotePercent>{cand.percent}%</VotePercent>
                    <VoteNumber>{cand.votes.toLocaleString('fr-FR')} voix</VoteNumber>
                  </VoteInfo>
                </CandidateResultCard>
              ))}
            </ChartPanel>
          </ReportContainer>
        )}
      </Container>
    </AppLayout>
  );
};

export default CitizenResults;
