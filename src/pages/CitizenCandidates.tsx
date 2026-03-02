import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const Candidate = styled(Link)`
  text-decoration: none;
  display: grid;
  grid-template-columns: 48px 1fr auto;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  background: rgba(255, 255, 255, 0.92);
  transition: border 0.2s ease, transform 0.2s ease;
  &:hover {
    border-color: rgba(31, 90, 51, 0.28);
    transform: translateY(-1px);
  }
`;

const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  display: grid;
  place-items: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
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

const Badge = styled.span`
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
`;

const CitizenCandidates = () => {
  const navItems = [
    { label: 'Tableau de bord', to: '/citoyen/dashboard' },
    { label: 'Elections', to: '/citoyen/elections' },
    { label: 'Candidats', to: '/citoyen/candidats' },
    { label: 'Vote securise', to: '/citoyen/vote' },
    { label: 'Resultats temps reel', to: '/citoyen/resultats' },
    { label: 'Profil', to: '/citoyen/profil' },
  ];

  return (
    <AppLayout
      role="Citoyen"
      title="Candidats et programmes"
      subtitle="Consultez les biographies et programmes officiels."
      navItems={navItems}
    >
      <Panel>
        <HeaderRow>
          <Title>Presidentielle 2025</Title>
          <Chip>3 candidats</Chip>
        </HeaderRow>
        <Candidate to="/citoyen/candidats/c1">
          <Avatar>AN</Avatar>
          <div>
            <Name>Aicha Ndiaye</Name>
            <Meta>Union Civique - Programme disponible</Meta>
          </div>
          <Badge>Eligible</Badge>
        </Candidate>
        <Candidate to="/citoyen/candidats/c2">
          <Avatar>MD</Avatar>
          <div>
            <Name>Moussa Diop</Name>
            <Meta>Coalition Verte - Biographie certifiee</Meta>
          </div>
          <Badge>Eligible</Badge>
        </Candidate>
        <Candidate to="/citoyen/candidats/c3">
          <Avatar>MS</Avatar>
          <div>
            <Name>Mariam Sow</Name>
            <Meta>Renouveau National - Dossier complet</Meta>
          </div>
          <Badge>Eligible</Badge>
        </Candidate>
      </Panel>
    </AppLayout>
  );
};

export default CitizenCandidates;
