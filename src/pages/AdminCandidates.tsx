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

const Candidate = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  background: rgba(255, 255, 255, 0.92);
`;

const Name = styled.h3`
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

const Status = styled.span`
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
`;

const AdminCandidates = () => {
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
      title="Gestion des candidats"
      subtitle="Ajoutez ou ajustez les candidats avant le demarrage d'une election."
      navItems={navItems}
    >
      <Panel>
        <HeaderRow>
          <Title>Candidats actifs</Title>
          <Chip>3 candidats</Chip>
        </HeaderRow>
        <Candidate>
          <div>
            <Name>Amadou Diop</Name>
            <Meta>Alliance Nouvelle Republique - Presidentielle 2025</Meta>
          </div>
          <Status>Actif</Status>
        </Candidate>
        <Candidate>
          <div>
            <Name>Fatou Sow</Name>
            <Meta>Union Citoyenne - Presidentielle 2025</Meta>
          </div>
          <Status>Actif</Status>
        </Candidate>
        <Candidate>
          <div>
            <Name>Cheikh Ba</Name>
            <Meta>Front Democratique - Legislatives Dakar</Meta>
          </div>
          <Status>En attente</Status>
        </Candidate>
      </Panel>
    </AppLayout>
  );
};

export default AdminCandidates;
