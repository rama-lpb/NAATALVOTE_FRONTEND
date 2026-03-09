import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';

/* ─── Animations ─────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(1.4); }
`;

/* ─── Page layout ─────────────────────────────────────── */
const PageGrid = styled.div`
  display: grid;
  gap: 1.3rem;
  animation: ${fadeUp} 0.35s ease-out;
`;

/* ─── Election banner ─────────────────────────────────── */
const ElectionBanner = styled.div`
  background: rgba(255, 255, 255, 0.93);
  border-radius: 22px;
  padding: 1.3rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  border: 1px solid rgba(31, 90, 51, 0.14);
  box-shadow: 0 8px 24px rgba(12, 24, 18, 0.07);
  flex-wrap: wrap;
  backdrop-filter: blur(10px);
`;

const BannerLeft = styled.div`
  display: grid;
  gap: 0.3rem;
`;

const ElectionTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a2e20;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ElectionSub = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.83rem;
  color: #6b7a72;
`;

const BannerRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const LiveDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(31, 90, 51, 0.8);
  display: inline-block;
  animation: ${pulse} 1.6s ease-in-out infinite;
`;

const LiveBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.1);
  border: 1px solid rgba(31, 90, 51, 0.2);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(31, 90, 51, 0.85);
`;

const CountdownBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #6b7a72;
  i { color: rgba(31, 90, 51, 0.6); }
`;

/* ─── Step wizard ─────────────────────────────────────── */
const StepRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

const StepPill = styled.div<{ $active?: boolean; $done?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.45rem 0.6rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.77rem;
  font-weight: 600;
  background: ${({ $active, $done }) =>
    $active ? 'rgba(31, 90, 51, 0.8)' : $done ? 'rgba(31, 90, 51, 0.12)' : 'rgba(31, 90, 51, 0.05)'};
  color: ${({ $active, $done }) =>
    $active ? '#fff' : $done ? 'rgba(31, 90, 51, 0.85)' : 'rgba(31, 90, 51, 0.38)'};
  border: 1px solid ${({ $active, $done }) =>
    $active ? 'rgba(31, 90, 51, 0.55)' : $done ? 'rgba(31, 90, 51, 0.2)' : 'rgba(31, 90, 51, 0.1)'};
`;

const StepNum = styled.span<{ $active?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.68rem;
  font-weight: 700;
  background: ${({ $active }) => $active ? 'rgba(255,255,255,0.9)' : 'transparent'};
  color: ${({ $active }) => $active ? 'rgba(31,90,51,0.9)' : 'inherit'};
`;

/* ─── Candidates section ─────────────────────────────── */
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #22312a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CandCount = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  color: #8a9a90;
  font-weight: 400;
`;

const CandidateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
`;

/* ─── Candidate card ─────────────────────────────────── */
const CandCard = styled.div<{ $selected?: boolean }>`
  background: rgba(255, 255, 255, 0.93);
  border-radius: 22px;
  overflow: hidden;
  border: ${({ $selected }) => $selected
    ? '2px solid rgba(31, 90, 51, 0.55)'
    : '1px solid rgba(31, 90, 51, 0.12)'};
  box-shadow: ${({ $selected }) => $selected
    ? '0 12px 32px rgba(31, 90, 51, 0.18)'
    : '0 6px 18px rgba(12, 24, 18, 0.07)'};
  transition: all 0.25s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 36px rgba(12, 24, 18, 0.12);
  }
`;

const CardTop = styled.div<{ $color: string }>`
  height: 88px;
  background: ${({ $color }) => $color};
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0 1.2rem 0;
`;

const CandAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 800;
  font-size: 1.3rem;
  color: #fff;
  transform: translateY(30px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
`;

const SelectedMark = styled.div`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(31, 90, 51, 0.9);
  font-size: 0.95rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
`;

const CardBody = styled.div`
  padding: 2.2rem 1.2rem 1.3rem;
  display: grid;
  gap: 0.5rem;
  flex: 1;
`;

const CandName = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1a2e20;
`;

const CandPartyBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: ${({ $color }) => $color}18;
  color: ${({ $color }) => $color};
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

const CandProgram = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #6b7a72;
  line-height: 1.5;
`;

const CardDivider = styled.div`
  height: 1px;
  background: rgba(31, 90, 51, 0.08);
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const VoteBtn = styled.button<{ $selected?: boolean }>`
  flex: 1;
  padding: 0.6rem 0.8rem;
  border-radius: 12px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.2s;
  background: ${({ $selected }) => $selected
    ? 'linear-gradient(135deg, rgba(31,90,51,0.9), rgba(31,90,51,0.7))'
    : 'rgba(31, 90, 51, 0.08)'};
  color: ${({ $selected }) => $selected ? '#fff' : 'rgba(31,90,51,0.85)'};
  border: ${({ $selected }) => $selected
    ? '1px solid rgba(31,90,51,0.5)'
    : '1px solid rgba(31,90,51,0.18)'};
  box-shadow: ${({ $selected }) => $selected ? '0 4px 12px rgba(31,90,51,0.22)' : 'none'};
  &:hover {
    transform: translateY(-1px);
    background: ${({ $selected }) => $selected
      ? 'linear-gradient(135deg, rgba(31,90,51,0.95), rgba(31,90,51,0.78))'
      : 'rgba(31, 90, 51, 0.12)'};
  }
`;

const ProgramBtn = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 0.75rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.05);
  border: 1px solid rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.7);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: background 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.1); }
`;

/* ─── Security footer ─────────────────────────────────── */
const SecurityBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem 1.2rem;
  border-radius: 16px;
  background: rgba(31, 90, 51, 0.04);
  border: 1px solid rgba(31, 90, 51, 0.1);
  flex-wrap: wrap;
`;

const SecurityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.38rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  color: rgba(31, 90, 51, 0.75);
  font-weight: 500;
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(31, 90, 51, 0.3);
`;

/* ─── Data ───────────────────────────────────────────── */
const navItems = [
  { label: 'Tableau de bord', to: '/citoyen/dashboard' },
  { label: 'Elections', to: '/citoyen/elections' },
  { label: 'Candidats', to: '/citoyen/candidats' },
  { label: 'Vote securise', to: '/citoyen/vote' },
  { label: 'Resultats temps reel', to: '/citoyen/resultats' },
  { label: 'Profil', to: '/citoyen/profil' },
];

const candidates = [
  {
    id: 'c1',
    initials: 'AN',
    name: 'Aicha Ndiaye',
    party: 'Union Civique',
    program: 'Cohésion nationale, éducation gratuite et services sociaux universels.',
    bg: 'linear-gradient(135deg, #1f5a33, #2d7a47)',
    accent: '#1f5a33',
    route: '/citoyen/candidats/c1',
  },
  {
    id: 'c2',
    initials: 'MD',
    name: 'Moussa Diop',
    party: 'Coalition Verte',
    program: 'Transition écologique, énergies renouvelables et territoires résilients.',
    bg: 'linear-gradient(135deg, #26558a, #3476b5)',
    accent: '#26558a',
    route: '/citoyen/candidats/c2',
  },
  {
    id: 'c3',
    initials: 'MS',
    name: 'Mariam Sow',
    party: 'Renouveau National',
    program: 'Services publics modernisés, emploi des jeunes et égalité des chances.',
    bg: 'linear-gradient(135deg, #7a4a10, #a56218)',
    accent: '#7a4a10',
    route: '/citoyen/candidats/c3',
  },
];

/* ─── Swal step HTML helpers ─────────────────────────── */
const swalStep1Html = (name: string, party: string, initials: string, accent: string) => `
  <p style="margin:0 0 0.8rem;font-family:Poppins,sans-serif;font-size:0.85rem;color:#5a6d62;text-align:left;">
    Vous vous apprêtez à voter pour :
  </p>
  <div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.1rem;border-radius:16px;
    background:linear-gradient(135deg,rgba(31,90,51,0.05),rgba(255,255,255,0.9));
    border:1.5px solid rgba(31,90,51,0.18);text-align:left;margin-bottom:0.8rem;">
    <div style="width:52px;height:52px;border-radius:50%;
      background:linear-gradient(135deg,${accent}cc,${accent}88);
      display:flex;align-items:center;justify-content:center;
      font-family:Poppins,sans-serif;font-weight:800;font-size:1.1rem;color:#fff;flex-shrink:0;
      box-shadow:0 4px 12px ${accent}44;">${initials}</div>
    <div>
      <div style="font-family:Poppins,sans-serif;font-weight:700;color:#1a2e20;font-size:1rem;">${name}</div>
      <div style="font-family:Poppins,sans-serif;font-size:0.78rem;color:#6b7a72;margin-top:0.15rem;">${party}</div>
    </div>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:0.4rem;justify-content:center;">
    <span style="display:inline-flex;align-items:center;gap:0.3rem;padding:0.25rem 0.65rem;border-radius:999px;
      background:rgba(31,90,51,0.08);border:1px solid rgba(31,90,51,0.18);
      font-family:Poppins,sans-serif;font-size:0.72rem;font-weight:600;color:rgba(31,90,51,0.85);">
      🔒 Vote anonymisé
    </span>
    <span style="display:inline-flex;align-items:center;gap:0.3rem;padding:0.25rem 0.65rem;border-radius:999px;
      background:rgba(31,90,51,0.08);border:1px solid rgba(31,90,51,0.18);
      font-family:Poppins,sans-serif;font-size:0.72rem;font-weight:600;color:rgba(31,90,51,0.85);">
      🔑 AES-256
    </span>
    <span style="display:inline-flex;align-items:center;gap:0.3rem;padding:0.25rem 0.65rem;border-radius:999px;
      background:rgba(31,90,51,0.08);border:1px solid rgba(31,90,51,0.18);
      font-family:Poppins,sans-serif;font-size:0.72rem;font-weight:600;color:rgba(31,90,51,0.85);">
      ✅ Vote unique
    </span>
  </div>
`;

const swalStep2Html = `
  <div style="display:grid;gap:0.6rem;text-align:left;">
    <p style="margin:0;font-family:Poppins,sans-serif;font-size:0.85rem;color:#5a6d62;">
      Vérification de votre éligibilité et de votre droit de vote.
    </p>
    ${['Identité vérifiée — CNI valide','Eligibilité confirmée — inscrit au registre','Aucun vote précédent détecté','Session sécurisée — OTP validé']
      .map(t => `
      <div style="display:flex;align-items:center;gap:0.7rem;padding:0.6rem 0.85rem;border-radius:12px;
        background:rgba(31,90,51,0.05);border:1px solid rgba(31,90,51,0.12);">
        <span style="width:22px;height:22px;border-radius:50%;background:rgba(31,90,51,0.85);
          display:flex;align-items:center;justify-content:center;font-size:0.7rem;color:#fff;flex-shrink:0;">✓</span>
        <span style="font-family:Poppins,sans-serif;font-size:0.83rem;color:#22312a;font-weight:500;">${t}</span>
      </div>`)
      .join('')}
  </div>
`;

const swalStep3Html = `
  <div style="text-align:left;">
    <p style="margin:0 0 0.8rem;font-family:Poppins,sans-serif;font-size:0.85rem;color:#5a6d62;">
      Un token cryptographique unique est généré et associé à votre bulletin de manière anonyme.
    </p>
    <div style="padding:1rem 1.2rem;border-radius:14px;
      background:rgba(31,90,51,0.06);border:1px dashed rgba(31,90,51,0.25);
      text-align:center;margin-bottom:0.8rem;">
      <div style="font-family:'Courier New',monospace;font-weight:800;font-size:1.2rem;
        color:rgba(31,90,51,0.88);letter-spacing:0.16em;">NV-7F2A-9C4B-3D1E</div>
      <div style="font-family:Poppins,sans-serif;font-size:0.72rem;color:#8a9a90;margin-top:0.4rem;">
        Token anonyme — aucun lien avec votre identité
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:0.5rem;padding:0.6rem 0.8rem;border-radius:10px;
      background:rgba(210,140,30,0.07);border:1px solid rgba(210,140,30,0.2);
      font-family:Poppins,sans-serif;font-size:0.78rem;color:rgba(110,68,8,0.9);">
      <span style="flex-shrink:0;">⚠️</span>
      <span>Conservez ce token. C'est votre <strong>seule preuve</strong> de participation.</span>
    </div>
  </div>
`;

const swalStep4Html = (name: string) => `
  <div style="text-align:left;display:grid;gap:0.6rem;">
    <p style="margin:0;font-family:Poppins,sans-serif;font-size:0.85rem;color:#5a6d62;">
      Récapitulatif avant validation définitive :
    </p>
    ${[
      ['Candidat', name],
      ['Élection', 'Présidentielle 2025'],
      ['Chiffrement', 'AES-256'],
      ['Anonymat', 'Garanti — aucune trace'],
    ].map(([k, v]) => `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;
        padding:0.55rem 0.85rem;border-radius:10px;
        background:rgba(255,255,255,0.88);border:1px solid rgba(31,90,51,0.09);">
        <span style="font-family:Poppins,sans-serif;font-size:0.8rem;color:#6b7a72;">${k}</span>
        <span style="font-family:Poppins,sans-serif;font-size:0.82rem;font-weight:700;color:#1a2e20;">${v}</span>
      </div>
    `).join('')}
    <div style="display:flex;align-items:flex-start;gap:0.5rem;padding:0.65rem 0.85rem;border-radius:12px;
      background:rgba(176,58,46,0.06);border:1px solid rgba(176,58,46,0.18);
      font-family:Poppins,sans-serif;font-size:0.78rem;color:rgba(120,40,28,0.9);margin-top:0.2rem;">
      <span style="flex-shrink:0;margin-top:1px;">🔒</span>
      <span>Cette action est <strong>irréversible</strong>. Votre bulletin sera enregistré définitivement.</span>
    </div>
  </div>
`;

/* ─── Component ──────────────────────────────────────── */
const CitizenVote = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const openVoteFlow = async (cand: typeof candidates[0]) => {
    setSelectedId(cand.id);

    const swalBase = {
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: 'Continuer &rarr;',
      cancelButtonText: 'Annuler',
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    };

    /* Step 1 — Sélection */
    const r1 = await Swal.fire({
      ...swalBase,
      title: '① Votre sélection',
      html: swalStep1Html(cand.name, cand.party, cand.initials, cand.accent),
    });
    if (!r1.isConfirmed) { setSelectedId(null); return; }

    /* Step 2 — Vérification identité */
    const r2 = await Swal.fire({
      ...swalBase,
      title: '② Vérification d\'éligibilité',
      html: swalStep2Html,
      confirmButtonText: 'Valider &rarr;',
    });
    if (!r2.isConfirmed) { setSelectedId(null); return; }

    /* Step 3 — Token généré */
    const r3 = await Swal.fire({
      ...swalBase,
      title: '③ Token anonyme généré',
      html: swalStep3Html,
      confirmButtonText: 'Continuer &rarr;',
    });
    if (!r3.isConfirmed) { setSelectedId(null); return; }

    /* Step 4 — Validation finale */
    const r4 = await Swal.fire({
      ...swalBase,
      title: '④ Validation finale',
      html: swalStep4Html(cand.name),
      confirmButtonText: '🔒 Confirmer mon vote',
      cancelButtonText: 'Annuler',
    });
    if (!r4.isConfirmed) { setSelectedId(null); return; }

    /* Chiffrement loading */
    Swal.fire({
      customClass: { popup: 'naatal-swal' },
      title: 'Chiffrement en cours...',
      html: `<p style="font-family:Poppins,sans-serif;font-size:0.87rem;color:#5a6d62;margin:0;">
        Votre bulletin est chiffré avec <strong>AES-256</strong> et anonymisé. Veuillez patienter.
      </p>`,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          /* Success */
          Swal.fire({
            customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
            buttonsStyling: false,
            icon: 'success',
            title: 'Vote enregistré !',
            html: `
              <p style="font-family:Poppins,sans-serif;font-size:0.87rem;color:#5a6d62;margin:0 0 0.9rem;">
                Votre bulletin a été ajouté au scrutin de façon <strong>anonyme et chiffrée</strong>.
              </p>
              <div style="padding:0.8rem 1.1rem;border-radius:14px;background:rgba(31,90,51,0.07);
                border:1px solid rgba(31,90,51,0.18);text-align:center;margin-bottom:0.6rem;">
                <div style="font-family:'Courier New',monospace;font-weight:800;font-size:1.15rem;
                  color:rgba(31,90,51,0.88);letter-spacing:0.16em;">NV-7F2A-9C4B-3D1E</div>
              </div>
              <p style="font-family:Poppins,sans-serif;font-size:0.75rem;color:#8a9a90;margin:0;">
                Conservez ce token — c'est votre seule preuve de participation.
              </p>
            `,
            confirmButtonText: '📄 Voir mon reçu complet',
          }).then(() => navigate('/citoyen/vote/recu'));
        }, 1800);
      },
    });
  };

  return (
    <AppLayout
      role="Citoyen"
      title="Vote sécurisé"
      subtitle="Sélectionnez votre candidat et confirmez votre bulletin en 4 étapes."
      navItems={navItems}
    >
      <PageGrid>
        {/* Election banner */}
        <ElectionBanner>
          <BannerLeft>
            <ElectionTitle>
              <i className="bi bi-calendar2-check" style={{ color: 'rgba(31,90,51,0.75)' }} />
              Présidentielle 2025
            </ElectionTitle>
            <ElectionSub>Clôture du scrutin le 12 mars 2026 à 18h00 — 3 candidats</ElectionSub>
          </BannerLeft>
          <BannerRight>
            <LiveBadge><LiveDot />Scrutin en cours</LiveBadge>
            <CountdownBox>
              <i className="bi bi-clock" />
              Fermeture dans 3j 06h
            </CountdownBox>
          </BannerRight>
        </ElectionBanner>

        {/* Step indicator */}
        <StepRow>
          <StepPill $active>
            <StepNum $active>1</StepNum>
            Sélection
          </StepPill>
          <StepPill>
            <StepNum>2</StepNum>
            Vérification
          </StepPill>
          <StepPill>
            <StepNum>3</StepNum>
            Token
          </StepPill>
          <StepPill>
            <StepNum>4</StepNum>
            Validation
          </StepPill>
        </StepRow>

        {/* Candidates */}
        <div>
          <SectionHeader>
            <SectionTitle>
              <i className="bi bi-people" style={{ color: 'rgba(31,90,51,0.7)' }} />
              Candidats
              <CandCount>({candidates.length} candidats)</CandCount>
            </SectionTitle>
          </SectionHeader>
        </div>

        <CandidateGrid>
          {candidates.map((c) => {
            const isSelected = selectedId === c.id;
            return (
              <CandCard key={c.id} $selected={isSelected}>
                <CardTop $color={c.bg}>
                  {isSelected && (
                    <SelectedMark><i className="bi bi-check-lg" /></SelectedMark>
                  )}
                  <CandAvatar>{c.initials}</CandAvatar>
                </CardTop>
                <CardBody>
                  <div>
                    <CandName>{c.name}</CandName>
                    <CandPartyBadge $color={c.accent}>{c.party}</CandPartyBadge>
                  </div>
                  <CandProgram>{c.program}</CandProgram>
                  <CardDivider />
                  <CardActions>
                    <VoteBtn $selected={isSelected} onClick={() => openVoteFlow(c)}>
                      {isSelected
                        ? <><i className="bi bi-check2" />Sélectionné</>
                        : <><i className="bi bi-hand-index" />Voter</>
                      }
                    </VoteBtn>
                    <ProgramBtn to={c.route}>
                      <i className="bi bi-file-text" />
                      Programme
                    </ProgramBtn>
                  </CardActions>
                </CardBody>
              </CandCard>
            );
          })}
        </CandidateGrid>

        {/* Security footer */}
        <SecurityBar>
          <SecurityItem><i className="bi bi-shield-lock" />Vote anonymisé</SecurityItem>
          <Dot />
          <SecurityItem><i className="bi bi-key" />Chiffrement AES-256</SecurityItem>
          <Dot />
          <SecurityItem><i className="bi bi-person-x" />Identité non tracée</SecurityItem>
          <Dot />
          <SecurityItem><i className="bi bi-check2-all" />Vote unique garanti</SecurityItem>
          <Dot />
          <SecurityItem><i className="bi bi-hash" />HMAC-SHA256</SecurityItem>
        </SecurityBar>
      </PageGrid>
    </AppLayout>
  );
};

export default CitizenVote;
