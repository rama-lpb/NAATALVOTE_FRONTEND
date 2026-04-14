import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';
import { api, type ElectionDto, type CandidateDto } from '../services/api';
import { useAppSelector } from '../store/hooks';

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
const navItems = [
  { label: 'Tableau de bord', to: '/citoyen/dashboard' },
  { label: 'Elections', to: '/citoyen/elections' },
  { label: 'Candidats', to: '/citoyen/candidats' },
  { label: 'Vote securise', to: '/citoyen/vote' },
  { label: 'Resultats temps reel', to: '/citoyen/resultats' },
  { label: 'Profil', to: '/citoyen/profil' },
];

const formatDateFin = (iso: string): string => {
  try {
    const d = new Date(iso);
    return `Cloture le ${d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })} a ${d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  } catch { return iso; }
};

const daysLeft = (iso: string): string => {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return 'Terminee';
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  return d > 0 ? `${d}j ${h}h` : `${h}h`;
};

const toInitials = (prenom: string, nom: string) =>
  `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase() || '??';

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
  const userId = useAppSelector((s) => s.auth.user?.id ?? null);

  const [apiElections, setApiElections] = useState<ElectionDto[]>([]);
  const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  const [loadingElections, setLoadingElections] = useState(true);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [votedElections, setVotedElections] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedElection, setSelectedElection] = useState<string>('');

  /* Charger les élections EN_COURS au montage */
  useEffect(() => {
    api.elections.list()
      .then((data) => {
        const live = data.filter((e) => e.statut === 'EN_COURS');
        setApiElections(live);
        if (live.length > 0) setSelectedElection(live[0].id);
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Erreur', text: 'Impossible de charger les élections.', buttonsStyling: false, customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' } });
      })
      .finally(() => setLoadingElections(false));
  }, []);

  /* Charger les candidats quand l'élection change */
  useEffect(() => {
    if (!selectedElection) return;
    setLoadingCandidates(true);
    setSelectedId(null);
    api.elections.getCandidates(selectedElection)
      .then(setCandidates)
      .catch(() => setCandidates([]))
      .finally(() => setLoadingCandidates(false));
  }, [selectedElection]);

  /* Vérifier le statut de vote quand l'élection change */
  useEffect(() => {
    if (!userId || !selectedElection) return;
    api.citoyen.voteStatus(userId, selectedElection)
      .then((s) => {
        if (s.a_vote) setVotedElections((prev) => new Set(prev).add(selectedElection));
      })
      .catch(() => {});
  }, [userId, selectedElection]);

  const currentElection = apiElections.find((e) => e.id === selectedElection);
  const hasVoted = votedElections.has(selectedElection);

  const openVoteFlow = async (cand: CandidateDto) => {
    setSelectedId(cand.id);

    const candName = `${cand.prenom} ${cand.nom}`;
    const candInitials = toInitials(cand.prenom, cand.nom);
    const swalBase = {
      buttonsStyling: false,
      showCancelButton: true,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    };

    /* Step 1 — Afficher le candidat */
    const r1 = await Swal.fire({
      ...swalBase,
      title: 'Voter pour ' + candName,
      html: swalConfirmHtml(candName, cand.parti_politique, candInitials, '#1f5a33'),
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
            ${candName}
          </p>
          <p style="margin:0.3rem 0 0;font-family:Poppins,sans-serif;font-size:0.85rem;color:#6b7a72;">
            ${cand.parti_politique}
          </p>
        </div>
        <div style="display:flex;align-items:flex-start;gap:0.6rem;padding:1rem;border-radius:12px;
          background:rgba(176,58,46,0.07);border:1px solid rgba(176,58,46,0.2);">
          <div>
            <p style="margin:0;font-family:Poppins,sans-serif;font-size:0.9rem;color:rgba(120,40,28,0.95);font-weight:600;">
              Attention
            </p>
            <p style="margin:0.3rem 0 0;font-family:Poppins,sans-serif;font-size:0.8rem;color:rgba(120,40,28,0.85);">
              Cette action est <strong>irréversible</strong>. Votre vote sera enregistré définitivement et de manière anonyme.
            </p>
          </div>
        </div>
      </div>`,
      confirmButtonText: '<i class="bi bi-lock-fill"></i>&nbsp; Confirmer mon vote',
      cancelButtonText: 'Annuler',
    });
    if (!r2.isConfirmed) { setSelectedId(null); return; }

    /* Loading + appel API */
    Swal.fire({
      customClass: { popup: 'naatal-swal' },
      title: 'Chiffrement en cours...',
      html: `<p style="font-family:Poppins,sans-serif;font-size:0.87rem;color:#5a6d62;margin:0;">
        Votre bulletin est chiffré avec <strong>AES-256</strong> et anonymisé. Veuillez patienter.
      </p>`,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          const res = await api.votes.cast({
            election_id: selectedElection,
            candidat_id: cand.id,
            citoyen_id: userId ?? undefined,
          });

          setVotedElections((prev) => new Set(prev).add(selectedElection));

          await Swal.fire({
            customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
            buttonsStyling: false,
            icon: 'success',
            title: 'Vote enregistré !',
            html: `
              <p style="font-family:Poppins,sans-serif;font-size:0.9rem;color:#5a6d62;margin:0 0 0.8rem;">
                Votre bulletin a été ajouté au scrutin de façon <strong>anonyme et chiffrée</strong>.
              </p>
              <div style="background:rgba(31,90,51,0.07);border:1px solid rgba(31,90,51,0.18);border-radius:12px;
                padding:0.7rem 1rem;font-family:'Courier New',monospace;font-size:1.05rem;font-weight:800;
                color:rgba(31,90,51,0.88);letter-spacing:0.14em;text-align:center;">
                ${res.confirmation_number}
              </div>
              <p style="font-family:Poppins,sans-serif;font-size:0.75rem;color:#8a9a90;margin:0.5rem 0 0;">
                Conservez ce token — c'est votre seule preuve de participation.
              </p>
            `,
            confirmButtonText: '<i class="bi bi-receipt"></i>&nbsp; Voir mon reçu complet',
          });

          navigate('/citoyen/vote/recu', {
            state: {
              confirmationNumber: res.confirmation_number,
              horodatage: res.horodatage,
              election: currentElection?.titre ?? '',
              candidatName: candName,
            },
          });
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : 'Une erreur est survenue lors du vote.';
          setSelectedId(null);
          Swal.fire({
            icon: 'error',
            title: 'Erreur lors du vote',
            text: msg,
            buttonsStyling: false,
            customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
          });
        }
      },
    });
  };

  if (loadingElections) {
    return (
      <AppLayout role="Citoyen" title="Vote sécurisé" subtitle="Chargement des élections en cours..." navItems={navItems}>
        <div style={{ textAlign: 'center', padding: '3rem', fontFamily: 'Poppins,sans-serif', color: '#6b7a72' }}>
          <i className="bi bi-arrow-repeat" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.8rem' }} />
          Chargement des élections…
        </div>
      </AppLayout>
    );
  }

  if (apiElections.length === 0) {
    return (
      <AppLayout role="Citoyen" title="Vote sécurisé" subtitle="Aucun scrutin actif." navItems={navItems}>
        <div style={{ textAlign: 'center', padding: '3rem', fontFamily: 'Poppins,sans-serif', color: '#6b7a72' }}>
          <i className="bi bi-calendar-x" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.8rem' }} />
          Aucun scrutin en cours pour le moment.
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      role="Citoyen"
      title="Vote sécurisé"
      subtitle="Sélectionnez votre candidat et confirmez votre bulletin."
      navItems={navItems}
    >
      <PageGrid>
        {/* Election selector */}
        {apiElections.length > 1 && (
          <div>
            <SectionHeader>
              <SectionTitle>
                Elections en cours
                <CandCount>({apiElections.length} scrutins actifs)</CandCount>
              </SectionTitle>
            </SectionHeader>
            <ElectionSelector>
              {apiElections.map((election) => (
                <ElectionOption
                  key={election.id}
                  $active={selectedElection === election.id}
                  onClick={() => setSelectedElection(election.id)}
                >
                  <ElectionBadge $status="live">En cours</ElectionBadge>
                  {election.titre}
                </ElectionOption>
              ))}
            </ElectionSelector>
          </div>
        )}

        {/* Banner de l'élection active */}
        <ElectionBanner>
          <BannerLeft>
            <ElectionTitle>
              <i className="bi bi-calendar2-check" style={{ color: 'rgba(31,90,51,0.75)' }} />
              {currentElection?.titre ?? '—'}
            </ElectionTitle>
            <ElectionSub>
              {currentElection ? formatDateFin(currentElection.date_fin) : ''} — {candidates.length} candidat{candidates.length > 1 ? 's' : ''}
            </ElectionSub>
          </BannerLeft>
          <BannerRight>
            <LiveBadge><LiveDot />Scrutin en cours</LiveBadge>
            <CountdownBox>
              <i className="bi bi-clock" />
              Fermeture dans {currentElection ? daysLeft(currentElection.date_fin) : '—'}
            </CountdownBox>
          </BannerRight>
        </ElectionBanner>

        {/* Alerte déjà voté */}
        {hasVoted && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.7rem',
            background: 'rgba(31, 90, 51, 0.08)', border: '1px solid rgba(31, 90, 51, 0.2)',
            borderRadius: '14px', padding: '0.9rem 1.2rem',
            fontFamily: 'Poppins, sans-serif', fontSize: '0.88rem', color: '#1f5a33', fontWeight: 500,
          }}>
            <i className="bi bi-check-circle-fill" style={{ fontSize: '1.1rem' }} />
            Vous avez déjà voté pour cette élection. Votre participation est enregistrée de manière anonyme.
          </div>
        )}

        {/* Candidats */}
        <div>
          <SectionHeader>
            <SectionTitle>
              Candidats
              <CandCount>({candidates.length} candidat{candidates.length > 1 ? 's' : ''})</CandCount>
            </SectionTitle>
          </SectionHeader>
        </div>

        {loadingCandidates ? (
          <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'Poppins,sans-serif', color: '#8a9a90' }}>
            <i className="bi bi-arrow-repeat" style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }} />
            Chargement des candidats…
          </div>
        ) : candidates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'Poppins,sans-serif', color: '#8a9a90' }}>
            Aucun candidat enregistré pour cette élection.
          </div>
        ) : (
          <CandidateGrid>
            {candidates.map((c) => {
              const isSelected = selectedId === c.id;
              const initials = toInitials(c.prenom, c.nom);
              return (
                <CandCard key={c.id} $selected={isSelected}>
                  <CardTop $color="linear-gradient(135deg, #e8f5e9, #c8e6c9)">
                    {isSelected && (
                      <SelectedMark><i className="bi bi-check-lg" /></SelectedMark>
                    )}
                    <CandAvatar>{initials}</CandAvatar>
                  </CardTop>
                  <CardBody>
                    <div>
                      <CandName>{c.prenom} {c.nom}</CandName>
                      <CandPartyBadge $color="#1f5a33">{c.parti_politique}</CandPartyBadge>
                    </div>
                    <CandProgram>{c.biographie}</CandProgram>
                    <CardDivider />
                    <CardActions>
                      {!hasVoted ? (
                        <VoteBtn $selected={isSelected} onClick={() => openVoteFlow(c)}>
                          {isSelected
                            ? <><i className="bi bi-check2" />Sélectionné</>
                            : <><i className="bi bi-hand-index" />Voter</>
                          }
                        </VoteBtn>
                      ) : (
                        <VoteBtn $disabled>
                          <i className="bi bi-check2-all" />Déjà voté
                        </VoteBtn>
                      )}
                      {c.programme_url ? (
                        <ProgramBtn to={c.programme_url} target="_blank" rel="noopener noreferrer">
                          <i className="bi bi-file-text" />
                          Programme
                        </ProgramBtn>
                      ) : (
                        <ProgramBtn to={`/citoyen/candidats/${c.id}`}>
                          <i className="bi bi-file-text" />
                          Détail
                        </ProgramBtn>
                      )}
                    </CardActions>
                  </CardBody>
                </CandCard>
              );
            })}
          </CandidateGrid>
        )}

        {/* Security footer */}
        <SecurityBar>
          <SecurityItem>Vote anonymisé</SecurityItem>
          <Dot />
          <SecurityItem>Chiffrement AES-256</SecurityItem>
          <Dot />
          <SecurityItem>Identité non tracée</SecurityItem>
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
