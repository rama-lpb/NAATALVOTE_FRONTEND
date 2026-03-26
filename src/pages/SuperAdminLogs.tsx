import styled from 'styled-components';
import { useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import mockData from '../data/mockData.json';

const LayoutGrid = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterLeft = styled.div`
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
  font-size: 0.85rem;
  color: #22312a;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  min-width: 200px;
  &:focus { border-color: rgba(31, 90, 51, 0.45); box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.1); }
`;

const TypeSelect = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.85rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #22312a;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  cursor: pointer;
`;

const ExportBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border-radius: 10px;
  border: 1px solid rgba(31, 90, 51, 0.2);
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.14); }
`;

const ImmutableBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(38, 76, 140, 0.08);
  color: rgba(38, 76, 140, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  border: 1px solid rgba(38, 76, 140, 0.18);
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 0;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 100px 140px 1fr 140px 90px;
  gap: 0.8rem;
  padding: 0.75rem 1.3rem;
  background: rgba(31, 90, 51, 0.04);
  border-bottom: 1px solid rgba(31, 90, 51, 0.1);
`;

const TH = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgba(31, 90, 51, 0.6);
`;

const LogRows = styled.div`
  display: grid;
`;

const LogRow = styled.div`
  display: grid;
  grid-template-columns: 100px 140px 1fr 140px 90px;
  gap: 0.8rem;
  align-items: center;
  padding: 0.8rem 1.3rem;
  border-bottom: 1px solid rgba(31, 90, 51, 0.06);
  transition: background 0.15s;
  &:last-child { border-bottom: none; }
  &:hover { background: rgba(31, 90, 51, 0.025); }
`;

const LogType = styled.span<{ $type: string }>`
  padding: 0.22rem 0.6rem;
  border-radius: 8px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  background: ${({ $type }) =>
    $type === 'CONNEXION' ? 'rgba(38, 76, 140, 0.1)' :
    $type === 'VOTE' ? 'rgba(31, 90, 51, 0.1)' :
    $type === 'SUSPENSION' ? 'rgba(176, 58, 46, 0.1)' :
    $type === 'MODIFICATION' ? 'rgba(138, 90, 16, 0.1)' :
    'rgba(91, 95, 101, 0.1)'};
  color: ${({ $type }) =>
    $type === 'CONNEXION' ? 'rgba(38, 76, 140, 0.85)' :
    $type === 'VOTE' ? 'rgba(31, 90, 51, 0.85)' :
    $type === 'SUSPENSION' ? 'rgba(176, 58, 46, 0.85)' :
    $type === 'MODIFICATION' ? 'rgba(138, 90, 16, 0.85)' :
    'rgba(91, 95, 101, 0.75)'};
`;

const LogUser = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: #22312a;
`;

const LogDesc = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #4a6a57;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogTime = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #8a9a90;
`;

const HashBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  color: rgba(31, 90, 51, 0.7);
  background: rgba(31, 90, 51, 0.06);
  border-radius: 6px;
  padding: 0.15rem 0.4rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  cursor: default;
  i { font-size: 0.7rem; }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  padding: 0.8rem 1.3rem;
  border-top: 1px solid rgba(31, 90, 51, 0.08);
`;

const PageBtn = styled.button<{ $active?: boolean }>`
  border: 1px solid rgba(31, 90, 51, 0.2);
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.55)' : 'rgba(31, 90, 51, 0.06)'};
  color: ${({ $active }) => $active ? '#fff' : 'rgba(31, 90, 51, 0.85)'};
  border-radius: 8px;
  padding: 0.28rem 0.6rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
`;

const PENDING_COUNT = (mockData as any).suspensions.filter((s: any) => s.statut === 'EN_ATTENTE').length;
const navItems = [
  { label: 'Console systeme', to: '/superadmin/console' },
  { label: 'Logs immuables', to: '/superadmin/logs' },
  { label: 'Exports audit', to: '/superadmin/export' },
  { label: 'Utilisateurs', to: '/superadmin/utilisateurs' },
  { label: 'Suspensions', to: '/superadmin/suspensions', badge: PENDING_COUNT },
];

const logs = [
  { id: 1, type: 'CONNEXION', user: 'Admin Ndiaye', desc: 'Connexion reussie depuis Dakar', time: '09/03 11:42', hash: 'a7f2c' },
  { id: 2, type: 'VOTE', user: 'Token anonyme', desc: 'Vote enregistre — Presidentielle 2025', time: '09/03 11:40', hash: 'b3d9e' },
  { id: 3, type: 'SUSPENSION', user: 'SuperAdmin', desc: 'Validation suspension CNI 2349 — Fraude confirmee', time: '09/03 11:20', hash: 'c1f6a' },
  { id: 4, type: 'CONNEXION', user: 'Op. Diallo', desc: 'Connexion reussie depuis Thies', time: '09/03 09:14', hash: 'd4e8b' },
  { id: 5, type: 'MODIFICATION', user: 'Admin Ndiaye', desc: 'Modification candidat Amadou Diop — Biographie mise a jour', time: '09/03 08:55', hash: 'e7a3c' },
  { id: 6, type: 'VOTE', user: 'Token anonyme', desc: 'Vote enregistre — Legislatives Dakar', time: '09/03 08:42', hash: 'f2b1d' },
  { id: 7, type: 'CONNEXION', user: 'Admin Sow', desc: 'Echec connexion — Mot de passe incorrect', time: '08/03 17:35', hash: 'g5c4e' },
  { id: 8, type: 'SUSPENSION', user: 'Op. Niane', desc: 'Recommandation suspension CNI 8841 soumise', time: '08/03 16:10', hash: 'h8f2a' },
];

const types = ['TOUS', 'CONNEXION', 'VOTE', 'SUSPENSION', 'MODIFICATION'];

const SuperAdminLogs = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('TOUS');

  const filtered = logs.filter((l) => {
    const matchType = typeFilter === 'TOUS' || l.type === typeFilter;
    const matchSearch = l.desc.toLowerCase().includes(search.toLowerCase()) || l.user.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <AppLayout
      role="Super Admin"
      title="Logs immuables"
      subtitle="Traçabilite complete de chaque action sensible. Lecture seule — append-only."
      navItems={navItems}
    >
      <LayoutGrid>
        <ControlBar>
          <FilterLeft>
            <SearchInput
              placeholder="Rechercher dans les logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <TypeSelect value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </TypeSelect>
          </FilterLeft>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ImmutableBadge><i className="bi bi-lock-fill" />Lecture seule</ImmutableBadge>
            <ExportBtn><i className="bi bi-download" />Exporter</ExportBtn>
          </div>
        </ControlBar>

        <Panel>
          <TableHeader>
            <TH>Type</TH>
            <TH>Utilisateur</TH>
            <TH>Description</TH>
            <TH>Horodatage</TH>
            <TH>Signature</TH>
          </TableHeader>
          <LogRows>
            {filtered.map((log) => (
              <LogRow key={log.id}>
                <div><LogType $type={log.type}>{log.type}</LogType></div>
                <LogUser>{log.user}</LogUser>
                <LogDesc title={log.desc}>{log.desc}</LogDesc>
                <LogTime>{log.time}</LogTime>
                <HashBadge title="Hash HMAC-SHA256 verifie"><i className="bi bi-check2" />{log.hash}</HashBadge>
              </LogRow>
            ))}
          </LogRows>
          <Pagination>
            <PageBtn>‹</PageBtn>
            <PageBtn $active>1</PageBtn>
            <PageBtn>2</PageBtn>
            <PageBtn>3</PageBtn>
            <PageBtn>›</PageBtn>
          </Pagination>
        </Panel>
      </LayoutGrid>
    </AppLayout>
  );
};

export default SuperAdminLogs;
