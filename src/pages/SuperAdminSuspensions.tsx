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
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(31, 90, 51, 0.06)'};
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
  grid-template-columns: 1fr 1fr 130px 120px 170px;
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

const SuspRows = styled.div``;

const SuspRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 130px 120px 170px;
  gap: 0.8rem;
  align-items: center;
  padding: 0.9rem 1.3rem;
  border-bottom: 1px solid rgba(31, 90, 51, 0.06);
  transition: background 0.15s;
  &:last-child { border-bottom: none; }
  &:hover { background: rgba(31, 90, 51, 0.02); }
`;

const CitizenInfo = styled.div``;

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
  padding: 0.22rem 0.6rem;
  border-radius: 8px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  background: rgba(176, 58, 46, 0.08);
  color: rgba(176, 58, 46, 0.85);
  white-space: nowrap;
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
    'rgba(176, 58, 46, 0.85)'};
`;

const ActionsCell = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

const ActionBtn = styled(Link)<{ $variant: 'approve' | 'reject' | 'view' }>`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.28rem 0.65rem;
  border-radius: 8px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $variant }) =>
    $variant === 'approve' ? 'rgba(31, 90, 51, 0.1)' :
    $variant === 'reject' ? 'rgba(176, 58, 46, 0.1)' :
    'rgba(91, 95, 101, 0.08)'};
  color: ${({ $variant }) =>
    $variant === 'approve' ? 'rgba(31, 90, 51, 0.85)' :
    $variant === 'reject' ? 'rgba(176, 58, 46, 0.85)' :
    'rgba(91, 95, 101, 0.75)'};
  border: 1px solid ${({ $variant }) =>
    $variant === 'approve' ? 'rgba(31, 90, 51, 0.2)' :
    $variant === 'reject' ? 'rgba(176, 58, 46, 0.2)' :
    'rgba(91, 95, 101, 0.15)'};
  &:hover { filter: brightness(1.1); }
`;

const navItems = [
  { label: 'Console systeme', to: '/superadmin/console' },
  { label: 'Logs immuables', to: '/superadmin/logs' },
  { label: 'Exports audit', to: '/superadmin/export' },
  { label: 'Utilisateurs', to: '/superadmin/utilisateurs' },
  { label: 'Suspensions', to: '/superadmin/suspensions' },
];

type SuspStatus = 'pending' | 'approved' | 'rejected';
type FilterType = 'all' | SuspStatus;

const suspensions = [
  { id: 's1', cni: 'CNI 2349', motif: 'Vote multiple', operator: 'M. Diallo', date: '09/03/2026', status: 'pending' as SuspStatus },
  { id: 's2', cni: 'CNI 8841', motif: 'IP suspecte', operator: 'A. Niane', date: '09/03/2026', status: 'pending' as SuspStatus },
  { id: 's3', cni: 'CNI 7712', motif: 'CNI invalide', operator: 'M. Diallo', date: '07/03/2026', status: 'approved' as SuspStatus },
  { id: 's4', cni: 'CNI 5519', motif: 'Pattern suspect', operator: 'K. Sow', date: '05/03/2026', status: 'rejected' as SuspStatus },
];

const statusLabel = { pending: 'En attente', approved: 'Approuve', rejected: 'Rejete' };
const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'Toutes' },
  { id: 'pending', label: 'En attente' },
  { id: 'approved', label: 'Approuvees' },
  { id: 'rejected', label: 'Rejetees' },
];

const SuperAdminSuspensions = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = suspensions.filter((s) => filter === 'all' || s.status === filter);

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
            <StatValue>2</StatValue>
          </StatCard>
          <StatCard $accent="rgba(31, 90, 51, 0.6)">
            <StatLabel>Approuvees</StatLabel>
            <StatValue>1</StatValue>
          </StatCard>
          <StatCard $accent="rgba(176, 58, 46, 0.5)">
            <StatLabel>Rejetees</StatLabel>
            <StatValue>1</StatValue>
          </StatCard>
          <StatCard $accent="rgba(91, 95, 101, 0.4)">
            <StatLabel>Total</StatLabel>
            <StatValue>4</StatValue>
          </StatCard>
        </SummaryRow>

        <FilterRow>
          {filters.map((f) => (
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
          <SuspRows>
            {filtered.map((s) => (
              <SuspRow key={s.id}>
                <CitizenInfo>
                  <CitizenName>{s.cni}</CitizenName>
                  <CitizenSub>Soumis le {s.date}</CitizenSub>
                </CitizenInfo>
                <OperatorInfo>{s.operator}</OperatorInfo>
                <MotifBadge>{s.motif}</MotifBadge>
                <StatusBadge $status={s.status}>{statusLabel[s.status]}</StatusBadge>
                <ActionsCell>
                  <ActionBtn $variant="view" to="/superadmin/decision">
                    <i className="bi bi-eye" />Voir
                  </ActionBtn>
                  {s.status === 'pending' && (
                    <>
                      <ActionBtn $variant="approve" to="/superadmin/decision">
                        <i className="bi bi-check2" />Valider
                      </ActionBtn>
                      <ActionBtn $variant="reject" to="/superadmin/decision">
                        <i className="bi bi-x" />Rejeter
                      </ActionBtn>
                    </>
                  )}
                </ActionsCell>
              </SuspRow>
            ))}
          </SuspRows>
        </Panel>
      </LayoutGrid>
    </AppLayout>
  );
};

export default SuperAdminSuspensions;
