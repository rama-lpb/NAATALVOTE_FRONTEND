import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { api } from '../services/api';

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

const ROLE_COLORS: Record<string, string> = {
  SUPERADMIN: 'rgba(176, 58, 46, 0.7)',
  ADMIN: 'rgba(38, 76, 140, 0.7)',
  OPERATEUR: 'rgba(138, 90, 16, 0.7)',
  CITOYEN: 'rgba(91, 95, 101, 0.5)',
};

const fmtHorodatage = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    + ' ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

/* ─── Component ────────────────────────────────────────── */
const SuperAdminUserLogs = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [apiUser, setApiUser] = useState<{ id: string; nom: string; prenom: string; email: string; roles: string[] } | null>(null);
  const [allLogs, setAllLogs] = useState<{
    id: string; type_action: string; utilisateur_id: string;
    description: string; horodatage: string; adresse_ip: string;
    signature_cryptographique: string;
  }[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (!userId) { setLoadingUser(false); return; }
    api.superadmin.listUsers()
      .then(users => setApiUser(users.find(u => u.id === userId) ?? null))
      .catch(() => setApiUser(null))
      .finally(() => setLoadingUser(false));
    api.superadmin.listLogs()
      .then(logs => setAllLogs(logs.filter(l => l.utilisateur_id === userId)))
      .catch(() => setAllLogs([]))
      .finally(() => setLoadingLogs(false));
    api.superadmin.listSuspensions()
      .then(s => setPendingCount(s.filter(x => x.statut === 'EN_ATTENTE').length))
      .catch(() => {});
  }, [userId]);

  const navItems = [
    { label: 'Console systeme', to: '/superadmin/console' },
    { label: 'Logs immuables', to: '/superadmin/logs' },
    { label: 'Exports audit', to: '/superadmin/export' },
    { label: 'Utilisateurs', to: '/superadmin/utilisateurs' },
    { label: 'Suspensions', to: '/superadmin/suspensions', badge: pendingCount },
  ];

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('TOUS');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);

  const loading = loadingUser || loadingLogs;

  const filtered = allLogs.filter((l) => {
    const matchType = typeFilter === 'TOUS' || l.type_action === typeFilter;
    const matchSearch = l.description.toLowerCase().includes(search.toLowerCase())
      || l.adresse_ip.includes(search);
    const horoDate = l.horodatage.slice(0, 10);
    const matchFrom = !dateFrom || horoDate >= dateFrom;
    const matchTo   = !dateTo   || horoDate <= dateTo;
    return matchType && matchSearch && matchFrom && matchTo;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const resetPage = () => setPage(1);

  if (!loading && !apiUser) {
    return (
      <AppLayout role="Super Admin" title="Logs utilisateur" subtitle="" navItems={navItems}>
        <EmptyState>Utilisateur introuvable.</EmptyState>
      </AppLayout>
    );
  }

  const primaryRole = apiUser ? (['SUPERADMIN','ADMIN','OPERATEUR'].find(r => apiUser.roles.includes(r)) ?? apiUser.roles[0] ?? 'CITOYEN') : '';
  const initials = apiUser ? `${apiUser.prenom.charAt(0)}${apiUser.nom.charAt(0)}`.toUpperCase() : '??';
  const displayName = apiUser ? `${apiUser.prenom} ${apiUser.nom}` : '…';

  const statsByType = LOG_TYPES.slice(1).map((t) => ({
    label: t,
    count: allLogs.filter((l) => l.type_action === t).length,
  })).filter((s) => s.count > 0);

  return (
    <AppLayout
      role="Super Admin"
      title={`Logs — ${displayName}`}
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
          <Avatar $color={ROLE_COLORS[primaryRole] ?? 'rgba(91,95,101,0.5)'}>{initials}</Avatar>
          <UserMeta>
            <UserName>{displayName}</UserName>
            <UserSub>{apiUser?.email ?? '…'}</UserSub>
          </UserMeta>
          <RoleBadge $role={primaryRole}>{primaryRole}</RoleBadge>
          <StatPills>
            <StatPill><i className="bi bi-journal-text" /> {allLogs.length} actions totales</StatPill>
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

          {loading ? (
            <EmptyState>Chargement…</EmptyState>
          ) : paginated.length === 0 ? (
            <EmptyState>Aucun log ne correspond aux filtres appliques.</EmptyState>
          ) : (
            paginated.map((log) => (
              <LogRow key={log.id}>
                <div><LogType $type={log.type_action}>{log.type_action}</LogType></div>
                <LogDesc title={log.description}>{log.description}</LogDesc>
                <LogIP>{log.adresse_ip}</LogIP>
                <LogTime>{fmtHorodatage(log.horodatage)}</LogTime>
                <HashBadge title={log.signature_cryptographique}>
                  <i className="bi bi-check2" />{log.signature_cryptographique.slice(0, 6)}
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
