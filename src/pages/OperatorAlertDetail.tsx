import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';
import { api, type ElectionDto } from '../services/api';
import { useAppSelector } from '../store/hooks';

const timeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `il y a ${mins} min`;
  if (hours < 24) return `il y a ${hours}h`;
  if (days === 1) return 'hier';
  return `il y a ${days} jours`;
};

/* ── Data helpers ── */
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

type Severity = 'critical' | 'medium' | 'low';

const getSeverity = (type: string): Severity => {
  if (type === 'VOTE_MULTIPLE') return 'critical';
  if (type === 'IP_SUSPECTE') return 'medium';
  return 'low';
};

const SEVERITY_LABELS: Record<Severity, string> = {
  critical: 'Critique',
  medium: 'Modere',
  low: 'Faible',
};

/* ── Styled Components ── */
const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #5a6d62;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const BreadLink = styled.span`
  color: rgba(31, 90, 51, 0.8);
  cursor: pointer;
  &:hover { color: rgba(31, 90, 51, 1); text-decoration: underline; }
`;

const BreadSep = styled.span`
  color: #b0bdb5;
  font-size: 0.75rem;
`;

const BreadCurrent = styled.span`
  color: #22312a;
  font-weight: 500;
`;

const TakenBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: rgba(31, 90, 51, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 14px;
  padding: 0.75rem 1.2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  color: #1f5a33;
  font-weight: 500;
  i { font-size: 1.05rem; }
`;

const TakeChargeBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.3rem;
  border-radius: 12px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  background: rgba(31, 90, 51, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  border: 1px solid rgba(31, 90, 51, 0.6);
  transition: all 0.2s;
  &:hover { filter: brightness(1.08); transform: translateY(-1px); }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1.2rem;
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainCol = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const SideCol = styled.div`
  display: grid;
  gap: 1rem;
`;

const AlertHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const AlertTitleGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const AlertTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1a2e20;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AlertId = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  color: #8a9a90;
`;

const SeverityBadge = styled.span<{ $level: Severity }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  background: ${({ $level }) =>
    $level === 'critical' ? 'rgba(176, 58, 46, 0.12)' :
    $level === 'medium' ? 'rgba(138, 90, 16, 0.12)' :
    'rgba(91, 95, 101, 0.1)'};
  color: ${({ $level }) =>
    $level === 'critical' ? 'rgba(176, 58, 46, 0.9)' :
    $level === 'medium' ? 'rgba(138, 90, 16, 0.9)' :
    'rgba(91, 95, 101, 0.8)'};
  border: 1px solid ${({ $level }) =>
    $level === 'critical' ? 'rgba(176, 58, 46, 0.2)' :
    $level === 'medium' ? 'rgba(138, 90, 16, 0.2)' :
    'rgba(91, 95, 101, 0.15)'};
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 0.8rem;
`;

const PanelTitle = styled.h3`
  margin: 0 0 0.2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  color: #22312a;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 0.6rem;
  align-items: start;
  padding: 0.65rem 0.8rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(31, 90, 51, 0.08);
`;

const DetailLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(31, 90, 51, 0.7);
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const DetailValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.87rem;
  color: #22312a;
`;

const EvidenceList = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const EvidenceItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.65rem 0.8rem;
  border-radius: 12px;
  background: rgba(176, 58, 46, 0.04);
  border: 1px solid rgba(176, 58, 46, 0.12);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.84rem;
  color: #3a1a1a;
  i { color: rgba(176, 58, 46, 0.7); margin-top: 0.1rem; flex-shrink: 0; }
`;

const ActionPanel = styled(Panel)`
  border-color: rgba(31, 90, 51, 0.18);
`;

const ActionsTitle = styled(PanelTitle)`
  border-bottom: 1px solid rgba(31, 90, 51, 0.08);
  padding-bottom: 0.6rem;
  margin-bottom: 0.2rem;
`;

const ActionButton = styled.button<{ $variant: 'danger' | 'warn' | 'success' | 'ghost'; $disabled?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: all 0.2s;
  background: ${({ $variant }) =>
    $variant === 'danger' ? 'rgba(176, 58, 46, 0.6)' :
    $variant === 'warn' ? 'rgba(138, 90, 16, 0.6)' :
    $variant === 'success' ? 'rgba(31, 90, 51, 0.6)' :
    'rgba(91, 95, 101, 0.08)'};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: ${({ $variant }) => $variant === 'ghost' ? '#5a6d62' : '#fff'};
  border: 1px solid ${({ $variant }) =>
    $variant === 'danger' ? 'rgba(176, 58, 46, 0.55)' :
    $variant === 'warn' ? 'rgba(138, 90, 16, 0.55)' :
    $variant === 'success' ? 'rgba(31, 90, 51, 0.55)' :
    'rgba(91, 95, 101, 0.2)'};
  &:hover:not(:disabled) {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.88);
  border-radius: 18px;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(31, 90, 51, 0.1);
  display: grid;
  gap: 0.5rem;
`;

const InfoTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(31, 90, 51, 0.55);
`;

const InfoValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  color: #1a2e20;
`;

const AntecedentGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const AntecedentGroupTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(31, 90, 51, 0.55);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.2rem;
`;

const AntecedentRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 0.6rem 0.8rem;
  align-items: center;
  padding: 0.6rem 0.8rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(31, 90, 51, 0.08);
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: rgba(31, 90, 51, 0.05); }
`;

const AntecedentIcon = styled.div<{ $type: string }>`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.88rem;
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

const AntecedentInfo = styled.div`
  display: grid;
  gap: 0.1rem;
  min-width: 0;
`;

const AntecedentTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.83rem;
  font-weight: 600;
  color: #1a2e20;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AntecedentMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  color: #7a9280;
`;

const AntecedentBadge = styled.span<{ $s: string }>`
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $s }) =>
    $s === 'NOUVELLE' ? 'rgba(176, 58, 46, 0.6)' :
    $s === 'EN_ANALYSE' ? 'rgba(138, 90, 16, 0.85)' :
    'rgba(31, 90, 51, 0.85)'};
  background: ${({ $s }) =>
    $s === 'NOUVELLE' ? 'rgba(176, 58, 46, 0.1)' :
    $s === 'EN_ANALYSE' ? 'rgba(138, 90, 16, 0.1)' :
    'rgba(31, 90, 51, 0.1)'};
`;

const AntecedentLink = styled.button`
  background: none;
  border: none;
  font-size: 0.8rem;
  color: rgba(31, 90, 51, 0.7);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  flex-shrink: 0;
  &:hover { color: rgba(31, 90, 51, 1); }
`;

const EmptyAntecedent = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #a0b0a8;
  font-style: italic;
  padding: 0.4rem 0.2rem;
`;

const ScoreBar = styled.div<{ $score: number }>`
  height: 8px;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.1);
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: ${({ $score }) => $score}%;
    background: ${({ $score }) =>
      $score >= 80 ? 'rgba(176, 58, 46, 0.75)' :
      $score >= 55 ? 'rgba(138, 90, 16, 0.75)' :
      'rgba(31, 90, 51, 0.65)'};
    border-radius: 999px;
  }
`;

const ScoreRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #5a6d62;
`;

const ScoreValue = styled.span<{ $score: number }>`
  font-weight: 700;
  font-size: 1.1rem;
  color: ${({ $score }) =>
    $score >= 80 ? 'rgba(176, 58, 46, 0.6)' :
    $score >= 55 ? 'rgba(138, 90, 16, 0.85)' :
    'rgba(31, 90, 51, 0.85)'};
`;

const GeoTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  border-radius: 8px;
  background: rgba(31, 90, 51, 0.07);
  border: 1px solid rgba(31, 90, 51, 0.15);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #2f3b36;
`;

const VpnTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  border-radius: 8px;
  background: rgba(176, 58, 46, 0.08);
  border: 1px solid rgba(176, 58, 46, 0.2);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(176, 58, 46, 0.6);
`;

const TentativeTimeline = styled.div`
  display: grid;
  gap: 0.4rem;
`;

const TentativeItem = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 0.5rem;
  align-items: center;
  padding: 0.55rem 0.8rem;
  border-radius: 10px;
  background: rgba(176, 58, 46, 0.04);
  border: 1px solid rgba(176, 58, 46, 0.1);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`;

const TentativeTime = styled.span`
  color: #8a9a90;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
`;

const TentativeDevice = styled.span`
  color: #5a6d62;
  font-size: 0.77rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TentativeResult = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  background: rgba(176, 58, 46, 0.1);
  color: rgba(176, 58, 46, 0.6);
  white-space: nowrap;
`;

const NoteTextarea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(31, 90, 51, 0.22);
  border-radius: 12px;
  padding: 0.7rem 0.9rem;
  font-size: 0.88rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  min-height: 90px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  &:focus {
    border-color: rgba(31, 90, 51, 0.5);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.1);
  }
`;

const ActionDesc = styled.p`
  margin: 0.2rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.73rem;
  color: #8a9a90;
  line-height: 1.4;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #7a9280;
  font-size: 1rem;
  i { font-size: 2.5rem; display: block; margin-bottom: 0.8rem; }
`;

/* ── Component ── */
const OperatorAlertDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const operatorId = useAppSelector((s) => s.auth.user?.id ?? null);

  const [alerts, setAlerts] = useState<Awaited<ReturnType<typeof api.operateur.listAlerts>>>([]);
  const [elections, setElections] = useState<ElectionDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([api.operateur.listAlerts(), api.elections.list()])
      .then(([a, e]) => {
        if (cancelled) return;
        setAlerts(a);
        setElections(e);
      })
      .catch(() => {
        if (cancelled) return;
        setAlerts([]);
        setElections([]);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const electionsById = useMemo(() => {
    const out: Record<string, string> = {};
    elections.forEach((e) => { out[e.id] = e.titre; });
    return out;
  }, [elections]);

  const navItems = useMemo(() => {
    const badge = operatorId ? alerts.filter((a) => a.operateur_id === operatorId && a.statut === 'EN_ANALYSE').length : 0;
    return [
      { label: 'Dashboard', to: '/operateur/dashboard' },
      { label: 'Mes alertes', to: '/operateur/mes-alertes', badge: badge || undefined },
      { label: 'Historique', to: '/operateur/historique' },
      { label: 'Rapports', to: '/operateur/rapports' },
    ];
  }, [alerts, operatorId]);

  const alertId: string | undefined = (location.state as any)?.alertId;
  const raw = useMemo(() => {
    if (alerts.length === 0) return null;
    return alertId ? alerts.find((a) => a.id === alertId) ?? null : alerts[0];
  }, [alerts, alertId]);

  const [taken, setTaken] = useState(false);
  const [statut, setStatut] = useState('NOUVELLE');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!raw) return;
    const wasNouvelle = raw.statut === 'NOUVELLE';
    setTaken(!wasNouvelle);
    setStatut(raw.statut);
  }, [raw?.id]);

  if (!raw) {
    return (
      <AppLayout role="Operateur de securite" title="Detail de l'alerte" navItems={navItems}>
        <NotFound>
          <i className="bi bi-shield-x" />
          {loading ? 'Chargement des alertes…' : 'Alerte introuvable. Revenez a la liste des alertes.'}
        </NotFound>
      </AppLayout>
    );
  }

  const score = (raw as any).score_risque ?? (
    raw.type_fraude === 'VOTE_MULTIPLE' ? 90 :
    raw.type_fraude === 'IP_SUSPECTE' ? 82 :
    raw.type_fraude === 'PATTERN_SUSPECT' ? 70 : 55
  );
  const localisation = (raw as any).localisation ?? null;
  const tentatives = (raw as any).tentatives as Array<{
    horodatage: string; ip: string; user_agent: string; resultat: string;
  }> | null ?? null;
  const device = (raw as any).device ?? null;

  const severity = getSeverity(raw.type_fraude);
  const citoyenId = raw.citoyen_id ?? null;
  const dateDetection = new Date(raw.date_detection);
  const formattedDate = dateDetection.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    + ' a ' + dateDetection.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  // ── Antécédents ──
  const otherAlerts = alerts.filter((a) => a.id !== raw.id);

  const byIp = raw.ip
    ? otherAlerts.filter((a) => a.ip === raw.ip)
        .sort((a, b) => new Date(b.date_detection).getTime() - new Date(a.date_detection).getTime())
    : [];

  const byCitoyen = citoyenId
    ? otherAlerts.filter((a) => a.citoyen_id === citoyenId)
        .sort((a, b) => new Date(b.date_detection).getTime() - new Date(a.date_detection).getTime())
    : [];

  // Même type de fraude, hors alertes déjà dans byIp ou byCitoyen
  const alreadyShown = new Set([...byIp.map((a) => a.id), ...byCitoyen.map((a) => a.id)]);
  const byType = otherAlerts
    .filter((a) => a.type_fraude === raw.type_fraude && !alreadyShown.has(a.id))
    .sort((a, b) => new Date(b.date_detection).getTime() - new Date(a.date_detection).getTime())
    .slice(0, 4);

  const fmtShort = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const antStatutLabel = (s: string) =>
    s === 'NOUVELLE' ? 'Non assignee' : s === 'EN_ANALYSE' ? 'En cours' : 'Traitee';

  const treat = async (nextStatut: string, description: string) => {
    try {
      if (operatorId) {
        await api.operateur.treatAlert(raw.id, { statut: nextStatut, operateur_id: operatorId, description });
      }
      setTaken(true);
      setStatut(nextStatut);
      setAlerts((prev) => prev.map((a) => a.id === raw.id ? { ...a, statut: nextStatut, operateur_id: operatorId ?? a.operateur_id } : a));
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de mettre à jour le statut de l’alerte.',
        confirmButtonText: 'OK',
        buttonsStyling: false,
        customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
      });
    }
  };

  const handleTakeCharge = () => {
    Swal.fire({
      title: 'Prendre en charge cette alerte ?',
      text: 'Vous serez l\'operateur responsable de cette analyse. L\'alerte passera en statut "En cours".',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    }).then((r) => {
      if (r.isConfirmed) {
        void treat('EN_ANALYSE', note?.trim() ? `Prise en charge — ${note.trim()}` : 'Prise en charge');
      }
    });
  };

  const handleMarkSuspect = () => {
    Swal.fire({
      title: 'Marquer comme suspect ?',
      text: 'Le compte citoyen sera place sous surveillance renforcee. Il pourra toujours voter.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    }).then((r) => {
      if (r.isConfirmed) void treat('RESOLUE', note?.trim() ? `Suspect — ${note.trim()}` : 'Suspect');
    });
  };

  const handleFalseAlert = () => {
    Swal.fire({
      title: 'Classer en fausse alerte ?',
      text: 'L\'alerte sera archivee et le compte redevient normal.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    }).then((r) => {
      if (r.isConfirmed) void treat('RESOLUE', note?.trim() ? `Fausse alerte — ${note.trim()}` : 'Fausse alerte');
    });
  };

  const handleRecommend = () => {
    navigate('/operateur/recommandation', { state: { alertId: raw.id, type: raw.type_fraude, citoyen_id: raw.citoyen_id } });
  };

  const statusColor =
    statut === 'NOUVELLE' ? 'rgba(176, 58, 46, 0.6)' :
    statut === 'EN_ANALYSE' ? 'rgba(138, 90, 16, 0.85)' :
    'rgba(31, 90, 51, 0.85)';

  const statusIcon =
    statut === 'NOUVELLE' ? 'bi-exclamation-circle' :
    statut === 'EN_ANALYSE' ? 'bi-hourglass-split' :
    'bi-check-circle';

  const statusLabel =
    statut === 'NOUVELLE' ? 'Non assignee' :
    statut === 'EN_ANALYSE' ? 'En cours' :
    'Traitee';

  return (
    <AppLayout
      role="Operateur de securite"
      title="Detail de l'alerte"
      subtitle="Analyse complete de l'anomalie detectee automatiquement."
      navItems={navItems}
    >
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadLink onClick={() => navigate('/operateur/mes-alertes')}>
          <i className="bi bi-shield-exclamation" style={{ marginRight: '0.3rem' }} />
          Mes alertes
        </BreadLink>
        <BreadSep><i className="bi bi-chevron-right" /></BreadSep>
        <BreadCurrent>{TYPE_LABELS[raw.type_fraude] ?? raw.type_fraude}</BreadCurrent>
        <BreadSep>—</BreadSep>
        <span style={{ color: '#8a9a90', fontSize: '0.8rem' }}>{raw.id.toUpperCase()}</span>
      </Breadcrumb>

      {/* Bandeau / bouton selon statut */}
      {!taken ? (
        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
          background: 'rgba(176, 58, 46, 0.06)', border: '1px solid rgba(176, 58, 46, 0.18)',
          borderRadius: '14px', padding: '0.9rem 1.2rem' }}>
          <i className="bi bi-exclamation-triangle" style={{ color: 'rgba(176, 58, 46, 0.8)', fontSize: '1.1rem' }} />
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.88rem', color: '#5a2a1a', flex: 1 }}>
            Cette alerte n'est pas encore assignee. Prenez-la en charge pour pouvoir agir.
          </span>
          <TakeChargeBtn onClick={handleTakeCharge}>
            <i className="bi bi-person-check" />
            Prendre en charge
          </TakeChargeBtn>
        </div>
      ) : (
        <TakenBanner style={{ marginBottom: '1rem' }}>
          <i className="bi bi-person-check-fill" />
          Vous etes l'operateur responsable de cette alerte.
        </TakenBanner>
      )}

      <LayoutGrid>
        <MainCol>
          <AlertHeader>
            <AlertTitleGroup>
              <AlertTitle>
                <i className={`bi ${TYPE_ICONS[raw.type_fraude] ?? 'bi-shield-exclamation'}`} style={{ color: 'rgba(176, 58, 46, 0.8)' }} />
                {TYPE_LABELS[raw.type_fraude] ?? raw.type_fraude}
              </AlertTitle>
              <AlertId>Alerte {raw.id.toUpperCase()} — Detectee le {formattedDate}</AlertId>
            </AlertTitleGroup>
            <SeverityBadge $level={severity}>
              <i className="bi bi-exclamation-triangle-fill" />
              {SEVERITY_LABELS[severity]}
            </SeverityBadge>
          </AlertHeader>

          <Panel>
            <PanelTitle><i className="bi bi-info-circle" />Informations de l'alerte</PanelTitle>
            <DetailRow>
              <DetailLabel><i className="bi bi-tag" />Type</DetailLabel>
              <DetailValue>{TYPE_LABELS[raw.type_fraude] ?? raw.type_fraude}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><i className="bi bi-person" />Citoyen</DetailLabel>
              <DetailValue>
                {citoyenId ? `ID ${citoyenId}` : 'Identite masquee'}
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><i className="bi bi-calendar2-week" />Election</DetailLabel>
              <DetailValue>{raw.election_id ? (electionsById[raw.election_id] ?? raw.election_id) : '—'}</DetailValue>
            </DetailRow>
            {raw.ip && (
              <DetailRow>
                <DetailLabel><i className="bi bi-wifi" />Adresse IP</DetailLabel>
                <DetailValue>{raw.ip}</DetailValue>
              </DetailRow>
            )}
            <DetailRow>
              <DetailLabel><i className="bi bi-activity" />Statut</DetailLabel>
              <DetailValue>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: statusColor, fontWeight: 600 }}>
                  <i className={`bi ${statusIcon}`} />
                  {statusLabel}
                </span>
              </DetailValue>
            </DetailRow>
            {localisation && (
              <DetailRow>
                <DetailLabel><i className="bi bi-geo-alt" />Localisation</DetailLabel>
                <DetailValue style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {localisation.est_vpn ? (
                    <VpnTag><i className="bi bi-shield-x" />VPN / Reseau anonyme detecte</VpnTag>
                  ) : (
                    <GeoTag><i className="bi bi-geo-alt-fill" />{localisation.ville}, {localisation.pays}</GeoTag>
                  )}
                </DetailValue>
              </DetailRow>
            )}
            {device && (
              <DetailRow>
                <DetailLabel><i className="bi bi-laptop" />Appareil</DetailLabel>
                <DetailValue>{device.navigateur} — {device.os} ({device.appareil})</DetailValue>
              </DetailRow>
            )}
          </Panel>

          <Panel>
            <PanelTitle><i className="bi bi-clipboard-data" />Preuves collectees</PanelTitle>

            {/* Score de risque */}
            <div>
              <ScoreRow>
                <span>Score de risque</span>
                <ScoreValue $score={score}>{score}/100</ScoreValue>
              </ScoreRow>
              <ScoreBar $score={score} style={{ marginTop: '0.4rem' }} />
            </div>

            {/* Timeline des tentatives si disponible */}
            {tentatives && tentatives.length > 0 ? (
              <div>
                <PanelTitle style={{ fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                  <i className="bi bi-list-columns-reverse" />Timeline des tentatives ({tentatives.length})
                </PanelTitle>
                <TentativeTimeline>
                  {tentatives.map((t, i) => {
                    const d = new Date(t.horodatage);
                    const heure = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    return (
                      <TentativeItem key={i}>
                        <TentativeTime>{heure}</TentativeTime>
                        <TentativeDevice>{t.user_agent}</TentativeDevice>
                        <TentativeResult>{t.resultat}</TentativeResult>
                      </TentativeItem>
                    );
                  })}
                </TentativeTimeline>
              </div>
            ) : (
              <EvidenceList>
                <EvidenceItem>
                  <i className="bi bi-x-circle-fill" />
                  {raw.description}
                </EvidenceItem>
              </EvidenceList>
            )}

            {raw.ip && localisation && !localisation.est_vpn && (
              <EvidenceItem>
                <i className="bi bi-geo-alt-fill" />
                IP {raw.ip} — {localisation.ville}, {localisation.pays} — Detection le {formattedDate}
              </EvidenceItem>
            )}
            {raw.ip && localisation?.est_vpn && (
              <EvidenceItem>
                <i className="bi bi-shield-x" />
                IP {raw.ip} — VPN/Reseau anonyme detecte — Origine masquee
              </EvidenceItem>
            )}
            {!localisation && raw.ip && (
              <EvidenceItem>
                <i className="bi bi-geo-alt-fill" />
                IP source : {raw.ip} — Detection le {formattedDate}
              </EvidenceItem>
            )}
          </Panel>

          {/* ── Antécédents ── */}
          <Panel>
            <PanelTitle><i className="bi bi-clock-history" />Antecedents lies a ce cas</PanelTitle>

            {/* Même IP */}
            {raw.ip && (
              <AntecedentGroup>
                <AntecedentGroupTitle>
                  <i className="bi bi-wifi" />
                  Même adresse IP ({raw.ip}) — {byIp.length} alerte{byIp.length !== 1 ? 's' : ''}
                </AntecedentGroupTitle>
                {byIp.length === 0 ? (
                  <EmptyAntecedent>Aucune autre alerte depuis cette IP.</EmptyAntecedent>
                ) : byIp.map((a) => (
                  <AntecedentRow key={a.id} onClick={() => navigate('/operateur/alerts/detail', { state: { alertId: a.id } })}>
                    <AntecedentIcon $type={a.type_fraude}>
                      <i className={`bi ${TYPE_ICONS[a.type_fraude] ?? 'bi-exclamation-triangle'}`} />
                    </AntecedentIcon>
                    <AntecedentInfo>
                      <AntecedentTitle>{TYPE_LABELS[a.type_fraude] ?? a.type_fraude}</AntecedentTitle>
                      <AntecedentMeta>{fmtShort(a.date_detection)} — {a.election_id ? (electionsById[a.election_id] ?? a.election_id) : '—'}</AntecedentMeta>
                    </AntecedentInfo>
                    <AntecedentBadge $s={a.statut}>{antStatutLabel(a.statut)}</AntecedentBadge>
                    <AntecedentLink title="Voir le detail">
                      <i className="bi bi-arrow-right" />
                    </AntecedentLink>
                  </AntecedentRow>
                ))}
              </AntecedentGroup>
            )}

            {/* Même citoyen */}
            {raw.citoyen_id && (
              <AntecedentGroup>
                <AntecedentGroupTitle>
                  <i className="bi bi-person" />
                  Même citoyen — {byCitoyen.length} alerte{byCitoyen.length !== 1 ? 's' : ''}
                </AntecedentGroupTitle>
                {byCitoyen.length === 0 ? (
                  <EmptyAntecedent>Aucun autre signalement pour ce citoyen.</EmptyAntecedent>
                ) : byCitoyen.map((a) => (
                  <AntecedentRow key={a.id} onClick={() => navigate('/operateur/alerts/detail', { state: { alertId: a.id } })}>
                    <AntecedentIcon $type={a.type_fraude}>
                      <i className={`bi ${TYPE_ICONS[a.type_fraude] ?? 'bi-exclamation-triangle'}`} />
                    </AntecedentIcon>
                    <AntecedentInfo>
                      <AntecedentTitle>{TYPE_LABELS[a.type_fraude] ?? a.type_fraude}</AntecedentTitle>
                      <AntecedentMeta>{fmtShort(a.date_detection)} — {a.election_id ? (electionsById[a.election_id] ?? a.election_id) : '—'}</AntecedentMeta>
                    </AntecedentInfo>
                    <AntecedentBadge $s={a.statut}>{antStatutLabel(a.statut)}</AntecedentBadge>
                    <AntecedentLink title="Voir le detail">
                      <i className="bi bi-arrow-right" />
                    </AntecedentLink>
                  </AntecedentRow>
                ))}
              </AntecedentGroup>
            )}

            {/* Même type */}
            <AntecedentGroup>
              <AntecedentGroupTitle>
                <i className="bi bi-diagram-3" />
                Même type de fraude ({TYPE_LABELS[raw.type_fraude]}) — {byType.length} autre{byType.length !== 1 ? 's' : ''} cas récents
              </AntecedentGroupTitle>
              {byType.length === 0 ? (
                <EmptyAntecedent>Aucun autre cas de ce type en dehors des elements ci-dessus.</EmptyAntecedent>
              ) : byType.map((a) => (
                <AntecedentRow key={a.id} onClick={() => navigate('/operateur/alerts/detail', { state: { alertId: a.id } })}>
                  <AntecedentIcon $type={a.type_fraude}>
                    <i className={`bi ${TYPE_ICONS[a.type_fraude] ?? 'bi-exclamation-triangle'}`} />
                  </AntecedentIcon>
                  <AntecedentInfo>
                    <AntecedentTitle>{TYPE_LABELS[a.type_fraude] ?? a.type_fraude}</AntecedentTitle>
                    <AntecedentMeta>
                      {fmtShort(a.date_detection)} — {a.election_id ? (electionsById[a.election_id] ?? a.election_id) : '—'}
                      {a.ip ? ` — IP ${a.ip}` : ''}
                    </AntecedentMeta>
                  </AntecedentInfo>
                  <AntecedentBadge $s={a.statut}>{antStatutLabel(a.statut)}</AntecedentBadge>
                  <AntecedentLink title="Voir le detail">
                    <i className="bi bi-arrow-right" />
                  </AntecedentLink>
                </AntecedentRow>
              ))}
            </AntecedentGroup>

            {/* Cas : aucun lien du tout */}
            {!raw.ip && !raw.citoyen_id && byType.length === 0 && (
              <EmptyAntecedent>Aucun antecedent trouve pour cette alerte.</EmptyAntecedent>
            )}
          </Panel>

          <Panel>
            <PanelTitle><i className="bi bi-pencil-square" />Note interne</PanelTitle>
            <p style={{ margin: '0 0 0.4rem', fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#8a9a90' }}>
              Visible uniquement par les operateurs. Sera jointe au dossier si vous recommandez une suspension.
            </p>
            <NoteTextarea
              placeholder="Ajoutez vos observations, analyses ou informations complementaires..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Panel>
        </MainCol>

        <SideCol>
          <InfoCard>
            <InfoTitle>Election concernee</InfoTitle>
            <InfoValue>{raw.election_id ? (electionsById[raw.election_id] ?? raw.election_id) : '—'}</InfoValue>
          </InfoCard>
          {citoyenId && (
            <InfoCard>
              <InfoTitle>Citoyen concerne</InfoTitle>
              <InfoValue>{citoyenId}</InfoValue>
            </InfoCard>
          )}
          <InfoCard>
            <InfoTitle>Detectee</InfoTitle>
            <InfoValue style={{ fontSize: '0.85rem' }}>{formattedDate}</InfoValue>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#8a9a90' }}>
              {timeAgo(raw.date_detection)}
            </div>
          </InfoCard>

          <ActionPanel>
            <ActionsTitle><i className="bi bi-lightning" />Actions disponibles</ActionsTitle>
            {!taken && (
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#8a9a90', margin: '0 0 0.2rem' }}>
                Prenez en charge l'alerte pour debloquer les actions.
              </p>
            )}
            <div>
              <ActionButton $variant="danger" $disabled={!taken} onClick={taken ? handleRecommend : undefined}>
                <i className="bi bi-person-dash" />
                Recommander suspension
              </ActionButton>
              <ActionDesc>Escalade au SuperAdmin. Le compte sera suspendu si valide. Action irreversible.</ActionDesc>
            </div>
            <div>
              <ActionButton $variant="warn" $disabled={!taken} onClick={taken ? handleMarkSuspect : undefined}>
                <i className="bi bi-eye" />
                Marquer comme suspect
              </ActionButton>
              <ActionDesc>Surveillance renforcee. Le citoyen peut encore voter. Aucune escalade.</ActionDesc>
            </div>
            <div>
              <ActionButton $variant="ghost" $disabled={!taken} onClick={taken ? handleFalseAlert : undefined}>
                <i className="bi bi-check-circle" />
                Fausse alerte
              </ActionButton>
              <ActionDesc>Archive l'alerte. Le compte redevient normal. Aucune action supplementaire.</ActionDesc>
            </div>
          </ActionPanel>
        </SideCol>
      </LayoutGrid>
    </AppLayout>
  );
};

export default OperatorAlertDetail;
