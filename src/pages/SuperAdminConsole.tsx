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
  grid-template-columns: 1fr auto;
  gap: 0.6rem;
  align-items: center;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const Title = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1f5a33;
  font-size: 1rem;
`;

const Meta = styled.p`
  margin: 0.2rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  font-size: 0.85rem;
`;

const Tag = styled.span<{ $tone: 'active' | 'pending' }>`
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: ${({ $tone }) => ($tone === 'active' ? 'rgba(31, 90, 51, 0.12)' : 'rgba(138, 90, 16, 0.12)')};
  color: ${({ $tone }) => ($tone === 'active' ? 'rgba(31, 90, 51, 0.85)' : 'rgba(138, 90, 16, 0.85)')};
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
`;

const SuperAdminConsole = () => {
  const navItems = [
    { label: 'Console systeme', to: '/superadmin/console' },
    { label: 'Logs immuables', to: '/superadmin/logs' },
    { label: 'Exports audit', to: '/superadmin/export' },
    { label: 'Utilisateurs', to: '/superadmin/utilisateurs' },
    { label: 'Suspensions', to: '/superadmin/suspensions' },
  ];

  return (
    <AppLayout
      role="Super Admin"
      title="Supervision systeme"
      subtitle="Controle institutionnel et audit continu."
      navItems={navItems}
    >
      <LayoutGrid>
        <MainColumn>
          <Greeting>
            <div>
              <Hello>Bonjour, Direction technique</Hello>
              <HelperText>Les actions critiques sont tracees en temps reel.</HelperText>
            </div>
          </Greeting>

          <Stats>
            <StatCard $accent="rgba(31, 90, 51, 0.6)">
              <StatLabel>Comptes actifs</StatLabel>
              <StatValue>12</StatValue>
            </StatCard>
            <StatCard $accent="rgba(31, 90, 51, 0.6)">
              <StatLabel>Logs verifiés</StatLabel>
              <StatValue>98%</StatValue>
            </StatCard>
            <StatCard $accent="rgba(138, 90, 16, 0.6)">
              <StatLabel>Suspensions en attente</StatLabel>
              <StatValue>2</StatValue>
            </StatCard>
          </Stats>

          <Card>
            <CardTitle>Comptes administratifs</CardTitle>
            <Table>
              <Row>
                <div>
                  <Title>Admin - Awa Ndiaye</Title>
                  <Meta>Derniere connexion: 28/02/2026 09:14</Meta>
                </div>
                <Tag $tone="active">Actif</Tag>
              </Row>
              <Row>
                <div>
                  <Title>Operateur - Mamadou Diallo</Title>
                  <Meta>Derniere connexion: 28/02/2026 08:02</Meta>
                </div>
                <Tag $tone="active">Actif</Tag>
              </Row>
            </Table>
          </Card>
        </MainColumn>

        <SideColumn>
          <Card>
            <CardTitle>Suspensions a valider</CardTitle>
            <Table>
              <Row>
                <div>
                  <Title>Citoyen CNI 2349</Title>
                  <Meta>Recommandation: vote multiple confirme</Meta>
                </div>
                <Tag $tone="pending">En attente</Tag>
              </Row>
              <Row>
                <div>
                  <Title>Citoyen CNI 8841</Title>
                  <Meta>Recommandation: IP suspecte</Meta>
                </div>
                <Tag $tone="pending">En attente</Tag>
              </Row>
            </Table>
          </Card>

          <Card>
            <CardTitle>Exports d'audit</CardTitle>
            <HelperText>Dernier export: 28/02/2026 - 09:45</HelperText>
            <HelperText>Signature cryptographique validee.</HelperText>
          </Card>
        </SideColumn>
      </LayoutGrid>
    </AppLayout>
  );
};

export default SuperAdminConsole;
