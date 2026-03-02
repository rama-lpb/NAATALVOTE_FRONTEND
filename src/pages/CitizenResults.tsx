import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: 0 16px 30px rgba(12, 24, 18, 0.08);
  display: grid;
  gap: 1.2rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const ResultRow = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr 60px;
  align-items: center;
  gap: 1rem;
`;

const Candidate = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
`;

const Bar = styled.div<{ $value: number; $color: string }>`
  height: 12px;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: ${({ $value }) => $value}%;
    background: ${({ $color }) => $color};
  }
`;

const Value = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
`;

const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SummaryCard = styled.div`
  padding: 1rem 1.2rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const SummaryLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.9rem;
`;

const SummaryValue = styled.h3`
  margin: 0.4rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.5rem;
  font-weight: 600;
`;

const CitizenResults = () => {
  const navItems = [
    { label: 'Tableau de bord', to: '/citoyen/dashboard' },
    { label: 'Elections', to: '/citoyen/elections' },
    { label: 'Candidats', to: '/citoyen/candidats' },
    { label: 'Vote securise', to: '/citoyen/vote' },
    { label: 'Resultats temps reel', to: '/citoyen/resultats' },
    { label: 'Profil', to: '/citoyen/profil' },
  ];

  return (
    <AppLayout
      role="Citoyen"
      title="Resultats en temps reel"
      subtitle="Mise a jour automatique a chaque vote enregistre."
      navItems={navItems}
    >
      <Panel>
        <Summary>
          <SummaryCard>
            <SummaryLabel>Participation nationale</SummaryLabel>
            <SummaryValue>64,2%</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Votes enregistres</SummaryLabel>
            <SummaryValue>3 482 120</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Delai de mise a jour</SummaryLabel>
            <SummaryValue>1,6s</SummaryValue>
          </SummaryCard>
        </Summary>
        <ResultRow>
          <Candidate>Aicha Ndiaye</Candidate>
          <Bar $value={39} $color="rgba(31, 90, 51, 0.6)" />
          <Value>39%</Value>
        </ResultRow>
        <ResultRow>
          <Candidate>Moussa Diop</Candidate>
          <Bar $value={35} $color="rgba(38, 76, 140, 0.6)" />
          <Value>35%</Value>
        </ResultRow>
        <ResultRow>
          <Candidate>Mariam Sow</Candidate>
          <Bar $value={26} $color="rgba(138, 90, 16, 0.6)" />
          <Value>26%</Value>
        </ResultRow>
      </Panel>
    </AppLayout>
  );
};

export default CitizenResults;
