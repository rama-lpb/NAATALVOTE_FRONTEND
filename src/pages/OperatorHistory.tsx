import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: 0 16px 30px rgba(12, 24, 18, 0.08);
  display: grid;
  gap: 0.8rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  background: rgba(255, 255, 255, 0.92);
`;

const Tag = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: rgba(31, 90, 51, 0.9);
  font-size: 0.85rem;
`;

const Text = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  font-size: 0.85rem;
`;

const OperatorHistory = () => {
  const navItems = [
    { label: 'Alertes fraude', to: '/operateur/alerts' },
    { label: 'Historique', to: '/operateur/historique' },
    { label: 'Rapports', to: '/operateur/rapports' },
    { label: 'Detail alerte', to: '/operateur/alerts/detail' },
  ];

  return (
    <AppLayout
      role="Operateur de securite"
      title="Historique des actions"
      subtitle="Traçabilite des analyses et recommandations."
      navItems={navItems}
    >
      <Panel>
        <Row>
          <Tag>ANALYSE</Tag>
          <Text>28/02/2026 09:05 - Alerte IP suspecte confirmee - Recommandation envoyee.</Text>
        </Row>
        <Row>
          <Tag>REJET</Tag>
          <Text>28/02/2026 08:20 - Fausse alerte vote multiple - Dossier clos.</Text>
        </Row>
        <Row>
          <Tag>SUSPENSION</Tag>
          <Text>27/02/2026 18:10 - Demande de suspension - En attente de validation.</Text>
        </Row>
      </Panel>
    </AppLayout>
  );
};

export default OperatorHistory;
