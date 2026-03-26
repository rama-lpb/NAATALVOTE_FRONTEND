import { useState, useMemo } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';
import mockData from '../data/mockData.json';

/* ── Badge ── */
const MES_EN_COURS = (mockData as any).alertes_fraude.filter(
  (a: any) => a.operateur_id === 'oper-001' && a.statut === 'EN_ANALYSE'
).length;

const navItems = [
  { label: 'Dashboard', to: '/operateur/dashboard' },
  { label: 'Mes alertes', to: '/operateur/mes-alertes', badge: MES_EN_COURS },
  { label: 'Historique', to: '/operateur/historique' },
  { label: 'Rapports', to: '/operateur/rapports' },
];

/* ── Constants ── */
const MON_ID = 'oper-001';

const TYPE_LABELS: Record<string, string> = {
  VOTE_MULTIPLE: 'Vote multiple',
  IP_SUSPECTE: 'IP suspecte',
  PATTERN_SUSPECT: 'Pattern suspect',
  CNI_INVALIDE: 'CNI invalide',
};

const TYPE_ICONS: Record<string, string> = {
  VOTE_MULTIPLE: 'bi-person-x',
  IP_SUSPECTE: 'bi-wifi-off',
  PATTERN_SUSPECT: 'bi-graph-down',
  CNI_INVALIDE: 'bi-card-text',
};

const ELECTION_LABELS: Record<string, string> = {
  'elec-001': 'Presidentielle 2025',
  'elec-002': 'Legislatives Dakar',
  'elec-003': 'Municipales',
};

type ActionCategory = 'all' | 'EN_COURS' | 'RESOLU' | 'SUSPECT' | 'SUSPENSION';

const ACTION_LABELS: Record<ActionCategory, string> = {
  all: 'Toutes',
  EN_COURS: 'En cours',
  RESOLU: 'Classees',
  SUSPECT: 'Marquees suspects',
  SUSPENSION: 'Suspensions',
};

const ACTION_COLORS: Record<string, string> = {
  EN_COURS: 'rgba(138, 90, 16, 0.85)',
  RESOLU: 'rgba(38, 76, 140, 0.85)',
  SUSPECT: 'rgba(138, 90, 16, 0.85)',
  SUSPENSION: 'rgba(176, 58, 46, 0.85)',
};

const ACTION_BG: Record<string, string> = {
  EN_COURS: 'rgba(138, 90, 16, 0.1)',
  RESOLU: 'rgba(38, 76, 140, 0.1)',
  SUSPECT: 'rgba(138, 90, 16, 0.1)',
  SUSPENSION: 'rgba(176, 58, 46, 0.1)',
};

const ACTION_DOT: Record<string, string> = {
  EN_COURS: 'rgba(138, 90, 16, 0.6)',
  RESOLU: 'rgba(38, 76, 140, 0.6)',
  SUSPECT: 'rgba(176, 130, 30, 0.7)',
  SUSPENSION: 'rgba(176, 58, 46, 0.7)',
};

const SUSPENSION_STATUT_COLORS: Record<string, { color: string; bg: string; label: string }> = {
  EN_ATTENTE: { color: 'rgba(138, 90, 16, 0.85)', bg: 'rgba(138, 90, 16, 0.1)', label: 'En attente du SuperAdmin' },
  APPROUVE: { color: 'rgba(31, 90, 51, 0.85)', bg: 'rgba(31, 90, 51, 0.1)', label: 'Approuvee par le SuperAdmin' },
  REJETE: { color: 'rgba(176, 58, 46, 0.85)', bg: 'rgba(176, 58, 46, 0.1)', label: 'Rejetee par le SuperAdmin' },
};

const PAGE_SIZE = 8;

/* ── Styled Components ── */
const FiltersBar = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1rem 1.3rem;
  box-shadow: 0 10px 22px rgba(12, 24, 18, 0.07);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
`;

const ChipsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
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

const SelectsRow = styled.div`
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterSelect = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 10px;
  padding: 0.38rem 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.83rem;
  background: rgba(255, 255, 255, 0.9);
  color: #1f5a33;
  cursor: pointer;
  outline: none;
  &:focus { border-color: rgba(31, 90, 51, 0.45); }
`;

const FilterInput = styled.input`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 10px;
  padding: 0.38rem 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.83rem;
  background: rgba(255, 255, 255, 0.9);
  color: #1f5a33;
  outline: none;
  &:focus { border-color: rgba(31, 90, 51, 0.45); }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 180px;
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 10px;
  padding: 0.38rem 0.8rem 0.38rem 2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.83rem;
  background: rgba(255, 255, 255, 0.9);
  color: #1f5a33;
  outline: none;
  &:focus { border-color: rgba(31, 90, 51, 0.45); }
`;

const SearchWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 180px;
  i {
    position: absolute;
    left: 0.6rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(31, 90, 51, 0.5);
    font-size: 0.82rem;
    pointer-events: none;
  }
`;

const ResetBtn = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.18);
  border-radius: 10px;
  padding: 0.38rem 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  background: transparent;
  color: rgba(31, 90, 51, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  &:hover { background: rgba(31, 90, 51, 0.08); }
`;

const CountLabel = styled.span`
  margin-left: auto;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #7a9280;
`;

const ExportBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.38rem 0.8rem;
  border-radius: 10px;
  border: 1px solid rgba(31, 90, 51, 0.2);
  background: rgba(31, 90, 51, 0.07);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  &:hover { background: rgba(31, 90, 51, 0.14); }
`;

const Timeline = styled.div`
  display: grid;
  gap: 0.6rem;
`;

const HistoryCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 0.9rem 1.1rem;
  border: 1px solid rgba(31, 90, 51, 0.1);
  display: grid;
  grid-template-columns: 10px 110px 1fr auto auto;
  gap: 0.8rem 1rem;
  align-items: center;
  cursor: pointer;
  transition: all 0.18s;
  &:hover {
    box-shadow: 0 6px 18px rgba(12, 24, 18, 0.1);
    border-color: rgba(31, 90, 51, 0.22);
    transform: translateY(-1px);
  }
  @media (max-width: 700px) {
    grid-template-columns: 10px 1fr auto;
  }
`;

const Dot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const TimeCol = styled.div`
  display: grid;
  gap: 0.1rem;
`;

const TimeDate = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #4a5a50;
`;

const TimeHour = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  color: #8a9a90;
`;

const HistContent = styled.div``;

const ActionBadge = styled.span<{ $cat: string }>`
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${({ $cat }) => ACTION_COLORS[$cat] ?? '#555'};
  background: ${({ $cat }) => ACTION_BG[$cat] ?? 'rgba(0,0,0,0.06)'};
  display: inline-block;
  margin-bottom: 0.2rem;
`;

const HistTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.87rem;
  font-weight: 600;
  color: #1a2e20;
`;

const HistMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  color: #8a9a90;
  margin-top: 0.15rem;
`;

const TypeIcon = styled.div<{ $type: string }>`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
  background: ${({ $type }) =>
    $type === 'VOTE_MULTIPLE' ? 'rgba(176, 58, 46, 0.1)' :
    $type === 'IP_SUSPECTE' ? 'rgba(138, 90, 16, 0.1)' :
    $type === 'CNI_INVALIDE' ? 'rgba(100, 50, 150, 0.1)' :
    'rgba(31, 90, 51, 0.1)'};
  color: ${({ $type }) =>
    $type === 'VOTE_MULTIPLE' ? 'rgba(176, 58, 46, 0.8)' :
    $type === 'IP_SUSPECTE' ? 'rgba(138, 90, 16, 0.8)' :
    $type === 'CNI_INVALIDE' ? 'rgba(100, 50, 150, 0.8)' :
    'rgba(31, 90, 51, 0.8)'};
`;

const ChevronBtn = styled.button`
  background: none;
  border: none;
  color: rgba(31, 90, 51, 0.5);
  cursor: pointer;
  padding: 0.2rem;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  &:hover { color: rgba(31, 90, 51, 0.9); }
`;

const Empty = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #7a9280;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  border: 1px dashed rgba(31, 90, 51, 0.2);
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding-top: 0.4rem;
  flex-wrap: wrap;
`;

const PageBtn = styled.button<{ $active?: boolean }>`
  min-width: 34px;
  height: 34px;
  padding: 0 0.5rem;
  border-radius: 9px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.83rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  cursor: pointer;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.6)' : 'rgba(31, 90, 51, 0.2)')};
  background: ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.85)' : 'rgba(255,255,255,0.85)')};
  color: ${({ $active }) => ($active ? '#fff' : '#1f5a33')};
  transition: all 0.15s;
  &:disabled { opacity: 0.35; cursor: not-allowed; }
  &:not(:disabled):hover {
    background: ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.95)' : 'rgba(31, 90, 51, 0.1)')};
  }
`;

/* ── Drawer ── */
const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(10, 20, 14, 0.35);
  backdrop-filter: blur(2px);
  z-index: 200;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'all' : 'none')};
  transition: opacity 0.25s;
`;

const Drawer = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 440px;
  max-width: 95vw;
  background: #f5f9f6;
  box-shadow: -6px 0 40px rgba(12, 24, 18, 0.18);
  z-index: 201;
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const DrawerHeader = styled.div`
  padding: 1.1rem 1.4rem;
  border-bottom: 1px solid rgba(31, 90, 51, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.95);
  flex-shrink: 0;
`;

const DrawerTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.97rem;
  color: #1a2e20;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DrawerClose = styled.button`
  background: rgba(31, 90, 51, 0.07);
  border: 1px solid rgba(31, 90, 51, 0.15);
  border-radius: 9px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  color: rgba(31, 90, 51, 0.7);
  flex-shrink: 0;
  transition: all 0.15s;
  &:hover { background: rgba(31, 90, 51, 0.14); color: rgba(31, 90, 51, 1); }
`;

const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.1rem 1.4rem;
  display: grid;
  gap: 1rem;
  align-content: start;
`;

const DrawerSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(31, 90, 51, 0.1);
  display: grid;
  gap: 0.65rem;
`;

const DrawerSectionTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(31, 90, 51, 0.6);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(31, 90, 51, 0.08);
`;

const DrawerRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 0.4rem;
  align-items: start;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.83rem;
`;

const DrawerLabel = styled.div`
  color: rgba(31, 90, 51, 0.6);
  font-size: 0.78rem;
  font-weight: 600;
  padding-top: 0.05rem;
`;

const DrawerValue = styled.div`
  color: #1a2e20;
  font-weight: 500;
  line-height: 1.45;
`;

const ActionPill = styled.span<{ $cat: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: ${({ $cat }) => ACTION_COLORS[$cat] ?? '#555'};
  background: ${({ $cat }) => ACTION_BG[$cat] ?? 'rgba(0,0,0,0.06)'};
`;

const NoteBox = styled.div`
  background: rgba(31, 90, 51, 0.04);
  border: 1px solid rgba(31, 90, 51, 0.1);
  border-radius: 10px;
  padding: 0.65rem 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #2a3a2f;
  line-height: 1.5;
  font-style: italic;
`;

const DecisionPill = styled.span<{ $statut: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ $statut }) => SUSPENSION_STATUT_COLORS[$statut]?.color ?? '#555'};
  background: ${({ $statut }) => SUSPENSION_STATUT_COLORS[$statut]?.bg ?? 'rgba(0,0,0,0.06)'};
`;

const DecisionComment = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(31, 90, 51, 0.1);
  border-radius: 10px;
  padding: 0.65rem 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #2a3a2f;
  line-height: 1.5;
`;

const NoDecisionYet = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #8a9a90;
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

/* ── Helpers ── */
const getActionCategory = (alert: any, suspensions: any[]): ActionCategory => {
  const hasSusp = suspensions.some((s: any) => s.alert_id === alert.id);
  if (hasSusp) return 'SUSPENSION';
  if (alert.action_operateur === 'SUSPECT') return 'SUSPECT';
  if (alert.statut === 'RESOLUE') return 'RESOLU';
  return 'EN_COURS';
};

const ACTION_ICON: Record<string, string> = {
  EN_COURS: 'bi-hourglass-split',
  RESOLU: 'bi-check-circle',
  SUSPECT: 'bi-eye-fill',
  SUSPENSION: 'bi-person-dash',
};

const ACTION_TEXT: Record<string, string> = {
  EN_COURS: 'En cours d\'analyse',
  RESOLU: 'Classee — analysee et resolue',
  SUSPECT: 'Marquee suspecte — surveillance activee',
  SUSPENSION: 'Suspension recommandee au SuperAdmin',
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    + ' a ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

/* ── Component ── */
const OperatorHistory = () => {
  const [filterAction, setFilterAction] = useState<ActionCategory>('all');
  const [filterType, setFilterType] = useState('');
  const [filterElection, setFilterElection] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const allAlerts = useMemo(
    () => (mockData as any).alertes_fraude.filter((a: any) => a.operateur_id === MON_ID),
    []
  );

  const suspensions = useMemo(
    () => (mockData as any).suspensions.filter((s: any) => s.operateur_id === MON_ID),
    []
  );

  const filtered = useMemo(() => {
    return allAlerts
      .filter((a: any) => filterAction === 'all' || getActionCategory(a, suspensions) === filterAction)
      .filter((a: any) => !filterType || a.type_fraude === filterType)
      .filter((a: any) => !filterElection || a.election_id === filterElection)
      .filter((a: any) => !filterDate || a.date_detection.startsWith(filterDate))
      .filter((a: any) =>
        !search ||
        a.description.toLowerCase().includes(search.toLowerCase()) ||
        a.id.toLowerCase().includes(search.toLowerCase()) ||
        (TYPE_LABELS[a.type_fraude] ?? '').toLowerCase().includes(search.toLowerCase())
      )
      .sort((a: any, b: any) => new Date(b.date_detection).getTime() - new Date(a.date_detection).getTime());
  }, [allAlerts, suspensions, filterAction, filterType, filterElection, filterDate, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExport = () => {
    Swal.fire({
      title: 'Exporter l\'historique',
      html: `
        <p style="font-family:Poppins,sans-serif;font-size:0.9rem;color:#3f5e4b;margin-bottom:1rem">
          Choisissez le format d'export pour <strong>${filtered.length} action(s)</strong> correspondant aux filtres actuels.
        </p>
        <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap">
          <label style="display:flex;align-items:center;gap:0.4rem;font-family:Poppins,sans-serif;font-size:0.85rem;cursor:pointer">
            <input type="radio" name="fmt" value="csv" checked style="accent-color:#1f5a33"/> CSV
          </label>
          <label style="display:flex;align-items:center;gap:0.4rem;font-family:Poppins,sans-serif;font-size:0.85rem;cursor:pointer">
            <input type="radio" name="fmt" value="pdf" style="accent-color:#1f5a33"/> PDF
          </label>
          <label style="display:flex;align-items:center;gap:0.4rem;font-family:Poppins,sans-serif;font-size:0.85rem;cursor:pointer">
            <input type="radio" name="fmt" value="xlsx" style="accent-color:#1f5a33"/> Excel
          </label>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Telecharger',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    }).then((result) => {
      if (result.isConfirmed) {
        const fmt = (document.querySelector('input[name="fmt"]:checked') as HTMLInputElement)?.value ?? 'csv';
        Swal.fire({
          icon: 'success',
          title: 'Export lance',
          text: `Le fichier ${fmt.toUpperCase()} est en cours de generation et sera disponible sous peu.`,
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
        });
      }
    });
  };

  const resetFilters = () => {
    setFilterAction('all');
    setFilterType('');
    setFilterElection('');
    setFilterDate('');
    setSearch('');
    setPage(1);
  };

  const handleFilter = (setter: (v: any) => void) => (e: React.ChangeEvent<any>) => {
    setter(e.target.value);
    setPage(1);
  };

  const hasFilters = filterAction !== 'all' || filterType || filterElection || filterDate || search;

  /* ── Drawer data ── */
  const selectedAlert = selectedId
    ? (mockData as any).alertes_fraude.find((a: any) => a.id === selectedId)
    : null;
  const selectedSusp = selectedId
    ? suspensions.find((s: any) => s.alert_id === selectedId) ?? null
    : null;
  const selectedCategory = selectedAlert
    ? getActionCategory(selectedAlert, suspensions)
    : 'EN_COURS';

  const categories: { id: ActionCategory; label: string; count: number }[] = [
    { id: 'all', label: 'Toutes', count: allAlerts.length },
    { id: 'EN_COURS', label: 'En cours', count: allAlerts.filter((a: any) => getActionCategory(a, suspensions) === 'EN_COURS').length },
    { id: 'RESOLU', label: 'Classees', count: allAlerts.filter((a: any) => getActionCategory(a, suspensions) === 'RESOLU').length },
    { id: 'SUSPECT', label: 'Suspects', count: allAlerts.filter((a: any) => getActionCategory(a, suspensions) === 'SUSPECT').length },
    { id: 'SUSPENSION', label: 'Suspensions', count: allAlerts.filter((a: any) => getActionCategory(a, suspensions) === 'SUSPENSION').length },
  ];

  return (
    <AppLayout
      role="Operateur de securite"
      title="Historique des actions"
      subtitle="Traçabilite complete de toutes vos analyses et recommandations."
      navItems={navItems}
    >
      {/* Filters */}
      <FiltersBar>
        <ChipsRow>
          {categories.map((c) => (
            <Chip
              key={c.id}
              $active={filterAction === c.id}
              onClick={() => { setFilterAction(c.id); setPage(1); }}
            >
              {c.label}
              {c.id !== 'all' && (
                <span style={{ marginLeft: '0.3rem', opacity: 0.7, fontWeight: 400 }}>({c.count})</span>
              )}
            </Chip>
          ))}
        </ChipsRow>

        <SelectsRow>
          <FilterSelect value={filterType} onChange={handleFilter(setFilterType)}>
            <option value="">Tous les types</option>
            <option value="VOTE_MULTIPLE">Vote multiple</option>
            <option value="IP_SUSPECTE">IP suspecte</option>
            <option value="PATTERN_SUSPECT">Pattern suspect</option>
            <option value="CNI_INVALIDE">CNI invalide</option>
          </FilterSelect>

          <FilterSelect value={filterElection} onChange={handleFilter(setFilterElection)}>
            <option value="">Toutes les elections</option>
            <option value="elec-001">Presidentielle 2025</option>
            <option value="elec-002">Legislatives Dakar</option>
            <option value="elec-003">Municipales</option>
          </FilterSelect>

          <FilterInput
            type="date"
            value={filterDate}
            onChange={handleFilter(setFilterDate)}
            title="Filtrer par date de detection"
          />

          <SearchWrap>
            <i className="bi bi-search" />
            <SearchInput
              placeholder="Rechercher..."
              value={search}
              onChange={handleFilter(setSearch)}
            />
          </SearchWrap>

          {hasFilters && (
            <ResetBtn onClick={resetFilters}>
              <i className="bi bi-x-circle" />
              Reinitialiser
            </ResetBtn>
          )}

          <CountLabel>{filtered.length} action{filtered.length !== 1 ? 's' : ''}</CountLabel>
          <ExportBtn onClick={handleExport}><i className="bi bi-download" />Exporter</ExportBtn>
        </SelectsRow>
      </FiltersBar>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <Empty>
          <i className="bi bi-clock-history" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }} />
          {allAlerts.length === 0
            ? 'Aucune action enregistree pour ce compte.'
            : 'Aucune action ne correspond aux filtres selectionnes.'}
        </Empty>
      ) : (
        <Timeline>
          {paginated.map((alert: any) => {
            const cat = getActionCategory(alert, suspensions);
            const refDate = alert.date_traitement ?? alert.date_detection;
            const d = new Date(refDate);
            return (
              <HistoryCard key={alert.id} onClick={() => setSelectedId(alert.id)}>
                <Dot $color={ACTION_DOT[cat]} />
                <TimeCol>
                  <TimeDate>{d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</TimeDate>
                  <TimeHour>{d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</TimeHour>
                </TimeCol>
                <HistContent>
                  <ActionBadge $cat={cat}>
                    <i className={`bi ${ACTION_ICON[cat]}`} style={{ marginRight: '0.25rem' }} />
                    {ACTION_LABELS[cat as ActionCategory]}
                  </ActionBadge>
                  <HistTitle>{TYPE_LABELS[alert.type_fraude] ?? alert.type_fraude}</HistTitle>
                  <HistMeta>
                    {ELECTION_LABELS[alert.election_id] ?? alert.election_id}
                    {alert.ip && <> · {alert.ip}</>}
                    {' · '}
                    <span style={{ fontFamily: 'monospace', fontSize: '0.72rem' }}>{alert.id}</span>
                  </HistMeta>
                </HistContent>
                <TypeIcon $type={alert.type_fraude}>
                  <i className={`bi ${TYPE_ICONS[alert.type_fraude] ?? 'bi-exclamation-triangle'}`} />
                </TypeIcon>
                <ChevronBtn onClick={(e) => { e.stopPropagation(); setSelectedId(alert.id); }}>
                  <i className="bi bi-chevron-right" />
                </ChevronBtn>
              </HistoryCard>
            );
          })}
        </Timeline>
      )}

      {/* Pagination */}
      {filtered.length > PAGE_SIZE && (
        <Pagination>
          <PageBtn onClick={() => setPage(1)} disabled={page === 1}><i className="bi bi-chevron-double-left" /></PageBtn>
          <PageBtn onClick={() => setPage((p) => p - 1)} disabled={page === 1}><i className="bi bi-chevron-left" /></PageBtn>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .reduce<(number | '...')[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('...');
              acc.push(p);
              return acc;
            }, [])
            .map((p, idx) =>
              p === '...' ? (
                <span key={`s-${idx}`} style={{ color: '#8a9a90', fontSize: '0.82rem', padding: '0 0.2rem' }}>…</span>
              ) : (
                <PageBtn key={p} $active={p === page} onClick={() => setPage(p as number)}>{p}</PageBtn>
              )
            )}
          <PageBtn onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}><i className="bi bi-chevron-right" /></PageBtn>
          <PageBtn onClick={() => setPage(totalPages)} disabled={page === totalPages}><i className="bi bi-chevron-double-right" /></PageBtn>
        </Pagination>
      )}

      {/* Drawer overlay */}
      <Overlay $open={!!selectedId} onClick={() => setSelectedId(null)} />

      {/* Drawer panel */}
      <Drawer $open={!!selectedAlert}>
        <DrawerHeader>
          <DrawerTitle>
            {selectedAlert && (
              <TypeIcon $type={selectedAlert.type_fraude} style={{ width: 28, height: 28, fontSize: '0.9rem', borderRadius: 8 }}>
                <i className={`bi ${TYPE_ICONS[selectedAlert.type_fraude] ?? 'bi-exclamation-triangle'}`} />
              </TypeIcon>
            )}
            Detail de l'action
          </DrawerTitle>
          <DrawerClose onClick={() => setSelectedId(null)}>
            <i className="bi bi-x" />
          </DrawerClose>
        </DrawerHeader>

        {selectedAlert && (
          <DrawerBody>
            {/* Infos alerte */}
            <DrawerSection>
              <DrawerSectionTitle>
                <i className="bi bi-shield-exclamation" />
                Informations de l'alerte
              </DrawerSectionTitle>
              <DrawerRow>
                <DrawerLabel>Reference</DrawerLabel>
                <DrawerValue style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{selectedAlert.id}</DrawerValue>
              </DrawerRow>
              <DrawerRow>
                <DrawerLabel>Type de fraude</DrawerLabel>
                <DrawerValue>{TYPE_LABELS[selectedAlert.type_fraude] ?? selectedAlert.type_fraude}</DrawerValue>
              </DrawerRow>
              <DrawerRow>
                <DrawerLabel>Election</DrawerLabel>
                <DrawerValue>{ELECTION_LABELS[selectedAlert.election_id] ?? selectedAlert.election_id}</DrawerValue>
              </DrawerRow>
              <DrawerRow>
                <DrawerLabel>Detectee le</DrawerLabel>
                <DrawerValue>{formatDateTime(selectedAlert.date_detection)}</DrawerValue>
              </DrawerRow>
              {selectedAlert.ip && (
                <DrawerRow>
                  <DrawerLabel>Adresse IP</DrawerLabel>
                  <DrawerValue style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{selectedAlert.ip}</DrawerValue>
                </DrawerRow>
              )}
              {(selectedAlert as any).localisation && (
                <DrawerRow>
                  <DrawerLabel>Localisation</DrawerLabel>
                  <DrawerValue>
                    {(selectedAlert as any).localisation.est_vpn
                      ? '⚠ VPN / Anonyme'
                      : `${(selectedAlert as any).localisation.ville}, ${(selectedAlert as any).localisation.pays}`}
                  </DrawerValue>
                </DrawerRow>
              )}
              {(selectedAlert as any).score_risque != null && (
                <DrawerRow>
                  <DrawerLabel>Score de risque</DrawerLabel>
                  <DrawerValue>
                    <span style={{
                      fontWeight: 700,
                      color: (selectedAlert as any).score_risque >= 80
                        ? 'rgba(176, 58, 46, 0.85)'
                        : (selectedAlert as any).score_risque >= 55
                        ? 'rgba(138, 90, 16, 0.85)'
                        : 'rgba(31, 90, 51, 0.85)',
                    }}>
                      {(selectedAlert as any).score_risque}/100
                    </span>
                  </DrawerValue>
                </DrawerRow>
              )}
              <DrawerRow>
                <DrawerLabel>Description</DrawerLabel>
                <DrawerValue style={{ fontSize: '0.8rem', color: '#4a5a50' }}>{selectedAlert.description}</DrawerValue>
              </DrawerRow>
            </DrawerSection>

            {/* Action operateur */}
            <DrawerSection>
              <DrawerSectionTitle>
                <i className="bi bi-person-check" />
                Mon action
              </DrawerSectionTitle>
              <DrawerRow>
                <DrawerLabel>Action</DrawerLabel>
                <DrawerValue>
                  <ActionPill $cat={selectedCategory}>
                    <i className={`bi ${ACTION_ICON[selectedCategory]}`} />
                    {ACTION_TEXT[selectedCategory]}
                  </ActionPill>
                </DrawerValue>
              </DrawerRow>
              {selectedAlert.date_traitement && (
                <DrawerRow>
                  <DrawerLabel>Traitee le</DrawerLabel>
                  <DrawerValue>{formatDateTime(selectedAlert.date_traitement)}</DrawerValue>
                </DrawerRow>
              )}
              {!(selectedAlert as any).note_interne && selectedCategory === 'EN_COURS' && (
                <DrawerRow>
                  <DrawerLabel>Note</DrawerLabel>
                  <DrawerValue style={{ color: '#8a9a90', fontStyle: 'italic', fontSize: '0.8rem' }}>
                    Analyse en cours — aucune note disponible.
                  </DrawerValue>
                </DrawerRow>
              )}
              {(selectedAlert as any).note_interne && (
                <>
                  <DrawerRow>
                    <DrawerLabel>Note interne</DrawerLabel>
                    <DrawerValue />
                  </DrawerRow>
                  <NoteBox>"{(selectedAlert as any).note_interne}"</NoteBox>
                </>
              )}
            </DrawerSection>

            {/* Decision SuperAdmin */}
            {selectedSusp ? (
              <DrawerSection>
                <DrawerSectionTitle>
                  <i className="bi bi-shield-lock" />
                  Decision du SuperAdmin
                </DrawerSectionTitle>
                <DrawerRow>
                  <DrawerLabel>Statut</DrawerLabel>
                  <DrawerValue>
                    <DecisionPill $statut={selectedSusp.statut}>
                      {selectedSusp.statut === 'EN_ATTENTE' && <i className="bi bi-hourglass-split" />}
                      {selectedSusp.statut === 'APPROUVE' && <i className="bi bi-check-circle-fill" />}
                      {selectedSusp.statut === 'REJETE' && <i className="bi bi-x-circle-fill" />}
                      {SUSPENSION_STATUT_COLORS[selectedSusp.statut]?.label ?? selectedSusp.statut}
                    </DecisionPill>
                  </DrawerValue>
                </DrawerRow>
                <DrawerRow>
                  <DrawerLabel>Dossier cree</DrawerLabel>
                  <DrawerValue>{formatDate(selectedSusp.date_creation)}</DrawerValue>
                </DrawerRow>
                {selectedSusp.date_decision && (
                  <DrawerRow>
                    <DrawerLabel>Decision le</DrawerLabel>
                    <DrawerValue>{formatDateTime(selectedSusp.date_decision)}</DrawerValue>
                  </DrawerRow>
                )}
                {selectedSusp.decision_commentaire ? (
                  <>
                    <DrawerRow>
                      <DrawerLabel>Commentaire</DrawerLabel>
                      <DrawerValue />
                    </DrawerRow>
                    <DecisionComment>{selectedSusp.decision_commentaire}</DecisionComment>
                  </>
                ) : (
                  <NoDecisionYet>
                    <i className="bi bi-clock" />
                    En attente de la decision du SuperAdmin.
                  </NoDecisionYet>
                )}
              </DrawerSection>
            ) : selectedCategory === 'SUSPENSION' ? null : (
              <DrawerSection>
                <DrawerSectionTitle>
                  <i className="bi bi-shield-lock" />
                  Decision du SuperAdmin
                </DrawerSectionTitle>
                <NoDecisionYet>
                  <i className="bi bi-dash-circle" />
                  Aucune recommandation de suspension pour cette alerte.
                </NoDecisionYet>
              </DrawerSection>
            )}
          </DrawerBody>
        )}
      </Drawer>
    </AppLayout>
  );
};

export default OperatorHistory;
