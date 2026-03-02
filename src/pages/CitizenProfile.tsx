import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 22px;
  padding: 1.6rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 1rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const Label = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1f5a33;
`;

const Value = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
`;

const CitizenProfile = () => {
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
      title="Profil citoyen"
      subtitle="Informations personnelles et statut electoral."
      navItems={navItems}
    >
      <Panel>
        <Row>
          <Label>Nom complet</Label>
          <Value>Aicha Fall</Value>
        </Row>
        <Row>
          <Label>Numero CNI</Label>
          <Value>SN-2349-8891</Value>
        </Row>
        <Row>
          <Label>Statut</Label>
          <Value>Eligible - Compte actif</Value>
        </Row>
        <Row>
          <Label>Telephone</Label>
          <Value>+221 77 000 00 00</Value>
        </Row>
        <Row>
          <Label>Adresse</Label>
          <Value>Dakar, Senegal</Value>
        </Row>
      </Panel>
    </AppLayout>
  );
};

export default CitizenProfile;
