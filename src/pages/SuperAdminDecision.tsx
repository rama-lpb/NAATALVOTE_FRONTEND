import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';

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

const BackLink = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: rgba(31, 90, 51, 0.8);
  &:hover { color: rgba(31, 90, 51, 1); }
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

const EvidenceList = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const EvidenceItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  background: rgba(176, 58, 46, 0.04);
  border: 1px solid rgba(176, 58, 46, 0.12);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #3a1a1a;
  i { color: rgba(176, 58, 46, 0.7); margin-top: 0.1rem; flex-shrink: 0; }
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
  background: rgba(31, 90, 51, 0.85);
  color: #fff;
  border: 1px solid rgba(31, 90, 51, 0.55);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(31, 90, 51, 0.2);
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.95); transform: translateY(-1px); }
`;

const RejectButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.7rem 1.3rem;
  border-radius: 12px;
  background: rgba(176, 58, 46, 0.85);
  color: #fff;
  border: 1px solid rgba(176, 58, 46, 0.55);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(176, 58, 46, 0.2);
  transition: all 0.2s;
  &:hover { background: rgba(176, 58, 46, 0.95); transform: translateY(-1px); }
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
  { label: 'Decision', to: '/superadmin/decision' },
];

const SuperAdminDecision = () => {
  const handleApprove = () => {
    Swal.fire({
      title: 'Valider la suspension ?',
      html: 'Le compte citoyen <strong>CNI 2349</strong> sera <strong>suspendu immediatement</strong>. Cette decision sera enregistree dans les logs immuables avec votre identifiant.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Valider la suspension',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Suspension validee',
          text: 'Le compte CNI 2349 est maintenant suspendu. L\'action a ete tracee.',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
        });
      }
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: 'Rejeter la recommandation ?',
      html: 'Le compte <strong>CNI 2349</strong> restera actif. Vous devez fournir une justification. Elle sera visible par l\'operateur.',
      input: 'textarea',
      inputPlaceholder: 'Motif du rejet...',
      inputAttributes: { style: 'font-family: Poppins; font-size: 0.9rem;' },
      showCancelButton: true,
      confirmButtonText: 'Rejeter',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Recommandation rejetee',
          text: 'L\'operateur sera notifie. L\'action a ete tracee dans les logs.',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
        });
      }
    });
  };

  return (
    <AppLayout
      role="Super Admin"
      title="Decision de suspension"
      subtitle="Examinez le dossier et prenez une decision definitive. Cette action est irreversible et tracee."
      navItems={navItems}
    >
      <div style={{ marginBottom: '0.8rem' }}>
        <BackLink to="/superadmin/suspensions">
          <i className="bi bi-arrow-left" />Retour aux suspensions
        </BackLink>
      </div>

      <LayoutGrid>
        <MainCol>
          <Panel>
            <PanelTitle><i className="bi bi-person-exclamation" />Identite du citoyen</PanelTitle>
            <DetailRow>
              <DetailLabel><i className="bi bi-credit-card-2-front" />Citoyen</DetailLabel>
              <DetailValue>CNI 2349 — Identite masquee (protection RGPD)</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><i className="bi bi-tag" />Motif</DetailLabel>
              <DetailValue>Vote multiple confirme — 3 tentatives bloquees</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><i className="bi bi-calendar2-week" />Election</DetailLabel>
              <DetailValue>Presidentielle 2025</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><i className="bi bi-person" />Operateur</DetailLabel>
              <DetailValue>Mamadou Diallo — Soumis le 09/03/2026 a 11:42</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><i className="bi bi-wifi" />IP source</DetailLabel>
              <DetailValue>41.220.0.12 — Dakar, Senegal</DetailValue>
            </DetailRow>
          </Panel>

          <Panel>
            <PanelTitle><i className="bi bi-clipboard-data" />Preuves collectees</PanelTitle>
            <EvidenceList>
              <EvidenceItem>
                <i className="bi bi-x-circle-fill" />
                Tentative 1 — 09/03/2026 11:32:14 — IP 41.220.0.12 — Bloquee automatiquement
              </EvidenceItem>
              <EvidenceItem>
                <i className="bi bi-x-circle-fill" />
                Tentative 2 — 09/03/2026 11:33:01 — IP 41.220.0.12 — Bloquee automatiquement
              </EvidenceItem>
              <EvidenceItem>
                <i className="bi bi-x-circle-fill" />
                Tentative 3 — 09/03/2026 11:33:47 — IP 41.220.0.12 — Bloquee automatiquement
              </EvidenceItem>
            </EvidenceList>
          </Panel>

          <Panel>
            <PanelTitle><i className="bi bi-chat-square-quote" />Justification de l'operateur</PanelTitle>
            <DetailValue style={{ lineHeight: 1.6, color: '#4a5a50', fontSize: '0.88rem', padding: '0.5rem' }}>
              "Trois tentatives de vote successive en moins de 2 minutes depuis la meme adresse IP. Le systeme a automatiquement bloque chaque tentative. Apres analyse des logs, je confirme qu'il s'agit d'une tentative de fraude deliberee. La suspension est justifiee."
            </DetailValue>
            <Divider />
            <FieldGroup>
              <Label>
                <i className="bi bi-pencil" />
                Votre justification (SuperAdmin) <Required>*</Required>
              </Label>
              <Textarea placeholder="Expliquez votre decision. Cette justification sera archivee dans les logs immuables et sera consultable lors d'un audit..." />
              <Helper>Obligatoire pour valider ou rejeter. Sera archive dans les logs avec votre identifiant.</Helper>
            </FieldGroup>
            <ActionRow>
              <ApproveButton onClick={handleApprove}>
                <i className="bi bi-check-circle" />
                Valider la suspension
              </ApproveButton>
              <RejectButton onClick={handleReject}>
                <i className="bi bi-x-circle" />
                Rejeter
              </RejectButton>
            </ActionRow>
          </Panel>
        </MainCol>

        <SideCol>
          <SideCard>
            <CardTitle><i className="bi bi-clipboard2-data" />Resume du dossier</CardTitle>
            <MiniRow><span>Alerte reference</span><MiniValue>#ALT-112</MiniValue></MiniRow>
            <MiniRow><span>Tentatives</span><MiniValue style={{ color: 'rgba(176, 58, 46, 0.85)' }}>3</MiniValue></MiniRow>
            <MiniRow><span>Duree totale</span><MiniValue>1m 33s</MiniValue></MiniRow>
            <MiniRow><span>Operateur</span><MiniValue>M. Diallo</MiniValue></MiniRow>
            <MiniRow><span>Soumis le</span><MiniValue>09/03/2026</MiniValue></MiniRow>
          </SideCard>

          <ConsequenceCard>
            <ConsequenceTitle>
              <i className="bi bi-exclamation-triangle-fill" />
              Consequences si valide
            </ConsequenceTitle>
            <ConsequenceItem>
              <i className="bi bi-dot" />
              Le compte sera suspendu immediatement
            </ConsequenceItem>
            <ConsequenceItem>
              <i className="bi bi-dot" />
              Le citoyen ne pourra plus se connecter
            </ConsequenceItem>
            <ConsequenceItem>
              <i className="bi bi-dot" />
              L'action sera tracee dans les logs
            </ConsequenceItem>
            <ConsequenceItem>
              <i className="bi bi-dot" />
              Decision irreversible sans intervention manuelle en BDD
            </ConsequenceItem>
          </ConsequenceCard>

          <SideCard>
            <CardTitle><i className="bi bi-shield-check" />Securite de la decision</CardTitle>
            <MiniRow><span>Logs</span><MiniValue>Immuables</MiniValue></MiniRow>
            <MiniRow><span>Signature</span><MiniValue>HMAC-SHA256</MiniValue></MiniRow>
            <MiniRow><span>Auditabilite</span><MiniValue>100%</MiniValue></MiniRow>
          </SideCard>
        </SideCol>
      </LayoutGrid>
    </AppLayout>
  );
};

export default SuperAdminDecision;
