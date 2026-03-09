import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';

/* ── Animations ─────────────────────────────────────── */
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Layout ─────────────────────────────────────────── */
const PageGrid = styled.div`
  display: grid;
  gap: 1.2rem;
  max-width: 720px;
  animation: ${slideUp} 0.35s ease-out;
`;

/* ── Step wizard ─────────────────────────────────────── */
const StepBanner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

const StepItem = styled.div<{ $done?: boolean; $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  background: ${({ $active, $done }) =>
    $active ? 'rgba(31, 90, 51, 0.78)' : $done ? 'rgba(31, 90, 51, 0.14)' : 'rgba(31, 90, 51, 0.05)'};
  color: ${({ $active, $done }) =>
    $active ? '#fff' : $done ? 'rgba(31, 90, 51, 0.9)' : 'rgba(31, 90, 51, 0.4)'};
  border: 1px solid ${({ $active, $done }) =>
    $active ? 'rgba(31, 90, 51, 0.55)' : $done ? 'rgba(31, 90, 51, 0.22)' : 'rgba(31, 90, 51, 0.1)'};
  transition: all 0.2s;
`;

const StepNum = styled.span<{ $done?: boolean; $active?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  background: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  color: ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.9)' : 'inherit')};
`;

/* ── Main panel ─────────────────────────────────────── */
const Panel = styled.div`
  background: rgba(255, 255, 255, 0.93);
  border-radius: 24px;
  padding: 1.8rem;
  box-shadow: 0 18px 40px rgba(12, 24, 18, 0.1);
  display: grid;
  gap: 1.3rem;
  border: 1px solid rgba(31, 90, 51, 0.13);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

const SectionLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(31, 90, 51, 0.55);
`;

/* ── Candidate card ─────────────────────────────────── */
const CandidateCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.1rem 1.3rem;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.05) 0%, rgba(255, 255, 255, 0.92) 100%);
  border: 2px solid rgba(31, 90, 51, 0.18);
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 80px; height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(31, 90, 51, 0.06), transparent 70%);
    transform: translate(20px, -20px);
  }
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.8), rgba(31, 90, 51, 0.55));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(31, 90, 51, 0.25);
`;

const CandidateInfo = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const CandidateName = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1a2e20;
`;

const CandidateParty = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.87rem;
  color: #5a6d62;
`;

const CandidateElection = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: rgba(31, 90, 51, 0.1);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.73rem;
  font-weight: 600;
  margin-top: 0.1rem;
  width: fit-content;
`;

/* ── Security chips ─────────────────────────────────── */
const SecurityStrip = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const SecurityChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.38rem;
  padding: 0.38rem 0.75rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.07);
  border: 1px solid rgba(31, 90, 51, 0.18);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.77rem;
  color: rgba(31, 90, 51, 0.85);
  font-weight: 500;
`;

/* ── Token preview ───────────────────────────────────── */
const TokenPreview = styled.div`
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: rgba(31, 90, 51, 0.04);
  border: 1px dashed rgba(31, 90, 51, 0.22);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #5a6d62;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const TokenCode = styled.span`
  font-family: 'Courier New', monospace;
  font-weight: 800;
  color: rgba(31, 90, 51, 0.75);
  letter-spacing: 0.14em;
  font-size: 0.9rem;
`;

/* ── Warning ─────────────────────────────────────────── */
const Warning = styled.div`
  padding: 0.9rem 1rem;
  border-radius: 14px;
  background: rgba(210, 140, 30, 0.06);
  border: 1px solid rgba(210, 140, 30, 0.2);
  color: rgba(120, 74, 8, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.83rem;
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  line-height: 1.5;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(31, 90, 51, 0.09);
`;

/* ── Actions ─────────────────────────────────────────── */
const ActionRow = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding-top: 0.2rem;
`;

const ModifyButton = styled(Link)`
  text-decoration: none;
  padding: 0.65rem 1.2rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.07);
  color: rgba(31, 90, 51, 0.82);
  border: 1px solid rgba(31, 90, 51, 0.18);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.92rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.12); }
`;

const ConfirmButton = styled.button`
  padding: 0.7rem 1.6rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.92), rgba(31, 90, 51, 0.72));
  color: #fff;
  border: 1px solid rgba(31, 90, 51, 0.55);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 5px 16px rgba(31, 90, 51, 0.28);
  transition: all 0.2s;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(31, 90, 51, 0.35);
  }
  &:active { transform: translateY(0); }
`;

/* ── Nav ─────────────────────────────────────────────── */
const navItems = [
  { label: 'Tableau de bord', to: '/citoyen/dashboard' },
  { label: 'Elections', to: '/citoyen/elections' },
  { label: 'Candidats', to: '/citoyen/candidats' },
  { label: 'Vote securise', to: '/citoyen/vote' },
  { label: 'Resultats temps reel', to: '/citoyen/resultats' },
  { label: 'Profil', to: '/citoyen/profil' },
];

/* ── Component ───────────────────────────────────────── */
const CitizenVoteConfirm = () => {
  const navigate = useNavigate();

  const handleConfirmVote = () => {
    // Step 1 — Confirmation popup
    Swal.fire({
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: '<i class="bi bi-lock-fill"></i>&nbsp; Confirmer mon vote',
      cancelButtonText: 'Annuler',
      title: 'Confirmer votre vote ?',
      html: `
        <p style="margin:0 0 0.5rem;font-family:Poppins,sans-serif;font-size:0.88rem;color:#5a6d62;">
          Vous vous apprêtez à voter pour :
        </p>

        <div class="swal-vote-candidate">
          <div class="swal-vote-avatar">FS</div>
          <div class="swal-vote-info">
            <div class="name">Fatou Sow</div>
            <div class="party">Renouveau National — Emploi des jeunes</div>
          </div>
        </div>

        <div class="swal-chips">
          <span class="swal-chip"><i class="bi bi-shield-lock"></i> Anonyme</span>
          <span class="swal-chip"><i class="bi bi-key"></i> AES-256</span>
          <span class="swal-chip"><i class="bi bi-check2-all"></i> Vote unique</span>
        </div>

        <div class="swal-alert-box">
          <i class="bi bi-exclamation-triangle" style="flex-shrink:0;margin-top:1px;"></i>
          <span>Cette action est <strong>irréversible</strong>. Votre bulletin sera enregistré définitivement et de manière anonyme.</span>
        </div>
      `,
    }).then((result) => {
      if (!result.isConfirmed) return;

      // Step 2 — Chiffrement en cours (loading)
      Swal.fire({
        customClass: { popup: 'naatal-swal naatal-swal-loading' },
        title: 'Chiffrement en cours...',
        html: `
          <p style="font-family:Poppins,sans-serif;font-size:0.88rem;color:#5a6d62;margin:0;">
            Votre bulletin est chiffré avec <strong>AES-256</strong> et anonymisé.<br/>
            Veuillez patienter.
          </p>
        `,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
          // Simulate async encryption delay
          setTimeout(() => {
            // Step 3 — Success
            Swal.fire({
              customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
              buttonsStyling: false,
              icon: 'success',
              title: 'Vote enregistré !',
              html: `
                <p style="font-family:Poppins,sans-serif;font-size:0.88rem;color:#5a6d62;margin:0 0 0.8rem;">
                  Votre bulletin a été ajouté au scrutin de façon <strong>anonyme et chiffrée</strong>.
                </p>
                <div style="
                  background:rgba(31,90,51,0.07);
                  border:1px solid rgba(31,90,51,0.18);
                  border-radius:12px;
                  padding:0.7rem 1rem;
                  font-family:'Courier New',monospace;
                  font-size:1.05rem;
                  font-weight:800;
                  color:rgba(31,90,51,0.88);
                  letter-spacing:0.14em;
                  text-align:center;
                ">5F7C-82AB-9C22-4A11</div>
                <p style="font-family:Poppins,sans-serif;font-size:0.75rem;color:#8a9a90;margin:0.5rem 0 0;">
                  Conservez ce token — c'est votre seule preuve de participation.
                </p>
              `,
              confirmButtonText: '<i class="bi bi-receipt"></i>&nbsp; Voir mon reçu complet',
            }).then(() => {
              navigate('/citoyen/vote/recu');
            });
          }, 1800);
        },
      });
    });
  };

  return (
    <AppLayout
      role="Citoyen"
      title="Confirmation du vote"
      subtitle="Vérifiez votre sélection avant l'enregistrement définitif."
      navItems={navItems}
    >
      <PageGrid>
        {/* Step wizard */}
        <StepBanner>
          <StepItem $done>
            <StepNum $done><i className="bi bi-check" /></StepNum>
            Sélection
          </StepItem>
          <StepItem $active>
            <StepNum $active>2</StepNum>
            Confirmation
          </StepItem>
          <StepItem>
            <StepNum>3</StepNum>
            Token
          </StepItem>
          <StepItem>
            <StepNum>4</StepNum>
            Reçu
          </StepItem>
        </StepBanner>

        <Panel>
          <SectionLabel>Candidat sélectionné</SectionLabel>
          <CandidateCard>
            <Avatar>FS</Avatar>
            <CandidateInfo>
              <CandidateName>Fatou Sow</CandidateName>
              <CandidateParty>Renouveau National — Services publics & emploi des jeunes</CandidateParty>
              <CandidateElection>
                <i className="bi bi-calendar2-check" />
                Présidentielle 2025
              </CandidateElection>
            </CandidateInfo>
          </CandidateCard>

          <Divider />

          <SectionLabel>Garanties de sécurité</SectionLabel>
          <SecurityStrip>
            <SecurityChip><i className="bi bi-shield-lock" />Vote anonymisé</SecurityChip>
            <SecurityChip><i className="bi bi-key" />Chiffrement AES-256</SecurityChip>
            <SecurityChip><i className="bi bi-person-x" />Identité non tracée</SecurityChip>
            <SecurityChip><i className="bi bi-check2-all" />Vote unique garanti</SecurityChip>
          </SecurityStrip>

          <SectionLabel>Token anonyme (généré après confirmation)</SectionLabel>
          <TokenPreview>
            <span>Un token cryptographique sera généré et lié à votre bulletin.</span>
            <TokenCode>NV-????-????-????</TokenCode>
          </TokenPreview>

          <Warning>
            <i className="bi bi-exclamation-triangle" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
            <span>
              Cette action est <strong>irréversible</strong>. Une fois confirmé, votre bulletin est
              enregistré de manière définitive et anonyme. Il vous sera impossible de modifier votre
              choix.
            </span>
          </Warning>

          <ActionRow>
            <ModifyButton to="/citoyen/vote">
              <i className="bi bi-arrow-left" />
              Modifier
            </ModifyButton>
            <ConfirmButton onClick={handleConfirmVote}>
              <i className="bi bi-lock-fill" />
              Confirmer mon vote
            </ConfirmButton>
          </ActionRow>
        </Panel>
      </PageGrid>
    </AppLayout>
  );
};

export default CitizenVoteConfirm;
