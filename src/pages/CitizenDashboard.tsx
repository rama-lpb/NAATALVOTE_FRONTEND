import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { useState } from 'react';

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
  background: rgba(31, 90, 51, 0.8);
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
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.9) 0%, rgba(31, 90, 51, 0.75) 100%);
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
    background: linear-gradient(135deg, rgba(31, 90, 51, 1) 0%, rgba(31, 90, 51, 0.85) 100%);
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
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(31, 90, 51, 0.08)'};
  color: ${({ $active }) => $active ? '#ffffff' : 'rgba(31, 90, 51, 0.9)'};
  border-radius: 999px;
  padding: 0.35rem 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.9)' : 'rgba(31, 90, 51, 0.15)'};
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
  background: ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(31, 90, 51, 0.08)')};
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

  const [activeFilter, setActiveFilter] = useState('all');

  const elections = [
    {
      id: 'pres-2025',
      title: 'Presidentielle 2025',
      schedule: "Ouverte jusqu'au 12/03/2025",
      region: 'National',
      status: 'live' as const,
      hasVoted: false,
      isNew: true,
      type: 'Presidentielle',
    },
    {
      id: 'leg-2025-dkr',
      title: 'Legislatives Dakar',
      schedule: 'Debut le 20/03/2025',
      region: 'Dakar',
      status: 'scheduled' as const,
      hasVoted: false,
      isNew: false,
      type: 'Legislative',
    },
    {
      id: 'mun-2025-pk',
      title: 'Municipales Pikine',
      schedule: 'Cloturee le 02/02/2025',
      region: 'Pikine',
      status: 'closed' as const,
      hasVoted: true,
      isNew: false,
      type: 'Municipale',
    },
  ];

  const getStatusLabel = (status: 'live' | 'scheduled' | 'closed') => {
    if (status === 'live') return 'En cours';
    if (status === 'scheduled') return 'Programmee';
    return 'Cloturee';
  };

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
            <Hello>Bonjour, Aicha Fall</Hello>
            <HelperText>Votre session est active et securisee.</HelperText>
          </div>
        </Greeting>

        <Stats>
          <StatCard $accent="#1f5a33">
            <StatLabel>Elections en cours</StatLabel>
            <StatValue>2</StatValue>
          </StatCard>
          <StatCard $accent="#1f5a33">
            <StatLabel>Statut electeur</StatLabel>
            <StatValue>Eligible</StatValue>
          </StatCard>
          <StatCard $accent="#8a5a10">
            <StatLabel>Participation nationale</StatLabel>
            <StatValue>64%</StatValue>
          </StatCard>
          <StatCard $accent="#5a5f65">
            <StatLabel>Scrutins clotures</StatLabel>
            <StatValue>5</StatValue>
          </StatCard>
        </Stats>

        <Card>
          <FilterRow>
            <CardTitle>Scrutins principaux</CardTitle>
            <FilterChips>
              <Chip 
                $active={activeFilter === 'all'} 
                onClick={() => setActiveFilter('all')}
              >
                Tous
              </Chip>
              <Chip 
                $active={activeFilter === 'live'} 
                onClick={() => setActiveFilter('live')}
              >
                En cours
              </Chip>
              <Chip 
                $active={activeFilter === 'scheduled'} 
                onClick={() => setActiveFilter('scheduled')}
              >
                Programmes
              </Chip>
              <Chip 
                $active={activeFilter === 'closed'} 
                onClick={() => setActiveFilter('closed')}
              >
                Clotures
              </Chip>
            </FilterChips>
          </FilterRow>
           <ElectionList>
            {elections
              .filter(election => 
                activeFilter === 'all' || election.status === activeFilter
              )
              .map((election) => {
              const canVote = election.status === 'live' && !election.hasVoted;
              return (
                <ElectionRow key={election.id} $status={election.status}>
                  <div>
                    <RowTitle>{election.title}</RowTitle>
                    <MetaRow>
                      <RowMeta>{election.schedule}</RowMeta>
                      <Badge>{election.type}</Badge>
                      <Badge>{election.hasVoted ? 'Deja vote' : 'Pas encore vote'}</Badge>
                    </MetaRow>
                  </div>
                  <RegionMeta>{election.region}</RegionMeta>
                  <Tag $tone={election.status}>{getStatusLabel(election.status)}</Tag>
                  <RowActions>
                    {canVote ? <RowActionButton to="/citoyen/vote">Voter</RowActionButton> : null}
                    {election.status === 'closed' && (
                      <DetailButton to="/citoyen/resultats">Resultats</DetailButton>
                    )}
                    <DetailButton to="/citoyen/elections/detail">Details</DetailButton>
                  </RowActions>
                </ElectionRow>
              );
            })}
          </ElectionList>
          <Pagination>
            <PageButton>Precedent</PageButton>
            <PageButton>1</PageButton>
            <PageButton $active>2</PageButton>
            <PageButton>3</PageButton>
            <PageButton>Suivant</PageButton>
          </Pagination>
        </Card>
      </LayoutGrid>
    </AppLayout>
  );
};

export default CitizenDashboard;
