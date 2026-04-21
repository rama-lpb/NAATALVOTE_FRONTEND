import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';
import { api, type CandidateDto, type ElectionDto } from '../services/api';

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

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7a72;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
`;

const navItems = [
  { label: 'Tableau admin', to: '/admin/dashboard' },
  { label: 'Elections creees', to: '/admin/elections' },
  { label: 'Programmer election', to: '/admin/election/create' },
  { label: 'Gestion candidats', to: '/admin/candidats' },
  { label: 'Statistiques', to: '/admin/statistiques' },
  { label: 'Rapports', to: '/admin/rapports' },
];

const statusLabels = { published: 'Publie', pending: 'En attente', draft: 'Brouillon' };
const filters = [
  { id: 'all', label: 'Tous' },
  { id: 'published', label: 'Publies' },
  { id: 'pending', label: 'En attente' },
  { id: 'draft', label: 'Brouillons' },
];

type ReportStatus = 'published' | 'pending' | 'draft';

type ReportItem = {
  id: string;
  electionId: string;
  title: string;
  meta: string;
  status: ReportStatus;
  election: ElectionDto;
};

const toReportStatus = (statut: string): ReportStatus => {
  if (statut === 'CLOTUREE') return 'published';
  if (statut === 'EN_COURS') return 'pending';
  return 'draft';
};

const downloadCsv = (filename: string, rows: string[][]) => {
  const body = rows
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(';'))
    .join('\n');
  const blob = new Blob([body], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const AdminReports = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [elections, setElections] = useState<ElectionDto[]>([]);
  const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.elections.list(), api.candidats.list()])
      .then(([electionsData, candidatesData]) => {
        setElections(electionsData);
        setCandidates(candidatesData);
      })
      .catch(() => {
        setElections([]);
        setCandidates([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const reports = useMemo<ReportItem[]>(() => {
    return elections
      .map((e) => {
        const electionCandidates = candidates.filter((c) => c.election_id === e.id);
        const meta = `${electionCandidates.length} candidats · ${e.votes_count.toLocaleString()} votes · ${e.region || 'Nationale'}`;
        return {
          id: e.id,
          electionId: e.id,
          title: `Rapport — ${e.titre}`,
          meta,
          status: toReportStatus(e.statut),
          election: e,
        };
      })
      .sort((a, b) => new Date(b.election.date_debut).getTime() - new Date(a.election.date_debut).getTime());
  }, [elections, candidates]);

  const filtered = reports.filter((r) => activeFilter === 'all' || r.status === activeFilter);

  const stats = useMemo(() => {
    return {
      total: reports.length,
      published: reports.filter((r) => r.status === 'published').length,
      pending: reports.filter((r) => r.status === 'pending').length,
      draft: reports.filter((r) => r.status === 'draft').length,
    };
  }, [reports]);

  const handlePublish = () => {
    Swal.fire({
      title: 'Generation automatique',
      text: 'Les rapports sont maintenant alimentes automatiquement depuis les donnees d elections.',
      icon: 'info',
      confirmButtonText: 'OK',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
    });
  };

  const handlePreview = (report: ReportItem) => {
    Swal.fire({
      title: report.title,
      html: `Statut: <b>${statusLabels[report.status]}</b><br/>${report.meta}`,
      icon: 'info',
      confirmButtonText: 'Fermer',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
    });
  };

  const handleDownload = async (report: ReportItem) => {
    const electionCandidates = candidates.filter((c) => c.election_id === report.electionId);
    const results = await api.votes.results(report.electionId).catch(() => null);
    const votesByCandidate = new Map((results?.results ?? []).map((line) => [line.candidat_id, line.votes]));

    const rows: string[][] = [
      ['election_id', 'titre', 'statut', 'date_debut', 'date_fin', 'region', 'total_electeurs', 'votes_count'],
      [
        report.election.id,
        report.election.titre,
        report.election.statut,
        report.election.date_debut,
        report.election.date_fin,
        report.election.region,
        String(report.election.total_electeurs),
        String(report.election.votes_count),
      ],
      [],
      ['candidat_id', 'nom', 'prenom', 'parti', 'votes'],
      ...electionCandidates.map((c) => [
        c.id,
        c.nom,
        c.prenom,
        c.parti_politique,
        String(votesByCandidate.get(c.id) ?? c.votes_count),
      ]),
    ];

    const filename = `rapport_${report.election.titre.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`;
    downloadCsv(filename, rows);
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
            <StatValue>{loading ? '—' : stats.total}</StatValue>
          </StatCard>
          <StatCard $accent="rgba(31, 90, 51, 0.5)">
            <StatLabel>Publies</StatLabel>
            <StatValue>{loading ? '—' : stats.published}</StatValue>
          </StatCard>
          <StatCard $accent="rgba(138, 90, 16, 0.5)">
            <StatLabel>En attente</StatLabel>
            <StatValue>{loading ? '—' : stats.pending}</StatValue>
          </StatCard>
          <StatCard $accent="rgba(91, 95, 101, 0.4)">
            <StatLabel>Brouillons</StatLabel>
            <StatValue>{loading ? '—' : stats.draft}</StatValue>
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
            {loading ? <EmptyState>Chargement des rapports...</EmptyState> : null}
            {!loading && filtered.length === 0 ? <EmptyState>Aucun rapport pour ce filtre.</EmptyState> : null}
            {!loading && filtered.map((r) => (
              <ReportRow key={r.id}>
                <ReportIcon><i className="bi bi-file-earmark-bar-graph" /></ReportIcon>
                <ReportInfo>
                  <ReportTitle>{r.title}</ReportTitle>
                  <ReportMeta>{r.meta}</ReportMeta>
                </ReportInfo>
                <StatusBadge $status={r.status}>{statusLabels[r.status]}</StatusBadge>
                <ActionIcons>
                  <IconBtn title="Apercu" onClick={() => handlePreview(r)}><i className="bi bi-eye" /></IconBtn>
                  <IconBtn title="Telecharger" onClick={() => void handleDownload(r)}><i className="bi bi-download" /></IconBtn>
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
