import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { useState, useEffect } from 'react';
import { api, type ElectionDto } from '../services/api';
import { useAppSelector } from '../store/hooks';

const LayoutGrid = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Hello = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: #22312a;
  font-size: 1.15rem;
`;

const HelperText = styled.p`
  margin: 0.2rem 0 0;
  color: #6b6f72;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div<{ $accent: string }>`
  background: #ffffff;
  border-radius: 16px;
  padding: 0.9rem 1rem;
  box-shadow: 0 14px 26px rgba(12, 24, 18, 0.06);
  border: 1px solid rgba(31, 90, 51, 0.08);
  border-left: 4px solid ${({ $accent }) => $accent};
`;

const StatLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.9rem;
`;

const StatValue = styled.h3`
  margin: 0.4rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.2rem 1.4rem;
  box-shadow: 0 16px 30px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.06);
`;

const CardTitle = styled.h2`
  margin: 0 0 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.2rem;
  font-weight: 500;
`;

const ActionButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(31, 90, 51, 0.55);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
`;

const SecondaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.25);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
`;

const RowActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  justify-self: end;
`;

const RowActionButton = styled(Link)`
  text-decoration: none;
  padding: 0.5rem 0.9rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.65) 0%, rgba(31, 90, 51, 0.5) 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(31, 90, 51, 0.4);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  min-width: 80px;
  text-align: center;
  margin-left: 0.25rem;
  box-shadow: 0 3px 10px rgba(31, 90, 51, 0.25);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(31, 90, 51, 0.35);
    background: linear-gradient(135deg, rgba(31, 90, 51, 0.72) 0%, rgba(31, 90, 51, 0.6) 100%);
  }
`;


const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterChips = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const Chip = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.5)' : 'rgba(31, 90, 51, 0.2)'};
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.55)' : 'rgba(31, 90, 51, 0.08)'};
  color: ${({ $active }) => $active ? '#ffffff' : 'rgba(31, 90, 51, 0.9)'};
  border-radius: 999px;
  padding: 0.35rem 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.65)' : 'rgba(31, 90, 51, 0.15)'};
    border-color: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.6)' : 'rgba(31, 90, 51, 0.3)'};
  }
`;

const ElectionList = styled.div`
  display: grid;
  gap: 1.2rem;
  margin-top: 1rem;
`;

const ElectionRow = styled.div<{ $status: 'live' | 'scheduled' | 'closed' }>`
  display: grid;
  grid-template-columns: 1.5fr 0.8fr 0.8fr 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1.4rem 1.5rem;
  height: 120px;
  border-radius: 18px;
  border: 1px solid ${({ $status }) => 
    $status === 'live' ? 'rgba(31, 90, 51, 0.12)' : 
    $status === 'scheduled' ? 'rgba(138, 90, 16, 0.12)' : 
    'rgba(91, 95, 101, 0.08)'};
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 100%);
  box-shadow: 0 6px 20px rgba(12, 24, 18, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${({ $status }) => 
      $status === 'live' ? 'rgba(31, 90, 51, 0.6)' : 
      $status === 'scheduled' ? 'rgba(138, 90, 16, 0.5)' : 
      'rgba(91, 95, 101, 0.4)'};
    border-radius: 18px 0 0 18px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 32px rgba(12, 24, 18, 0.12);
    border-color: ${({ $status }) => 
      $status === 'live' ? 'rgba(31, 90, 51, 0.2)' : 
      $status === 'scheduled' ? 'rgba(138, 90, 16, 0.2)' : 
      'rgba(91, 95, 101, 0.12)'};
  }
`;

const RowTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: #1a261e;
  font-size: 1.08rem;
  letter-spacing: -0.02em;
`;

const RowMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6268;
  font-size: 0.85rem;
  align-self: center;
  font-weight: 500;
`;

const RegionMeta = styled(RowMeta)`
  justify-self: center;
  text-align: center;
`;

const Tag = styled.span<{ $tone: 'live' | 'scheduled' | 'closed' }>`
  justify-self: center;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: ${({ $tone }) =>
    $tone === 'live' ? '#1a5a33' : $tone === 'scheduled' ? '#8a5a10' : '#5a5f65'};
  background: ${({ $tone }) =>
    $tone === 'live'
      ? 'rgba(31, 90, 51, 0.15)'
      : $tone === 'scheduled'
        ? 'rgba(138, 90, 16, 0.15)'
        : 'rgba(91, 95, 101, 0.12)'};
  box-shadow: 0 2px 8px ${({ $tone }) =>
    $tone === 'live'
      ? 'rgba(31, 90, 51, 0.15)'
      : $tone === 'scheduled'
        ? 'rgba(138, 90, 16, 0.15)'
        : 'rgba(91, 95, 101, 0.1)'};
  border: 1px solid ${({ $tone }) =>
    $tone === 'live'
      ? 'rgba(31, 90, 51, 0.2)'
      : $tone === 'scheduled'
        ? 'rgba(138, 90, 16, 0.2)'
        : 'rgba(91, 95, 101, 0.15)'};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: nowrap;
`;

const Badge = styled.span`
  padding: 0.25rem 0.55rem;
  border-radius: 8px;
  background: rgba(31, 90, 51, 0.1);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.72rem;
  border: 1px solid rgba(31, 90, 51, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(31, 90, 51, 0.15);
  }
`;

const DetailButton = styled(Link)`
  text-decoration: none;
  padding: 0.5rem 0.8rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.2);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.85rem;
  min-width: 78px;
  text-align: center;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(31, 90, 51, 0.15);
    border-color: rgba(31, 90, 51, 0.35);
    transform: translateY(-1px);
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  margin-top: 1.4rem;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  border: 1px solid rgba(31, 90, 51, 0.2);
  background: ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.55)' : 'rgba(31, 90, 51, 0.08)')};
  color: ${({ $active }) => ($active ? '#ffffff' : 'rgba(31, 90, 51, 0.9)')};
  border-radius: 10px;
  padding: 0.3rem 0.6rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
`;

const CitizenDashboard = () => {
  const navItems = [
    { label: 'Tableau de bord', to: '/citoyen/dashboard' },
    { label: 'Elections', to: '/citoyen/elections' },
    { label: 'Candidats', to: '/citoyen/candidats' },
    { label: 'Vote securise', to: '/citoyen/vote' },
    { label: 'Resultats temps reel', to: '/citoyen/resultats' },
    { label: 'Profil', to: '/citoyen/profil' },
  ];

  const sessionUser = useAppSelector((s) => s.auth.user);
  const [activeFilter, setActiveFilter] = useState('all');
  const [elections, setElections] = useState<ElectionDto[]>([]);
  const [votedElectionIds, setVotedElectionIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.elections.list(),
      sessionUser?.id ? api.citoyen.history(sessionUser.id).catch(() => []) : Promise.resolve([]),
    ])
      .then(([electionsData, historyData]) => {
        setElections(electionsData);
        const voted = new Set(
          (historyData ?? [])
            .filter((entry) => entry.a_vote)
            .map((entry) => entry.election_id)
        );
        setVotedElectionIds(voted);
      })
      .catch(() => {
        setElections([]);
        setVotedElectionIds(new Set());
      })
      .finally(() => setLoading(false));
  }, [sessionUser?.id]);

  const toStatus = (statut: string): 'live' | 'scheduled' | 'closed' => {
    if (statut === 'EN_COURS') return 'live';
    if (statut === 'PROGRAMMEE') return 'scheduled';
    return 'closed';
  };

  const getStatusLabel = (status: 'live' | 'scheduled' | 'closed') => {
    if (status === 'live') return 'En cours';
    if (status === 'scheduled') return 'Programmee';
    return 'Cloturee';
  };

  const formatSchedule = (e: ElectionDto): string => {
    const status = toStatus(e.statut);
    const fmt = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    if (status === 'live') return `Ouverte jusqu'au ${fmt(e.date_fin)}`;
    if (status === 'scheduled') return `Debut le ${fmt(e.date_debut)}`;
    return `Cloturee le ${fmt(e.date_fin)}`;
  };

  const userName = sessionUser ? `${sessionUser.prenom ?? ''} ${sessionUser.nom ?? ''}`.trim() : '';
  const liveCount = elections.filter((e) => e.statut === 'EN_COURS').length;
  const closedCount = elections.filter((e) => e.statut === 'CLOTUREE').length;
  const votedCount = elections.filter((e) => votedElectionIds.has(e.id)).length;

  const filtered = elections.filter((e) => {
    const s = toStatus(e.statut);
    return activeFilter === 'all' || s === activeFilter;
  });

  return (
    <AppLayout
      role="Citoyen"
      title="Tableau de bord citoyen"
      subtitle="Acces rapide a vos actions essentielles."
      navItems={navItems}
      actions={
        <>
          <SecondaryButton to="/citoyen/elections">Voir elections</SecondaryButton>
          <ActionButton to="/citoyen/vote">Voter maintenant</ActionButton>
        </>
      }
    >
      <LayoutGrid>
        <Greeting>
          <div>
            <Hello>{userName ? `Bonjour, ${userName}` : 'Bonjour'}</Hello>
            <HelperText>Votre session est active et securisee.</HelperText>
          </div>
        </Greeting>

        <Stats>
          <StatCard $accent="#1f5a33">
            <StatLabel>Elections en cours</StatLabel>
            <StatValue>{loading ? '—' : liveCount}</StatValue>
          </StatCard>
          <StatCard $accent="#1f5a33">
            <StatLabel>Statut electeur</StatLabel>
            <StatValue>{sessionUser ? 'Connecte' : 'Invite'}</StatValue>
          </StatCard>
          <StatCard $accent="#8a5a10">
            <StatLabel>Total elections</StatLabel>
            <StatValue>{loading ? '—' : elections.length}</StatValue>
          </StatCard>
          <StatCard $accent="#5a5f65">
            <StatLabel>Votes effectues</StatLabel>
            <StatValue>{loading ? '—' : votedCount}</StatValue>
          </StatCard>
        </Stats>

        <Card>
          <FilterRow>
            <CardTitle>Scrutins principaux</CardTitle>
            <FilterChips>
              <Chip $active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>Tous</Chip>
              <Chip $active={activeFilter === 'live'} onClick={() => setActiveFilter('live')}>En cours</Chip>
              <Chip $active={activeFilter === 'scheduled'} onClick={() => setActiveFilter('scheduled')}>Programmes</Chip>
              <Chip $active={activeFilter === 'closed'} onClick={() => setActiveFilter('closed')}>Clotures</Chip>
            </FilterChips>
          </FilterRow>
          <ElectionList>
            {loading ? (
              <ElectionRow $status="scheduled" style={{ justifyContent: 'center', padding: '2rem' }}>
                <RowMeta>Chargement des elections…</RowMeta>
              </ElectionRow>
            ) : filtered.length === 0 ? (
              <ElectionRow $status="scheduled" style={{ justifyContent: 'center', padding: '2rem' }}>
                <RowMeta>Aucune election disponible.</RowMeta>
              </ElectionRow>
            ) : filtered.map((election) => {
              const status = toStatus(election.statut);
              const hasVoted = votedElectionIds.has(election.id);
              const canVote = status === 'live' && !hasVoted;
              return (
                <ElectionRow key={election.id} $status={status}>
                  <div>
                    <RowTitle>{election.titre}</RowTitle>
                    <MetaRow>
                      <RowMeta>{formatSchedule(election)}</RowMeta>
                      <Badge>{election.type}</Badge>
                      {hasVoted ? <Badge>Vote enregistre</Badge> : null}
                    </MetaRow>
                  </div>
                  <RegionMeta>{election.region || 'National'}</RegionMeta>
                  <Tag $tone={status}>{getStatusLabel(status)}</Tag>
                  <RowActions>
                    {canVote && <RowActionButton to="/citoyen/vote">Voter</RowActionButton>}
                    {status === 'closed' && <DetailButton to="/citoyen/resultats">Resultats</DetailButton>}
                    <DetailButton to={`/citoyen/elections/${election.id}/detail`}>Details</DetailButton>
                  </RowActions>
                </ElectionRow>
              );
            })}
          </ElectionList>
        </Card>
      </LayoutGrid>
    </AppLayout>
  );
};

export default CitizenDashboard;
