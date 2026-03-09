import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { useState } from 'react';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: 0 16px 30px rgba(12, 24, 18, 0.08);
  display: grid;
  gap: 1rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.9rem;
`;

const SummaryCard = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 10px 20px rgba(12, 24, 18, 0.06);
`;

const SummaryLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.85rem;
`;

const SummaryValue = styled.h3`
  margin: 0.4rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.3rem;
  font-weight: 600;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.2rem;
  font-weight: 500;
`;

const Filters = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const FilterChip = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.5)' : 'rgba(31, 90, 51, 0.2)'};
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(31, 90, 51, 0.12)'};
  color: ${({ $active }) => $active ? '#ffffff' : 'rgba(31, 90, 51, 0.9)'};
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.9)' : 'rgba(31, 90, 51, 0.15)'};
    border-color: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.6)' : 'rgba(31, 90, 51, 0.3)'};
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
`;

const Search = styled.input`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  background: rgba(255, 255, 255, 0.85);
  color: #22312a;
  min-width: 220px;
  outline: none;
  &:focus {
    border-color: rgba(31, 90, 51, 0.45);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
  }
`;

const Select = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  background: rgba(255, 255, 255, 0.85);
  color: #22312a;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 0.3rem;
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 10px;
  padding: 0.25rem;
`;

const ViewButton = styled.button<{ $active?: boolean }>`
  border: none;
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.8)' : 'transparent'};
  color: ${({ $active }) => $active ? '#ffffff' : 'rgba(31, 90, 51, 0.7)'};
  padding: 0.35rem 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.9)' : 'rgba(31, 90, 51, 0.1)'};
  }
`;

const Grid = styled.div<{ $viewMode: 'grid' | 'list' }>`
  display: grid;
  grid-template-columns: ${({ $viewMode }) => 
    $viewMode === 'grid' 
      ? 'repeat(auto-fill, minmax(45%, 1fr))' 
      : 'repeat(2, 45%)'};
  gap: 1rem;
  justify-content: center;
`;

const Card = styled.div<{ $status: 'live' | 'scheduled' | 'closed' }>`
  border-radius: 18px;
  border: 2px solid ${({ $status }) => 
    $status === 'live' ? 'rgba(31, 90, 51, 0.25)' : 
    $status === 'scheduled' ? 'rgba(138, 90, 16, 0.25)' : 
    'rgba(91, 95, 101, 0.15)'};
  padding: 1.3rem 1.2rem;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  box-shadow: 0 8px 20px rgba(12, 24, 18, 0.06);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 220px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background: ${({ $status }) => 
      $status === 'live' ? 'rgba(31, 90, 51, 0.8)' : 
      $status === 'scheduled' ? 'rgba(138, 90, 16, 0.7)' : 
      'rgba(91, 95, 101, 0.5)'};
    border-radius: 18px 0 0 18px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(12, 24, 18, 0.1);
    border-color: ${({ $status }) => 
      $status === 'live' ? 'rgba(31, 90, 51, 0.4)' : 
      $status === 'scheduled' ? 'rgba(138, 90, 16, 0.4)' : 
      'rgba(91, 95, 101, 0.25)'};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.05rem;
  font-weight: 500;
`;

const StatusPill = styled.span<{ $tone: 'live' | 'scheduled' | 'closed' }>`
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
  border: 1px solid ${({ $tone }) =>
    $tone === 'live'
      ? 'rgba(31, 90, 51, 0.2)'
      : $tone === 'scheduled'
        ? 'rgba(138, 90, 16, 0.2)'
        : 'rgba(91, 95, 101, 0.15)'};
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.4rem 0.8rem;
`;

const CardMeta = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.9rem;
`;

const Progress = styled.div`
  height: 8px;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $value: number }>`
  height: 100%;
  width: ${({ $value }) => `${$value}%`};
  background: rgba(31, 90, 51, 0.7);
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  text-decoration: none;
  padding: 0.5rem 0.9rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.9) 0%, rgba(31, 90, 51, 0.75) 100%);
  border: 1px solid rgba(31, 90, 51, 0.4);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 3px 10px rgba(31, 90, 51, 0.25);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(31, 90, 51, 0.35);
  }
`;

const GhostButton = styled(Link)`
  text-decoration: none;
  padding: 0.5rem 0.9rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.2);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(31, 90, 51, 0.15);
    border-color: rgba(31, 90, 51, 0.35);
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.5)' : 'rgba(31, 90, 51, 0.2)'};
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  color: ${({ $active }) => $active ? '#ffffff' : 'rgba(31, 90, 51, 0.9)'};
  border-radius: 10px;
  padding: 0.4rem 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.9)' : 'rgba(31, 90, 51, 0.1)'};
  }
`;

const CitizenElections = () => {
  const navItems = [
    { label: 'Tableau de bord', to: '/citoyen/dashboard' },
    { label: 'Elections', to: '/citoyen/elections' },
    { label: 'Candidats', to: '/citoyen/candidats' },
    { label: 'Vote securise', to: '/citoyen/vote' },
    { label: 'Resultats temps reel', to: '/citoyen/resultats' },
    { label: 'Profil', to: '/citoyen/profil' },
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const elections = [
    {
      id: 'pres-2025',
      title: 'Presidentielle 2025',
      status: 'live' as const,
      start: '08/03/2025',
      end: '12/03/2025',
      region: 'National',
      type: 'Presidentielle',
      participation: 62,
      hasVoted: false,
      resultsAvailable: false,
      candidateCount: 6,
    },
    {
      id: 'leg-2025-dkr',
      title: 'Legislatives Dakar',
      status: 'scheduled' as const,
      start: '20/03/2025',
      end: '22/03/2025',
      region: 'Dakar',
      type: 'Legislative',
      participation: 0,
      hasVoted: false,
      resultsAvailable: false,
      candidateCount: 12,
    },
    {
      id: 'mun-2025-pk',
      title: 'Municipales Pikine',
      status: 'closed' as const,
      start: '20/01/2025',
      end: '02/02/2025',
      region: 'Pikine',
      type: 'Municipale',
      participation: 71,
      hasVoted: true,
      resultsAvailable: true,
      candidateCount: 8,
    },
    {
      id: 'reg-2025-dkr',
      title: 'Regionales Dakar',
      status: 'live' as const,
      start: '15/03/2025',
      end: '18/03/2025',
      region: 'Dakar',
      type: 'Regionale',
      participation: 45,
      hasVoted: false,
      resultsAvailable: false,
      candidateCount: 4,
    },
  ];

  const getStatusLabel = (status: 'live' | 'scheduled' | 'closed') => {
    if (status === 'live') return 'En cours';
    if (status === 'scheduled') return 'Programmee';
    return 'Cloturee';
  };

  const filteredElections = elections.filter(election => 
    (activeFilter === 'all' || election.status === activeFilter) &&
    (typeFilter === 'all' || election.type === typeFilter) &&
    (election.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     election.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
     election.region.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredElections.length / itemsPerPage);
  const paginatedElections = filteredElections.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  return (
    <AppLayout
      role="Citoyen"
      title="Elections disponibles"
      subtitle="Consultez les scrutins par statut et accedez aux candidats."
      navItems={navItems}
    >
      <Panel>
        <SummaryRow>
          <SummaryCard>
            <SummaryLabel>Scrutins actifs</SummaryLabel>
            <SummaryValue>2</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Prochain scrutin</SummaryLabel>
            <SummaryValue>15/03/2025</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Total scrutins</SummaryLabel>
            <SummaryValue>{elections.length}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Taux moyen national</SummaryLabel>
            <SummaryValue>64%</SummaryValue>
          </SummaryCard>
        </SummaryRow>
        <HeaderRow>
          <Title>Liste des scrutins</Title>
          <Controls>
            <Search 
              placeholder="Rechercher un scrutin" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select>
              <option>Trier: date de debut</option>
              <option>Trier: participation</option>
              <option>Trier: statut</option>
            </Select>
            <ViewToggle>
              <ViewButton 
                $active={viewMode === 'list'} 
                onClick={() => setViewMode('list')}
                title="Affichage en liste"
              >
                ☰
              </ViewButton>
              <ViewButton 
                $active={viewMode === 'grid'} 
                onClick={() => setViewMode('grid')}
                title="Affichage en grille"
              >
                ⊞
              </ViewButton>
            </ViewToggle>
          </Controls>
        </HeaderRow>
        <Filters>
          <FilterChip 
            $active={activeFilter === 'all'} 
            onClick={() => { setActiveFilter('all'); setCurrentPage(1); }}
          >
            Toutes
          </FilterChip>
          <FilterChip 
            $active={activeFilter === 'live'} 
            onClick={() => { setActiveFilter('live'); setCurrentPage(1); }}
          >
            En cours
          </FilterChip>
          <FilterChip 
            $active={activeFilter === 'scheduled'} 
            onClick={() => { setActiveFilter('scheduled'); setCurrentPage(1); }}
          >
            Programmees
          </FilterChip>
          <FilterChip 
            $active={activeFilter === 'closed'} 
            onClick={() => { setActiveFilter('closed'); setCurrentPage(1); }}
          >
            Cloturees
          </FilterChip>
        </Filters>
        <Filters style={{ marginTop: '0.5rem' }}>
          <FilterChip 
            $active={typeFilter === 'all'} 
            onClick={() => { setTypeFilter('all'); setCurrentPage(1); }}
          >
            Tous types
          </FilterChip>
          <FilterChip 
            $active={typeFilter === 'Presidentielle'} 
            onClick={() => { setTypeFilter('Presidentielle'); setCurrentPage(1); }}
          >
            Presidentielle
          </FilterChip>
          <FilterChip 
            $active={typeFilter === 'Legislative'} 
            onClick={() => { setTypeFilter('Legislative'); setCurrentPage(1); }}
          >
            Legislative
          </FilterChip>
          <FilterChip 
            $active={typeFilter === 'Municipale'} 
            onClick={() => { setTypeFilter('Municipale'); setCurrentPage(1); }}
          >
            Municipale
          </FilterChip>
          <FilterChip 
            $active={typeFilter === 'Regionale'} 
            onClick={() => { setTypeFilter('Regionale'); setCurrentPage(1); }}
          >
            Regionale
          </FilterChip>
        </Filters>
        <Grid $viewMode={viewMode}>
          {paginatedElections.map((election) => {
            const canVote = election.status === 'live' && !election.hasVoted;
            return (
              <Card key={election.id} $status={election.status}>
                <CardHeader>
                  <CardTitle>{election.title}</CardTitle>
                  <StatusPill $tone={election.status}>{getStatusLabel(election.status)}</StatusPill>
                </CardHeader>
                <MetaGrid>
                  <CardMeta>Type: {election.type}</CardMeta>
                  <CardMeta>Region: {election.region}</CardMeta>
                  <CardMeta>Candidats: {election.candidateCount}</CardMeta>
                  <CardMeta>Participation: {election.participation}%</CardMeta>
                  <CardMeta style={{ gridColumn: '1 / -1' }}>
                    Periode: {election.start} - {election.end}
                  </CardMeta>
                  <CardMeta style={{ gridColumn: '1 / -1', marginTop: '0.25rem' }}>
                    <span style={{ 
                      color: election.hasVoted ? '#1a5a33' : '#8a5a10',
                      fontWeight: 600 
                    }}>
                      {election.hasVoted ? '✓ Vous avez vote' : '○ Pas encore vote'}
                    </span>
                  </CardMeta>
                </MetaGrid>
                {election.status !== 'scheduled' && (
                  <Progress>
                    <ProgressFill $value={election.participation} />
                  </Progress>
                )}
                <ActionRow>
                  <GhostButton to="/citoyen/elections/detail">Details</GhostButton>
                  {canVote ? <ActionButton to="/citoyen/vote">Voter</ActionButton> : null}
                  {election.resultsAvailable ? <GhostButton to="/citoyen/resultats">Resultats</GhostButton> : null}
                </ActionRow>
              </Card>
            );
          })}
        </Grid>
        <Pagination>
          <PageButton 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Precedent
          </PageButton>
          {[...Array(totalPages)].map((_, index) => (
            <PageButton 
              key={index + 1}
              $active={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
          <PageButton 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </PageButton>
        </Pagination>
      </Panel>
    </AppLayout>
  );
};

export default CitizenElections;
