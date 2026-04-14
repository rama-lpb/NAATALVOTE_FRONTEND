import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

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
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { api, type ElectionDto } from '../services/api';
import { useAppSelector } from '../store/hooks';

/* ── Styled Components ── */
const FiltersBar = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  align-items: center;
  background: rgba(255, 255, 255, 0.88);
  border-radius: 18px;
  padding: 1rem 1.4rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
  margin-bottom: 1rem;
`;

const FilterSelect = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  background: rgba(255, 255, 255, 0.85);
  color: #1f5a33;
  cursor: pointer;
  outline: none;
  &:focus { border-color: rgba(31, 90, 51, 0.45); }
`;

const FilterInput = styled.input`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  background: rgba(255, 255, 255, 0.85);
  color: #1f5a33;
  outline: none;
  &:focus { border-color: rgba(31, 90, 51, 0.45); }
`;

const ResetBtn = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  background: transparent;
  color: rgba(31, 90, 51, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  &:hover { background: rgba(31, 90, 51, 0.08); }
`;

const CountLabel = styled.span`
  margin-left: auto;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #5a6d62;
`;

const AlertCard = styled.div`
  background: rgba(255, 255, 255, 0.88);
  border-radius: 18px;
  padding: 1rem 1.2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(31, 90, 51, 0.1);
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 0.8rem 1rem;
  align-items: center;
  transition: box-shadow 0.2s ease;
  &:hover { box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1); }
  @media (max-width: 700px) {
    grid-template-columns: 1fr auto;
  }
`;

const TypeIcon = styled.div<{ $type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  background: ${({ $type }) =>
    $type === 'VOTE_MULTIPLE' ? 'rgba(176, 58, 46, 0.1)' :
    $type === 'IP_SUSPECTE' ? 'rgba(138, 90, 16, 0.1)' :
    $type === 'CNI_INVALIDE' ? 'rgba(100, 50, 150, 0.1)' :
    'rgba(31, 90, 51, 0.1)'};
  color: ${({ $type }) =>
    $type === 'VOTE_MULTIPLE' ? 'rgba(176, 58, 46, 0.6)' :
    $type === 'IP_SUSPECTE' ? 'rgba(138, 90, 16, 0.85)' :
    $type === 'CNI_INVALIDE' ? 'rgba(100, 50, 150, 0.85)' :
    'rgba(31, 90, 51, 0.85)'};
  @media (max-width: 700px) { display: none; }
`;

const AlertInfo = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const AlertTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.92rem;
  color: #1a2e20;
`;

const AlertMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #5a6d62;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const StatusBadge = styled.span<{ $s: string }>`
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.75rem;
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

const DetailBtn = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.25);
  border-radius: 10px;
  padding: 0.45rem 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: #1f5a33;
  background: rgba(31, 90, 51, 0.07);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  transition: all 0.2s;
  &:hover {
    background: rgba(31, 90, 51, 0.15);
    border-color: rgba(31, 90, 51, 0.4);
  }
`;

const List = styled.div`
  display: grid;
  gap: 0.7rem;
`;

const Empty = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #7a9280;
  font-size: 0.95rem;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 1.2rem;
  flex-wrap: wrap;
`;

const PageBtn = styled.button<{ $active?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 0.6rem;
  border-radius: 10px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  cursor: pointer;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.6)' : 'rgba(31, 90, 51, 0.2)')};
  background: ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.6)' : 'rgba(255,255,255,0.85)')};
  color: ${({ $active }) => ($active ? '#fff' : '#1f5a33')};
  transition: all 0.15s;
  &:disabled { opacity: 0.35; cursor: not-allowed; }
  &:not(:disabled):hover {
    background: ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.72)' : 'rgba(31, 90, 51, 0.1)')};
  }
`;

const PageInfo = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #7a9280;
  padding: 0 0.4rem;
`;

/* ── Types map ── */
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

// Vocabulaire propre à "Mes alertes"
const MY_STATUS_LABEL: Record<string, string> = {
  EN_ANALYSE: 'En cours',
  RESOLUE: 'Traitee',
};

/* ── Component ── */
const OperatorAlerts = () => {
  const navigate = useNavigate();
  const operatorId = useAppSelector((s) => s.auth.user?.id ?? null);

  const [alerts, setAlerts] = useState<Awaited<ReturnType<typeof api.operateur.listAlerts>>>([]);
  const [elections, setElections] = useState<ElectionDto[]>([]);

  useEffect(() => {
    let cancelled = false;
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

  const mesAlertes = useMemo(() => {
    if (!operatorId) return [];
    return alerts.filter((a) => a.operateur_id === operatorId);
  }, [alerts, operatorId]);

  const PAGE_SIZE = 6;
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterElection, setFilterElection] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return mesAlertes
      .filter((a) => !filterType || a.type_fraude === filterType)
      .filter((a) => !filterStatus || a.statut === filterStatus)
      .filter((a) => !filterElection || a.election_id === filterElection)
      .filter((a) => {
        if (!filterDate) return true;
        return a.date_detection.startsWith(filterDate);
      })
      .sort((a, b) => new Date(b.date_detection).getTime() - new Date(a.date_detection).getTime());
  }, [mesAlertes, filterType, filterStatus, filterElection, filterDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => {
    setFilterType('');
    setFilterStatus('');
    setFilterElection('');
    setFilterDate('');
    setPage(1);
  };

  // Réinitialise la page quand les filtres changent
  const handleFilter = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setter(e.target.value);
    setPage(1);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
      + ' ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AppLayout
      role="Operateur de securite"
      title="Mes alertes"
      subtitle="Alertes que vous avez prises en charge — en cours et traitees."
      navItems={navItems}
    >
      <FiltersBar>
        <FilterSelect value={filterType} onChange={handleFilter(setFilterType)}>
          <option value="">Tous les types</option>
          <option value="VOTE_MULTIPLE">Vote multiple</option>
          <option value="IP_SUSPECTE">IP suspecte</option>
          <option value="PATTERN_SUSPECT">Pattern suspect</option>
          <option value="CNI_INVALIDE">CNI invalide</option>
        </FilterSelect>

        <FilterSelect value={filterStatus} onChange={handleFilter(setFilterStatus)}>
          <option value="">Tous les statuts</option>
          <option value="EN_ANALYSE">En cours</option>
          <option value="RESOLUE">Traitee</option>
        </FilterSelect>

        <FilterSelect value={filterElection} onChange={handleFilter(setFilterElection)}>
          <option value="">Toutes les elections</option>
          {elections.map((e) => (
            <option key={e.id} value={e.id}>{e.titre}</option>
          ))}
        </FilterSelect>

        <FilterInput
          type="date"
          value={filterDate}
          onChange={handleFilter(setFilterDate)}
          title="Filtrer par date"
        />

        {(filterType || filterStatus || filterElection || filterDate) && (
          <ResetBtn onClick={reset}>
            <i className="bi bi-x-circle" />
            Reinitialiser
          </ResetBtn>
        )}

        <CountLabel>{filtered.length} alerte{filtered.length !== 1 ? 's' : ''} — page {page}/{totalPages}</CountLabel>
      </FiltersBar>

      {filtered.length === 0 ? (
        <Empty>
          <i className="bi bi-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }} />
          {mesAlertes.length === 0
            ? 'Vous n\'avez pas encore pris en charge d\'alertes. Consultez le dashboard pour en assigner une.'
            : 'Aucune alerte ne correspond aux filtres selectionnes.'}
        </Empty>
      ) : (
        <List>
          {paginated.map((alert) => (
            <AlertCard key={alert.id}>
              <TypeIcon $type={alert.type_fraude}>
                <i className={`bi ${TYPE_ICONS[alert.type_fraude] ?? 'bi-exclamation-triangle'}`} />
              </TypeIcon>
              <AlertInfo>
                <AlertTitle>{TYPE_LABELS[alert.type_fraude] ?? alert.type_fraude}</AlertTitle>
                <AlertMeta>
                  <span><i className="bi bi-calendar2" style={{ marginRight: '0.3rem' }} />{formatDate(alert.date_detection)}</span>
                  <span style={{ color: '#a0b0a8', fontSize: '0.75rem' }}>({timeAgo(alert.date_detection)})</span>
                  <span><i className="bi bi-flag" style={{ marginRight: '0.3rem' }} />{alert.election_id ? (electionsById[alert.election_id] ?? alert.election_id) : '—'}</span>
                  {alert.ip && <span><i className="bi bi-wifi" style={{ marginRight: '0.3rem' }} />{alert.ip}</span>}
                  <span style={{ color: '#8a9a90', fontStyle: 'italic', fontSize: '0.78rem' }}>{alert.description}</span>
                </AlertMeta>
              </AlertInfo>
              <StatusBadge $s={alert.statut}>
                {MY_STATUS_LABEL[alert.statut] ?? alert.statut}
              </StatusBadge>
              <DetailBtn onClick={() => navigate('/operateur/alerts/detail', { state: { alertId: alert.id } })}>
                <i className="bi bi-eye" />
                Voir detail
              </DetailBtn>
            </AlertCard>
          ))}
        </List>
      )}

      {filtered.length > 0 && totalPages > 1 && (
        <Pagination>
          <PageBtn onClick={() => setPage(1)} disabled={page === 1} title="Première page">
            <i className="bi bi-chevron-double-left" />
          </PageBtn>
          <PageBtn onClick={() => setPage((p) => p - 1)} disabled={page === 1} title="Page précédente">
            <i className="bi bi-chevron-left" />
          </PageBtn>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .reduce<(number | '...')[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('...');
              acc.push(p);
              return acc;
            }, [])
            .map((p, idx) =>
              p === '...' ? (
                <PageInfo key={`sep-${idx}`}>…</PageInfo>
              ) : (
                <PageBtn key={p} $active={p === page} onClick={() => setPage(p as number)}>
                  {p}
                </PageBtn>
              )
            )}

          <PageBtn onClick={() => setPage((p) => p + 1)} disabled={page === totalPages} title="Page suivante">
            <i className="bi bi-chevron-right" />
          </PageBtn>
          <PageBtn onClick={() => setPage(totalPages)} disabled={page === totalPages} title="Dernière page">
            <i className="bi bi-chevron-double-right" />
          </PageBtn>
        </Pagination>
      )}
    </AppLayout>
  );
};

export default OperatorAlerts;
