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
  background: rgba(31, 90, 51, 0.55);
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

/* ─── Election selector ───────────────────────────────── */
const ElectionSelector = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const ElectionOption = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1rem;
  border-radius: 14px;
  border: 1px solid ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.5)' : 'rgba(31, 90, 51, 0.15)'};
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.12)' : 'rgba(255, 255, 255, 0.85)'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.72)' : 'rgba(31, 90, 51, 0.7)'};
  box-shadow: ${({ $active }) => $active ? '0 4px 12px rgba(31, 90, 51, 0.15)' : 'none'};

  &:hover {
    border-color: rgba(31, 90, 51, 0.35);
    background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.15)' : 'rgba(31, 90, 51, 0.08)'};
  }
`;

const ElectionBadge = styled.span<{ $status: 'live' | 'scheduled' }>`
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${({ $status }) => $status === 'live' ? 'rgba(31, 90, 51, 0.15)' : 'rgba(138, 90, 16, 0.15)'};
  color: ${({ $status }) => $status === 'live' ? '#1a5a33' : '#8a5a10'};
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
    $active ? 'rgba(31, 90, 51, 0.55)' : $done ? 'rgba(31, 90, 51, 0.12)' : 'rgba(31, 90, 51, 0.05)'};
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3.5rem;
`;

/* ─── Candidate card ─────────────────────────────────── */
const CandCard = styled.div<{ $selected?: boolean }>`
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  border: ${({ $selected }) => $selected
    ? '2px solid #1f5a33'
    : '1px solid rgba(31, 90, 51, 0.1)'};
  box-shadow: ${({ $selected }) => $selected
    ? '0 6px 16px rgba(31, 90, 51, 0.12)'
    : '0 2px 8px rgba(0, 0, 0, 0.04)'};
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(31, 90, 51, 0.1);
  }
`;

const CardTop = styled.div<{ $color: string }>`
  height: 60px;
  background: ${({ $color }) => $color};
  position: relative;
`;

const CandAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #1a2e20;
  transform: translateY(24px);
  margin-left: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const SelectedMark = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #1f5a33;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 0.8rem;
`;

const CardBody = styled.div`
  padding: 2rem 1.4rem 1.4rem;
  display: grid;
  gap: 1rem;
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
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background: ${({ $color }) => $color}15;
  color: ${({ $color }) => $color};
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

const CandProgram = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  color: #8a9a90;
  line-height: 1.4;
`;

const CardDivider = styled.div`
  height: 1px;
  background: rgba(31, 90, 51, 0.08);
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const VoteBtn = styled.button<{ $selected?: boolean; $disabled?: boolean }>`
  flex: 1;
  padding: 0.6rem 0.8rem;
  border-radius: 12px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.2s;
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  background: ${({ $selected, $disabled }) => $disabled 
    ? 'rgba(31, 90, 51, 0.05)'
    : $selected 
      ? 'linear-gradient(135deg, rgba(31,90,51,0.65), rgba(31,90,51,0.5))'
      : 'rgba(31, 90, 51, 0.08)'};
  color: ${({ $selected, $disabled }) => $disabled 
    ? 'rgba(31,90,51,0.4)'
    : $selected ? '#fff' : 'rgba(31,90,51,0.85)'};
  border: ${({ $selected, $disabled }) => $disabled 
    ? '1px solid rgba(31,90,51,0.1)'
    : $selected 
      ? '1px solid rgba(31,90,51,0.5)'
      : '1px solid rgba(31,90,51,0.18)'};
  box-shadow: ${({ $selected }) => $selected ? '0 4px 12px rgba(31,90,51,0.22)' : 'none'};
  &:hover {
    transform: ${({ $disabled }) => $disabled ? 'none' : 'translateY(-1px)'};
    background: ${({ $selected, $disabled }) => $disabled 
      ? 'rgba(31, 90, 51, 0.05)'
      : $selected 
        ? 'linear-gradient(135deg, rgba(31,90,51,0.72), rgba(31,90,51,0.58))'
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
type Candidate = {
  id: string;
  initials: string;
  name: string;
  party: string;
  program: string;
  bg: string;
  accent: string;
  route: string;
};
const navItems = [
  { label: 'Tableau de bord', to: '/citoyen/dashboard' },
  { label: 'Elections', to: '/citoyen/elections' },
  { label: 'Candidats', to: '/citoyen/candidats' },
  { label: 'Vote securise', to: '/citoyen/vote' },
  { label: 'Resultats temps reel', to: '/citoyen/resultats' },
  { label: 'Profil', to: '/citoyen/profil' },
];

const elections = [
  {
    id: 'pres-2025',
    title: 'Presidentielle 2025',
    schedule: "Cloture le 12 mars 2026 a 18h00",
    status: 'live' as const,
    candidateCount: 3,
    daysLeft: '3j 06h',
  },
  {
    id: 'leg-2025-dkr',
    title: 'Legislatives Dakar',
    schedule: 'Debut le 20 mars 2026',
    status: 'scheduled' as const,
    candidateCount: 12,
    daysLeft: '10j 02h',
  },
  {
    id: 'reg-2025-dkr',
    title: 'Regionales Dakar',
    schedule: 'En cours - Cloture 18 mars',
    status: 'live' as const,
    candidateCount: 4,
    daysLeft: '5j 12h',
  },
];

const candidatesByElection: Record<string, Candidate[]> = {
  'pres-2025': [
    {
      id: 'c1',
      initials: 'AN',
      name: 'Aicha Ndiaye',
      party: 'Union Civique',
      program: 'Cohésion nationale, éducation gratuite et services sociaux universels.',
      bg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
      accent: '#1f5a33',
      route: '/citoyen/candidats/c1',
    },
    {
      id: 'c2',
      initials: 'MD',
      name: 'Moussa Diop',
      party: 'Coalition Verte',
      program: 'Transition écologique, énergies renouvelables et territoires résilients.',
      bg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
      accent: '#1f5a33',
      route: '/citoyen/candidats/c2',
    },
    {
      id: 'c3',
      initials: 'MS',
      name: 'Mariam Sow',
      party: 'Renouveau National',
      program: 'Services publics modernisés, emploi des jeunes et égalité des chances.',
      bg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
      accent: '#1f5a33',
      route: '/citoyen/candidats/c3',
    },
  ],
  'leg-2025-dkr': [
    {
      id: 'l1',
      initials: 'FB',
      name: 'Fatou Ba',
      party: 'Alliance Populaire',
      program: 'Developpement local et infrastructures pour Dakar.',
      bg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
      accent: '#1f5a33',
      route: '/citoyen/candidats/l1',
    },
    {
      id: 'l2',
      initials: 'SK',
      name: 'Seydou Kane',
      party: 'Voix du Peuple',
      program: 'Education et sante pour tous les quartiers.',
      bg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
      accent: '#1f5a33',
      route: '/citoyen/candidats/l2',
    },
    {
      id: 'l3',
      initials: 'NM',
      name: 'Ndeye Marie',
      party: 'Unisson Senegal',
      program: 'Emploi youth et entrepreneuriat local.',
      bg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
      accent: '#1f5a33',
      route: '/citoyen/candidats/l3',
    },
  ],
  'reg-2025-dkr': [
    {
      id: 'r1',
      initials: 'DK',
      name: 'Dakar Knowledge',
      party: 'Citoyen Actif',
      program: 'Gestion participative et transparence.',
      bg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
      accent: '#1f5a33',
      route: '/citoyen/candidats/r1',
    },
    {
      id: 'r2',
      initials: 'RT',
      name: 'Renaissance Team',
      party: 'Ensemble Dakar',
      program: 'Urbanisme durable et transport.',
      bg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
      accent: '#1f5a33',
      route: '/citoyen/candidats/r2',
    },
  ],
};

/* ─── Swal step HTML helpers ─────────────────────────── */
const swalConfirmHtml = (name: string, party: string, initials: string, accent: string) => `
  <div style="text-align:center;">
    <div style="display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;border-radius:50%;
      background:linear-gradient(135deg,${accent}ee,${accent}aa);box-shadow:0 8px 24px ${accent}44;
      margin-bottom:1rem;">
      <span style="font-family:Poppins,sans-serif;font-weight:800;font-size:2rem;color:#fff;">${initials}</span>
    </div>
    <p style="margin:0 0 0.3rem;font-family:Poppins,sans-serif;font-size:1.1rem;color:#1a2e20;font-weight:700;">${name}</p>
    <p style="margin:0;font-family:Poppins,sans-serif;font-size:0.85rem;color:#6b7a72;">${party}</p>
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
  const [selectedElection, setSelectedElection] = useState<string>('pres-2025');
  // State pour suivre si l'utilisateur a déjà voted
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const currentElection = elections.find(e => e.id === selectedElection);
  const liveElections = elections.filter(e => e.status === 'live');
  const electionCandidates = candidatesByElection[selectedElection] || candidatesByElection['pres-2025'];

  const openVoteFlow = async (cand: Candidate) => {
    setSelectedId(cand.id);

    const swalBase = {
      buttonsStyling: false,
      showCancelButton: true,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    };

    /* Step 1 — Afficher le candidat */
    const r1 = await Swal.fire({
      ...swalBase,
      title: 'Voter pour ' + cand.name,
      html: swalConfirmHtml(cand.name, cand.party, cand.initials, cand.accent),
      confirmButtonText: 'Continuer',
      cancelButtonText: 'Annuler',
    });
    if (!r1.isConfirmed) { setSelectedId(null); return; }

    /* Step 2 — Confirmation finale avec avertissement */
    const r2 = await Swal.fire({
      ...swalBase,
      title: 'Confirmez votre vote',
      html: `<div style="text-align:center;display:grid;gap:1.2rem;">
        <div style="padding:1.2rem;border-radius:16px;background:rgba(31,90,51,0.06);border:1px solid rgba(31,90,51,0.15);">
          <p style="margin:0;font-family:Poppins,sans-serif;font-size:0.9rem;color:#5a6d62;">
            Vous êtes sur le point de voter pour
          </p>
          <p style="margin:0.5rem 0 0;font-family:Poppins,sans-serif;font-size:1.3rem;color:#1a2e20;font-weight:700;">
            ${cand.name}
          </p>
          <p style="margin:0.3rem 0 0;font-family:Poppins,sans-serif;font-size:0.85rem;color:#6b7a72;">
            ${cand.party}
          </p>
        </div>
        <div style="display:flex;align-items:flex-start;gap:0.6rem;padding:1rem;border-radius:12px;
          background:rgba(176,58,46,0.07);border:1px solid rgba(176,58,46,0.2);">
          <div>
            <p style="margin:0;font-family:Poppins,sans-serif;font-size:0.9rem;color:rgba(120,40,28,0.95);font-weight:600;">
              Attention
            </p>
            <p style="margin:0.3rem 0 0;font-family:Poppins,sans-serif;font-size:0.8rem;color:rgba(120,40,28,0.85);">
              Cette action est <strong>irréversible</strong>. Votre vote sera enregistré définitivement.
            </p>
          </div>
        </div>
      </div>`,
      confirmButtonText: 'Confirmer mon vote',
      cancelButtonText: 'Annuler',
    });
    if (!r2.isConfirmed) { setSelectedId(null); return; }

    // Marquer comme ayant vote
    setHasVoted(true);

    /* Loading - Traitement */
    Swal.fire({
      customClass: { popup: 'naatal-swal' },
      title: 'Traitement en cours...',
      html: `<p style="font-family:Poppins,sans-serif;font-size:0.87rem;color:#5a6d62;margin:0;">
        Votre vote est en cours de traitement. Veuillez patienter.
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
            title: 'Vote enregistre !',
            html: `
              <p style="font-family:Poppins,sans-serif;font-size:0.9rem;color:#5a6d62;margin:0 0 1rem;">
                Votre vote a ete enregistre avec succes. Merci pour votre participation !
              </p>
            `,
            confirmButtonText: 'Voir mon recu',
          }).then(() => navigate('/citoyen/vote/recu'));
        }, 1500);
      },
    });
  };

  return (
    <AppLayout
      role="Citoyen"
      title="Vote sécurisé"
      subtitle="Sélectionnez votre candidat et confirmez votre bulletin."
      navItems={navItems}
    >
      <PageGrid>
        {/* Election selector for multiple elections */}
        {elections.length > 1 && (
          <div>
            <SectionHeader>
              <SectionTitle>
                Elections en cours
                <CandCount>({liveElections.length} scrutins actifs)</CandCount>
              </SectionTitle>
            </SectionHeader>
            <ElectionSelector>
              {elections.map((election) => (
                <ElectionOption
                  key={election.id}
                  $active={selectedElection === election.id}
                  onClick={() => setSelectedElection(election.id)}
                >
                  <ElectionBadge $status={election.status}>
                    {election.status === 'live' ? 'En cours' : 'Bientot'}
                  </ElectionBadge>
                  {election.title}
                </ElectionOption>
              ))}
            </ElectionSelector>
          </div>
        )}

        {/* Election banner */}
        <ElectionBanner>
          <BannerLeft>
            <ElectionTitle>
              <i className="bi bi-calendar2-check" style={{ color: 'rgba(31,90,51,0.75)' }} />
              {currentElection?.title || 'Presidentielle 2025'}
            </ElectionTitle>
            <ElectionSub>{currentElection?.schedule || "Cloture le 12 mars 2026 a 18h00"} — {currentElection?.candidateCount || 3} candidats</ElectionSub>
          </BannerLeft>
          <BannerRight>
            {currentElection?.status === 'live' ? (
              <><LiveBadge><LiveDot />Scrutin en cours</LiveBadge>
              <CountdownBox>
                <i className="bi bi-clock" />
                Fermeture dans {currentElection?.daysLeft || '3j 06h'}
              </CountdownBox></>
            ) : (
              <LiveBadge style={{ background: 'rgba(138, 90, 16, 0.1)', borderColor: 'rgba(138, 90, 16, 0.2)', color: 'rgba(138, 90, 16, 0.85)' }}>
                <i className="bi bi-clock-history" /> Bientot disponible
              </LiveBadge>
            )}
          </BannerRight>
        </ElectionBanner>

        {/* Candidates */}
        <div>
          <SectionHeader>
            <SectionTitle>
              Candidats
              <CandCount>({electionCandidates.length} candidats)</CandCount>
            </SectionTitle>
          </SectionHeader>
        </div>

        <CandidateGrid>
          {electionCandidates.map((c) => {
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
                    {currentElection?.status === 'live' ? (
                      <VoteBtn $selected={isSelected} $disabled={hasVoted} onClick={() => !hasVoted && openVoteFlow(c)}>
                        {isSelected
                          ? <><i className="bi bi-check2" />Sélectionné</>
                          : <><i className="bi bi-hand-index" />Voter</>
                        }
                      </VoteBtn>
                    ) : (
                      <VoteBtn $disabled={true}>
                        <i className="bi bi-clock" />Bientôt
                      </VoteBtn>
                    )}
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
          <SecurityItem>Vote anonymise</SecurityItem>
          <Dot />
          <SecurityItem>Chiffrement AES-256</SecurityItem>
          <Dot />
          <SecurityItem>Identite non tracee</SecurityItem>
          <Dot />
          <SecurityItem>Vote unique garanti</SecurityItem>
          <Dot />
          <SecurityItem>HMAC-SHA256</SecurityItem>
        </SecurityBar>
      </PageGrid>
    </AppLayout>
  );
};

export default CitizenVote;
