import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';

const LayoutGrid = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div<{ $accent: string }>`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 16px;
  padding: 0.9rem 1.1rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  border-left: 5px solid ${({ $accent }) => $accent};
  box-shadow: 0 8px 18px rgba(12, 24, 18, 0.07);
`;

const StatLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b7a72;
  font-size: 0.83rem;
`;

const StatValue = styled.h3`
  margin: 0.3rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a2e20;
  font-size: 1.4rem;
  font-weight: 700;
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 1rem;
`;

const ToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  color: #22312a;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  min-width: 200px;
  &:focus { border-color: rgba(31, 90, 51, 0.45); box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.1); }
`;

const ElectionSelect = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  color: #22312a;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  cursor: pointer;
`;

const AddButton = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1.1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.85);
  color: #fff;
  border: 1px solid rgba(31, 90, 51, 0.6);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 3px 10px rgba(31, 90, 51, 0.2);
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.95); }
`;

const CandidateList = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const CandidateRow = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr auto auto auto;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(31, 90, 51, 0.1);
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover { box-shadow: 0 6px 18px rgba(12, 24, 18, 0.1); transform: translateY(-1px); }
`;

const CandAvatar = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  color: #fff;
`;

const CandInfo = styled.div``;

const CandName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1a2e20;
  font-size: 0.95rem;
`;

const CandMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b7a72;
  font-size: 0.8rem;
  margin-top: 0.1rem;
`;

const ElectionBadge = styled.span`
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.8);
  border: 1px solid rgba(31, 90, 51, 0.12);
  white-space: nowrap;
`;

const StatusBadge = styled.span<{ $status: 'active' | 'pending' | 'locked' }>`
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
  background: ${({ $status }) =>
    $status === 'active' ? 'rgba(31, 90, 51, 0.1)' :
    $status === 'pending' ? 'rgba(138, 90, 16, 0.1)' :
    'rgba(91, 95, 101, 0.1)'};
  color: ${({ $status }) =>
    $status === 'active' ? 'rgba(31, 90, 51, 0.85)' :
    $status === 'pending' ? 'rgba(138, 90, 16, 0.85)' :
    'rgba(91, 95, 101, 0.7)'};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const IconBtn = styled.button<{ $danger?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${({ $danger }) => $danger ? 'rgba(176, 58, 46, 0.2)' : 'rgba(31, 90, 51, 0.15)'};
  background: ${({ $danger }) => $danger ? 'rgba(176, 58, 46, 0.06)' : 'rgba(31, 90, 51, 0.06)'};
  color: ${({ $danger }) => $danger ? 'rgba(176, 58, 46, 0.8)' : 'rgba(31, 90, 51, 0.75)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  transition: all 0.2s;
  &:hover {
    background: ${({ $danger }) => $danger ? 'rgba(176, 58, 46, 0.12)' : 'rgba(31, 90, 51, 0.12)'};
  }
`;

const navItems = [
  { label: 'Tableau admin', to: '/admin/dashboard' },
  { label: 'Programmer election', to: '/admin/election/create' },
  { label: 'Gestion candidats', to: '/admin/candidats' },
  { label: 'Statistiques', to: '/admin/statistiques' },
  { label: 'Rapports', to: '/admin/rapports' },
];

const candidates = [
  { id: 'c1', initials: 'AD', name: 'Amadou Diop', party: 'Alliance Nouvelle Republique', election: 'Presidentielle 2025', status: 'active' as const, color: 'rgba(31, 90, 51, 0.7)' },
  { id: 'c2', initials: 'FS', name: 'Fatou Sow', party: 'Union Citoyenne', election: 'Presidentielle 2025', status: 'active' as const, color: 'rgba(38, 76, 140, 0.7)' },
  { id: 'c3', initials: 'CB', name: 'Cheikh Ba', party: 'Front Democratique', election: 'Legislatives Dakar', status: 'pending' as const, color: 'rgba(138, 90, 16, 0.7)' },
  { id: 'c4', initials: 'KN', name: 'Khadija Niane', party: 'Alliance Populaire', election: 'Legislatives Dakar', status: 'active' as const, color: 'rgba(91, 95, 101, 0.7)' },
  { id: 'c5', initials: 'OD', name: 'Omar Diouf', party: 'Bloc Citoyen', election: 'Municipales Pikine', status: 'locked' as const, color: 'rgba(31, 90, 51, 0.5)' },
];

const statusMap = { active: 'Actif', pending: 'En attente', locked: 'Verrouille' };

const AdminCandidates = () => {
  const [search, setSearch] = useState('');
  const [electionFilter, setElectionFilter] = useState('all');

  const filtered = candidates.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.party.toLowerCase().includes(search.toLowerCase());
    const matchElection = electionFilter === 'all' || c.election === electionFilter;
    return matchSearch && matchElection;
  });

  return (
    <AppLayout
      role="Administrateur"
      title="Gestion des candidats"
      subtitle="Ajoutez ou modifiez les candidats avant le demarrage d'une election."
      navItems={navItems}
      actions={<AddButton to="/admin/candidats/nouveau"><i className="bi bi-person-plus" />Ajouter candidat</AddButton>}
    >
      <LayoutGrid>
        <SummaryRow>
          <StatCard $accent="rgba(31, 90, 51, 0.6)">
            <StatLabel>Total candidats</StatLabel>
            <StatValue>5</StatValue>
          </StatCard>
          <StatCard $accent="rgba(31, 90, 51, 0.5)">
            <StatLabel>Actifs</StatLabel>
            <StatValue>3</StatValue>
          </StatCard>
          <StatCard $accent="rgba(138, 90, 16, 0.5)">
            <StatLabel>En attente</StatLabel>
            <StatValue>1</StatValue>
          </StatCard>
          <StatCard $accent="rgba(91, 95, 101, 0.4)">
            <StatLabel>Verrouilles</StatLabel>
            <StatValue>1</StatValue>
          </StatCard>
        </SummaryRow>

        <Panel>
          <ToolBar>
            <FilterRow>
              <SearchInput
                placeholder="Rechercher un candidat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ElectionSelect value={electionFilter} onChange={(e) => setElectionFilter(e.target.value)}>
                <option value="all">Toutes les elections</option>
                <option value="Presidentielle 2025">Presidentielle 2025</option>
                <option value="Legislatives Dakar">Legislatives Dakar</option>
                <option value="Municipales Pikine">Municipales Pikine</option>
              </ElectionSelect>
            </FilterRow>
            <AddButton to="/admin/candidats/nouveau">
              <i className="bi bi-person-plus" />
              Nouveau
            </AddButton>
          </ToolBar>

          <CandidateList>
            {filtered.map((c) => (
              <CandidateRow key={c.id}>
                <CandAvatar $color={c.color}>{c.initials}</CandAvatar>
                <CandInfo>
                  <CandName>{c.name}</CandName>
                  <CandMeta>{c.party}</CandMeta>
                </CandInfo>
                <ElectionBadge>{c.election}</ElectionBadge>
                <StatusBadge $status={c.status}>{statusMap[c.status]}</StatusBadge>
                <Actions>
                  <IconBtn title="Modifier" disabled={c.status === 'locked'}>
                    <i className="bi bi-pencil" />
                  </IconBtn>
                  <IconBtn $danger title="Supprimer" disabled={c.status === 'locked'}>
                    <i className="bi bi-trash" />
                  </IconBtn>
                </Actions>
              </CandidateRow>
            ))}
          </CandidateList>
        </Panel>
      </LayoutGrid>
    </AppLayout>
  );
};

export default AdminCandidates;
