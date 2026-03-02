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

const Text = styled.p`
  margin: 0;
  color: #5a6d62;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
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

const CitizenVoteConfirm = () => {
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
      title="Confirmation du vote"
      subtitle="Verification finale avant enregistrement anonyme."
      navItems={navItems}
    >
      <Panel>
        <Title>Vous avez selectionne: Fatou Sow</Title>
        <Text>Une fois confirme, votre bulletin est enregistre sans lien avec votre identite.</Text>
        <ActionRow>
          <SecondaryButton to="/citoyen/vote">Modifier</SecondaryButton>
          <ActionButton to="/citoyen/vote/recu">Confirmer</ActionButton>
        </ActionRow>
      </Panel>
    </AppLayout>
  );
};

export default CitizenVoteConfirm;
