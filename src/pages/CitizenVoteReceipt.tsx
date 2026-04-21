import styled, { keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';

const pop = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
`;

const PageGrid = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const SuccessPanel = styled.div`
  background: rgba(255, 255, 255, 0.93);
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 16px 36px rgba(12, 24, 18, 0.1);
  display: grid;
  gap: 1rem;
  border: 1px solid rgba(31, 90, 51, 0.18);
  backdrop-filter: blur(10px);
  text-align: center;
  align-items: center;
  justify-items: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
`;

const CheckCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.85), rgba(31, 90, 51, 0.6));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(31, 90, 51, 0.3);
  animation: ${pop} 0.5s ease-out;
  i {
    font-size: 1.8rem;
    color: #fff;
  }
`;

const SuccessTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a2e20;
`;

const SuccessText = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #5a6d62;
  max-width: 420px;
  line-height: 1.5;
`;

const ReceiptBox = styled.div`
  width: 100%;
  background: rgba(31, 90, 51, 0.05);
  border: 1px dashed rgba(31, 90, 51, 0.3);
  border-radius: 18px;
  padding: 1.2rem 1.4rem;
  text-align: left;
  display: grid;
  gap: 0.7rem;
`;

const ReceiptTitle = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(31, 90, 51, 0.55);
`;

const ReceiptRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const ReceiptLabel = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #6b7a72;
`;

const ReceiptValue = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #22312a;
`;

const ConfirmBox = styled.div`
  background: rgba(31, 90, 51, 0.08);
  border-radius: 12px;
  padding: 0.7rem 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: 1px solid rgba(31, 90, 51, 0.15);
`;

const ConfirmLabel = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(31, 90, 51, 0.6);
`;

const ConfirmNumber = styled.span`
  font-family: 'Poppins', Arial, sans-serif;
  font-weight: 700;
  color: rgba(31, 90, 51, 0.9);
  letter-spacing: 0.1em;
  font-size: 1rem;
`;

const ReturnButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.22);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 10;
  &:hover { background: rgba(31, 90, 51, 0.15); }
`;

const navItems = [
  { label: 'Tableau de bord', to: '/citoyen/dashboard' },
  { label: 'Elections', to: '/citoyen/elections' },
  { label: 'Candidats', to: '/citoyen/candidats' },
  { label: 'Vote securise', to: '/citoyen/vote' },
  { label: 'Resultats temps reel', to: '/citoyen/resultats' },
  { label: 'Profil', to: '/citoyen/profil' },
];

const CitizenVoteReceipt = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state ?? {}) as {
    confirmationNumber?: string;
    horodatage?: string;
    electionId?: string;
    election?: string;
    candidatName?: string;
  };

  const confirmationNumber = state.confirmationNumber ?? '—';
  const electionId = state.electionId ?? '';
  const election = state.election ?? 'Election';
  const horodatage = state.horodatage ? new Date(state.horodatage) : new Date();
  const dateStr = horodatage.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  const heureStr = horodatage.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <AppLayout
      role="Citoyen"
      title="Vote enregistre"
      subtitle="Votre bulletin a ete ajoute au scrutin de maniere anonyme et chiffree."
      navItems={navItems}
    >
      <PageGrid>
        <SuccessPanel>
          <ReturnButton onClick={() => navigate(electionId ? `/citoyen/resultats?electionId=${electionId}` : '/citoyen/resultats')}>
            <i className="bi bi-arrow-left" />
            Resultats en direct
          </ReturnButton>
          <CheckCircle><i className="bi bi-check-lg" /></CheckCircle>
          <SuccessTitle>Merci pour votre participation !</SuccessTitle>
          <SuccessText>
            Votre vote a ete enregistre avec succes. Votre voix compte pour construire l'avenir de notre pays.
          </SuccessText>

          <ReceiptBox>
            <ReceiptTitle><i className="bi bi-receipt" /> Recu de vote</ReceiptTitle>
            <ReceiptRow>
              <ReceiptLabel>Election</ReceiptLabel>
              <ReceiptValue>{election}</ReceiptValue>
            </ReceiptRow>
            <ReceiptRow>
              <ReceiptLabel>Date</ReceiptLabel>
              <ReceiptValue>{dateStr}</ReceiptValue>
            </ReceiptRow>
            <ReceiptRow>
              <ReceiptLabel>Heure</ReceiptLabel>
              <ReceiptValue>{heureStr}</ReceiptValue>
            </ReceiptRow>
            <ReceiptRow>
              <ReceiptLabel>Statut</ReceiptLabel>
              <ReceiptValue style={{ color: 'rgba(31, 90, 51, 0.9)' }}>
                <i className="bi bi-shield-check" /> Vote enregistre
              </ReceiptValue>
            </ReceiptRow>
            <div style={{ height: '1px', background: 'rgba(31, 90, 51, 0.1)' }} />
            <ConfirmLabel>Numero de confirmation</ConfirmLabel>
            <ConfirmBox>
              <ConfirmNumber>{confirmationNumber}</ConfirmNumber>
            </ConfirmBox>
          </ReceiptBox>
        </SuccessPanel>
      </PageGrid>
    </AppLayout>
  );
};

export default CitizenVoteReceipt;
