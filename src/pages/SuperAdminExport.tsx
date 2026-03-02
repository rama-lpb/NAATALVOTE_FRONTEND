import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: 0 16px 30px rgba(12, 24, 18, 0.08);
  display: grid;
  gap: 1rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const Notice = styled.div`
  padding: 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(31, 90, 51, 0.12);
  color: #2e4f3b;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  background: rgba(255, 255, 255, 0.92);
`;

const Title = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1rem;
`;

const Meta = styled.p`
  margin: 0.2rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.85rem;
`;

const Badge = styled.span`
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
`;

const SuperAdminExport = () => {
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
      title="Export des logs"
      subtitle="Generez des archives chiffrées pour l'audit externe."
      navItems={navItems}
    >
      <Panel>
        <Notice>
          Les exports sont signes cryptographiquement et restent en lecture seule. Aucun vote n'est expose,
          seuls les journaux d'action sont exportes.
        </Notice>
        <Row>
          <div>
            <Title>Archive nationale - Fevrier 2026</Title>
            <Meta>CSV chiffre - 24 812 entrees</Meta>
          </div>
          <Badge>Disponible</Badge>
        </Row>
        <Row>
          <div>
            <Title>Audit Presidentielle 2025</Title>
            <Meta>CSV chiffre - 1 285 421 entrees</Meta>
          </div>
          <Badge>Telecharge</Badge>
        </Row>
      </Panel>
    </AppLayout>
  );
};

export default SuperAdminExport;
