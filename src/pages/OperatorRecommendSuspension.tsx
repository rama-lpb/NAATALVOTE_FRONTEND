import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';
import { api } from '../services/api';
import { useAppSelector } from '../store/hooks';
import { useState, useRef } from 'react';

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1.2rem;
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainForm = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.6rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #22312a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(31, 90, 51, 0.1);
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
  min-height: 130px;
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

const SendButton = styled.button`
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
  &:hover:not(:disabled) { background: rgba(176, 58, 46, 0.72); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const CancelButton = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1.1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.85);
  border: 1px solid rgba(31, 90, 51, 0.2);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
`;

const SidePanel = styled.div`
  display: grid;
  gap: 1rem;
  align-content: start;
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 18px;
  padding: 1.2rem 1.3rem;
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
  gap: 0.5rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
`;

const MiniLabel = styled.span`
  color: #8a9a90;
`;

const MiniValue = styled.span`
  color: #22312a;
  font-weight: 600;
`;

const WarningCard = styled.div`
  padding: 1rem 1.1rem;
  border-radius: 16px;
  background: rgba(176, 58, 46, 0.05);
  border: 1px solid rgba(176, 58, 46, 0.2);
  color: rgba(120, 40, 30, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  line-height: 1.5;
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
`;

const WorkflowCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(31, 90, 51, 0.1);
  display: grid;
  gap: 0.6rem;
`;

const WorkflowStep = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.9)' : '#9aada3'};
  font-weight: ${({ $active }) => $active ? 600 : 400};
`;

const StepBullet = styled.span<{ $active?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(91, 95, 101, 0.15)'};
  color: ${({ $active }) => $active ? '#fff' : '#9aada3'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  flex-shrink: 0;
`;

const navItems = [
  { label: 'Dashboard', to: '/operateur/dashboard' },
  { label: 'Mes alertes', to: '/operateur/mes-alertes' },
  { label: 'Historique', to: '/operateur/historique' },
  { label: 'Rapports', to: '/operateur/rapports' },
];

const OperatorRecommendSuspension = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAppSelector(s => s.auth.user);
  const justificationRef = useRef<HTMLTextAreaElement>(null);
  const [submitting, setSubmitting] = useState(false);

  // Context passed from OperatorAlertDetail
  const state = (location.state as { alertId?: string; type?: string; citoyen_id?: string } | null) ?? {};
  const alertId = state.alertId ?? '—';
  const typeFraude = state.type ?? '—';
  const citoyenId = state.citoyen_id ?? null;

  const handleSend = async () => {
    const justification = justificationRef.current?.value?.trim() ?? '';
    if (!justification) {
      Swal.fire({ icon: 'warning', title: 'Justification requise', text: 'Veuillez saisir une justification detaillee.', buttonsStyling: false, customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' } });
      return;
    }
    if (!citoyenId || !currentUser?.id) {
      Swal.fire({ icon: 'error', title: 'Donnees manquantes', text: 'Impossible de soumettre : citoyen ou operateur introuvable.', buttonsStyling: false, customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' } });
      return;
    }

    const confirm = await Swal.fire({
      title: 'Envoyer la recommandation ?',
      html: 'La recommandation sera transmise au <strong>Super Administrateur</strong> pour validation. Vous ne pourrez pas suspendre le compte directement.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Envoyer',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    });

    if (!confirm.isConfirmed) return;

    setSubmitting(true);
    try {
      await api.operateur.recommendSuspension({
        citoyen_id: citoyenId,
        motif: justification,
        operateur_id: currentUser.id,
      });
      Swal.fire({
        icon: 'success',
        title: 'Recommandation envoyee',
        text: 'Le SuperAdmin a ete notifie et prendra une decision.',
        confirmButtonText: 'OK',
        buttonsStyling: false,
        customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
      }).then(() => navigate('/operateur/mes-alertes'));
    } catch {
      Swal.fire({ icon: 'error', title: 'Erreur', text: 'La recommandation n\'a pas pu etre soumise.', buttonsStyling: false, customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' } });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout
      role="Operateur de securite"
      title="Recommander une suspension"
      subtitle="Soumettez votre analyse au Super Administrateur pour validation finale."
      navItems={navItems}
    >
      <FormGrid>
        <MainForm>
          <SectionTitle><i className="bi bi-person-dash" />Dossier de suspension</SectionTitle>
          <DetailRow>
            <DetailLabel><i className="bi bi-person" />Citoyen</DetailLabel>
            <DetailValue>{citoyenId ?? 'Identite masquee'}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><i className="bi bi-tag" />Type fraude</DetailLabel>
            <DetailValue>{typeFraude}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><i className="bi bi-bell" />Alerte ref.</DetailLabel>
            <DetailValue>#{alertId}</DetailValue>
          </DetailRow>

          <Divider />

          <FieldGroup>
            <Label><i className="bi bi-pencil" />Justification detaillee <Required>*</Required></Label>
            <Textarea
              ref={justificationRef}
              placeholder="Decrivez precisement les preuves, le contexte et les raisons qui motivent cette recommandation de suspension..."
            />
            <Helper>Cette justification sera visible par le SuperAdmin et sera archivee dans les logs immuables.</Helper>
          </FieldGroup>

          <ActionRow>
            <SendButton onClick={handleSend} disabled={submitting}>
              <i className="bi bi-send" />
              {submitting ? 'Envoi en cours…' : 'Envoyer au SuperAdmin'}
            </SendButton>
            <CancelButton to="/operateur/mes-alertes">
              <i className="bi bi-arrow-left" />
              Retour
            </CancelButton>
          </ActionRow>
        </MainForm>

        <SidePanel>
          <InfoCard>
            <CardTitle><i className="bi bi-clipboard-data" />Resume du dossier</CardTitle>
            <MiniRow><MiniLabel>Alerte reference</MiniLabel><MiniValue>#{alertId}</MiniValue></MiniRow>
            <MiniRow><MiniLabel>Type</MiniLabel><MiniValue style={{ color: 'rgba(176, 58, 46, 0.6)' }}>{typeFraude}</MiniValue></MiniRow>
            <MiniRow><MiniLabel>Detecte par</MiniLabel><MiniValue>Systeme auto</MiniValue></MiniRow>
            <MiniRow><MiniLabel>Operateur</MiniLabel><MiniValue>{currentUser ? `${currentUser.prenom} ${currentUser.nom}` : '—'}</MiniValue></MiniRow>
          </InfoCard>

          <WarningCard>
            <i className="bi bi-shield-exclamation" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
            <span>
              Vous ne pouvez <strong>pas suspendre directement</strong> un citoyen. Votre recommandation doit
              etre validee par le SuperAdmin. C'est une protection contre les abus de pouvoir.
            </span>
          </WarningCard>

          <WorkflowCard>
            <CardTitle><i className="bi bi-diagram-3" />Workflow de validation</CardTitle>
            <WorkflowStep $active>
              <StepBullet $active>✓</StepBullet>
              Analyse operateur
            </WorkflowStep>
            <WorkflowStep $active>
              <StepBullet $active>2</StepBullet>
              Recommandation (vous etes ici)
            </WorkflowStep>
            <WorkflowStep>
              <StepBullet>3</StepBullet>
              Validation SuperAdmin
            </WorkflowStep>
            <WorkflowStep>
              <StepBullet>4</StepBullet>
              Suspension effective
            </WorkflowStep>
          </WorkflowCard>
        </SidePanel>
      </FormGrid>
    </AppLayout>
  );
};

export default OperatorRecommendSuspension;
