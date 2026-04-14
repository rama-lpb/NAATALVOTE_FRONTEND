import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { AppLayout } from '../components/AppLayout';
import { api } from '../services/api';

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
    $type === 'SUSPENSION' ? 'rgba(176, 58, 46, 0.6)' :
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

const types = ['TOUS', 'CONNEXION', 'VOTE', 'SUSPENSION', 'MODIFICATION', 'EXPORT', 'CREATION'];

const fmtHorodatage = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    + ' ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const SuperAdminLogs = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('TOUS');
  const [logs, setLogs] = useState<{
    id: string; type_action: string; utilisateur_id: string;
    description: string; horodatage: string; adresse_ip: string;
    signature_cryptographique: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    api.superadmin.listLogs()
      .then(setLogs)
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
    api.superadmin.listSuspensions()
      .then(s => setPendingCount(s.filter(x => x.statut === 'EN_ATTENTE').length))
      .catch(() => {});
  }, []);

  const navItems = [
    { label: 'Console systeme', to: '/superadmin/console' },
    { label: 'Logs immuables', to: '/superadmin/logs' },
    { label: 'Exports audit', to: '/superadmin/export' },
    { label: 'Utilisateurs', to: '/superadmin/utilisateurs' },
    { label: 'Suspensions', to: '/superadmin/suspensions', badge: pendingCount },
  ];

  const filtered = logs.filter((l) => {
    const matchType = typeFilter === 'TOUS' || l.type_action === typeFilter;
    const matchSearch = l.description.toLowerCase().includes(search.toLowerCase())
      || l.utilisateur_id.toLowerCase().includes(search.toLowerCase());
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
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Poppins, sans-serif', color: '#8a9a90' }}>Chargement…</div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Poppins, sans-serif', color: '#8a9a90' }}>Aucun log trouve.</div>
            ) : filtered.map((log) => (
              <LogRow key={log.id}>
                <div><LogType $type={log.type_action}>{log.type_action}</LogType></div>
                <LogUser>{log.utilisateur_id.slice(0, 8)}…</LogUser>
                <LogDesc title={log.description}>{log.description}</LogDesc>
                <LogTime>{fmtHorodatage(log.horodatage)}</LogTime>
                <HashBadge title={log.signature_cryptographique}>
                  <i className="bi bi-check2" />
                  {log.signature_cryptographique.slice(0, 5)}
                </HashBadge>
              </LogRow>
            ))}
          </LogRows>
        </Panel>
      </LayoutGrid>
    </AppLayout>
  );
};

export default SuperAdminLogs;
