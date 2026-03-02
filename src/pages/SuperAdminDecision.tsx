import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';

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

const Row = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const Label = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
`;

const Value = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 14px;
  padding: 0.75rem 0.9rem;
  font-size: 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  min-height: 120px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.9);
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const Approve = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.5);
  border-radius: 12px;
  padding: 0.65rem 1.2rem;
  background: rgba(31, 90, 51, 0.8);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  cursor: pointer;
`;

const Reject = styled.button`
  border: 1px solid rgba(176, 58, 46, 0.5);
  border-radius: 12px;
  padding: 0.65rem 1.2rem;
  background: rgba(176, 58, 46, 0.8);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  cursor: pointer;
`;

const SuperAdminDecision = () => {
  const navItems = [
    { label: 'Console systeme', to: '/superadmin/console' },
    { label: 'Logs immuables', to: '/superadmin/logs' },
    { label: 'Exports audit', to: '/superadmin/export' },
    { label: 'Utilisateurs', to: '/superadmin/utilisateurs' },
    { label: 'Suspensions', to: '/superadmin/suspensions' },
    { label: 'Decision', to: '/superadmin/decision' },
  ];

  return (
    <AppLayout
      role="Super Admin"
      title="Decision de suspension"
      subtitle="Valider ou rejeter la recommandation."
      navItems={navItems}
    >
      <Panel>
        <Row>
          <Label>Citoyen</Label>
          <Value>CNI 2349</Value>
        </Row>
        <Row>
          <Label>Motif</Label>
          <Value>Vote multiple confirme</Value>
        </Row>
        <Row>
          <Label>Preuves</Label>
          <Value>3 tentatives en 2 minutes depuis IP 41.220.0.12</Value>
        </Row>
        <Label>Justification</Label>
        <Textarea placeholder="Justification de la decision" />
        <ActionRow>
          <Approve>Valider</Approve>
          <Reject>Rejeter</Reject>
        </ActionRow>
      </Panel>
    </AppLayout>
  );
};

export default SuperAdminDecision;
