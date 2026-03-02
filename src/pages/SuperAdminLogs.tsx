import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: 0 16px 30px rgba(12, 24, 18, 0.08);
  display: grid;
  gap: 0.8rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const LogRow = styled.div`
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  background: rgba(255, 255, 255, 0.92);
`;

const LogTag = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: rgba(31, 90, 51, 0.9);
  font-size: 0.85rem;
`;

const LogText = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  font-size: 0.85rem;
`;

const SuperAdminLogs = () => {
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
      title="Logs immuables"
      subtitle="Traçabilite complete de chaque action sensible."
      navItems={navItems}
    >
      <Panel>
        <LogRow>
          <LogTag>CONNEXION</LogTag>
          <LogText>28/02/2026 09:14 - Admin Awa Ndiaye - IP 41.220.0.12</LogText>
        </LogRow>
        <LogRow>
          <LogTag>VOTE</LogTag>
          <LogText>28/02/2026 09:15 - Vote anonymise enregistre - Token 5f7c...</LogText>
        </LogRow>
        <LogRow>
          <LogTag>SUSPENSION</LogTag>
          <LogText>28/02/2026 09:20 - Validation suspension CNI 2349</LogText>
        </LogRow>
      </Panel>
    </AppLayout>
  );
};

export default SuperAdminLogs;
