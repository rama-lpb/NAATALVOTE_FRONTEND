import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AppLayout } from '../components/AppLayout';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: 0 14px 26px rgba(12, 24, 18, 0.07);
  display: grid;
  gap: 1rem;
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

const SubTitle = styled.p`
  margin: 0.2rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.9rem;
`;

const HeaderBlock = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const StepHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
  margin-bottom: 0.8rem;
`;

const StepPill = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.55rem 0.7rem;
  border-radius: 999px;
  text-align: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  background: ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.65)' : 'rgba(31, 90, 51, 0.08)')};
  color: ${({ $active }) => ($active ? '#ffffff' : 'rgba(31, 90, 51, 0.85)')};
  border: 1px solid ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.55)' : 'rgba(31, 90, 51, 0.16)')};
`;

const StepNumber = styled.span<{ $active?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#ffffff' : 'rgba(31, 90, 51, 0.14)')};
  color: ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.85)' : 'rgba(31, 90, 51, 0.85)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
`;

const CandidateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const StepTrigger = styled.button`
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.65);
  border: 1px solid rgba(31, 90, 51, 0.45);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  cursor: pointer;
`;

const CandidateCard = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  display: grid;
  gap: 0.5rem;
`;

const CandidateName = styled.h4`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1rem;
`;

const CandidateParty = styled.p`
  margin: 0;
  color: #6b6f72;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
`;

const CandidateMeta = styled.p`
  margin: 0;
  color: #76807c;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.65);
  border: 1px solid rgba(31, 90, 51, 0.45);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
`;

const SecondaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.85);
  border: 1px solid rgba(31, 90, 51, 0.2);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
`;

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(7, 18, 12, 0.4);
  display: ${({ $open }) => ($open ? 'grid' : 'none')};
  place-items: center;
  z-index: 20;
  padding: 1.5rem;
`;

const Modal = styled.div`
  width: min(560px, 100%);
  background: rgba(255, 255, 255, 0.98);
  border-radius: 18px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  box-shadow: 0 18px 36px rgba(12, 24, 18, 0.14);
  padding: 1.2rem 1.4rem;
  display: grid;
  gap: 0.9rem;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.1rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.2);
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.9);
  border-radius: 10px;
  height: 32px;
  width: 32px;
  cursor: pointer;
  font-weight: 700;
`;

const ModalBody = styled.div`
  display: grid;
  gap: 0.6rem;
  color: #5a6d62;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
`;

const StepCard = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  background: rgba(255, 255, 255, 0.95);
  padding: 0.9rem 1rem;
  display: grid;
  gap: 0.5rem;
`;

const StepTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
  font-size: 1rem;
`;

const StepText = styled.p`
  margin: 0;
  color: #5a6d62;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
  line-height: 1.45;
`;

const TokenBox = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
  background: rgba(31, 90, 51, 0.08);
  border: 1px dashed rgba(31, 90, 51, 0.35);
  border-radius: 12px;
  padding: 0.7rem 0.9rem;
  letter-spacing: 0.6px;
`;

const CheckList = styled.ul`
  margin: 0;
  padding: 0 0 0 1.1rem;
  display: grid;
  gap: 0.35rem;
  color: #5a6d62;
`;

const InlineActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const CitizenVote = () => {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
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
      title="Vote securise"
      subtitle="Selectionnez un candidat et confirmez votre bulletin."
      navItems={navItems}
    >
      <Panel>
        <HeaderRow>
          <HeaderBlock>
            <Title>Processus anonymise</Title>
            <SubTitle>Etapes securisees et confirmation unique.</SubTitle>
          </HeaderBlock>
        </HeaderRow>
        <StepHeader>
          <StepPill $active={step === 1}>
            <StepNumber $active={step === 1}>1</StepNumber>
            Selection
          </StepPill>
          <StepPill $active={step === 2}>
            <StepNumber $active={step === 2}>2</StepNumber>
            Confirmation
          </StepPill>
          <StepPill $active={step === 3}>
            <StepNumber $active={step === 3}>3</StepNumber>
            Token
          </StepPill>
          <StepPill $active={step === 4}>
            <StepNumber $active={step === 4}>4</StepNumber>
            Validation
          </StepPill>
        </StepHeader>
        <CandidateGrid>
          <CandidateCard>
            <CandidateName>Aicha Ndiaye</CandidateName>
            <CandidateParty>Union Civique</CandidateParty>
            <CandidateMeta>Programme social & cohesion nationale</CandidateMeta>
            <ActionRow>
              <StepTrigger
                onClick={() => {
                  setSelectedCandidate('Aicha Ndiaye');
                  setStep(1);
                }}
              >
                Choisir
              </StepTrigger>
              <SecondaryButton to="/citoyen/candidats/c1">Programme</SecondaryButton>
            </ActionRow>
          </CandidateCard>
          <CandidateCard>
            <CandidateName>Moussa Diop</CandidateName>
            <CandidateParty>Coalition Verte</CandidateParty>
            <CandidateMeta>Transition verte & territoires resilients</CandidateMeta>
            <ActionRow>
              <StepTrigger
                onClick={() => {
                  setSelectedCandidate('Moussa Diop');
                  setStep(1);
                }}
              >
                Choisir
              </StepTrigger>
              <SecondaryButton to="/citoyen/candidats/c2">Programme</SecondaryButton>
            </ActionRow>
          </CandidateCard>
          <CandidateCard>
            <CandidateName>Mariam Sow</CandidateName>
            <CandidateParty>Renouveau National</CandidateParty>
            <CandidateMeta>Services publics & emploi des jeunes</CandidateMeta>
            <ActionRow>
              <StepTrigger
                onClick={() => {
                  setSelectedCandidate('Mariam Sow');
                  setStep(1);
                }}
              >
                Choisir
              </StepTrigger>
              <SecondaryButton to="/citoyen/candidats/c3">Programme</SecondaryButton>
            </ActionRow>
          </CandidateCard>
        </CandidateGrid>
      </Panel>
      <Overlay $open={step > 0}>
        <Modal>
          <ModalHeader>
            <ModalTitle>Vote securise</ModalTitle>
            <CloseButton onClick={() => setStep(0)}>×</CloseButton>
          </ModalHeader>
          <StepHeader>
            <StepPill $active={step === 1}>
              <StepNumber $active={step === 1}>1</StepNumber>
              Selection
            </StepPill>
            <StepPill $active={step === 2}>
              <StepNumber $active={step === 2}>2</StepNumber>
              Confirmation
            </StepPill>
            <StepPill $active={step === 3}>
              <StepNumber $active={step === 3}>3</StepNumber>
              Token
            </StepPill>
            <StepPill $active={step === 4}>
              <StepNumber $active={step === 4}>4</StepNumber>
              Validation
            </StepPill>
          </StepHeader>
          <ModalBody>
            {step === 1 && (
              <StepCard>
                <StepTitle>Selection du candidat</StepTitle>
                <StepText>
                  Candidat choisi : <strong>{selectedCandidate ?? 'Aucun'}</strong>
                </StepText>
                <InlineActions>
                  <SecondaryButton
                    to="/citoyen/candidats"
                    onClick={() => {
                      setStep(0);
                    }}
                  >
                    Changer
                  </SecondaryButton>
                </InlineActions>
              </StepCard>
            )}
            {step === 2 && (
              <StepCard>
                <StepTitle>Confirmation double</StepTitle>
                <StepText>Merci de verifier une derniere fois avant validation finale.</StepText>
                <CheckList>
                  <li>Candidat selectionne correctement</li>
                  <li>Scrutin en cours</li>
                  <li>Vote unique et anonyme</li>
                </CheckList>
              </StepCard>
            )}
            {step === 3 && (
              <StepCard>
                <StepTitle>Generation du token anonyme</StepTitle>
                <StepText>Un identifiant unique est genere pour garantir l anonymat.</StepText>
                <TokenBox>NV-7F2A-9C4B-3D1E</TokenBox>
              </StepCard>
            )}
            {step === 4 && (
              <StepCard>
                <StepTitle>Validation finale</StepTitle>
                <StepText>
                  Votre bulletin sera enregistre de maniere anonyme. Vous ne pourrez plus modifier votre choix.
                </StepText>
              </StepCard>
            )}
          </ModalBody>
          <ModalActions>
            {step > 1 ? (
              <StepTrigger onClick={() => setStep((prev) => ((prev - 1) as 1 | 2 | 3 | 4))}>
                Retour
              </StepTrigger>
            ) : null}
            {step < 4 ? (
              <StepTrigger onClick={() => setStep((prev) => ((prev + 1) as 1 | 2 | 3 | 4))}>
                Continuer
              </StepTrigger>
            ) : (
              <PrimaryButton to="/citoyen/vote/confirm">Finaliser</PrimaryButton>
            )}
          </ModalActions>
        </Modal>
      </Overlay>
    </AppLayout>
  );
};

export default CitizenVote;
