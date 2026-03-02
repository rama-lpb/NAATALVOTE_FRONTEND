import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const Title = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1f5a33;
`;

const Token = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  background: rgba(31, 90, 51, 0.08);
  border: 1px dashed rgba(31, 90, 51, 0.2);
  border-radius: 12px;
  padding: 0.8rem 1rem;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.8);
  border: 1px solid rgba(31, 90, 51, 0.55);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
`;

const SecondaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.25);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
`;

const CitizenVoteReceipt = () => {
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
      title="Vote enregistre"
      subtitle="Votre bulletin a ete ajoute de maniere anonyme."
      navItems={navItems}
    >
      <Panel>
        <Title>Merci pour votre participation</Title>
        <Token>Token anonyme: 5f7c-82ab-9c22-4a11</Token>
        <ActionRow>
          <SecondaryButton to="/citoyen/resultats">Voir resultats</SecondaryButton>
          <ActionButton to="/citoyen/dashboard">Retour tableau de bord</ActionButton>
        </ActionRow>
      </Panel>
    </AppLayout>
  );
};

export default CitizenVoteReceipt;
