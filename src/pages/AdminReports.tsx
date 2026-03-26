import styled from 'styled-components';
import { useState } from 'react';
import Swal from 'sweetalert2';
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

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #22312a;
`;

const FilterChips = styled.div`
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

const PublishButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  border: 1px solid rgba(31, 90, 51, 0.6);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(31, 90, 51, 0.2);
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.72); }
`;

const ReportList = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const ReportRow = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(31, 90, 51, 0.1);
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 6px 18px rgba(12, 24, 18, 0.1); }
`;

const ReportIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.09);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(31, 90, 51, 0.75);
  font-size: 1.1rem;
`;

const ReportInfo = styled.div``;

const ReportTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1a2e20;
  font-size: 0.92rem;
`;

const ReportMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #8a9a90;
  font-size: 0.78rem;
  margin-top: 0.1rem;
`;

const StatusBadge = styled.span<{ $status: 'published' | 'pending' | 'draft' }>`
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
  background: ${({ $status }) =>
    $status === 'published' ? 'rgba(31, 90, 51, 0.1)' :
    $status === 'pending' ? 'rgba(138, 90, 16, 0.1)' :
    'rgba(91, 95, 101, 0.1)'};
  color: ${({ $status }) =>
    $status === 'published' ? 'rgba(31, 90, 51, 0.85)' :
    $status === 'pending' ? 'rgba(138, 90, 16, 0.85)' :
    'rgba(91, 95, 101, 0.7)'};
`;

const ActionIcons = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const IconBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(31, 90, 51, 0.15);
  background: rgba(31, 90, 51, 0.06);
  color: rgba(31, 90, 51, 0.75);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.12); }
`;

const navItems = [
  { label: 'Tableau admin', to: '/admin/dashboard' },
  { label: 'Programmer election', to: '/admin/election/create' },
  { label: 'Gestion candidats', to: '/admin/candidats' },
  { label: 'Statistiques', to: '/admin/statistiques' },
  { label: 'Rapports', to: '/admin/rapports' },
];

const reports = [
  { id: 'r1', title: 'Rapport mensuel — Mars 2026', meta: '5 elections analysees · Participation globale · Regions', status: 'published' as const },
  { id: 'r2', title: 'Rapport mensuel — Fevrier 2026', meta: 'Participation globale, repartition par region', status: 'published' as const },
  { id: 'r3', title: 'Rapport Presidentielle 2025', meta: 'Analyse avancee des tendances · Pics de vote · Tranches d\'age', status: 'pending' as const },
  { id: 'r4', title: 'Brouillon — Rapport Legislatives Dakar', meta: 'Brouillon non finalise', status: 'draft' as const },
];

const statusLabels = { published: 'Publie', pending: 'En attente', draft: 'Brouillon' };
const filters = [
  { id: 'all', label: 'Tous' },
  { id: 'published', label: 'Publies' },
  { id: 'pending', label: 'En attente' },
  { id: 'draft', label: 'Brouillons' },
];

const AdminReports = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = reports.filter((r) => activeFilter === 'all' || r.status === activeFilter);

  const handlePublish = () => {
    Swal.fire({
      title: 'Publier le rapport ?',
      text: 'Ce rapport statistique sera visible publiquement. Les resultats individuels restent automatiques et ne seront pas inclus.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Publier',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    });
  };

  return (
    <AppLayout
      role="Administrateur"
      title="Rapports officiels"
      subtitle="Publication des statistiques publiques. Les resultats sont geres automatiquement."
      navItems={navItems}
      actions={<PublishButton onClick={handlePublish}><i className="bi bi-send" />Nouveau rapport</PublishButton>}
    >
      <LayoutGrid>
        <SummaryRow>
          <StatCard $accent="rgba(31, 90, 51, 0.6)">
            <StatLabel>Total rapports</StatLabel>
            <StatValue>4</StatValue>
          </StatCard>
          <StatCard $accent="rgba(31, 90, 51, 0.5)">
            <StatLabel>Publies</StatLabel>
            <StatValue>2</StatValue>
          </StatCard>
          <StatCard $accent="rgba(138, 90, 16, 0.5)">
            <StatLabel>En attente</StatLabel>
            <StatValue>1</StatValue>
          </StatCard>
          <StatCard $accent="rgba(91, 95, 101, 0.4)">
            <StatLabel>Brouillons</StatLabel>
            <StatValue>1</StatValue>
          </StatCard>
        </SummaryRow>

        <Panel>
          <PanelHeader>
            <PanelTitle>Rapports disponibles</PanelTitle>
            <FilterChips>
              {filters.map((f) => (
                <Chip key={f.id} $active={activeFilter === f.id} onClick={() => setActiveFilter(f.id)}>
                  {f.label}
                </Chip>
              ))}
            </FilterChips>
          </PanelHeader>
          <ReportList>
            {filtered.map((r) => (
              <ReportRow key={r.id}>
                <ReportIcon><i className="bi bi-file-earmark-bar-graph" /></ReportIcon>
                <ReportInfo>
                  <ReportTitle>{r.title}</ReportTitle>
                  <ReportMeta>{r.meta}</ReportMeta>
                </ReportInfo>
                <StatusBadge $status={r.status}>{statusLabels[r.status]}</StatusBadge>
                <ActionIcons>
                  <IconBtn title="Apercu"><i className="bi bi-eye" /></IconBtn>
                  <IconBtn title="Telecharger"><i className="bi bi-download" /></IconBtn>
                  {r.status !== 'published' && (
                    <IconBtn title="Publier" onClick={handlePublish}><i className="bi bi-send" /></IconBtn>
                  )}
                </ActionIcons>
              </ReportRow>
            ))}
          </ReportList>
        </Panel>
      </LayoutGrid>
    </AppLayout>
  );
};

export default AdminReports;
