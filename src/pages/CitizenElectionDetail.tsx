import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 22px;
  padding: 1.6rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 1rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1f5a33;
`;

const StatusPill = styled.span<{ $tone: 'live' | 'scheduled' | 'closed' }>`
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: ${({ $tone }) =>
    $tone === 'live' ? 'rgba(31, 90, 51, 0.85)' : $tone === 'scheduled' ? 'rgba(138, 90, 16, 0.85)' : 'rgba(91, 95, 101, 0.85)'};
  background: ${({ $tone }) =>
    $tone === 'live'
      ? 'rgba(31, 90, 51, 0.12)'
      : $tone === 'scheduled'
        ? 'rgba(138, 90, 16, 0.12)'
        : 'rgba(91, 95, 101, 0.12)'};
`;

const Meta = styled.p`
  margin: 0;
  color: #5a6d62;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  font-size: 0.95rem;
`;

const Section = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.05rem;
  font-weight: 600;
`;

const ChartCard = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  padding: 1rem;
  background: rgba(255, 255, 255, 0.92);
  display: grid;
  gap: 0.6rem;
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const ChartTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
`;

const ChartLegend = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.85rem;
`;

const LegendDot = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: ${({ $color }) => $color};
    display: inline-block;
  }
`;

const BarChart = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const BarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
  align-items: end;
  min-height: 180px;
`;

const BarColumn = styled.div`
  display: grid;
  gap: 0.6rem;
  align-items: end;
  text-align: center;
`;

const BarValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
  font-size: 0.9rem;
`;

const BarStick = styled.div<{ $value: number; $color: string }>`
  height: ${({ $value }) => `${$value * 2.6}px`};
  min-height: 16px;
  border-radius: 12px 12px 6px 6px;
  background: ${({ $color }) => $color};
`;

const BarLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.85rem;
`;

const ResultName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
`;

const ResultValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
  font-size: 0.9rem;
  text-align: right;
`;

const CandidateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.9rem;
`;

const CandidateCard = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  padding: 1.1rem 1.2rem;
  background: rgba(255, 255, 255, 0.92);
  display: grid;
  gap: 0.6rem;
`;

const CandidateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const CandidateAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.85);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 1rem;
`;

const CandidateName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #22312a;
`;

const CandidateMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.9rem;
`;

const CandidateDesc = styled.p`
  margin: 0.2rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #56615c;
  font-size: 0.92rem;
  line-height: 1.45;
`;

const CandidateActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.2rem;
`;

const SectionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.8);
  border: 1px solid rgba(31, 90, 51, 0.55);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
`;

const SecondaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.25);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
`;

const ProgramLink = styled(Link)`
  text-decoration: none;
  color: rgba(31, 90, 51, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.45rem 0.7rem;
  border-radius: 10px;
  background: rgba(31, 90, 51, 0.12);
  border: 1px solid rgba(31, 90, 51, 0.25);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

const CitizenElectionDetail = () => {
  const navItems = [
    { label: 'Tableau de bord', to: '/citoyen/dashboard' },
    { label: 'Elections', to: '/citoyen/elections' },
    { label: 'Candidats', to: '/citoyen/candidats' },
    { label: 'Vote securise', to: '/citoyen/vote' },
    { label: 'Resultats temps reel', to: '/citoyen/resultats' },
    { label: 'Profil', to: '/citoyen/profil' },
  ];

  const election = {
    title: 'Presidentielle 2025',
    status: 'live' as const,
    start: '08/03/2025',
    end: '12/03/2025',
    zone: 'Nationale',
    rules: 'Un vote unique par citoyen.',
    participation: 62,
    hasVoted: false,
  };

  const candidates = [
    {
      id: 'c1',
      name: 'Aicha Ndiaye',
      party: 'Union Civique',
      votes: 18450,
      program: 'Programme-Aicha.pdf',
      intro:
        'Priorite a la cohesion sociale, au renforcement des institutions et a une economie locale dynamique. Education, sante et proximite seront les piliers des 100 premiers jours...',
    },
    {
      id: 'c2',
      name: 'Moussa Diop',
      party: 'Coalition Verte',
      votes: 16280,
      program: 'Programme-Moussa.pdf',
      intro:
        'Transition energetique acceleree, agriculture resiliente et gouvernance participative. Un plan climat local sera deploye avec des filieres d emploi vert...',
    },
    {
      id: 'c3',
      name: 'Mariam Sow',
      party: 'Renouveau National',
      votes: 12420,
      program: 'Programme-Mariam.pdf',
      intro:
        'Modernisation des services publics, emploi des jeunes et digitalisation des procedures. L etat civil, les permis et les services sociaux seront simplifies...',
    },
  ];

  const candidateColors: Record<string, string> = {
    'Aicha Ndiaye': 'rgba(31, 90, 51, 0.75)',
    'Moussa Diop': 'rgba(38, 76, 140, 0.7)',
    'Mariam Sow': 'rgba(138, 90, 16, 0.7)',
  };

  const totalVotes = candidates.reduce((acc, c) => acc + c.votes, 0) || 1;

  const getStatusLabel = (status: 'live' | 'scheduled' | 'closed') => {
    if (status === 'live') return 'En cours';
    if (status === 'scheduled') return 'Programmee';
    return 'Cloturee';
  };

  return (
    <AppLayout
      role="Citoyen"
      title="Detail election"
      subtitle="Informations officielles et calendrier du scrutin."
      navItems={navItems}
    >
      <Panel>
        <HeaderRow>
          <Title>{election.title}</Title>
          <StatusPill $tone={election.status}>{getStatusLabel(election.status)}</StatusPill>
        </HeaderRow>
        <MetaRow>
          <span>Periode: {election.start} - {election.end}</span>
          <span>Zone: {election.zone}</span>
          <span>Participation: {election.participation}%</span>
        </MetaRow>

        <Section>
          <SectionRow>
            <SectionTitle>
              {election.status === 'closed' ? 'Resultats finaux' : 'Resultats en temps reel'}
            </SectionTitle>
            <Meta>Derniere mise a jour: 12:46</Meta>
          </SectionRow>
          <ChartCard>
            <ChartHeader>
              <ChartTitle>Diagramme des voix par candidat</ChartTitle>
              <ChartLegend>
                <LegendDot $color={candidateColors['Aicha Ndiaye']}>Aicha Ndiaye · 39%</LegendDot>
                <LegendDot $color={candidateColors['Moussa Diop']}>Moussa Diop · 35%</LegendDot>
                <LegendDot $color={candidateColors['Mariam Sow']}>Mariam Sow · 26%</LegendDot>
              </ChartLegend>
            </ChartHeader>
            <BarChart>
              <BarGrid>
                {candidates.map((candidate) => {
                  const percent = Math.round((candidate.votes / totalVotes) * 100);
                  return (
                    <BarColumn key={candidate.id}>
                      <BarValue>{percent}%</BarValue>
                      <BarStick $value={percent} $color={candidateColors[candidate.name]} />
                      <BarLabel>{candidate.name}</BarLabel>
                    </BarColumn>
                  );
                })}
              </BarGrid>
            </BarChart>
          </ChartCard>
        </Section>

        <Section>
          <SectionRow>
            <SectionTitle>Liste des candidats</SectionTitle>
            <Meta>{candidates.length} candidats</Meta>
            {election.status === 'live' && !election.hasVoted ? (
              <PrimaryButton to="/citoyen/vote">Voter</PrimaryButton>
            ) : null}
          </SectionRow>
          <CandidateGrid>
            {candidates.map((candidate) => (
              <CandidateCard key={candidate.id}>
                <CandidateHeader>
                  <CandidateAvatar>
                    {candidate.name
                      .split(' ')
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join('')}
                  </CandidateAvatar>
                  <div>
                    <CandidateName>{candidate.name}</CandidateName>
                    <CandidateMeta>Parti: {candidate.party}</CandidateMeta>
                  </div>
                </CandidateHeader>
                <CandidateDesc>{candidate.intro}</CandidateDesc>
                <CandidateActions>
                  <ProgramLink to={`/citoyen/candidats/${candidate.id}`}>
                    Programme
                  </ProgramLink>
                </CandidateActions>
              </CandidateCard>
            ))}
          </CandidateGrid>
        </Section>
      </Panel>
    </AppLayout>
  );
};

export default CitizenElectionDetail;
