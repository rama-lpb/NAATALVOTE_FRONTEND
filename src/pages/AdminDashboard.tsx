import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';

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

const Filter = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  background: rgba(255, 255, 255, 0.85);
  color: #1f5a33;
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
  color: #22312a;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ReportChart = styled.div`
  height: 220px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(31, 90, 51, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

const Table = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.6fr;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.12);
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

const Tag = styled.span<{ $tone: 'success' | 'pending' }>`
  justify-self: start;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: ${({ $tone }) => ($tone === 'success' ? '#1f5a33' : '#8a5a10')};
  background: ${({ $tone }) => ($tone === 'success' ? 'rgba(31, 90, 51, 0.12)' : 'rgba(138, 90, 16, 0.12)')};
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

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.8);
  border: 1px solid rgba(31, 90, 51, 0.55);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
`;

const SecondaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.25);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
`;

const AdminDashboard = () => {
  const navItems = [
    { label: 'Tableau admin', to: '/admin/dashboard' },
    { label: 'Programmer election', to: '/admin/election/create' },
    { label: 'Candidats', to: '/admin/candidats' },
    { label: 'Statistiques', to: '/admin/statistiques' },
    { label: 'Rapports', to: '/admin/rapports' },
  ];

  return (
    <AppLayout
      role="Administrateur"
      title="Console de programmation"
      subtitle="Pilotage des elections et statistiques en temps reel."
      navItems={navItems}
      actions={
        <>
          <SecondaryButton to="/admin/candidats">Gerer candidats</SecondaryButton>
          <ActionButton to="/admin/election/create">Nouvelle election</ActionButton>
        </>
      }
    >
      <LayoutGrid>
        <MainColumn>
          <Greeting>
            <div>
              <Hello>Bonjour, Awa Ndiaye</Hello>
              <HelperText>Voici l'activite des scrutins programmes aujourd'hui.</HelperText>
            </div>
            <Filter>
              <option>Mensuel</option>
              <option>Trimestriel</option>
              <option>Annuel</option>
            </Filter>
          </Greeting>

          <Stats>
            <StatCard $accent="rgba(31, 90, 51, 0.55)">
              <StatLabel>Scrutins actifs</StatLabel>
              <StatValue>4</StatValue>
            </StatCard>
            <StatCard $accent="rgba(31, 90, 51, 0.55)">
              <StatLabel>Taux participation</StatLabel>
              <StatValue>61%</StatValue>
            </StatCard>
            <StatCard $accent="rgba(138, 90, 16, 0.6)">
              <StatLabel>Alertes surveillees</StatLabel>
              <StatValue>18</StatValue>
            </StatCard>
            <StatCard $accent="rgba(107, 111, 114, 0.6)">
              <StatLabel>Rapports publies</StatLabel>
              <StatValue>12</StatValue>
            </StatCard>
          </Stats>

          <Card>
            <Greeting>
              <CardTitle>Rapport d'activite</CardTitle>
              <ActionButton to="/admin/statistiques">Exporter PDF</ActionButton>
            </Greeting>
            <ReportChart>
              <ChartSvg viewBox="0 0 600 200" preserveAspectRatio="none">
                <polyline
                  points="0,160 60,140 120,150 180,110 240,80 300,100 360,70 420,90 480,120 540,100 600,130"
                  fill="none"
                  stroke="rgba(31, 90, 51, 0.7)"
                  strokeWidth="3"
                />
                <circle cx="300" cy="100" r="5" fill="rgba(31, 90, 51, 0.7)" />
                <line x1="300" y1="100" x2="300" y2="200" stroke="rgba(31, 90, 51, 0.2)" strokeDasharray="4" />
              </ChartSvg>
            </ReportChart>
          </Card>

          <Card>
            <Greeting>
              <CardTitle>Scrutins programmes</CardTitle>
              <ActionRow>
                <SecondaryButton to="/admin/candidats">Voir candidats</SecondaryButton>
                <ActionButton to="/admin/election/create">Creer election</ActionButton>
              </ActionRow>
            </Greeting>
            <Table>
              <Row>
                <div>
                  <RowTitle>Presidentielle 2025</RowTitle>
                  <RowMeta>Debut le 08/03/2025</RowMeta>
                </div>
                <RowMeta>Region nationale</RowMeta>
                <Tag $tone="success">Active</Tag>
              </Row>
              <Row>
                <div>
                  <RowTitle>Legislatives Dakar</RowTitle>
                  <RowMeta>Debut le 20/03/2025</RowMeta>
                </div>
                <RowMeta>Dakar</RowMeta>
                <Tag $tone="pending">Programmee</Tag>
              </Row>
              <Row>
                <div>
                  <RowTitle>Municipales Pikine</RowTitle>
                  <RowMeta>Cloture prevue le 22/03/2025</RowMeta>
                </div>
                <RowMeta>Pikine</RowMeta>
                <Tag $tone="pending">Programmee</Tag>
              </Row>
            </Table>
          </Card>
        </MainColumn>

        <SideColumn>
          <Card>
            <CardTitle>Sources de participation</CardTitle>
            <MiniList>
              <MiniRow>
                <RowMeta>Vote mobile</RowMeta>
                <RowMeta>54%</RowMeta>
              </MiniRow>
              <Bar $value={54} $color="#1f5a33" />
              <MiniRow>
                <RowMeta>Postes fixes</RowMeta>
                <RowMeta>32%</RowMeta>
              </MiniRow>
              <Bar $value={32} $color="#1f5a33" />
              <MiniRow>
                <RowMeta>Bornes publiques</RowMeta>
                <RowMeta>14%</RowMeta>
              </MiniRow>
              <Bar $value={14} $color="#8a5a10" />
            </MiniList>
          </Card>

          <Card>
            <CardTitle>Alertes recentes</CardTitle>
            <MiniList>
              <MiniRow>
                <RowMeta>IP suspecte - Dakar</RowMeta>
                <Tag $tone="pending">En analyse</Tag>
              </MiniRow>
              <MiniRow>
                <RowMeta>Vote multiple - CNI 2349</RowMeta>
                <Tag $tone="pending">Nouvelle</Tag>
              </MiniRow>
              <MiniRow>
                <RowMeta>Pattern suspect - Region Est</RowMeta>
                <Tag $tone="success">Resolue</Tag>
              </MiniRow>
            </MiniList>
          </Card>

          <Card>
            <CardTitle>Publication rapide</CardTitle>
            <HelperText>Partagez un rapport statistique officiel.</HelperText>
            <ActionRow>
              <ActionButton to="/admin/statistiques">Publier</ActionButton>
              <SecondaryButton to="/admin/statistiques">Previsualiser</SecondaryButton>
            </ActionRow>
          </Card>
        </SideColumn>
      </LayoutGrid>
    </AppLayout>
  );
};

export default AdminDashboard;
