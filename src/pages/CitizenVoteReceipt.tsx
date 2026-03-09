import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';

const pop = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
`;

const PageGrid = styled.div`
  display: grid;
  gap: 1.2rem;
  max-width: 720px;
`;

const SuccessPanel = styled.div`
  background: rgba(255, 255, 255, 0.93);
  border-radius: 24px;
  padding: 2rem 1.8rem;
  box-shadow: 0 16px 36px rgba(12, 24, 18, 0.1);
  display: grid;
  gap: 1.4rem;
  border: 1px solid rgba(31, 90, 51, 0.18);
  backdrop-filter: blur(10px);
  text-align: center;
  align-items: center;
  justify-items: center;
`;

const CheckCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.85), rgba(31, 90, 51, 0.6));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(31, 90, 51, 0.3);
  animation: ${pop} 0.5s ease-out;
  i {
    font-size: 2.2rem;
    color: #fff;
  }
`;

const SuccessTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a2e20;
`;

const SuccessText = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
  color: #5a6d62;
  max-width: 480px;
  line-height: 1.6;
`;

const ReceiptBox = styled.div`
  width: 100%;
  background: rgba(31, 90, 51, 0.05);
  border: 1px dashed rgba(31, 90, 51, 0.3);
  border-radius: 18px;
  padding: 1.4rem 1.6rem;
  text-align: left;
  display: grid;
  gap: 0.8rem;
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

const TokenBox = styled.div`
  background: rgba(31, 90, 51, 0.08);
  border-radius: 12px;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid rgba(31, 90, 51, 0.15);
`;

const TokenLabel = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(31, 90, 51, 0.6);
`;

const TokenCode = styled.span`
  font-family: 'Courier New', monospace;
  font-weight: 800;
  color: rgba(31, 90, 51, 0.9);
  letter-spacing: 0.14em;
  font-size: 1rem;
`;

const CopyButton = styled.button`
  background: rgba(31, 90, 51, 0.1);
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 8px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  color: rgba(31, 90, 51, 0.8);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  transition: background 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.18); }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.8rem;
  width: 100%;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  padding: 0.9rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
  i {
    font-size: 1.4rem;
    color: rgba(31, 90, 51, 0.7);
  }
`;

const InfoLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  color: #6b7a72;
`;

const InfoValue = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #22312a;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const SecondaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.65rem 1.2rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.22);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const PrimaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.65rem 1.4rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.9), rgba(31, 90, 51, 0.72));
  color: #fff;
  border: 1px solid rgba(31, 90, 51, 0.55);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 14px rgba(31, 90, 51, 0.22);
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
  const token = '5F7C-82AB-9C22-4A11';
  const handleCopy = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <AppLayout
      role="Citoyen"
      title="Vote enregistre"
      subtitle="Votre bulletin a ete ajoute au scrutin de maniere anonyme et chiffree."
      navItems={navItems}
    >
      <PageGrid>
        <SuccessPanel>
          <CheckCircle><i className="bi bi-check-lg" /></CheckCircle>
          <div>
            <SuccessTitle>Merci pour votre participation !</SuccessTitle>
          </div>
          <SuccessText>
            Votre vote a ete enregistre avec succes. Aucun lien n'existe entre votre identite et votre
            bulletin. Le token ci-dessous est la seule preuve de votre participation.
          </SuccessText>

          <ReceiptBox>
            <ReceiptTitle><i className="bi bi-receipt" /> Recu de vote</ReceiptTitle>
            <ReceiptRow>
              <ReceiptLabel>Election</ReceiptLabel>
              <ReceiptValue>Presidentielle 2025</ReceiptValue>
            </ReceiptRow>
            <ReceiptRow>
              <ReceiptLabel>Horodatage</ReceiptLabel>
              <ReceiptValue>09/03/2026 — 11:42:07</ReceiptValue>
            </ReceiptRow>
            <ReceiptRow>
              <ReceiptLabel>Statut</ReceiptLabel>
              <ReceiptValue style={{ color: 'rgba(31, 90, 51, 0.9)' }}>
                <i className="bi bi-shield-check" /> Valide et chiffre
              </ReceiptValue>
            </ReceiptRow>
            <div style={{ height: '1px', background: 'rgba(31, 90, 51, 0.1)' }} />
            <TokenLabel>Token anonyme</TokenLabel>
            <TokenBox>
              <TokenCode>{token}</TokenCode>
              <CopyButton onClick={handleCopy}>
                <i className="bi bi-clipboard" />
                Copier
              </CopyButton>
            </TokenBox>
          </ReceiptBox>

          <InfoGrid>
            <InfoCard>
              <i className="bi bi-person-x" />
              <InfoLabel>Anonymat</InfoLabel>
              <InfoValue>Garanti</InfoValue>
            </InfoCard>
            <InfoCard>
              <i className="bi bi-shield-lock" />
              <InfoLabel>Chiffrement</InfoLabel>
              <InfoValue>AES-256</InfoValue>
            </InfoCard>
            <InfoCard>
              <i className="bi bi-clock-history" />
              <InfoLabel>Cloture scrutin</InfoLabel>
              <InfoValue>12/03 18h00</InfoValue>
            </InfoCard>
          </InfoGrid>

          <ActionRow>
            <SecondaryButton to="/citoyen/resultats">
              <i className="bi bi-bar-chart" />
              Voir resultats
            </SecondaryButton>
            <PrimaryButton to="/citoyen/dashboard">
              <i className="bi bi-house" />
              Tableau de bord
            </PrimaryButton>
          </ActionRow>
        </SuccessPanel>
      </PageGrid>
    </AppLayout>
  );
};

export default CitizenVoteReceipt;
