import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';
import { Card, CardTitle, BarChart } from '../components/Charts';

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

const Report = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  background: rgba(255, 255, 255, 0.92);
`;

const Title = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1rem;
`;

const Meta = styled.p`
  margin: 0.2rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.85rem;
`;

const Status = styled.span`
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
`;

const OperatorReports = () => {
  const navItems = [
    { label: 'Alertes fraude', to: '/operateur/alerts' },
    { label: 'Historique', to: '/operateur/historique' },
    { label: 'Rapports', to: '/operateur/rapports' },
    { label: 'Detail alerte', to: '/operateur/alerts/detail' },
  ];

  return (
    <AppLayout
      role="Operateur de securite"
      title="Rapports de fraude"
      subtitle="Synthese des alertes et recommandations."
      navItems={navItems}
    >
      <Panel>
        <Report>
          <div>
            <Title>Rapport hebdomadaire - Semaine 10</Title>
            <Meta>12 alertes, 3 suspensions recommandees</Meta>
          </div>
          <Status>Genere</Status>
        </Report>
        <Report>
          <div>
            <Title>Rapport presidentielle 2025</Title>
            <Meta>Analyse des pics de vote et IP suspectes</Meta>
          </div>
          <Status>En cours</Status>
        </Report>
      </Panel>
      <Card>
        <CardTitle>Alertes par type</CardTitle>
        <BarChart
          data={[
            { label: 'Vote multiple', value: 38, color: 'rgba(176, 58, 46, 0.6)' },
            { label: 'IP suspecte', value: 24, color: 'rgba(31, 90, 51, 0.6)' },
            { label: 'CNI invalide', value: 18, color: 'rgba(138, 90, 16, 0.6)' },
            { label: 'Pattern', value: 20, color: 'rgba(31, 90, 51, 0.6)' },
          ]}
        />
      </Card>
    </AppLayout>
  );
};

export default OperatorReports;
