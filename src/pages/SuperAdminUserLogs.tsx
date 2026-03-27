import styled from 'styled-components';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import mockData from '../data/mockData.json';

/* ─── Nav ─────────────────────────────────────────────── */
const PENDING_COUNT = (mockData as any).suspensions.filter((s: any) => s.statut === 'EN_ATTENTE').length;
const navItems = [
  { label: 'Console systeme', to: '/superadmin/console' },
  { label: 'Logs immuables', to: '/superadmin/logs' },
  { label: 'Exports audit', to: '/superadmin/export' },
  { label: 'Utilisateurs', to: '/superadmin/utilisateurs' },
  { label: 'Suspensions', to: '/superadmin/suspensions', badge: PENDING_COUNT },
];

/* ─── Mock data ────────────────────────────────────────── */
const users: Record<string, { initials: string; name: string; email: string; role: string; color: string }> = {
  u1: { initials: 'AN', name: 'Awa Ndiaye', email: 'a.ndiaye@naatal.sn', role: 'Administrateur', color: 'rgba(38,76,140,0.7)' },
  u2: { initials: 'MD', name: 'Mamadou Diallo', email: 'm.diallo@naatal.sn', role: 'Operateur', color: 'rgba(138,90,16,0.7)' },
  u3: { initials: 'KS', name: 'Kadiatou Sow', email: 'k.sow@naatal.sn', role: 'Administrateur', color: 'rgba(38,76,140,0.6)' },
  u4: { initials: 'ON', name: 'Omar Niane', email: 'o.niane@naatal.sn', role: 'Operateur', color: 'rgba(91,95,101,0.5)' },
};

type LogType = 'CONNEXION' | 'VOTE' | 'SUSPENSION' | 'MODIFICATION' | 'EXPORT' | 'CREATION';

interface LogEntry {
  id: number;
  type: LogType;
  desc: string;
  ip: string;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:MM
  hash: string;
}

const allLogs: Record<string, LogEntry[]> = {
  u1: [
    { id: 1,  type: 'CONNEXION',    desc: 'Connexion reussie depuis Dakar — Chrome 121',           ip: '192.168.1.10', date: '2026-03-09', time: '09:14', hash: 'a7f2c1' },
    { id: 2,  type: 'MODIFICATION', desc: 'Modification candidat Amadou Diop — Biographie',        ip: '192.168.1.10', date: '2026-03-09', time: '08:55', hash: 'b3d9e4' },
    { id: 3,  type: 'CREATION',     desc: 'Creation election Presidentielle 2026',                  ip: '192.168.1.10', date: '2026-03-08', time: '16:22', hash: 'c1f6a2' },
    { id: 4,  type: 'EXPORT',       desc: 'Export rapport CSV — Elections legislatives',            ip: '192.168.1.10', date: '2026-03-08', time: '15:47', hash: 'd4e8b7' },
    { id: 5,  type: 'MODIFICATION', desc: 'Mise a jour statut election Regionales 2026',           ip: '192.168.1.10', date: '2026-03-07', time: '11:30', hash: 'e7a3c9' },
    { id: 6,  type: 'CONNEXION',    desc: 'Connexion reussie depuis Dakar — Firefox 122',          ip: '192.168.1.10', date: '2026-03-07', time: '09:05', hash: 'f2b1d5' },
    { id: 7,  type: 'CREATION',     desc: 'Ajout candidat Mariama Ba — Presidentielle',            ip: '192.168.1.10', date: '2026-03-06', time: '14:18', hash: 'g5c4e3' },
    { id: 8,  type: 'EXPORT',       desc: 'Export audit PDF — Suspensions mars 2026',              ip: '192.168.1.10', date: '2026-03-05', time: '17:02', hash: 'h8f2a6' },
    { id: 9,  type: 'CONNEXION',    desc: 'Echec connexion — Mot de passe incorrect',              ip: '41.82.14.7',   date: '2026-03-05', time: '08:44', hash: 'i1e7b0' },
    { id: 10, type: 'MODIFICATION', desc: 'Changement photo candidat Ibrahima Sarr',               ip: '192.168.1.10', date: '2026-03-04', time: '10:33', hash: 'j4a9c2' },
    { id: 11, type: 'CONNEXION',    desc: 'Connexion reussie depuis Dakar — Chrome 121',           ip: '192.168.1.10', date: '2026-03-04', time: '09:00', hash: 'k7d6e1' },
    { id: 12, type: 'CREATION',     desc: 'Creation liste electorale — Dakar Plateau',             ip: '192.168.1.10', date: '2026-03-03', time: '13:55', hash: 'l0f3b8' },
  ],
  u2: [
    { id: 1,  type: 'CONNEXION',    desc: 'Connexion reussie depuis Thies — Chrome 120',           ip: '10.0.0.22',    date: '2026-03-09', time: '08:02', hash: 'm3e1c4' },
    { id: 2,  type: 'SUSPENSION',   desc: 'Recommandation suspension CNI 2349 soumise',            ip: '10.0.0.22',    date: '2026-03-09', time: '07:55', hash: 'n6b8a0' },
    { id: 3,  type: 'SUSPENSION',   desc: 'Recommandation suspension CNI 8841 soumise',            ip: '10.0.0.22',    date: '2026-03-08', time: '16:10', hash: 'o9d5e7' },
    { id: 4,  type: 'CONNEXION',    desc: 'Connexion reussie depuis Thies — Firefox 121',          ip: '10.0.0.22',    date: '2026-03-08', time: '08:30', hash: 'p2f2c3' },
    { id: 5,  type: 'EXPORT',       desc: 'Export rapport fraudes — Semaine 10',                   ip: '10.0.0.22',    date: '2026-03-07', time: '17:45', hash: 'q5a7b1' },
    { id: 6,  type: 'SUSPENSION',   desc: 'Recommandation suspension CNI 1122 soumise',            ip: '10.0.0.22',    date: '2026-03-07', time: '14:22', hash: 'r8c4d9' },
    { id: 7,  type: 'CONNEXION',    desc: 'Connexion reussie depuis Thies — Chrome 120',           ip: '10.0.0.22',    date: '2026-03-07', time: '08:15', hash: 's1e1f6' },
    { id: 8,  type: 'SUSPENSION',   desc: 'Recommandation suspension CNI 5543 soumise',            ip: '10.0.0.22',    date: '2026-03-06', time: '11:40', hash: 't4b8a2' },
    { id: 9,  type: 'CONNEXION',    desc: 'Echec connexion — Session expiree',                     ip: '10.0.0.22',    date: '2026-03-06', time: '09:58', hash: 'u7d5c8' },
  ],
  u3: [
    { id: 1,  type: 'CONNEXION',    desc: 'Connexion reussie depuis Saint-Louis — Safari 17',      ip: '172.16.0.5',   date: '2026-03-08', time: '17:30', hash: 'v0f2e3' },
    { id: 2,  type: 'MODIFICATION', desc: 'Mise a jour biographie candidat Oumar Kane',            ip: '172.16.0.5',   date: '2026-03-08', time: '17:10', hash: 'w3a9b5' },
    { id: 3,  type: 'CREATION',     desc: 'Creation election Municipales Saint-Louis',             ip: '172.16.0.5',   date: '2026-03-08', time: '15:00', hash: 'x6c6d1' },
    { id: 4,  type: 'CONNEXION',    desc: 'Connexion reussie depuis Saint-Louis — Chrome 121',     ip: '172.16.0.5',   date: '2026-03-07', time: '09:22', hash: 'y9e3a7' },
    { id: 5,  type: 'EXPORT',       desc: 'Export rapport resultats Municipales 2024',             ip: '172.16.0.5',   date: '2026-03-06', time: '16:05', hash: 'z2b0c4' },
    { id: 6,  type: 'MODIFICATION', desc: 'Correction date election Regionales 2026',              ip: '172.16.0.5',   date: '2026-03-05', time: '10:48', hash: 'aa5d7e0' },
    { id: 7,  type: 'CONNEXION',    desc: 'Connexion reussie depuis Saint-Louis — Firefox 122',    ip: '172.16.0.5',   date: '2026-03-04', time: '08:50', hash: 'ab8f4b3' },
  ],
  u4: [
    { id: 1,  type: 'CONNEXION',    desc: 'Connexion reussie depuis Ziguinchor — Chrome 119',      ip: '10.10.5.88',   date: '2026-03-07', time: '11:50', hash: 'ac1a1c6' },
    { id: 2,  type: 'SUSPENSION',   desc: 'Recommandation suspension CNI 3310 soumise',            ip: '10.10.5.88',   date: '2026-03-07', time: '11:30', hash: 'ad4c8d2' },
    { id: 3,  type: 'CONNEXION',    desc: 'Connexion reussie depuis Ziguinchor — Chrome 119',      ip: '10.10.5.88',   date: '2026-03-06', time: '09:15', hash: 'ae7e5e8' },
    { id: 4,  type: 'SUSPENSION',   desc: 'Recommandation suspension CNI 9902 soumise',            ip: '10.10.5.88',   date: '2026-03-05', time: '14:42', hash: 'af0b2f4' },
    { id: 5,  type: 'EXPORT',       desc: 'Export rapport fraudes — Semaine 9',                    ip: '10.10.5.88',   date: '2026-03-04', time: '17:30', hash: 'ag3d9a0' },
    { id: 6,  type: 'CONNEXION',    desc: 'Echec connexion — IP non autorisee',                    ip: '197.55.10.3',  date: '2026-03-04', time: '08:00', hash: 'ah6f6b6' },
  ],
};

const LOG_TYPES = ['TOUS', 'CONNEXION', 'VOTE', 'SUSPENSION', 'MODIFICATION', 'EXPORT', 'CREATION'];
const PAGE_SIZE = 6;

/* ─── Styled components ────────────────────────────────── */
const LayoutGrid = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const BackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  border-radius: 10px;
  border: 1px solid rgba(31, 90, 51, 0.18);
  background: rgba(31, 90, 51, 0.06);
  color: rgba(31, 90, 51, 0.8);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.12); }
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.3rem;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 16px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  box-shadow: 0 4px 12px rgba(12, 24, 18, 0.06);
`;

const Avatar = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  flex-shrink: 0;
`;

const UserMeta = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  color: #1a2e20;
  font-size: 1rem;
`;

const UserSub = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #8a9a90;
  font-size: 0.78rem;
`;

const RoleBadge = styled.span<{ $role: string }>`
  padding: 0.22rem 0.7rem;
  border-radius: 8px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  background: ${({ $role }) =>
    $role === 'Administrateur' ? 'rgba(38,76,140,0.1)' : 'rgba(138,90,16,0.1)'};
  color: ${({ $role }) =>
    $role === 'Administrateur' ? 'rgba(38,76,140,0.85)' : 'rgba(138,90,16,0.85)'};
`;

const StatPills = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const StatPill = styled.div`
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.06);
  border: 1px solid rgba(31, 90, 51, 0.14);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  color: rgba(31, 90, 51, 0.75);
  font-weight: 500;
`;

const ControlBar = styled.div`
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
  min-width: 220px;
  flex: 1;
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

const DateInput = styled.input`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.85rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #22312a;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  cursor: pointer;
  &:focus { border-color: rgba(31, 90, 51, 0.45); }
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
  margin-left: auto;
  &:hover { background: rgba(31, 90, 51, 0.14); }
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
  grid-template-columns: 120px 1fr 130px 110px 80px;
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

const LogRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 130px 110px 80px;
  gap: 0.8rem;
  align-items: center;
  padding: 0.85rem 1.3rem;
  border-bottom: 1px solid rgba(31, 90, 51, 0.06);
  transition: background 0.15s;
  &:last-child { border-bottom: none; }
  &:hover { background: rgba(31, 90, 51, 0.025); }
`;

const LogType = styled.span<{ $type: string }>`
  padding: 0.22rem 0.6rem;
  border-radius: 8px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  background: ${({ $type }) =>
    $type === 'CONNEXION'    ? 'rgba(38,76,140,0.1)'   :
    $type === 'VOTE'         ? 'rgba(31,90,51,0.1)'    :
    $type === 'SUSPENSION'   ? 'rgba(176,58,46,0.1)'   :
    $type === 'MODIFICATION' ? 'rgba(138,90,16,0.1)'   :
    $type === 'EXPORT'       ? 'rgba(91,50,140,0.1)'   :
    $type === 'CREATION'     ? 'rgba(20,110,90,0.1)'   :
    'rgba(91,95,101,0.1)'};
  color: ${({ $type }) =>
    $type === 'CONNEXION'    ? 'rgba(38,76,140,0.85)'  :
    $type === 'VOTE'         ? 'rgba(31,90,51,0.85)'   :
    $type === 'SUSPENSION'   ? 'rgba(176,58,46,0.75)'  :
    $type === 'MODIFICATION' ? 'rgba(138,90,16,0.85)'  :
    $type === 'EXPORT'       ? 'rgba(91,50,140,0.85)'  :
    $type === 'CREATION'     ? 'rgba(20,110,90,0.85)'  :
    'rgba(91,95,101,0.75)'};
`;

const LogDesc = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #4a6a57;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogIP = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 0.73rem;
  color: #8a9a90;
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
  font-size: 0.68rem;
  color: rgba(31, 90, 51, 0.7);
  background: rgba(31, 90, 51, 0.06);
  border-radius: 6px;
  padding: 0.15rem 0.4rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  cursor: default;
`;

const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #8a9a90;
  font-size: 0.88rem;
`;

const PaginationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.3rem;
  border-top: 1px solid rgba(31, 90, 51, 0.08);
`;

const PageInfo = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  color: #8a9a90;
`;

const PageButtons = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const PageBtn = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  border: 1px solid rgba(31, 90, 51, 0.2);
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.55)' : 'rgba(31, 90, 51, 0.06)'};
  color: ${({ $active }) => $active ? '#fff' : 'rgba(31, 90, 51, 0.85)'};
  border-radius: 8px;
  padding: 0.28rem 0.65rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ $disabled }) => $disabled ? 0.4 : 1};
  transition: all 0.15s;
  &:hover:not(:disabled) { background: ${({ $active }) => $active ? 'rgba(31,90,51,0.65)' : 'rgba(31,90,51,0.12)'}; }
`;

/* ─── Component ────────────────────────────────────────── */
const SuperAdminUserLogs = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const user = userId ? users[userId] : null;
  const logs = userId ? (allLogs[userId] ?? []) : [];

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('TOUS');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);

  const filtered = logs.filter((l) => {
    const matchType = typeFilter === 'TOUS' || l.type === typeFilter;
    const matchSearch = l.desc.toLowerCase().includes(search.toLowerCase()) ||
                        l.ip.includes(search);
    const matchFrom = !dateFrom || l.date >= dateFrom;
    const matchTo   = !dateTo   || l.date <= dateTo;
    return matchType && matchSearch && matchFrom && matchTo;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const resetPage = () => setPage(1);

  if (!user) {
    return (
      <AppLayout role="Super Admin" title="Logs utilisateur" subtitle="" navItems={navItems}>
        <EmptyState>Utilisateur introuvable.</EmptyState>
      </AppLayout>
    );
  }

  const statsByType = LOG_TYPES.slice(1).map((t) => ({
    label: t,
    count: logs.filter((l) => l.type === t).length,
  })).filter((s) => s.count > 0);

  return (
    <AppLayout
      role="Super Admin"
      title={`Logs — ${user.name}`}
      subtitle="Historique complet et immuable de toutes les actions de cet utilisateur."
      navItems={navItems}
    >
      <LayoutGrid>
        {/* Back */}
        <div>
          <BackBtn onClick={() => navigate('/superadmin/utilisateurs')}>
            <i className="bi bi-arrow-left" />Retour aux utilisateurs
          </BackBtn>
        </div>

        {/* User card */}
        <UserCard>
          <Avatar $color={user.color}>{user.initials}</Avatar>
          <UserMeta>
            <UserName>{user.name}</UserName>
            <UserSub>{user.email}</UserSub>
          </UserMeta>
          <RoleBadge $role={user.role}>{user.role === 'Administrateur' ? 'Admin' : 'Operateur'}</RoleBadge>
          <StatPills>
            <StatPill><i className="bi bi-journal-text" /> {logs.length} actions totales</StatPill>
            {statsByType.map((s) => (
              <StatPill key={s.label}>{s.label} : {s.count}</StatPill>
            ))}
          </StatPills>
        </UserCard>

        {/* Filters */}
        <ControlBar>
          <SearchInput
            placeholder="Rechercher dans les logs (description, IP…)"
            value={search}
            onChange={(e) => { setSearch(e.target.value); resetPage(); }}
          />
          <TypeSelect
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); resetPage(); }}
          >
            {LOG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </TypeSelect>
          <DateInput
            type="date"
            title="Du"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); resetPage(); }}
          />
          <DateInput
            type="date"
            title="Au"
            value={dateTo}
            onChange={(e) => { setDateTo(e.target.value); resetPage(); }}
          />
          <ExportBtn>
            <i className="bi bi-download" />Exporter
          </ExportBtn>
        </ControlBar>

        {/* Table */}
        <Panel>
          <TableHeader>
            <TH>Type</TH>
            <TH>Description</TH>
            <TH>Adresse IP</TH>
            <TH>Horodatage</TH>
            <TH>Signature</TH>
          </TableHeader>

          {paginated.length === 0 ? (
            <EmptyState>Aucun log ne correspond aux filtres appliques.</EmptyState>
          ) : (
            paginated.map((log) => (
              <LogRow key={log.id}>
                <div><LogType $type={log.type}>{log.type}</LogType></div>
                <LogDesc title={log.desc}>{log.desc}</LogDesc>
                <LogIP>{log.ip}</LogIP>
                <LogTime>{log.date.split('-').reverse().join('/')} {log.time}</LogTime>
                <HashBadge title="Hash HMAC-SHA256 verifie">
                  <i className="bi bi-check2" />{log.hash}
                </HashBadge>
              </LogRow>
            ))
          )}

          <PaginationRow>
            <PageInfo>
              {filtered.length === 0
                ? '0 resultat'
                : `${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(safePage * PAGE_SIZE, filtered.length)} sur ${filtered.length}`}
            </PageInfo>
            <PageButtons>
              <PageBtn
                $disabled={safePage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
              >‹</PageBtn>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <PageBtn key={n} $active={n === safePage} onClick={() => setPage(n)}>{n}</PageBtn>
              ))}
              <PageBtn
                $disabled={safePage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
              >›</PageBtn>
            </PageButtons>
          </PaginationRow>
        </Panel>
      </LayoutGrid>
    </AppLayout>
  );
};

export default SuperAdminUserLogs;
