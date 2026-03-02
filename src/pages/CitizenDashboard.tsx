import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';

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
  font-weight: 600;
  color: #22312a;
  font-size: 1.15rem;
`;

const HelperText = styled.p`
  margin: 0.2rem 0 0;
  color: #6b6f72;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
`;

const Filter = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  background: rgba(255, 255, 255, 0.85);
  color: #22312a;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div<{ $accent: string }>`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 0.9rem 1rem;
  box-shadow: 0 14px 26px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  border-left: 5px solid ${({ $accent }) => $accent};
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
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const CardTitle = styled.h2`
  margin: 0 0 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.8rem;
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
  padding: 0.4rem 0.7rem;
  border-radius: 10px;
  background: rgba(31, 90, 51, 0.78);
  border: 1px solid rgba(31, 90, 51, 0.5);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  min-width: 84px;
  text-align: center;
  margin-left: 0.2rem;
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

const Chip = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.2);
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.9);
  border-radius: 999px;
  padding: 0.35rem 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
`;

const ElectionList = styled.div`
  display: grid;
  gap: 0.8rem;
  margin-top: 0.8rem;
`;

const ElectionRow = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 0.9fr 0.7fr 0.9fr;
  gap: 0.8rem;
  align-items: center;
  padding: 1.35rem 1rem;
  min-height: 88px;
  border-radius: 14px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  background: rgba(255, 255, 255, 0.92);
`;

const RowTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
`;

const RowMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.88rem;
  align-self: center;
`;

const RegionMeta = styled(RowMeta)`
  justify-self: center;
  text-align: center;
`;

const Tag = styled.span<{ $tone: 'live' | 'scheduled' | 'closed' }>`
  justify-self: center;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: ${({ $tone }) =>
    $tone === 'live' ? 'rgba(31, 90, 51, 0.8)' : $tone === 'scheduled' ? 'rgba(138, 90, 16, 0.8)' : 'rgba(91, 95, 101, 0.85)'};
  background: ${({ $tone }) =>
    $tone === 'live'
      ? 'rgba(31, 90, 51, 0.12)'
      : $tone === 'scheduled'
        ? 'rgba(138, 90, 16, 0.12)'
        : 'rgba(91, 95, 101, 0.12)'};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.7rem;
`;

const NewBadge = styled(Badge)`
  background: rgba(138, 90, 16, 0.12);
  color: rgba(138, 90, 16, 0.85);
`;

const DetailButton = styled(Link)`
  text-decoration: none;
  padding: 0.4rem 0.75rem;
  border-radius: 10px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.25);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.85rem;
  min-width: 80px;
  text-align: center;
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

  const elections = [
    {
      id: 'pres-2025',
      title: 'Presidentielle 2025',
      schedule: "Ouverte jusqu'au 12/03/2025",
      region: 'National',
      status: 'live' as const,
      hasVoted: false,
      isNew: true,
    },
    {
      id: 'leg-2025-dkr',
      title: 'Legislatives Dakar',
      schedule: 'Debut le 20/03/2025',
      region: 'Dakar',
      status: 'scheduled' as const,
      hasVoted: false,
      isNew: false,
    },
    {
      id: 'mun-2025-pk',
      title: 'Municipales Pikine',
      schedule: 'Cloturee le 02/02/2025',
      region: 'Pikine',
      status: 'closed' as const,
      hasVoted: true,
      isNew: false,
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
          <Filter>
            <option>Scrutins actifs</option>
            <option>Scrutins programmes</option>
            <option>Scrutins clos</option>
          </Filter>
        </Greeting>

        <Stats>
          <StatCard $accent="rgba(31, 90, 51, 0.6)">
            <StatLabel>Elections en cours</StatLabel>
            <StatValue>2</StatValue>
          </StatCard>
          <StatCard $accent="rgba(31, 90, 51, 0.6)">
            <StatLabel>Statut electeur</StatLabel>
            <StatValue>Eligible</StatValue>
          </StatCard>
          <StatCard $accent="rgba(138, 90, 16, 0.6)">
            <StatLabel>Participation nationale</StatLabel>
            <StatValue>64%</StatValue>
          </StatCard>
        </Stats>

        <Card>
          <FilterRow>
            <CardTitle>Scrutins principaux</CardTitle>
            <FilterChips>
              <Chip>Tous</Chip>
              <Chip>En cours</Chip>
              <Chip>Programmes</Chip>
              <Chip>Clotures</Chip>
            </FilterChips>
          </FilterRow>
          <ElectionList>
            {elections.map((election) => {
              const canVote = election.status === 'live' && !election.hasVoted;
              return (
                <ElectionRow key={election.id}>
                  <div>
                    <RowTitle>{election.title}</RowTitle>
                    <MetaRow>
                      <RowMeta>{election.schedule}</RowMeta>
                      <Badge>{election.hasVoted ? 'Deja vote' : 'Pas encore vote'}</Badge>
                      {election.isNew ? <NewBadge>Nouveau</NewBadge> : null}
                    </MetaRow>
                  </div>
                  <RegionMeta>{election.region}</RegionMeta>
                  <Tag $tone={election.status}>{getStatusLabel(election.status)}</Tag>
                  <RowActions>
                    {canVote ? <RowActionButton to="/citoyen/vote">Voter</RowActionButton> : null}
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
