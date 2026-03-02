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
  grid-template-columns: 1.3fr 1fr 0.5fr;
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
  background: rgba(138, 90, 16, 0.12);
  color: rgba(138, 90, 16, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
`;

const SuperAdminSuspensions = () => {
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
      title="Validations de suspension"
      subtitle="Double validation des comptes suspects."
      navItems={navItems}
    >
      <Layout>
        <Panel>
          <HeaderRow>
            <Title>Demandes en attente</Title>
            <Chip>2 en attente</Chip>
          </HeaderRow>
          <Row>
            <div>
              <Person>Citoyen CNI 2349</Person>
              <Meta>Motif: vote multiple confirme</Meta>
            </div>
            <Meta>Operateur: Mamadou Diallo</Meta>
            <Status>En attente</Status>
          </Row>
          <Row>
            <div>
              <Person>Citoyen CNI 8841</Person>
              <Meta>Motif: IP suspecte</Meta>
            </div>
            <Meta>Operateur: Awa Ndiaye</Meta>
            <Status>En attente</Status>
          </Row>
        </Panel>
      </Layout>
    </AppLayout>
  );
};

export default SuperAdminSuspensions;
