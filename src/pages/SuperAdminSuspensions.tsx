import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { api } from '../services/api';

const LayoutGrid = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div<{ $accent: string }>`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 16px;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  border-left: 5px solid ${({ $accent }) => $accent};
  box-shadow: 0 8px 18px rgba(12, 24, 18, 0.07);
`;

const StatLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b7a72;
  font-size: 0.82rem;
`;

const StatValue = styled.h3`
  margin: 0.3rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a2e20;
  font-size: 1.4rem;
  font-weight: 700;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Chip = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.5)' : 'rgba(31, 90, 51, 0.18)'};
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.55)' : 'rgba(31, 90, 51, 0.06)'};
  color: ${({ $active }) => $active ? '#fff' : 'rgba(31, 90, 51, 0.8)'};
  border-radius: 999px;
  padding: 0.3rem 0.75rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 1.25fr) minmax(220px, 1.25fr) minmax(300px, 1.5fr) minmax(110px, 0.7fr) minmax(180px, 0.9fr);
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
  letter-spacing: 0.06em;
  color: rgba(31, 90, 51, 0.55);
`;

const SuspRow = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 1.25fr) minmax(220px, 1.25fr) minmax(300px, 1.5fr) minmax(110px, 0.7fr) minmax(180px, 0.9fr);
  gap: 0.8rem;
  align-items: start;
  padding: 0.9rem 1.3rem;
  border-bottom: 1px solid rgba(31, 90, 51, 0.06);
  transition: background 0.15s;
  &:last-child { border-bottom: none; }
  &:hover { background: rgba(31, 90, 51, 0.02); }
`;

const CitizenName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1a2e20;
  font-size: 0.88rem;
`;

const CitizenSub = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  color: #8a9a90;
  margin-top: 0.1rem;
`;

const OperatorInfo = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #4a6a57;
`;

const MotifBadge = styled.span`
  display: inline-block;
  width: 100%;
  padding: 0.22rem 0.6rem;
  border-radius: 8px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  background: rgba(176, 58, 46, 0.08);
  color: rgba(176, 58, 46, 0.6);
  white-space: normal;
  word-break: break-word;
  line-height: 1.35;
`;

const StatusBadge = styled.span<{ $status: 'pending' | 'approved' | 'rejected' }>`
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  background: ${({ $status }) =>
    $status === 'pending' ? 'rgba(138, 90, 16, 0.1)' :
    $status === 'approved' ? 'rgba(31, 90, 51, 0.1)' :
    'rgba(176, 58, 46, 0.1)'};
  color: ${({ $status }) =>
    $status === 'pending' ? 'rgba(138, 90, 16, 0.85)' :
    $status === 'approved' ? 'rgba(31, 90, 51, 0.85)' :
    'rgba(176, 58, 46, 0.6)'};
`;

const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const MenuRoot = styled.div`
  position: relative;
`;

const MenuTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid rgba(91, 95, 101, 0.2);
  background: rgba(91, 95, 101, 0.08);
  color: rgba(91, 95, 101, 0.78);
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: rgba(91, 95, 101, 0.14); }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.35rem);
  right: 0;
  z-index: 25;
  min-width: 150px;
  border-radius: 10px;
  border: 1px solid rgba(31, 90, 51, 0.14);
  background: #fff;
  box-shadow: 0 10px 20px rgba(12, 24, 18, 0.12);
  padding: 0.3rem;
  display: grid;
  gap: 0.2rem;
`;

const MenuItem = styled.button<{ $variant?: 'approve' | 'reject' | 'default' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0.42rem 0.55rem;
  border-radius: 8px;
  border: 1px solid transparent;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $variant }) =>
    $variant === 'approve' ? 'rgba(31, 90, 51, 0.1)' :
    $variant === 'reject' ? 'rgba(176, 58, 46, 0.1)' :
    'rgba(91, 95, 101, 0.08)'};
  color: ${({ $variant }) =>
    $variant === 'approve' ? 'rgba(31, 90, 51, 0.85)' :
    $variant === 'reject' ? 'rgba(176, 58, 46, 0.6)' :
    'rgba(91, 95, 101, 0.75)'};
  border-color: ${({ $variant }) =>
    $variant === 'approve' ? 'rgba(31, 90, 51, 0.2)' :
    $variant === 'reject' ? 'rgba(176, 58, 46, 0.2)' :
    'rgba(91, 95, 101, 0.15)'};
  &:hover { filter: brightness(1.1); }
`;

const Empty = styled.div`
  padding: 2rem;
  text-align: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #8a9a90;
  font-size: 0.9rem;
`;

type SuspStatus = 'pending' | 'approved' | 'rejected';
type FilterType = 'all' | SuspStatus;

const mapStatut = (statut: string): SuspStatus => {
  if (statut === 'EN_ATTENTE') return 'pending';
  if (statut === 'APPROUVE' || statut === 'APPROUVEE') return 'approved';
  if (statut === 'REJETE' || statut === 'REJETEE') return 'rejected';
  return 'pending';
};

const statusLabel: Record<SuspStatus, string> = { pending: 'En attente', approved: 'Approuve', rejected: 'Rejete' };
const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'Toutes' },
  { id: 'pending', label: 'En attente' },
  { id: 'approved', label: 'Approuvees' },
  { id: 'rejected', label: 'Rejetees' },
];

interface SuspRow {
  id: string;
  citoyenLabel: string;
  operateurLabel: string;
  motif: string;
  date: string;
  status: SuspStatus;
}

const SuperAdminSuspensions = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [rows, setRows] = useState<SuspRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.superadmin.listSuspensions(),
      api.superadmin.listUsers(),
    ]).then(([suspensions, users]) => {
      const findName = (id: string) => {
        const u = users.find(u => u.id === id);
        return u ? `${u.prenom} ${u.nom} (${u.cni})` : id.slice(0, 8) + '…';
      };
      setRows(suspensions.map(s => ({
        id: s.id,
        citoyenLabel: findName(s.citoyen_id),
        operateurLabel: findName(s.operateur_id),
        motif: s.motif,
        date: new Date(s.date_creation).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        status: mapStatut(s.statut),
      })));
    }).catch(() => setRows([])).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-susp-menu-root="true"]')) return;
      setOpenMenuId(null);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const filtered = rows.filter(s => filter === 'all' || s.status === filter);
  const countPending = rows.filter(s => s.status === 'pending').length;
  const countApproved = rows.filter(s => s.status === 'approved').length;
  const countRejected = rows.filter(s => s.status === 'rejected').length;

  const navItems = [
    { label: 'Console systeme', to: '/superadmin/console' },
    { label: 'Logs immuables', to: '/superadmin/logs' },
    { label: 'Exports audit', to: '/superadmin/export' },
    { label: 'Utilisateurs', to: '/superadmin/utilisateurs' },
    { label: 'Suspensions', to: '/superadmin/suspensions', badge: countPending },
  ];

  return (
    <AppLayout
      role="Super Admin"
      title="Validations de suspension"
      subtitle="Double validation des comptes suspects avant suspension effective."
      navItems={navItems}
    >
      <LayoutGrid>
        <SummaryRow>
          <StatCard $accent="rgba(138, 90, 16, 0.6)">
            <StatLabel>En attente</StatLabel>
            <StatValue>{countPending}</StatValue>
          </StatCard>
          <StatCard $accent="rgba(31, 90, 51, 0.6)">
            <StatLabel>Approuvees</StatLabel>
            <StatValue>{countApproved}</StatValue>
          </StatCard>
          <StatCard $accent="rgba(176, 58, 46, 0.5)">
            <StatLabel>Rejetees</StatLabel>
            <StatValue>{countRejected}</StatValue>
          </StatCard>
          <StatCard $accent="rgba(91, 95, 101, 0.4)">
            <StatLabel>Total</StatLabel>
            <StatValue>{rows.length}</StatValue>
          </StatCard>
        </SummaryRow>

        <FilterRow>
          {filters.map(f => (
            <Chip key={f.id} $active={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </Chip>
          ))}
        </FilterRow>

        <Panel>
          <TableHeader>
            <TH>Citoyen</TH>
            <TH>Operateur</TH>
            <TH>Motif</TH>
            <TH>Statut</TH>
            <TH>Actions</TH>
          </TableHeader>
          {loading ? (
            <Empty>Chargement…</Empty>
          ) : filtered.length === 0 ? (
            <Empty>Aucune suspension{filter !== 'all' ? ' dans cette categorie' : ''}.</Empty>
          ) : (
            filtered.map(s => (
              <SuspRow key={s.id}>
                <div>
                  <CitizenName>{s.citoyenLabel}</CitizenName>
                  <CitizenSub>Soumis le {s.date}</CitizenSub>
                </div>
                <OperatorInfo>{s.operateurLabel}</OperatorInfo>
                <MotifBadge>{s.motif}</MotifBadge>
                <StatusBadge $status={s.status}>{statusLabel[s.status]}</StatusBadge>
                <ActionsCell>
                  <MenuRoot data-susp-menu-root="true">
                    <MenuTrigger
                      aria-label="Ouvrir le menu d'actions"
                      onClick={() => setOpenMenuId((prev) => (prev === s.id ? null : s.id))}
                    >
                      <i className="bi bi-three-dots-vertical" />
                    </MenuTrigger>
                    {openMenuId === s.id && (
                      <MenuDropdown>
                        <MenuItem
                          $variant="default"
                          onClick={() => {
                            setOpenMenuId(null);
                            navigate('/superadmin/decision', { state: { suspId: s.id } });
                          }}
                        >
                          <i className="bi bi-eye" />Voir
                        </MenuItem>
                        {s.status === 'pending' && (
                          <>
                            <MenuItem
                              $variant="approve"
                              onClick={() => {
                                setOpenMenuId(null);
                                navigate('/superadmin/decision', { state: { suspId: s.id } });
                              }}
                            >
                              <i className="bi bi-check2" />Valider
                            </MenuItem>
                            <MenuItem
                              $variant="reject"
                              onClick={() => {
                                setOpenMenuId(null);
                                navigate('/superadmin/decision', { state: { suspId: s.id } });
                              }}
                            >
                              <i className="bi bi-x" />Rejeter
                            </MenuItem>
                          </>
                        )}
                      </MenuDropdown>
                    )}
                  </MenuRoot>
                </ActionsCell>
              </SuspRow>
            ))
          )}
        </Panel>
      </LayoutGrid>
    </AppLayout>
  );
};

export default SuperAdminSuspensions;
