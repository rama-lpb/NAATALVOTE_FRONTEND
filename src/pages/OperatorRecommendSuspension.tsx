import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: 0 16px 30px rgba(12, 24, 18, 0.08);
  display: grid;
  gap: 0.9rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const Label = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
`;

const Value = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 14px;
  padding: 0.75rem 0.9rem;
  font-size: 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  min-height: 120px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.9);
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const Primary = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.55);
  border-radius: 12px;
  padding: 0.65rem 1.2rem;
  background: rgba(31, 90, 51, 0.8);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  cursor: pointer;
`;

const Ghost = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.25);
  border-radius: 12px;
  padding: 0.65rem 1.2rem;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  cursor: pointer;
`;

const OperatorRecommendSuspension = () => {
  const navItems = [
    { label: 'Alertes fraude', to: '/operateur/alerts' },
    { label: 'Historique', to: '/operateur/historique' },
    { label: 'Rapports', to: '/operateur/rapports' },
    { label: 'Detail alerte', to: '/operateur/alerts/detail' },
    { label: 'Recommandation', to: '/operateur/recommandation' },
  ];

  return (
    <AppLayout
      role="Operateur de securite"
      title="Recommander une suspension"
      subtitle="Envoyez la recommandation au SuperAdmin."
      navItems={navItems}
    >
      <Panel>
        <Row>
          <Label>Citoyen</Label>
          <Value>CNI 2349</Value>
        </Row>
        <Row>
          <Label>Type fraude</Label>
          <Value>Vote multiple confirme</Value>
        </Row>
        <Row>
          <Label>Preuves</Label>
          <Value>3 tentatives en 2 minutes depuis IP 41.220.0.12</Value>
        </Row>
        <Label>Justification</Label>
        <Textarea placeholder="Expliquez la recommandation" />
        <ActionRow>
          <Primary>Envoyer</Primary>
          <Ghost>Annuler</Ghost>
        </ActionRow>
      </Panel>
    </AppLayout>
  );
};

export default OperatorRecommendSuspension;
