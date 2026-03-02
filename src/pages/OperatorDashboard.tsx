import styled from 'styled-components';
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
  color: #1f5a33;
  font-size: 1.2rem;
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

const Tag = styled.span<{ $tone: 'new' | 'review' | 'resolved' }>`
  justify-self: start;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: ${({ $tone }) =>
    $tone === 'new' ? 'rgba(122, 31, 31, 0.85)' : $tone === 'review' ? 'rgba(138, 90, 16, 0.85)' : 'rgba(42, 100, 65, 0.85)'};
  background: ${({ $tone }) =>
    $tone === 'new'
      ? 'rgba(210, 70, 70, 0.12)'
      : $tone === 'review'
        ? 'rgba(200, 140, 30, 0.12)'
        : 'rgba(20, 130, 80, 0.12)'};
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

const OperatorDashboard = () => {
  const navItems = [
    { label: 'Alertes fraude', to: '/operateur/alerts' },
    { label: 'Historique', to: '/operateur/historique' },
    { label: 'Rapports', to: '/operateur/rapports' },
    { label: 'Detail alerte', to: '/operateur/alerts/detail' },
  ];

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
              <Hello>Bonjour, Mamadou Diallo</Hello>
              <HelperText>Les alertes critiques sont priorisees automatiquement.</HelperText>
            </div>
            <Filter>
              <option>Aujourd'hui</option>
              <option>7 derniers jours</option>
              <option>30 jours</option>
            </Filter>
          </Greeting>

          <Stats>
            <StatCard $accent="rgba(176, 58, 46, 0.6)">
              <StatLabel>Alertes critiques</StatLabel>
              <StatValue>6</StatValue>
            </StatCard>
            <StatCard $accent="rgba(138, 90, 16, 0.6)">
              <StatLabel>En analyse</StatLabel>
              <StatValue>14</StatValue>
            </StatCard>
            <StatCard $accent="rgba(31, 90, 51, 0.6)">
              <StatLabel>Resolues</StatLabel>
              <StatValue>42</StatValue>
            </StatCard>
          </Stats>

          <Card>
            <CardTitle>Alertes recentes</CardTitle>
            <Table>
              <Row>
                <div>
                  <RowTitle>Vote multiple detecte</RowTitle>
                  <RowMeta>Election Presidentielle 2025</RowMeta>
                </div>
                <RowMeta>CNI 2349</RowMeta>
                <Tag $tone="new">Nouvelle</Tag>
              </Row>
              <Row>
                <div>
                  <RowTitle>IP suspecte</RowTitle>
                  <RowMeta>Election Legislatives Dakar</RowMeta>
                </div>
                <RowMeta>41.220.0.12</RowMeta>
                <Tag $tone="review">En analyse</Tag>
              </Row>
              <Row>
                <div>
                  <RowTitle>Pattern suspect</RowTitle>
                  <RowMeta>Election Municipales</RowMeta>
                </div>
                <RowMeta>Cluster Est</RowMeta>
                <Tag $tone="resolved">Resolue</Tag>
              </Row>
            </Table>
          </Card>
        </MainColumn>

        <SideColumn>
          <Card>
            <CardTitle>Alertes par type</CardTitle>
            <MiniList>
              <MiniRow>
                <RowMeta>Vote multiple</RowMeta>
                <RowMeta>38%</RowMeta>
              </MiniRow>
              <Bar $value={38} $color="rgba(176, 58, 46, 0.65)" />
              <MiniRow>
                <RowMeta>IP suspecte</RowMeta>
                <RowMeta>24%</RowMeta>
              </MiniRow>
              <Bar $value={24} $color="rgba(31, 90, 51, 0.65)" />
              <MiniRow>
                <RowMeta>CNI invalide</RowMeta>
                <RowMeta>18%</RowMeta>
              </MiniRow>
              <Bar $value={18} $color="rgba(138, 90, 16, 0.65)" />
            </MiniList>
          </Card>

          <Card>
            <CardTitle>Actions recentes</CardTitle>
            <MiniList>
              <MiniRow>
                <RowMeta>Marquage compte suspect</RowMeta>
                <RowMeta>09:12</RowMeta>
              </MiniRow>
              <MiniRow>
                <RowMeta>Analyse alerte IP</RowMeta>
                <RowMeta>08:42</RowMeta>
              </MiniRow>
              <MiniRow>
                <RowMeta>Rapport genere</RowMeta>
                <RowMeta>08:05</RowMeta>
              </MiniRow>
            </MiniList>
          </Card>
        </SideColumn>
      </LayoutGrid>
    </AppLayout>
  );
};

export default OperatorDashboard;
