import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { api } from '../services/api';
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

/* ── Styled Components ── */
const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 1.4rem;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const SideColumn = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Hello = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1f5a33;
  font-size: 1.15rem;
`;

const HelperText = styled.p`
  margin: 0.2rem 0 0;
  color: #3f5e4b;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div<{ $accent: string }>`
  background: rgba(255, 255, 255, 0.88);
  border-radius: 18px;
  padding: 1rem 1.2rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
  border-left: 6px solid ${({ $accent }) => $accent};
`;

const StatLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #4a6a57;
  font-size: 0.9rem;
`;

const StatValue = styled.h3`
  margin: 0.4rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.6rem;
  font-weight: 600;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.88);
  border-radius: 22px;
  padding: 1.2rem 1.4rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const CardTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1f5a33;
  font-size: 1.2rem;
`;

const Table = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.6fr auto;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.12);
  align-items: center;
  @media (max-width: 700px) {
    grid-template-columns: 1fr auto;
  }
`;

const RowTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1f5a33;
`;

const RowMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  font-size: 0.88rem;
`;

const Tag = styled.span<{ $tone: 'new' | 'review' | 'resolved' }>`
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $tone }) =>
    $tone === 'new' ? 'rgba(122, 31, 31, 0.85)' : $tone === 'review' ? 'rgba(138, 90, 16, 0.85)' : 'rgba(42, 100, 65, 0.85)'};
  background: ${({ $tone }) =>
    $tone === 'new'
      ? 'rgba(210, 70, 70, 0.12)'
      : $tone === 'review'
        ? 'rgba(200, 140, 30, 0.12)'
        : 'rgba(20, 130, 80, 0.12)'};
`;

const DetailBtn = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.25);
  border-radius: 10px;
  padding: 0.35rem 0.75rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1f5a33;
  background: rgba(31, 90, 51, 0.07);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  white-space: nowrap;
  transition: all 0.2s;
  &:hover {
    background: rgba(31, 90, 51, 0.15);
    border-color: rgba(31, 90, 51, 0.4);
  }
`;

const MiniList = styled.div`
  display: grid;
  gap: 0.7rem;
`;

const MiniRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.6rem;
  align-items: center;
`;

const VoirToutesBtn = styled.button`
  margin-top: 0.6rem;
  background: none;
  border: none;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(31, 90, 51, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0;
  &:hover { color: rgba(31, 90, 51, 1); }
`;

const Bar = styled.div<{ $value: number; $color: string }>`
  height: 8px;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: ${({ $value }) => $value}%;
    background: ${({ $color }) => $color};
  }
`;

/* ── Helpers ── */
const TYPE_LABELS: Record<string, string> = {
  VOTE_MULTIPLE: 'Vote multiple',
  IP_SUSPECTE: 'IP suspecte',
  PATTERN_SUSPECT: 'Pattern suspect',
  CNI_INVALIDE: 'CNI invalide',
};

const toTone = (s: string): 'new' | 'review' | 'resolved' =>
  s === 'NOUVELLE' ? 'new' : s === 'EN_ANALYSE' ? 'review' : 'resolved';

// Labels du dashboard : vocabulaire global (pas celui de l'opérateur)
const toLabel = (s: string) =>
  s === 'NOUVELLE' ? 'Non assignee' : s === 'EN_ANALYSE' ? 'Pris en charge' : 'Traitee';

const TYPE_COLORS: Record<string, string> = {
  VOTE_MULTIPLE: 'rgba(176, 58, 46, 0.65)',
  IP_SUSPECTE: 'rgba(31, 90, 51, 0.65)',
  CNI_INVALIDE: 'rgba(100, 50, 150, 0.65)',
  PATTERN_SUSPECT: 'rgba(138, 90, 16, 0.65)',
};

/* ── Component ── */
const OperatorDashboard = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(s => s.auth.user);

  const [alerts, setAlerts] = useState<{
    id: string; type_fraude: string; election_id: string | null;
    description: string; statut: string; date_detection: string;
    operateur_id: string | null; date_traitement: string | null; ip: string | null;
  }[]>([]);
  const [electionsById, setElectionsById] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([api.operateur.listAlerts(), api.elections.list()])
      .then(([a, e]) => {
        if (cancelled) return;
        setAlerts(a);
        const map: Record<string, string> = {};
        e.forEach((el) => { map[el.id] = el.titre; });
        setElectionsById(map);
      })
      .catch(() => {
        if (cancelled) return;
        setAlerts([]);
        setElectionsById({});
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const myId = currentUser?.id ?? '';
  const myAlerts = alerts.filter(a => a.operateur_id === myId);
  const mesEnCours = myAlerts.filter(a => a.statut === 'EN_ANALYSE').length;

  const navItems = [
    { label: 'Dashboard', to: '/operateur/dashboard' },
    { label: 'Mes alertes', to: '/operateur/mes-alertes', badge: mesEnCours },
    { label: 'Historique', to: '/operateur/historique' },
    { label: 'Rapports', to: '/operateur/rapports' },
  ];

  const last5 = [...alerts]
    .sort((a, b) => new Date(b.date_detection).getTime() - new Date(a.date_detection).getTime())
    .slice(0, 5);

  const nbCritiques = alerts.filter(a => a.statut === 'NOUVELLE').length;
  const nbAnalyse = alerts.filter(a => a.statut === 'EN_ANALYSE').length;
  const nbResolues = alerts.filter(a => a.statut === 'RESOLUE').length;

  const typeCounts = alerts.reduce<Record<string, number>>((acc, a) => {
    acc[a.type_fraude] = (acc[a.type_fraude] ?? 0) + 1;
    return acc;
  }, {});
  const total = alerts.length || 1;

  const typeStats = Object.entries(typeCounts)
    .map(([type, count]) => ({ type, count, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  const recentActions = [...myAlerts]
    .filter(a => a.date_traitement)
    .sort((a, b) => new Date(b.date_traitement!).getTime() - new Date(a.date_traitement!).getTime())
    .slice(0, 4);

  const fmtTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <AppLayout
      role="Operateur de securite"
      title="Centre de vigilance"
      subtitle="Surveillance temps reel des signaux de fraude."
      navItems={navItems}
    >
      <LayoutGrid>
        <MainColumn>
          <Greeting>
            <div>
              <Hello>Bonjour, {currentUser ? `${currentUser.prenom} ${currentUser.nom}` : 'Operateur'}</Hello>
              <HelperText>Les alertes critiques sont priorisees automatiquement.</HelperText>
            </div>
          </Greeting>

          <Stats>
            <StatCard $accent="rgba(176, 58, 46, 0.6)">
              <StatLabel>Non assignees</StatLabel>
              <StatValue>{loading ? '…' : nbCritiques}</StatValue>
            </StatCard>
            <StatCard $accent="rgba(138, 90, 16, 0.6)">
              <StatLabel>Prises en charge</StatLabel>
              <StatValue>{loading ? '…' : nbAnalyse}</StatValue>
            </StatCard>
            <StatCard $accent="rgba(31, 90, 51, 0.6)">
              <StatLabel>Traitees</StatLabel>
              <StatValue>{loading ? '…' : nbResolues}</StatValue>
            </StatCard>
          </Stats>

          <Card>
            <CardTitle>5 dernieres alertes</CardTitle>
            <Table>
              {last5.map((alert) => (
                <Row key={alert.id}>
                  <div>
                    <RowTitle>{TYPE_LABELS[alert.type_fraude] ?? alert.type_fraude}</RowTitle>
                    <RowMeta>{alert.election_id ? (electionsById[alert.election_id] ?? alert.election_id) : '—'}</RowMeta>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#a0b0a8' }}>{timeAgo(alert.date_detection)}</div>
                  </div>
                  <RowMeta style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {alert.ip ?? '—'}
                  </RowMeta>
                  <Tag $tone={toTone(alert.statut)}>{toLabel(alert.statut)}</Tag>
                  <DetailBtn
                    onClick={() => navigate('/operateur/alerts/detail', { state: { alertId: alert.id } })}
                  >
                    <i className="bi bi-eye" />
                    Voir detail
                  </DetailBtn>
                </Row>
              ))}
            </Table>
            <VoirToutesBtn onClick={() => navigate('/operateur/mes-alertes')}>
              Voir toutes les alertes <i className="bi bi-arrow-right" />
            </VoirToutesBtn>
          </Card>
        </MainColumn>

        <SideColumn>
          <Card>
            <CardTitle>Alertes par type</CardTitle>
            <MiniList>
              {typeStats.map(({ type, pct }) => (
                <>
                  <MiniRow key={type + '_row'}>
                    <RowMeta>{TYPE_LABELS[type] ?? type}</RowMeta>
                    <RowMeta>{pct}%</RowMeta>
                  </MiniRow>
                  <Bar key={type + '_bar'} $value={pct} $color={TYPE_COLORS[type] ?? 'rgba(31, 90, 51, 0.5)'} />
                </>
              ))}
            </MiniList>
          </Card>

          <Card>
            <CardTitle>Mes actions recentes</CardTitle>
            <MiniList>
              {recentActions.length === 0 ? (
                <RowMeta style={{ color: '#a0b0a8', fontStyle: 'italic' }}>Aucune action enregistree.</RowMeta>
              ) : (
                recentActions.map((a: any) => (
                  <MiniRow key={a.id}>
                    <RowMeta>{TYPE_LABELS[a.type_fraude] ?? a.type_fraude} — resolue</RowMeta>
                    <RowMeta>{fmtTime(a.date_traitement)}</RowMeta>
                  </MiniRow>
                ))
              )}
            </MiniList>
          </Card>
        </SideColumn>
      </LayoutGrid>
    </AppLayout>
  );
};

export default OperatorDashboard;
