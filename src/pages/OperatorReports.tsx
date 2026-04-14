import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';
import { api, type ElectionDto } from '../services/api';
import { useAppSelector } from '../store/hooks';

const TYPE_LABELS: Record<string, string> = {
  VOTE_MULTIPLE: 'Vote multiple',
  IP_SUSPECTE: 'IP suspecte',
  PATTERN_SUSPECT: 'Pattern suspect',
  CNI_INVALIDE: 'CNI invalide',
};

const TYPE_COLORS: Record<string, string> = {
  VOTE_MULTIPLE: 'rgba(176, 58, 46, 0.65)',
  IP_SUSPECTE: 'rgba(138, 90, 16, 0.65)',
  PATTERN_SUSPECT: 'rgba(31, 90, 51, 0.65)',
  CNI_INVALIDE: 'rgba(100, 50, 150, 0.65)',
};

/* ── Styled ── */
const LayoutGrid = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const PeriodBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const PeriodChip = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.5)' : 'rgba(31, 90, 51, 0.18)'};
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(31, 90, 51, 0.06)'};
  color: ${({ $active }) => $active ? '#fff' : 'rgba(31, 90, 51, 0.8)'};
  border-radius: 999px;
  padding: 0.32rem 0.85rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
`;

const PeriodLabel = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #7a9280;
  margin-left: auto;
`;

const StatsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div<{ $accent: string }>`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 18px;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(31, 90, 51, 0.1);
  border-left: 5px solid ${({ $accent }) => $accent};
  box-shadow: 0 8px 18px rgba(12, 24, 18, 0.07);
`;

const StatLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #6b7a72;
`;

const StatValue = styled.h3`
  margin: 0.35rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.7rem;
  font-weight: 700;
  color: #1a2e20;
  line-height: 1;
`;

const StatSub = styled.p`
  margin: 0.2rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  color: #8a9a90;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.2rem;
  align-items: stretch;
  @media (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  padding: 1.3rem 1.5rem;
  box-shadow: 0 12px 26px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  height: 100%;
  box-sizing: border-box;
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1f5a33;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ReportCard = styled.div`
  border: 1px solid rgba(31, 90, 51, 0.1);
  border-radius: 14px;
  padding: 0.9rem 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.7rem;
  align-items: start;
  background: rgba(255, 255, 255, 0.8);
  transition: box-shadow 0.18s;
  &:hover { box-shadow: 0 4px 14px rgba(12, 24, 18, 0.09); }
`;

const ReportLeft = styled.div`
  display: grid;
  gap: 0.25rem;
`;

const ReportTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: #1a2e20;
`;

const ReportMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  color: #7a9280;
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  align-items: center;
`;

const ReportTags = styled.div`
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
  margin-top: 0.3rem;
`;

const Tag = styled.span<{ $color: string }>`
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  background: ${({ $color }) => $color}22;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}44;
`;

const StatusPill = styled.span<{ $ok?: boolean; $pending?: boolean }>`
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  background: ${({ $ok, $pending }) =>
    $ok ? 'rgba(31, 90, 51, 0.1)' : $pending ? 'rgba(138, 90, 16, 0.1)' : 'rgba(100,100,100,0.08)'};
  color: ${({ $ok, $pending }) =>
    $ok ? 'rgba(31, 90, 51, 0.9)' : $pending ? 'rgba(138, 90, 16, 0.9)' : '#6b7a72'};
`;

const ReportActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-end;
`;

const DownloadBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.38rem 0.75rem;
  border-radius: 10px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(31, 90, 51, 0.85);
  background: rgba(31, 90, 51, 0.07);
  border: 1px solid rgba(31, 90, 51, 0.2);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.18s;
  &:hover { background: rgba(31, 90, 51, 0.14); border-color: rgba(31, 90, 51, 0.35); }
`;

const SideStack = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 1.1rem;
  height: 100%;
  align-items: stretch;
`;

const SidePanel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  padding: 1.1rem 1.3rem;
  box-shadow: 0 12px 26px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  box-sizing: border-box;
`;

/* ── Bar chart interne ── */
const BarList = styled.div`
  display: grid;
  gap: 0.55rem;
`;

const BarRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
  align-items: center;
`;

const BarLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #2f3b36;
  margin-bottom: 0.2rem;
`;

const BarTrack = styled.div`
  height: 8px;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.1);
  overflow: hidden;
`;

const BarFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color};
  border-radius: 999px;
  transition: width 0.6s ease;
`;

const BarPct = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: #3f5e4b;
  white-space: nowrap;
  min-width: 35px;
  text-align: right;
`;

/* ── Suspension outcome ── */
const OutcomeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.55rem 0.7rem;
  border-radius: 10px;
  border: 1px solid rgba(31, 90, 51, 0.08);
  background: rgba(255, 255, 255, 0.7);
`;

const OutcomeLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #2a3a2f;
  display: flex;
  align-items: center;
  gap: 0.45rem;
`;

const OutcomeCount = styled.span<{ $color: string }>`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ $color }) => $color};
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(31, 90, 51, 0.08);
  flex-shrink: 0;
`;

const ReportsScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-height: 0;
`;

const EmptyNote = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #a0b0a8;
  font-style: italic;
  padding: 0.5rem 0;
  text-align: center;
`;

/* ── Generate button ── */
const GenerateBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border-radius: 10px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: #fff;
  background: rgba(31, 90, 51, 0.55);
  border: none;
  cursor: pointer;
  transition: background 0.18s;
  justify-self: start;
  &:hover { background: rgba(31, 90, 51, 0.72); }
`;

/* ── Component ── */
type Period = 'semaine' | 'mois' | 'tout';

const OperatorReports = () => {
  const operatorId = useAppSelector((s) => s.auth.user?.id ?? null);

  const [allAlerts, setAllAlerts] = useState<Awaited<ReturnType<typeof api.operateur.listAlerts>>>([]);
  const [allSuspensions, setAllSuspensions] = useState<Awaited<ReturnType<typeof api.operateur.listSuspensions>>>([]);
  const [elections, setElections] = useState<ElectionDto[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([api.operateur.listAlerts(), api.operateur.listSuspensions(), api.elections.list()])
      .then(([a, s, e]) => {
        if (cancelled) return;
        setAllAlerts(a);
        setAllSuspensions(s);
        setElections(e);
      })
      .catch(() => {
        if (cancelled) return;
        setAllAlerts([]);
        setAllSuspensions([]);
        setElections([]);
      });
    return () => { cancelled = true; };
  }, []);

  const [period, setPeriod] = useState<Period>('tout');

  const allMyAlerts = useMemo(
    () => (operatorId ? allAlerts.filter((a) => a.operateur_id === operatorId) : []),
    [allAlerts, operatorId]
  );

  const mySuspensions = useMemo(
    () => (operatorId ? allSuspensions.filter((s) => s.operateur_id === operatorId) : []),
    [allSuspensions, operatorId]
  );

  const navItems = useMemo(() => {
    const badge = allMyAlerts.filter((a: any) => a.statut === 'EN_ANALYSE').length;
    return [
      { label: 'Dashboard', to: '/operateur/dashboard' },
      { label: 'Mes alertes', to: '/operateur/mes-alertes', badge: badge || undefined },
      { label: 'Historique', to: '/operateur/historique' },
      { label: 'Rapports', to: '/operateur/rapports' },
    ];
  }, [allMyAlerts]);

  const electionsById = useMemo(() => {
    const out: Record<string, string> = {};
    elections.forEach((e) => { out[e.id] = e.titre; });
    return out;
  }, [elections]);

  const cutoff = useMemo(() => {
    const now = new Date();
    if (period === 'semaine') return new Date(now.getTime() - 7 * 86400000);
    if (period === 'mois') return new Date(now.getTime() - 30 * 86400000);
    return new Date(0);
  }, [period]);

  const alerts = useMemo(
    () => allMyAlerts.filter((a: any) => new Date(a.date_detection) >= cutoff),
    [allMyAlerts, cutoff]
  );

  const suspensions = useMemo(
    () => mySuspensions.filter((s: any) => new Date(s.date_creation) >= cutoff),
    [mySuspensions, cutoff]
  );

  /* Stats */
  const total = alerts.length;
  const resolues = alerts.filter((a: any) => a.statut === 'RESOLUE').length;
  const enCours = alerts.filter((a: any) => a.statut === 'EN_ANALYSE').length;
  const suspCount = suspensions.length;
  const tauxTraitement = total > 0 ? Math.round((resolues / total) * 100) : 0;

  /* Type distribution */
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    alerts.forEach((a: any) => { counts[a.type_fraude] = (counts[a.type_fraude] ?? 0) + 1; });
    return Object.entries(counts)
      .map(([type, count]) => ({ type, count, pct: total > 0 ? Math.round((count / total) * 100) : 0 }))
      .sort((a, b) => b.count - a.count);
  }, [alerts, total]);

  /* Election distribution */
  const elecCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    alerts.forEach((a: any) => {
      if (!a.election_id) return;
      counts[a.election_id] = (counts[a.election_id] ?? 0) + 1;
    });
    return Object.entries(counts)
      .map(([id, count]) => ({ id, count, pct: total > 0 ? Math.round((count / total) * 100) : 0 }))
      .sort((a, b) => b.count - a.count);
  }, [alerts, total]);

  /* Suspension outcomes */
  const suspAttente = suspensions.filter((s: any) => s.statut === 'EN_ATTENTE').length;
  const suspApprouve = suspensions.filter((s: any) => s.statut === 'APPROUVE').length;
  const suspRejete = suspensions.filter((s: any) => s.statut === 'REJETE').length;

  /* Reports list */
  const PERIOD_LABELS: Record<Period, string> = {
    semaine: 'Semaine en cours',
    mois: '30 derniers jours',
    tout: 'Toute periode',
  };

  const handleDownload = (title: string) => {
    Swal.fire({
      title: `Telecharger "${title}"`,
      html: `
        <p style="font-family:Poppins,sans-serif;font-size:0.88rem;color:#3f5e4b;margin-bottom:0.8rem">
          Choisissez le format de telechargement.
        </p>
        <div style="display:flex;gap:0.8rem;justify-content:center">
          <label style="display:flex;align-items:center;gap:0.4rem;font-family:Poppins,sans-serif;font-size:0.85rem;cursor:pointer">
            <input type="radio" name="dfmt" value="pdf" checked style="accent-color:#1f5a33"/> PDF
          </label>
          <label style="display:flex;align-items:center;gap:0.4rem;font-family:Poppins,sans-serif;font-size:0.85rem;cursor:pointer">
            <input type="radio" name="dfmt" value="csv" style="accent-color:#1f5a33"/> CSV
          </label>
          <label style="display:flex;align-items:center;gap:0.4rem;font-family:Poppins,sans-serif;font-size:0.85rem;cursor:pointer">
            <input type="radio" name="dfmt" value="xlsx" style="accent-color:#1f5a33"/> Excel
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
        const fmt = (document.querySelector('input[name="dfmt"]:checked') as HTMLInputElement)?.value ?? 'pdf';
        Swal.fire({
          icon: 'success',
          title: 'Telechargement lance',
          text: `Le rapport "${title}" est en cours de generation au format ${fmt.toUpperCase()}.`,
          confirmButtonText: 'OK',
          timer: 2500,
          timerProgressBar: true,
          buttonsStyling: false,
          customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
        });
      }
    });
  };

  const handleGenerate = () => {
    Swal.fire({
      title: 'Generer un nouveau rapport',
      html: `
        <div style="display:grid;gap:0.6rem;text-align:left;font-family:Poppins,sans-serif">
          <label style="font-size:0.83rem;font-weight:600;color:#2f3b36">Type de rapport</label>
          <select id="rtype" style="width:100%;padding:0.4rem 0.7rem;border-radius:8px;border:1px solid rgba(31,90,51,0.2);font-family:Poppins,sans-serif;font-size:0.85rem;outline:none">
            <option value="hebdo">Rapport hebdomadaire</option>
            <option value="election">Rapport par election</option>
            <option value="alertes">Rapport alertes critiques</option>
            <option value="suspensions">Rapport suspensions</option>
          </select>
          <label style="font-size:0.83rem;font-weight:600;color:#2f3b36;margin-top:0.3rem">Periode</label>
          <select id="rperiod" style="width:100%;padding:0.4rem 0.7rem;border-radius:8px;border:1px solid rgba(31,90,51,0.2);font-family:Poppins,sans-serif;font-size:0.85rem;outline:none">
            <option value="semaine">Cette semaine</option>
            <option value="mois">Ce mois</option>
            <option value="tout">Toute la periode</option>
          </select>
        </div>
      `,
      icon: undefined,
      showCancelButton: true,
      confirmButtonText: 'Generer',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Rapport en generation',
          text: 'Le rapport sera disponible dans quelques instants dans la liste ci-dessous.',
          confirmButtonText: 'OK',
          timer: 2500,
          timerProgressBar: true,
          buttonsStyling: false,
          customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
        });
      }
    });
  };

  const periodLabel = PERIOD_LABELS[period];

  return (
    <AppLayout
      role="Operateur de securite"
      title="Rapports de fraude"
      subtitle="Synthese de vos analyses, recommandations et tendances."
      navItems={navItems}
    >
      <LayoutGrid>
        {/* Period selector */}
        <PeriodBar>
          {(['semaine', 'mois', 'tout'] as Period[]).map((p) => (
            <PeriodChip key={p} $active={period === p} onClick={() => setPeriod(p)}>
              {p === 'semaine' ? 'Cette semaine' : p === 'mois' ? 'Ce mois' : 'Toute periode'}
            </PeriodChip>
          ))}
          <PeriodLabel>
            <i className="bi bi-calendar3" style={{ marginRight: '0.3rem' }} />
            {periodLabel} · {total} alerte{total !== 1 ? 's' : ''} geree{total !== 1 ? 's' : ''}
          </PeriodLabel>
        </PeriodBar>

        {/* Stats strip */}
        <StatsStrip>
          <StatCard $accent="rgba(31, 90, 51, 0.6)">
            <StatLabel>Alertes gerees</StatLabel>
            <StatValue>{total}</StatValue>
            <StatSub>{enCours} encore en cours</StatSub>
          </StatCard>
          <StatCard $accent="rgba(38, 76, 140, 0.6)">
            <StatLabel>Alertes resolues</StatLabel>
            <StatValue>{resolues}</StatValue>
            <StatSub>Taux : {tauxTraitement}%</StatSub>
          </StatCard>
          <StatCard $accent="rgba(176, 58, 46, 0.6)">
            <StatLabel>Suspensions recommandees</StatLabel>
            <StatValue>{suspCount}</StatValue>
            <StatSub>{suspApprouve} approuvee{suspApprouve !== 1 ? 's' : ''} · {suspRejete} rejetee{suspRejete !== 1 ? 's' : ''}</StatSub>
          </StatCard>
          <StatCard $accent="rgba(138, 90, 16, 0.6)">
            <StatLabel>Taux de traitement</StatLabel>
            <StatValue>{tauxTraitement}%</StatValue>
            <StatSub>
              <span style={{
                display: 'inline-block',
                width: '100%',
                height: '5px',
                borderRadius: '999px',
                background: 'rgba(31,90,51,0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <span style={{
                  display: 'block',
                  height: '100%',
                  width: `${tauxTraitement}%`,
                  background: 'rgba(138, 90, 16, 0.6)',
                  borderRadius: '999px',
                }} />
              </span>
            </StatSub>
          </StatCard>
        </StatsStrip>

        <TwoCol>
          {/* Reports list */}
          <Panel>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem' }}>
              <PanelTitle><i className="bi bi-file-earmark-bar-graph" />Mes rapports</PanelTitle>
              <GenerateBtn onClick={handleGenerate}>
                <i className="bi bi-plus-circle" />
                Generer un rapport
              </GenerateBtn>
            </div>

            <Divider />

            <ReportsScroll>
            {/* Rapport hebdo */}
            <ReportCard>
              <ReportLeft>
                <ReportTitle>Rapport hebdomadaire — Semaine 13</ReportTitle>
                <ReportMeta>
                  <span><i className="bi bi-calendar2" style={{ marginRight: '0.3rem' }} />25/03/2026</span>
                  <span><i className="bi bi-graph-up" style={{ marginRight: '0.3rem' }} />{total} alertes · {suspCount} suspensions</span>
                  <StatusPill $ok>Genere</StatusPill>
                </ReportMeta>
                <ReportTags>
                  {typeCounts.slice(0, 3).map(({ type }) => (
                    <Tag key={type} $color={TYPE_COLORS[type] ?? 'rgba(31,90,51,0.6)'}>
                      {TYPE_LABELS[type] ?? type}
                    </Tag>
                  ))}
                </ReportTags>
              </ReportLeft>
              <ReportActions>
                <DownloadBtn onClick={() => handleDownload('Rapport hebdomadaire — Semaine 13')}>
                  <i className="bi bi-download" />PDF
                </DownloadBtn>
                <DownloadBtn onClick={() => handleDownload('Rapport hebdomadaire — Semaine 13')}>
                  <i className="bi bi-filetype-csv" />CSV
                </DownloadBtn>
              </ReportActions>
            </ReportCard>

            {/* Rapport election */}
            {elecCounts.length > 0 && (
              <ReportCard>
                <ReportLeft>
                  <ReportTitle>
                    Rapport — {electionsById[elecCounts[0].id] ?? elecCounts[0].id}
                  </ReportTitle>
                  <ReportMeta>
                    <span><i className="bi bi-calendar2" style={{ marginRight: '0.3rem' }} />26/03/2026</span>
                    <span><i className="bi bi-flag" style={{ marginRight: '0.3rem' }} />{elecCounts[0].count} alertes gerees</span>
                    <StatusPill $ok>Genere</StatusPill>
                  </ReportMeta>
                  <ReportTags>
                    <Tag $color="rgba(31, 90, 51, 0.65)">Vue d'ensemble</Tag>
                    <Tag $color="rgba(38, 76, 140, 0.65)">IP suspectes</Tag>
                  </ReportTags>
                </ReportLeft>
                <ReportActions>
                  <DownloadBtn onClick={() => handleDownload(`Rapport ${electionsById[elecCounts[0].id] ?? elecCounts[0].id}`)}>
                    <i className="bi bi-download" />PDF
                  </DownloadBtn>
                </ReportActions>
              </ReportCard>
            )}

            {/* Rapport suspensions */}
            {suspCount > 0 && (
              <ReportCard>
                <ReportLeft>
                  <ReportTitle>Rapport suspensions — Mars 2026</ReportTitle>
                  <ReportMeta>
                    <span><i className="bi bi-calendar2" style={{ marginRight: '0.3rem' }} />23/03/2026</span>
                    <span><i className="bi bi-person-dash" style={{ marginRight: '0.3rem' }} />{suspCount} recommandation{suspCount !== 1 ? 's' : ''}</span>
                    <StatusPill $pending>En cours</StatusPill>
                  </ReportMeta>
                  <ReportTags>
                    <Tag $color="rgba(176, 58, 46, 0.65)">Suspensions</Tag>
                    <Tag $color="rgba(138, 90, 16, 0.65)">Vote multiple</Tag>
                  </ReportTags>
                </ReportLeft>
                <ReportActions>
                  <DownloadBtn onClick={() => handleDownload('Rapport suspensions — Mars 2026')}>
                    <i className="bi bi-download" />PDF
                  </DownloadBtn>
                </ReportActions>
              </ReportCard>
            )}

            {total === 0 && (
              <EmptyNote>Aucune activite sur cette periode.</EmptyNote>
            )}
            </ReportsScroll>
          </Panel>

          {/* Side charts */}
          <SideStack>
            {/* Par type */}
            <SidePanel>
              <PanelTitle><i className="bi bi-bar-chart" />Alertes par type</PanelTitle>
              <Divider />
              {typeCounts.length === 0 ? (
                <EmptyNote>Aucune alerte sur cette periode.</EmptyNote>
              ) : (
                <BarList>
                  {typeCounts.map(({ type, count, pct }) => (
                    <div key={type}>
                      <BarRow>
                        <BarLabel>{TYPE_LABELS[type] ?? type}</BarLabel>
                        <BarPct>{count} ({pct}%)</BarPct>
                      </BarRow>
                      <BarTrack>
                        <BarFill $pct={pct} $color={TYPE_COLORS[type] ?? 'rgba(31,90,51,0.6)'} />
                      </BarTrack>
                    </div>
                  ))}
                </BarList>
              )}
            </SidePanel>

            {/* Par election */}
            <SidePanel>
              <PanelTitle><i className="bi bi-flag" />Alertes par election</PanelTitle>
              <Divider />
              {elecCounts.length === 0 ? (
                <EmptyNote>Aucune alerte sur cette periode.</EmptyNote>
              ) : (
                <BarList>
                  {elecCounts.map(({ id, count, pct }) => (
                    <div key={id}>
                      <BarRow>
                        <BarLabel style={{ fontSize: '0.75rem' }}>{electionsById[id] ?? id}</BarLabel>
                        <BarPct>{count} ({pct}%)</BarPct>
                      </BarRow>
                      <BarTrack>
                        <BarFill $pct={pct} $color="rgba(31, 90, 51, 0.6)" />
                      </BarTrack>
                    </div>
                  ))}
                </BarList>
              )}
            </SidePanel>

            {/* Suspensions outcomes */}
            <SidePanel>
              <PanelTitle><i className="bi bi-person-dash" />Decisions SuperAdmin</PanelTitle>
              <Divider />
              {suspCount === 0 ? (
                <EmptyNote>Aucune suspension recommandee sur cette periode.</EmptyNote>
              ) : (
                <>
                  <OutcomeRow>
                    <OutcomeLabel>
                      <i className="bi bi-hourglass-split" style={{ color: 'rgba(138, 90, 16, 0.7)' }} />
                      En attente
                    </OutcomeLabel>
                    <OutcomeCount $color="rgba(138, 90, 16, 0.85)">{suspAttente}</OutcomeCount>
                  </OutcomeRow>
                  <OutcomeRow>
                    <OutcomeLabel>
                      <i className="bi bi-check-circle-fill" style={{ color: 'rgba(31, 90, 51, 0.7)' }} />
                      Approuvees
                    </OutcomeLabel>
                    <OutcomeCount $color="rgba(31, 90, 51, 0.85)">{suspApprouve}</OutcomeCount>
                  </OutcomeRow>
                  <OutcomeRow>
                    <OutcomeLabel>
                      <i className="bi bi-x-circle-fill" style={{ color: 'rgba(176, 58, 46, 0.7)' }} />
                      Rejetees
                    </OutcomeLabel>
                    <OutcomeCount $color="rgba(176, 58, 46, 0.6)">{suspRejete}</OutcomeCount>
                  </OutcomeRow>
                  {suspApprouve + suspRejete > 0 && (
                    <div style={{
                      fontFamily: 'Poppins,sans-serif',
                      fontSize: '0.75rem',
                      color: '#8a9a90',
                      textAlign: 'center',
                      marginTop: '0.2rem',
                    }}>
                      Taux d'approbation :{' '}
                      <strong style={{ color: 'rgba(31,90,51,0.85)' }}>
                        {Math.round((suspApprouve / (suspApprouve + suspRejete)) * 100)}%
                      </strong>
                    </div>
                  )}
                </>
              )}
            </SidePanel>
          </SideStack>
        </TwoCol>
      </LayoutGrid>
    </AppLayout>
  );
};

export default OperatorReports;
