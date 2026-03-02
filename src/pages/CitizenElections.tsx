import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';

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
  font-weight: 600;
`;

const Filters = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const FilterChip = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.2);
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  padding: 1rem 1.1rem;
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
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
`;

const StatusPill = styled.span<{ $tone: 'live' | 'scheduled' | 'closed' }>`
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
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
  background: rgba(31, 90, 51, 0.8);
  border: 1px solid rgba(31, 90, 51, 0.55);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
`;

const GhostButton = styled(Link)`
  text-decoration: none;
  padding: 0.5rem 0.9rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.25);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  margin-top: 1rem;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  border: 1px solid rgba(31, 90, 51, 0.2);
  background: ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(31, 90, 51, 0.08)')};
  color: ${({ $active }) => ($active ? '#ffffff' : 'rgba(31, 90, 51, 0.9)')};
  border-radius: 10px;
  padding: 0.35rem 0.7rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
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
            <SummaryValue>20/03/2025</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Taux moyen national</SummaryLabel>
            <SummaryValue>64%</SummaryValue>
          </SummaryCard>
        </SummaryRow>
        <HeaderRow>
          <Title>Liste des scrutins</Title>
          <Controls>
            <Search placeholder="Rechercher un scrutin" />
            <Select>
              <option>Trier: date de debut</option>
              <option>Trier: participation</option>
              <option>Trier: statut</option>
            </Select>
          </Controls>
        </HeaderRow>
        <Filters>
          <FilterChip>Toutes</FilterChip>
          <FilterChip>En cours</FilterChip>
          <FilterChip>Programmees</FilterChip>
          <FilterChip>Cloturees</FilterChip>
        </Filters>
        <Grid>
          {elections.map((election) => {
            const canVote = election.status === 'live' && !election.hasVoted;
            return (
              <Card key={election.id}>
                <CardHeader>
                  <CardTitle>{election.title}</CardTitle>
                  <StatusPill $tone={election.status}>{getStatusLabel(election.status)}</StatusPill>
                </CardHeader>
                <MetaGrid>
                  <CardMeta>Type: {election.type}</CardMeta>
                  <CardMeta>Region: {election.region}</CardMeta>
                  <CardMeta>
                    Periode: {election.start} - {election.end}
                  </CardMeta>
                  <CardMeta>Participation: {election.participation}%</CardMeta>
                </MetaGrid>
                <Progress>
                  <ProgressFill $value={election.participation} />
                </Progress>
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
          <PageButton>Precedent</PageButton>
          <PageButton>1</PageButton>
          <PageButton $active>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton>Suivant</PageButton>
        </Pagination>
      </Panel>
    </AppLayout>
  );
};

export default CitizenElections;
