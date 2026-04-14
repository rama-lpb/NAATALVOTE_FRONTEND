import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';
import { api } from '../services/api';
import { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '../store/hooks';

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1.2rem;
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainCol = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const SideCol = styled.div`
  display: grid;
  gap: 1rem;
`;

const BackLink = styled.span`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: rgba(31, 90, 51, 0.8);
  cursor: pointer;
  &:hover { color: rgba(31, 90, 51, 1); }
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #5a6d62;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const BreadLink = styled.span`
  color: rgba(31, 90, 51, 0.8);
  cursor: pointer;
  &:hover { color: rgba(31, 90, 51, 1); text-decoration: underline; }
`;

const BreadSep = styled.span`
  color: #b0bdb5;
  font-size: 0.75rem;
`;

const BreadCurrent = styled.span`
  color: #22312a;
  font-weight: 500;
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.5rem 1.6rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 0.9rem;
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #22312a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 0.6rem;
  align-items: start;
  padding: 0.65rem 0.9rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(31, 90, 51, 0.09);
`;

const DetailLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(31, 90, 51, 0.65);
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const DetailValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.87rem;
  color: #22312a;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(31, 90, 51, 0.1);
`;

const FieldGroup = styled.div`
  display: grid;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #2f3b36;
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const Required = styled.span`
  color: rgba(176, 58, 46, 0.8);
`;

const Helper = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  color: #8a9a90;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(31, 90, 51, 0.22);
  border-radius: 12px;
  padding: 0.7rem 0.9rem;
  font-size: 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  min-height: 120px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  &:focus {
    border-color: rgba(31, 90, 51, 0.5);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.1);
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  padding-top: 0.3rem;
`;

const ApproveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.7rem 1.3rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  border: 1px solid rgba(31, 90, 51, 0.55);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(31, 90, 51, 0.2);
  transition: all 0.2s;
  &:hover:not(:disabled) { background: rgba(31, 90, 51, 0.72); transform: translateY(-1px); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const RejectButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.7rem 1.3rem;
  border-radius: 12px;
  background: rgba(176, 58, 46, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  border: 1px solid rgba(176, 58, 46, 0.55);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(176, 58, 46, 0.2);
  transition: all 0.2s;
  &:hover:not(:disabled) { background: rgba(176, 58, 46, 0.72); transform: translateY(-1px); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const SideCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 18px;
  padding: 1.1rem 1.3rem;
  box-shadow: 0 8px 18px rgba(12, 24, 18, 0.07);
  border: 1px solid rgba(31, 90, 51, 0.1);
  display: grid;
  gap: 0.6rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: #22312a;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const MiniRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #6b7a72;
`;

const MiniValue = styled.span`
  font-weight: 600;
  color: #22312a;
`;

const ConsequenceCard = styled.div`
  padding: 1rem 1.1rem;
  border-radius: 14px;
  background: rgba(176, 58, 46, 0.05);
  border: 1px solid rgba(176, 58, 46, 0.18);
  color: rgba(100, 35, 25, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  line-height: 1.5;
  display: grid;
  gap: 0.5rem;
`;

const ConsequenceTitle = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const ConsequenceItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  i { margin-top: 0.1rem; flex-shrink: 0; }
`;

const navItems = [
  { label: 'Console systeme', to: '/superadmin/console' },
  { label: 'Logs immuables', to: '/superadmin/logs' },
  { label: 'Exports audit', to: '/superadmin/export' },
  { label: 'Utilisateurs', to: '/superadmin/utilisateurs' },
  { label: 'Suspensions', to: '/superadmin/suspensions' },
];

const SuperAdminDecision = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useAppSelector(s => s.auth.user);
  const justificationRef = useRef<HTMLTextAreaElement>(null);

  const suspId = (location.state as any)?.suspId as string | undefined;

  const [suspension, setSuspension] = useState<{
    id: string; citoyen_id: string; motif: string; operateur_id: string;
    statut: string; date_creation: string; justification: string;
  } | null>(null);
  const [operateurLabel, setOperateurLabel] = useState('—');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      api.superadmin.listSuspensions(),
      api.superadmin.listUsers(),
    ]).then(([suspensions, users]) => {
      const findName = (id: string) => {
        const u = users.find(u => u.id === id);
        return u ? `${u.prenom} ${u.nom}` : id.slice(0, 8) + '…';
      };
      const found = suspId
        ? suspensions.find(s => s.id === suspId)
        : suspensions.find(s => s.statut === 'EN_ATTENTE');
      if (found) {
        setSuspension(found);
        setOperateurLabel(findName(found.operateur_id));
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, [suspId]);

  const decide = async (statut: 'APPROUVE' | 'REJETE', justification: string) => {
    if (!suspension) return;
    setSubmitting(true);
    try {
      await api.superadmin.decideSuspension(suspension.id, {
        statut,
        superadmin_id: currentUser?.id,
        justification,
      });
      navigate('/superadmin/suspensions');
    } catch {
      Swal.fire({ icon: 'error', title: 'Erreur', text: 'La decision n\'a pas pu etre enregistree.', buttonsStyling: false, customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' } });
    } finally {
      setSubmitting(false);
    }
  };

  const handleApprove = () => {
    const justification = justificationRef.current?.value?.trim() ?? '';
    if (!justification) {
      Swal.fire({ icon: 'warning', title: 'Justification requise', text: 'Veuillez saisir une justification avant de valider.', buttonsStyling: false, customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' } });
      return;
    }
    Swal.fire({
      title: 'Valider la suspension ?',
      html: `Le compte citoyen sera <strong>suspendu immediatement</strong>. Cette decision sera enregistree dans les logs immuables avec votre identifiant.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Valider la suspension',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    }).then(r => { if (r.isConfirmed) decide('APPROUVE', justification); });
  };

  const handleReject = () => {
    const justification = justificationRef.current?.value?.trim() ?? '';
    if (!justification) {
      Swal.fire({ icon: 'warning', title: 'Justification requise', text: 'Veuillez saisir une justification avant de rejeter.', buttonsStyling: false, customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' } });
      return;
    }
    Swal.fire({
      title: 'Rejeter la recommandation ?',
      html: `Le compte restera actif. Votre justification sera visible par l'operateur.`,
      showCancelButton: true,
      confirmButtonText: 'Rejeter',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    }).then(r => { if (r.isConfirmed) decide('REJETE', justification); });
  };

  const dateCreation = suspension
    ? new Date(suspension.date_creation).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : '—';

  return (
    <AppLayout
      role="Super Admin"
      title="Decision de suspension"
      subtitle="Examinez le dossier et prenez une decision definitive. Cette action est irreversible et tracee."
      navItems={navItems}
    >
      <Breadcrumb>
        <BreadLink onClick={() => navigate('/superadmin/suspensions')}>
          <i className="bi bi-person-exclamation" style={{ marginRight: '0.3rem' }} />
          Suspensions
        </BreadLink>
        <BreadSep><i className="bi bi-chevron-right" /></BreadSep>
        <BreadCurrent>Dossier #{suspension?.id?.slice(0, 8) ?? '—'}</BreadCurrent>
      </Breadcrumb>

      <div style={{ marginBottom: '0.8rem' }}>
        <BackLink onClick={() => navigate('/superadmin/suspensions')}>
          <i className="bi bi-arrow-left" />Retour aux suspensions
        </BackLink>
      </div>

      {loading ? (
        <Panel><DetailValue style={{ color: '#8a9a90', fontFamily: 'Poppins, sans-serif' }}>Chargement du dossier…</DetailValue></Panel>
      ) : !suspension ? (
        <Panel><DetailValue style={{ color: '#8a9a90', fontFamily: 'Poppins, sans-serif' }}>Dossier introuvable.</DetailValue></Panel>
      ) : (
        <LayoutGrid>
          <MainCol>
            <Panel>
              <PanelTitle><i className="bi bi-person-exclamation" />Identite du citoyen</PanelTitle>
              <DetailRow>
                <DetailLabel><i className="bi bi-credit-card-2-front" />Citoyen</DetailLabel>
                <DetailValue>{suspension.citoyen_id}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><i className="bi bi-tag" />Motif</DetailLabel>
                <DetailValue>{suspension.motif}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><i className="bi bi-person" />Operateur</DetailLabel>
                <DetailValue>{operateurLabel} — Soumis le {dateCreation}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><i className="bi bi-flag" />Statut actuel</DetailLabel>
                <DetailValue>{suspension.statut}</DetailValue>
              </DetailRow>
            </Panel>

            <Panel>
              <PanelTitle><i className="bi bi-chat-square-quote" />Justification de l'operateur</PanelTitle>
              <DetailValue style={{ lineHeight: 1.6, color: '#4a5a50', fontSize: '0.88rem', padding: '0.5rem' }}>
                "{suspension.justification || 'Aucune justification fournie.'}"
              </DetailValue>
              <Divider />
              <FieldGroup>
                <Label>
                  <i className="bi bi-pencil" />
                  Votre justification (SuperAdmin) <Required>*</Required>
                </Label>
                <Textarea ref={justificationRef} placeholder="Expliquez votre decision. Cette justification sera archivee dans les logs immuables et sera consultable lors d'un audit..." />
                <Helper>Obligatoire pour valider ou rejeter. Sera archive dans les logs avec votre identifiant.</Helper>
              </FieldGroup>
              {suspension.statut === 'EN_ATTENTE' && (
                <ActionRow>
                  <ApproveButton onClick={handleApprove} disabled={submitting}>
                    <i className="bi bi-check-circle" />
                    Valider la suspension
                  </ApproveButton>
                  <RejectButton onClick={handleReject} disabled={submitting}>
                    <i className="bi bi-x-circle" />
                    Rejeter
                  </RejectButton>
                </ActionRow>
              )}
            </Panel>
          </MainCol>

          <SideCol>
            <SideCard>
              <CardTitle><i className="bi bi-clipboard2-data" />Resume du dossier</CardTitle>
              <MiniRow><span>Reference</span><MiniValue>#{suspension.id.slice(0, 8)}</MiniValue></MiniRow>
              <MiniRow><span>Statut</span><MiniValue>{suspension.statut}</MiniValue></MiniRow>
              <MiniRow><span>Operateur</span><MiniValue>{operateurLabel}</MiniValue></MiniRow>
              <MiniRow><span>Soumis le</span><MiniValue>{dateCreation}</MiniValue></MiniRow>
            </SideCard>

            <ConsequenceCard>
              <ConsequenceTitle>
                <i className="bi bi-exclamation-triangle-fill" />
                Consequences si valide
              </ConsequenceTitle>
              <ConsequenceItem><i className="bi bi-dot" />Le compte sera suspendu immediatement</ConsequenceItem>
              <ConsequenceItem><i className="bi bi-dot" />Le citoyen ne pourra plus se connecter</ConsequenceItem>
              <ConsequenceItem><i className="bi bi-dot" />L'action sera tracee dans les logs</ConsequenceItem>
              <ConsequenceItem><i className="bi bi-dot" />Decision irreversible sans intervention manuelle en BDD</ConsequenceItem>
            </ConsequenceCard>

            <SideCard>
              <CardTitle><i className="bi bi-shield-check" />Securite de la decision</CardTitle>
              <MiniRow><span>Logs</span><MiniValue>Immuables</MiniValue></MiniRow>
              <MiniRow><span>Signature</span><MiniValue>HMAC-SHA256</MiniValue></MiniRow>
              <MiniRow><span>Auditabilite</span><MiniValue>100%</MiniValue></MiniRow>
            </SideCard>
          </SideCol>
        </LayoutGrid>
      )}
    </AppLayout>
  );
};

export default SuperAdminDecision;
