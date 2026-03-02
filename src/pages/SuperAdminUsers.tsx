import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';

const Layout = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: 0 16px 30px rgba(12, 24, 18, 0.08);
  display: grid;
  gap: 0.9rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Chip = styled.span`
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 0.4fr;
  gap: 0.8rem;
  align-items: center;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const Person = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
`;

const Meta = styled.p`
  margin: 0.2rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.85rem;
`;

const Status = styled.span`
  justify-self: start;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
`;

const SuperAdminUsers = () => {
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
      title="Gestion des utilisateurs"
      subtitle="Creation et desactivation des comptes admin et operateur."
      navItems={navItems}
    >
      <Layout>
        <Panel>
          <HeaderRow>
            <Title>Comptes administratifs</Title>
            <Chip>4 comptes actifs</Chip>
          </HeaderRow>
          <Row>
            <div>
              <Person>Admin - Awa Ndiaye</Person>
              <Meta>Derniere connexion: 28/02/2026 09:14</Meta>
            </div>
            <Meta>Role: Administrateur</Meta>
            <Status>Actif</Status>
          </Row>
          <Row>
            <div>
              <Person>Operateur - Mamadou Diallo</Person>
              <Meta>Derniere connexion: 28/02/2026 08:02</Meta>
            </div>
            <Meta>Role: Operateur</Meta>
            <Status>Actif</Status>
          </Row>
        </Panel>
      </Layout>
    </AppLayout>
  );
};

export default SuperAdminUsers;
