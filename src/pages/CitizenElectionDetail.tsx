import styled, { keyframes } from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { api, type CandidateDto, type ElectionDto, type VoteResultLineDto } from '../services/api';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const PageShell = styled.div`
  --forest: #1f5a33;
  --moss: #2d7a47;
  --ink: #1f2a24;
  --card: rgba(255, 255, 255, 0.92);
  --border: rgba(31, 90, 51, 0.14);
  --shadow: 0 22px 48px rgba(20, 40, 28, 0.12);

  min-height: 100%;
  padding: 1.5rem 1.25rem 2.5rem;
  border-radius: 0;
  background: transparent;
  position: relative;
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.75);
  border-radius: 26px;
  padding: 2.2rem;
  box-shadow: var(--shadow);
  display: grid;
  gap: 2rem;
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
`;

const HeaderSection = styled.div`
  display: grid;
  gap: 1.2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const HeroRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const TitleGroup = styled.div`
  display: grid;
  gap: 0.4rem;
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: var(--forest);
  font-size: clamp(1.3rem, 2vw, 1.6rem);
  font-weight: 600;
`;

const Subtitle = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #4f5d56;
  font-size: 1rem;
  max-width: 640px;
  line-height: 1.6;
`;

const StatusPill = styled.span<{ $tone: string }>`
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: ${({ $tone }) =>
    $tone === 'live' ? 'rgba(31, 90, 51, 0.85)' : $tone === 'scheduled' ? 'rgba(138, 90, 16, 0.85)' : 'rgba(91, 95, 101, 0.85)'};
  background: ${({ $tone }) =>
    $tone === 'live'
      ? 'rgba(31, 90, 51, 0.12)'
      : $tone === 'scheduled'
        ? 'rgba(138, 90, 16, 0.12)'
        : 'rgba(91, 95, 101, 0.12)'};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  ${({ $tone }) => $tone === 'live' && `
    animation: pulse 2s infinite;
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(31, 90, 51, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(31, 90, 51, 0); }
      100% { box-shadow: 0 0 0 0 rgba(31, 90, 51, 0); }
    }
  `}
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $tone }) =>
      $tone === 'live' ? '#1f5a33' : $tone === 'scheduled' ? '#8a5a10' : '#5b5f65'};
  }
`;

const MetaRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  font-size: 0.95rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.9rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 14px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  box-shadow: 0 8px 18px rgba(31, 90, 51, 0.08);
`;

const MetaLabel = styled.span`
  font-weight: 500;
  color: #5a6d62;
`;

const MetaValue = styled.span`
  font-weight: 600;
  color: #22312a;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 1.4rem;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ParticipationCard = styled.div`
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.12) 0%, rgba(31, 90, 51, 0.02) 100%);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(31, 90, 51, 0.14);
  animation: ${fadeIn} 0.5s ease-out 0.1s both;
  box-shadow: 0 14px 32px rgba(31, 90, 51, 0.1);
`;

const ParticipationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ParticipationTitle = styled.h4`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 0.95rem;
  font-weight: 600;
`;

const ParticipationValue = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1f5a33;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 14px;
  background: rgba(31, 90, 51, 0.15);
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ $percentage: number }>`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  background: linear-gradient(90deg, rgba(31, 90, 51, 0.6) 0%, rgba(45, 122, 71, 0.6) 100%);
  border-radius: 999px;
  transition: width 1s ease-out;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 0.9rem;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 14px;
  border: 1px solid rgba(31, 90, 51, 0.08);
`;

const StatValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22332d;
  font-size: 1rem;
`;

const StatLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

const Section = styled.div`
  display: grid;
  gap: 1.5rem;
  animation: ${fadeIn} 0.5s ease-out 0.2s both;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  
  &::before {
    content: '';
    width: 4px;
    height: 22px;
    background: #1f5a33;
    border-radius: 2px;
  }
`;

const ChartCard = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  padding: 1.8rem;
  background: var(--card);
  display: grid;
  gap: 1.2rem;
  animation: ${scaleIn} 0.5s ease-out 0.3s both;
  box-shadow: 0 18px 40px rgba(31, 90, 51, 0.12);
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ChartTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
  font-size: 1rem;
`;

const ChartLegend = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.85rem;
`;

const LegendDot = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 4px;
    background: ${({ $color }) => $color};
    display: inline-block;
  }
`;

const BarChart = styled.div`
  display: grid;
  gap: 1rem;
`;

const BarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  align-items: end;
  min-height: 220px;
  padding: 1rem 0;
  
  @media (max-width: 600px) {
    min-height: auto;
    gap: 1.2rem;
  }
`;

const BarColumn = styled.div`
  display: grid;
  gap: 0.8rem;
  align-items: end;
  text-align: center;
`;

const BarValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: #5a6a63;
  font-size: 1rem;
`;

const BarStick = styled.div<{ $value: number; $color: string }>`
  height: ${({ $value }) => `${Math.max($value * 3, 30)}px`};
  min-height: 30px;
  border-radius: 14px 14px 8px 8px;
  background: ${({ $color }) => $color};
  position: relative;
  transition: all 0.5s ease-out;
  
  &:hover {
    transform: scaleY(1.03);
    filter: brightness(1.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%);
    border-radius: 14px 14px 0 0;
  }
`;

const BarLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.9rem;
  font-weight: 500;
`;

const CandidateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.2rem;
`;

const CandidateCard = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  padding: 1.6rem;
  background: var(--card);
  display: grid;
  gap: 1rem;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out both;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 30px rgba(31, 90, 51, 0.18);
    border-color: rgba(31, 90, 51, 0.25);
  }
`;

const CandidateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CandidateAvatar = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.15) 0%, rgba(31, 90, 51, 0.05) 100%);
  color: #1f5a33;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid rgba(31, 90, 51, 0.2);
`;

const CandidateInfo = styled.div`
  flex: 1;
`;

const CandidateName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: #4a5a54;
  font-size: 1rem;
`;

const CandidateMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CandidateVotes = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  background: rgba(31, 90, 51, 0.08);
  border-radius: 6px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: #4a7a5a;
  font-size: 0.85rem;
`;

const CandidateDesc = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #56615c;
  font-size: 0.92rem;
  line-height: 1.6;
`;

const CandidateProgress = styled.div`
  display: grid;
  gap: 0.4rem;
`;

const CandidateProgressTrack = styled.div`
  height: 8px;
  width: 100%;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  overflow: hidden;
`;

const CandidateProgressFill = styled.div<{ $percentage: number; $color: string }>`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: ${({ $color }) => $color};
  border-radius: 999px;
  transition: width 0.8s ease-out;
`;

const CandidateFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  flex-wrap: wrap;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(31, 90, 51, 0.1);
`;

const CandidateActions = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const SectionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Meta = styled.p`
  margin: 0;
  color: #5a6d62;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
`;

const PrimaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 14px;
  background: linear-gradient(135deg, #1f5a33 0%, #2d7a47 100%);
  border: none;
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 12px 26px rgba(31, 90, 51, 0.28);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(31, 90, 51, 0.32);
  }
`;

const ProgramLink = styled(Link)`
  text-decoration: none;
  color: #1f5a33;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  background: rgba(31, 90, 51, 0.1);
  border: 1px solid rgba(31, 90, 51, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(31, 90, 51, 0.18);
    border-color: rgba(31, 90, 51, 0.35);
  }
`;

const RulesCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(31, 90, 51, 0.05) 100%);
  border-radius: 20px;
  padding: 1.6rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 0.6rem;
  box-shadow: 0 14px 28px rgba(31, 90, 51, 0.1);
`;

const RulesTitle = styled.h4`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 0.95rem;
  font-weight: 600;
`;

const RulesText = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #56615c;
  font-size: 0.9rem;
  line-height: 1.5;
`;

type UiStatus = 'live' | 'scheduled' | 'closed';

const toUiStatus = (statut: string): UiStatus => {
  if (statut === 'EN_COURS') return 'live';
  if (statut === 'PROGRAMMEE') return 'scheduled';
  return 'closed';
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

const getStatusLabel = (status: UiStatus) => {
  if (status === 'live') return 'En cours';
  if (status === 'scheduled') return 'Programmee';
  return 'Cloturee';
};

const DEFAULT_COLORS = [
  'rgba(31, 90, 51, 0.9)',
  'rgba(38, 76, 140, 0.85)',
  'rgba(138, 90, 16, 0.85)',
  'rgba(91, 95, 101, 0.85)',
  'rgba(20, 110, 90, 0.85)',
];

const CitizenElectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [election, setElection] = useState<ElectionDto | null>(null);
  const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  const [results, setResults] = useState<VoteResultLineDto[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navItems = [
    { label: 'Tableau de bord', to: '/citoyen/dashboard' },
    { label: 'Elections', to: '/citoyen/elections' },
    { label: 'Candidats', to: '/citoyen/candidats' },
    { label: 'Vote securise', to: '/citoyen/vote' },
    { label: 'Resultats temps reel', to: '/citoyen/resultats' },
    { label: 'Profil', to: '/citoyen/profil' },
  ];

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Election introuvable.');
      return;
    }
    setLoading(true);
    setError(null);
    Promise.all([
      api.elections.get(id),
      api.elections.getCandidates(id),
      api.votes.results(id).catch(() => null),
    ])
      .then(([electionData, candidatesData, resultsData]) => {
        setElection(electionData);
        setCandidates(candidatesData);
        setResults(resultsData?.results ?? []);
        setLastUpdate(new Date());
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Erreur de chargement de l election.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const candidateColors = useMemo(() => {
    const byId: Record<string, string> = {};
    candidates.forEach((c, index) => {
      byId[c.id] = c.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
    });
    return byId;
  }, [candidates]);

  const votesByCandidate = useMemo(() => {
    const map = new Map<string, number>();
    results.forEach((line) => map.set(line.candidat_id, line.votes));
    return map;
  }, [results]);

  const totalVotes = useMemo(() => {
    const fromResults = results.reduce((sum, line) => sum + line.votes, 0);
    if (fromResults > 0) return fromResults;
    return candidates.reduce((sum, c) => sum + c.votes_count, 0);
  }, [results, candidates]);

  const candidatePercents = useMemo(() => {
    const percentages: Record<string, number> = {};
    const safeTotal = totalVotes > 0 ? totalVotes : 1;
    candidates.forEach((candidate) => {
      const votes = votesByCandidate.get(candidate.id) ?? candidate.votes_count;
      percentages[candidate.id] = Math.round((votes / safeTotal) * 100);
    });
    return percentages;
  }, [candidates, totalVotes, votesByCandidate]);

  const participation = useMemo(() => {
    if (!election || election.total_electeurs <= 0) return 0;
    return Math.min(100, Math.round((totalVotes / election.total_electeurs) * 100));
  }, [election, totalVotes]);

  const daysRemaining = useMemo(() => {
    if (!election) return 0;
    const now = Date.now();
    const end = new Date(election.date_fin).getTime();
    const diff = end - now;
    return diff <= 0 ? 0 : Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [election]);

  if (loading) {
    return (
      <AppLayout role="Citoyen" title="Detail election" subtitle="Informations officielles et calendrier du scrutin." navItems={navItems}>
        <PageShell>
          <Panel>
            <RulesText>Chargement des donnees de l election...</RulesText>
          </Panel>
        </PageShell>
      </AppLayout>
    );
  }

  if (error || !election) {
    return (
      <AppLayout role="Citoyen" title="Detail election" subtitle="Informations officielles et calendrier du scrutin." navItems={navItems}>
        <PageShell>
          <Panel>
            <RulesText>{error ?? 'Election introuvable.'}</RulesText>
          </Panel>
        </PageShell>
      </AppLayout>
    );
  }

  const status = toUiStatus(election.statut);

  return (
    <AppLayout
      role="Citoyen"
      title="Detail election"
      subtitle="Informations officielles et calendrier du scrutin."
      navItems={navItems}
    >
      <PageShell>
        <Panel>
          <HeaderSection>
            <HeroRow>
              <TitleGroup>
                <Title>{election.titre}</Title>
                <Subtitle>
                  Cadre officiel, suivi de participation et resultats consolides en temps reel.
                </Subtitle>
              </TitleGroup>
              <BadgeRow>
                <StatusPill $tone={status}>{getStatusLabel(status)}</StatusPill>
              </BadgeRow>
            </HeroRow>
            <MetaRow>
              <MetaItem>
                <MetaLabel>Periode:</MetaLabel>
                <MetaValue>{formatDate(election.date_debut)} - {formatDate(election.date_fin)}</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Zone:</MetaLabel>
                <MetaValue>{election.region || 'Nationale'}</MetaValue>
              </MetaItem>
            </MetaRow>
          </HeaderSection>

          <SummaryGrid>
            <ParticipationCard>
              <ParticipationHeader>
                <ParticipationTitle>Taux de participation</ParticipationTitle>
                <ParticipationValue>{participation}%</ParticipationValue>
              </ParticipationHeader>
              <ProgressBarContainer>
                <ProgressBar $percentage={participation} />
              </ProgressBarContainer>
              <StatsRow>
                <StatItem>
                  <StatValue>{totalVotes.toLocaleString()}</StatValue>
                  <StatLabel>Total votes</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{candidates.length}</StatValue>
                  <StatLabel>Candidats</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{daysRemaining}</StatValue>
                  <StatLabel>Jours restants</StatLabel>
                </StatItem>
              </StatsRow>
            </ParticipationCard>

            <RulesCard>
              <RulesTitle>Regles du scrutin</RulesTitle>
              <RulesText>{election.description || 'Un vote unique par citoyen.'}</RulesText>
            </RulesCard>
          </SummaryGrid>

          <Section>
            <SectionRow>
              <SectionTitle>Resultats en temps reel</SectionTitle>
              <Meta>
                Derniere mise a jour: {lastUpdate ? lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
              </Meta>
            </SectionRow>
            <ChartCard>
              <ChartHeader>
                <ChartTitle>Diagramme des voix par candidat</ChartTitle>
                <ChartLegend>
                  {candidates.map((candidate) => (
                    <LegendDot key={candidate.id} $color={candidateColors[candidate.id]}>
                      {candidate.prenom} {candidate.nom} · {candidatePercents[candidate.id] ?? 0}%
                    </LegendDot>
                  ))}
                </ChartLegend>
              </ChartHeader>
              <BarChart>
                <BarGrid>
                  {candidates.map((candidate) => {
                    const votes = votesByCandidate.get(candidate.id) ?? candidate.votes_count;
                    const percent = candidatePercents[candidate.id] ?? 0;
                    return (
                      <BarColumn key={candidate.id}>
                        <BarValue>{percent}%</BarValue>
                        <BarStick $value={percent} $color={candidateColors[candidate.id]} />
                        <BarLabel>{candidate.prenom} {candidate.nom} ({votes.toLocaleString()})</BarLabel>
                      </BarColumn>
                    );
                  })}
                </BarGrid>
              </BarChart>
            </ChartCard>
          </Section>

          <Section>
            <SectionRow>
              <SectionTitle>Liste des candidats</SectionTitle>
              <Meta>{candidates.length} candidats</Meta>
              {status === 'live' ? (
                <PrimaryButton to="/citoyen/vote">Voter</PrimaryButton>
              ) : null}
            </SectionRow>
            <CandidateGrid>
              {candidates.map((candidate) => {
                const votes = votesByCandidate.get(candidate.id) ?? candidate.votes_count;
                const percent = candidatePercents[candidate.id] ?? 0;
                const fullName = `${candidate.prenom} ${candidate.nom}`;
                return (
                  <CandidateCard key={candidate.id}>
                    <CandidateHeader>
                      <CandidateAvatar>
                        {fullName
                          .split(' ')
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join('')}
                      </CandidateAvatar>
                      <CandidateInfo>
                        <CandidateName>{fullName}</CandidateName>
                        <CandidateMeta>
                          {candidate.parti_politique || 'Parti non renseigne'}
                          <CandidateVotes>
                            {votes.toLocaleString()} voix ({percent}%)
                          </CandidateVotes>
                        </CandidateMeta>
                      </CandidateInfo>
                    </CandidateHeader>
                    <CandidateDesc>{candidate.biographie || 'Biographie non renseignee.'}</CandidateDesc>
                    <CandidateProgress>
                      <CandidateProgressTrack>
                        <CandidateProgressFill
                          $percentage={percent}
                          $color={candidateColors[candidate.id]}
                        />
                      </CandidateProgressTrack>
                    </CandidateProgress>
                    <CandidateFooter>
                      <CandidateActions>
                        <ProgramLink to={`/citoyen/candidats/${candidate.id}`}>
                          Voir le programme
                        </ProgramLink>
                      </CandidateActions>
                      <Meta>{percent}% des voix</Meta>
                    </CandidateFooter>
                  </CandidateCard>
                );
              })}
            </CandidateGrid>
          </Section>
        </Panel>
      </PageShell>
    </AppLayout>
  );
};

export default CitizenElectionDetail;
