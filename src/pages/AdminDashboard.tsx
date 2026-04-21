import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import { api, type AdminCreationHistoryDto, type ElectionDto } from '../services/api';
import { useAppSelector } from '../store/hooks';

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.4rem;
`;

const MainColumn = styled.div`
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div<{ $accent: string }>`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  padding: 1.3rem 1.5rem;
  box-shadow: 0 12px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.1);
  border-left: 6px solid ${({ $accent }) => $accent};
  transition: transform 0.2s;
  &:hover { transform: translateY(-2px); }
`;

const StatLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #4a6a57;
  font-size: 0.85rem;
  font-weight: 500;
`;

const StatValue = styled.h3`
  margin: 0.5rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a2e20;
  font-size: 1.8rem;
  font-weight: 700;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 14px 32px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.1);
`;

const CardTitle = styled.h2`
  margin: 0 0 1.2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a2e20;
  font-size: 1.15rem;
  font-weight: 600;
`;

const Table = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.2rem;
  border-radius: 14px;
  background: rgba(31, 90, 51, 0.04);
  border: 1px solid rgba(31, 90, 51, 0.08);
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.08); border-color: rgba(31, 90, 51, 0.15); }
`;

const RowTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1a2e20;
  font-size: 1rem;
`;

const RowMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  font-size: 0.85rem;
`;

const HistoryList = styled.div`
  display: grid;
  gap: 0.7rem;
`;

const HistoryRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.04);
  border: 1px solid rgba(31, 90, 51, 0.08);
`;

const HistoryType = styled.span<{ $candidate?: boolean }>`
  padding: 0.28rem 0.6rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  white-space: nowrap;
  color: ${({ $candidate }) => ($candidate ? '#1e40af' : '#1f5a33')};
  background: ${({ $candidate }) => ($candidate ? 'rgba(30, 64, 175, 0.1)' : 'rgba(31, 90, 51, 0.12)')};
  border: 1px solid ${({ $candidate }) => ($candidate ? 'rgba(30, 64, 175, 0.2)' : 'rgba(31, 90, 51, 0.2)')};
`;

const Tag = styled.span<{ $tone: 'success' | 'pending' | 'info' }>`
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $tone }) => $tone === 'success' ? '#1f5a33' : $tone === 'info' ? '#1e40af' : '#8a5a10'};
  background: ${({ $tone }) => $tone === 'success' ? 'rgba(31, 90, 51, 0.12)' : $tone === 'info' ? 'rgba(30, 64, 175, 0.1)' : 'rgba(138, 90, 16, 0.12)'};
  border: 1px solid ${({ $tone }) => $tone === 'success' ? 'rgba(31, 90, 51, 0.2)' : $tone === 'info' ? 'rgba(30, 64, 175, 0.2)' : 'rgba(138, 90, 16, 0.2)'};
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1.1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #1f5a33 0%, #2d7a45 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid #1f5a33;
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-1px);
    background: linear-gradient(135deg, #215d36 0%, #307f49 100%);
    box-shadow: 0 4px 12px rgba(31, 90, 51, 0.3);
  }
`;

const SecondaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1.1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.25);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.08); }
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StatusDot = styled.span<{ $color: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  margin-right: 0.5rem;
`;

const ReportChart = styled.div`
  min-height: 200px;
  height: 200px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(31, 90, 51, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0.5rem;
  position: relative;
  overflow: hidden;
`;

const ChartSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const getStatutTone = (statut: string): 'success' | 'info' | 'pending' =>
  statut === 'EN_COURS' ? 'success' : statut === 'PROGRAMMEE' ? 'info' : 'pending';

const getStatutLabel = (statut: string) =>
  statut === 'EN_COURS' ? 'En cours' : statut === 'PROGRAMMEE' ? 'Programmee' : 'Cloturee';

const VotesChart = ({ elections }: { elections: ElectionDto[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(400);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setWidth(Math.max(containerRef.current.getBoundingClientRect().width - 20, 200));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const data = elections.slice(0, 6);
  if (data.length === 0) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#8a9a90', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem' }}>Aucune election</div>;

  const maxVotes = Math.max(...data.map(e => e.votes_count), 1);
  const pad = { top: 15, right: 10, bottom: 35, left: 40 };
  const h = 160;
  const chartW = width - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const gap = chartW / Math.max(data.length - 1, 1);
  const points = data.map((e, i) => {
    const x = pad.left + i * gap;
    const y = pad.top + chartH - (e.votes_count / maxVotes) * chartH;
    return { x, y, label: e.titre.length > 10 ? `${e.titre.slice(0, 10)}…` : e.titre, votes: e.votes_count };
  });
  const path = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${path} L ${points[points.length - 1].x} ${pad.top + chartH} L ${points[0].x} ${pad.top + chartH} Z`;

  return (
    <ChartContainer ref={containerRef}>
      <ChartSvg viewBox={`0 0 ${width} ${h}`} preserveAspectRatio="none">
        {[0, 25, 50, 75, 100].map((pct, i) => {
          const y = pad.top + chartH - (pct / 100) * chartH;
          return (
            <g key={i}>
              <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="rgba(31,90,51,0.06)" strokeWidth="1" />
              <text x={pad.left - 4} y={y + 3} fill="rgba(31,90,51,0.35)" fontSize="7" fontFamily="Poppins" textAnchor="end">{Math.round(maxVotes * pct / 100)}</text>
            </g>
          );
        })}
        <path d={areaPath} fill="rgba(31,90,51,0.14)" />
        <path d={path} fill="none" stroke="rgba(31,90,51,0.82)" strokeWidth="2.8" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={data[i].id}>
            <circle cx={p.x} cy={p.y} r="3.8" fill="rgba(31,90,51,0.95)" />
            <text x={p.x} y={pad.top + chartH + 14} fill="rgba(31,90,51,0.55)" fontSize="7" fontFamily="Poppins" textAnchor="middle">{p.label}</text>
          </g>
        ))}
      </ChartSvg>
    </ChartContainer>
  );
};

const navItems = [
  { label: 'Tableau admin', to: '/admin/dashboard' },
  { label: 'Elections creees', to: '/admin/elections' },
  { label: 'Programmer election', to: '/admin/election/create' },
  { label: 'Candidats', to: '/admin/candidats' },
  { label: 'Statistiques', to: '/admin/statistiques' },
  { label: 'Rapports', to: '/admin/rapports' },
];

const AdminDashboard = () => {
  const currentUser = useAppSelector(s => s.auth.user);
  const [elections, setElections] = useState<ElectionDto[]>([]);
  const [creationHistory, setCreationHistory] = useState<AdminCreationHistoryDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.admin.listElections(currentUser?.id),
      api.admin.listCreationHistory(currentUser?.id, 12),
    ])
      .then(async ([electionsData, historyData]) => {
        let nextElections = electionsData;
        let nextHistory = historyData;

        if (currentUser?.id && electionsData.length === 0) {
          try {
            nextElections = await api.admin.listElections();
          } catch {
            nextElections = [];
          }
        }

        if (currentUser?.id && historyData.length === 0) {
          try {
            nextHistory = await api.admin.listCreationHistory(undefined, 12);
          } catch {
            nextHistory = [];
          }
        }

        setElections(nextElections);
        setCreationHistory(nextHistory);
      })
      .catch(() => {
        setElections([]);
        setCreationHistory([]);
      })
      .finally(() => setLoading(false));
  }, [currentUser?.id]);

  const active = elections.filter(e => e.statut === 'EN_COURS');
  const totalVotes = elections.reduce((s, e) => s + e.votes_count, 0);
  const totalElecteurs = elections.reduce((s, e) => s + e.total_electeurs, 0);
  const participationRate = totalElecteurs > 0 ? Math.round((totalVotes / totalElecteurs) * 100) : 0;

  return (
    <AppLayout
      role="Administrateur"
      title="Console de programmation"
      subtitle="Pilotage des elections et gestion des scrutins."
      navItems={navItems}
      actions={
        <>
          <SecondaryButton to="/admin/elections">Liste elections</SecondaryButton>
          <SecondaryButton to="/admin/candidats">Gerer candidats</SecondaryButton>
          <ActionButton to="/admin/election/create">Nouvelle election</ActionButton>
        </>
      }
    >
      <LayoutGrid>
        <MainColumn>
          <Greeting>
            <div>
              <Hello>Bonjour, {currentUser ? `${currentUser.prenom} ${currentUser.nom}` : 'Administrateur'}</Hello>
              <HelperText>Voici l'activite des scrutins programmes aujourd'hui.</HelperText>
            </div>
          </Greeting>

          <Stats>
            <StatCard $accent="rgba(31, 90, 51, 0.7)">
              <StatLabel>
                <StatusDot $color="rgba(31, 90, 51, 0.7)" />
                Scrutins actifs
              </StatLabel>
              <StatValue>{loading ? '…' : active.length}</StatValue>
            </StatCard>
            <StatCard $accent="rgba(31, 90, 51, 0.7)">
              <StatLabel>Taux de participation</StatLabel>
              <StatValue>{loading ? '…' : `${participationRate}%`}</StatValue>
            </StatCard>
            <StatCard $accent="rgba(138, 90, 16, 0.7)">
              <StatLabel>Total elections</StatLabel>
              <StatValue>{loading ? '…' : elections.length}</StatValue>
            </StatCard>
            <StatCard $accent="rgba(107, 111, 114, 0.7)">
              <StatLabel>Votes enregistres</StatLabel>
              <StatValue>{loading ? '…' : totalVotes.toLocaleString('fr-FR')}</StatValue>
            </StatCard>
          </Stats>

          <Card>
            <HeaderSection>
              <CardTitle>Votes par election</CardTitle>
              <ActionButton to="/admin/statistiques">Statistiques</ActionButton>
            </HeaderSection>
            <ReportChart>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#8a9a90', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem' }}>Chargement…</div>
              ) : (
                <VotesChart elections={elections} />
              )}
            </ReportChart>
          </Card>

          <Card>
            <HeaderSection>
              <CardTitle>Scrutins programmes</CardTitle>
              <ActionRow>
                <SecondaryButton to="/admin/candidats">Voir candidats</SecondaryButton>
                <SecondaryButton to="/admin/candidats/nouveau">Ajouter candidat</SecondaryButton>
                <ActionButton to="/admin/election/create">Creer election</ActionButton>
              </ActionRow>
            </HeaderSection>
            {loading ? (
              <RowMeta>Chargement…</RowMeta>
            ) : elections.length === 0 ? (
              <RowMeta>Aucune election trouvee.</RowMeta>
            ) : (
              <Table>
                {elections.slice(0, 5).map(e => (
                  <Row key={e.id}>
                    <div>
                      <RowTitle>{e.titre}</RowTitle>
                      <RowMeta>
                        Debut le {new Date(e.date_debut).toLocaleDateString('fr-FR')} — Fin le {new Date(e.date_fin).toLocaleDateString('fr-FR')}
                      </RowMeta>
                    </div>
                    <RowMeta>{e.region || 'National'}</RowMeta>
                    <Tag $tone={getStatutTone(e.statut)}>{getStatutLabel(e.statut)}</Tag>
                  </Row>
                ))}
              </Table>
            )}
          </Card>

          <Card>
            <HeaderSection>
              <CardTitle>Historique de creation</CardTitle>
              <ActionRow>
                <SecondaryButton to="/admin/candidats/nouveau">Ajouter candidat</SecondaryButton>
                <ActionButton to="/admin/candidats">Gestion candidats</ActionButton>
              </ActionRow>
            </HeaderSection>
            {loading ? (
              <RowMeta>Chargement…</RowMeta>
            ) : creationHistory.length === 0 ? (
              <RowMeta>Aucun historique de creation disponible pour le moment.</RowMeta>
            ) : (
              <HistoryList>
                {creationHistory.map((item) => (
                  <HistoryRow key={item.id}>
                    <HistoryType $candidate={item.type_action === 'CREATE_CANDIDATE'}>
                      {item.type_action === 'CREATE_CANDIDATE' ? 'Candidat' : 'Election'}
                    </HistoryType>
                    <div>
                      <RowTitle>{item.description || 'Action de creation'}</RowTitle>
                    </div>
                    <RowMeta>
                      {new Date(item.horodatage).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </RowMeta>
                  </HistoryRow>
                ))}
              </HistoryList>
            )}
          </Card>
        </MainColumn>
      </LayoutGrid>
    </AppLayout>
  );
};

export default AdminDashboard;
