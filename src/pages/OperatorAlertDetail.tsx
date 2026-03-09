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

const AlertHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const AlertTitleGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const AlertTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1a2e20;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AlertId = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  color: #8a9a90;
`;

const SeverityBadge = styled.span<{ $level: 'critical' | 'medium' | 'low' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  background: ${({ $level }) =>
    $level === 'critical' ? 'rgba(176, 58, 46, 0.12)' :
    $level === 'medium' ? 'rgba(138, 90, 16, 0.12)' :
    'rgba(91, 95, 101, 0.1)'};
  color: ${({ $level }) =>
    $level === 'critical' ? 'rgba(176, 58, 46, 0.9)' :
    $level === 'medium' ? 'rgba(138, 90, 16, 0.9)' :
    'rgba(91, 95, 101, 0.8)'};
  border: 1px solid ${({ $level }) =>
    $level === 'critical' ? 'rgba(176, 58, 46, 0.2)' :
    $level === 'medium' ? 'rgba(138, 90, 16, 0.2)' :
    'rgba(91, 95, 101, 0.15)'};
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 0.8rem;
`;

const PanelTitle = styled.h3`
  margin: 0 0 0.2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  color: #22312a;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 0.6rem;
  align-items: start;
  padding: 0.65rem 0.8rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(31, 90, 51, 0.08);
`;

const DetailLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(31, 90, 51, 0.7);
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
  padding: 0.65rem 0.8rem;
  border-radius: 12px;
  background: rgba(176, 58, 46, 0.04);
  border: 1px solid rgba(176, 58, 46, 0.12);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.84rem;
  color: #3a1a1a;
  i { color: rgba(176, 58, 46, 0.7); margin-top: 0.1rem; flex-shrink: 0; }
`;

const ActionPanel = styled(Panel)`
  border-color: rgba(31, 90, 51, 0.18);
`;

const ActionsTitle = styled(PanelTitle)`
  border-bottom: 1px solid rgba(31, 90, 51, 0.08);
  padding-bottom: 0.6rem;
  margin-bottom: 0.2rem;
`;

const ActionButton = styled.button<{ $variant: 'danger' | 'warn' | 'success' | 'ghost' }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $variant }) =>
    $variant === 'danger' ? 'rgba(176, 58, 46, 0.85)' :
    $variant === 'warn' ? 'rgba(138, 90, 16, 0.85)' :
    $variant === 'success' ? 'rgba(31, 90, 51, 0.85)' :
    'rgba(91, 95, 101, 0.08)'};
  color: ${({ $variant }) => $variant === 'ghost' ? '#5a6d62' : '#fff'};
  border: 1px solid ${({ $variant }) =>
    $variant === 'danger' ? 'rgba(176, 58, 46, 0.55)' :
    $variant === 'warn' ? 'rgba(138, 90, 16, 0.55)' :
    $variant === 'success' ? 'rgba(31, 90, 51, 0.55)' :
    'rgba(91, 95, 101, 0.2)'};
  &:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }
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

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.88);
  border-radius: 18px;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(31, 90, 51, 0.1);
  display: grid;
  gap: 0.5rem;
`;

const InfoTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(31, 90, 51, 0.55);
`;

const InfoValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  color: #1a2e20;
`;

const navItems = [
  { label: 'Alertes fraude', to: '/operateur/alerts' },
  { label: 'Historique', to: '/operateur/historique' },
  { label: 'Rapports', to: '/operateur/rapports' },
  { label: 'Detail alerte', to: '/operateur/alerts/detail' },
  { label: 'Recommandation', to: '/operateur/recommandation' },
];

const OperatorAlertDetail = () => {
  const handleMarkSuspect = () => {
    Swal.fire({
      title: 'Marquer comme suspect ?',
      text: 'Le compte citoyen sera place sous surveillance renforcee. Il pourra toujours voter.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    });
  };

  const handleFalseAlert = () => {
    Swal.fire({
      title: 'Classer en fausse alerte ?',
      text: 'L\'alerte sera archivee et le compte redevient normal.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    });
  };

  return (
    <AppLayout
      role="Operateur de securite"
      title="Detail de l'alerte"
      subtitle="Analyse complete de l'anomalie detectee automatiquement."
      navItems={navItems}
    >
      <div style={{ marginBottom: '0.8rem' }}>
        <BackLink to="/operateur/alerts"><i className="bi bi-arrow-left" />Retour aux alertes</BackLink>
      </div>
      <LayoutGrid>
        <MainCol>
          <AlertHeader>
            <AlertTitleGroup>
              <AlertTitle>
                <i className="bi bi-shield-exclamation" style={{ color: 'rgba(176, 58, 46, 0.8)' }} />
                Vote multiple detecte
              </AlertTitle>
              <AlertId>Alerte #ALT-112 — Generee le 09/03/2026 a 11:38</AlertId>
            </AlertTitleGroup>
            <SeverityBadge $level="critical">
              <i className="bi bi-exclamation-triangle-fill" />
              Critique
            </SeverityBadge>
          </AlertHeader>

          <Panel>
            <PanelTitle><i className="bi bi-info-circle" />Informations de l'alerte</PanelTitle>
            <DetailRow>
              <DetailLabel><i className="bi bi-tag" />Type</DetailLabel>
              <DetailValue>Vote multiple</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><i className="bi bi-person" />Citoyen</DetailLabel>
              <DetailValue>CNI 2349 — Identite masquee</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><i className="bi bi-calendar2-week" />Election</DetailLabel>
              <DetailValue>Presidentielle 2025</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><i className="bi bi-wifi" />Adresse IP</DetailLabel>
              <DetailValue>41.220.0.12 — Dakar, Senegal</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><i className="bi bi-activity" />Statut</DetailLabel>
              <DetailValue>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(138, 90, 16, 0.85)', fontWeight: 600 }}>
                  <i className="bi bi-hourglass-split" />En analyse
                </span>
              </DetailValue>
            </DetailRow>
          </Panel>

          <Panel>
            <PanelTitle><i className="bi bi-clipboard-data" />Preuves collectees</PanelTitle>
            <EvidenceList>
              <EvidenceItem>
                <i className="bi bi-x-circle-fill" />
                Tentative 1 — 09/03/2026 11:32:14 depuis IP 41.220.0.12 — Bloquee automatiquement
              </EvidenceItem>
              <EvidenceItem>
                <i className="bi bi-x-circle-fill" />
                Tentative 2 — 09/03/2026 11:33:01 depuis IP 41.220.0.12 — Bloquee automatiquement
              </EvidenceItem>
              <EvidenceItem>
                <i className="bi bi-x-circle-fill" />
                Tentative 3 — 09/03/2026 11:33:47 depuis IP 41.220.0.12 — Bloquee automatiquement
              </EvidenceItem>
            </EvidenceList>
          </Panel>
        </MainCol>

        <SideCol>
          <InfoCard>
            <InfoTitle>Election concernee</InfoTitle>
            <InfoValue>Presidentielle 2025</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoTitle>Tentatives bloquees</InfoTitle>
            <InfoValue style={{ color: 'rgba(176, 58, 46, 0.85)' }}>3 tentatives</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoTitle>Intervalle</InfoTitle>
            <InfoValue>1 min 33 sec</InfoValue>
          </InfoCard>

          <ActionPanel>
            <ActionsTitle><i className="bi bi-lightning" />Actions disponibles</ActionsTitle>
            <ActionButton $variant="danger" onClick={() => window.location.href = '/operateur/recommandation'}>
              <i className="bi bi-person-dash" />
              Recommander suspension
            </ActionButton>
            <ActionButton $variant="warn" onClick={handleMarkSuspect}>
              <i className="bi bi-eye" />
              Marquer comme suspect
            </ActionButton>
            <ActionButton $variant="ghost" onClick={handleFalseAlert}>
              <i className="bi bi-check-circle" />
              Fausse alerte
            </ActionButton>
          </ActionPanel>
        </SideCol>
      </LayoutGrid>
    </AppLayout>
  );
};

export default OperatorAlertDetail;
