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

const OperatorAlertDetail = () => {
  const navItems = [
    { label: 'Alertes fraude', to: '/operateur/alerts' },
    { label: 'Historique', to: '/operateur/historique' },
    { label: 'Rapports', to: '/operateur/rapports' },
    { label: 'Detail alerte', to: '/operateur/alerts/detail' },
  ];

  return (
    <AppLayout
      role="Operateur de securite"
      title="Detail alerte"
      subtitle="Analyse complete de l'anomalie detectee."
      navItems={navItems}
    >
      <Panel>
        <Row>
          <Label>Type alerte</Label>
          <Value>Vote multiple</Value>
        </Row>
        <Row>
          <Label>Citoyen</Label>
          <Value>CNI 2349</Value>
        </Row>
        <Row>
          <Label>Election</Label>
          <Value>Presidentielle 2025</Value>
        </Row>
        <Row>
          <Label>Statut</Label>
          <Value>En analyse</Value>
        </Row>
        <Row>
          <Label>Preuves</Label>
          <Value>3 tentatives en 2 minutes depuis IP 41.220.0.12</Value>
        </Row>
      </Panel>
    </AppLayout>
  );
};

export default OperatorAlertDetail;
