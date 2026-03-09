import styled from 'styled-components';
import { useState } from 'react';
import { AppLayout } from '../components/AppLayout';

const LayoutGrid = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ElectionSelector = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.22);
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.9);
  color: #22312a;
  outline: none;
  cursor: pointer;
  &:focus { border-color: rgba(31, 90, 51, 0.5); }
`;

const LiveBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
`;

const PulseDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(31, 90, 51, 0.8);
  display: inline-block;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 2px solid rgba(31, 90, 51, 0.4);
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.5); }
  }
`;

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div<{ $accent?: string }>`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 18px;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  border-left: 5px solid ${({ $accent }) => $accent || 'rgba(31, 90, 51, 0.5)'};
  box-shadow: 0 8px 20px rgba(12, 24, 18, 0.07);
`;

const StatLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b7a72;
  font-size: 0.85rem;
`;

const StatValue = styled.h3`
  margin: 0.3rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a2e20;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.6rem;
  box-shadow: 0 14px 30px rgba(12, 24, 18, 0.08);
  display: grid;
  gap: 1.2rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #22312a;
`;

const ResultsList = styled.div`
  display: grid;
  gap: 1rem;
`;

const ResultRow = styled.div<{ $rank: number }>`
  display: grid;
  grid-template-columns: 32px 50px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  border-radius: 16px;
  background: ${({ $rank }) =>
    $rank === 1 ? 'linear-gradient(135deg, rgba(31, 90, 51, 0.08), rgba(255, 255, 255, 0.95))' :
    'rgba(255, 255, 255, 0.9)'};
  border: ${({ $rank }) =>
    $rank === 1 ? '1.5px solid rgba(31, 90, 51, 0.25)' : '1px solid rgba(31, 90, 51, 0.1)'};
`;

const RankNum = styled.span<{ $rank: number }>`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 800;
  font-size: 1rem;
  color: ${({ $rank }) =>
    $rank === 1 ? 'rgba(31, 90, 51, 0.9)' : '#9aada3'};
`;

const CandAvatar = styled.div<{ $color: string }>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  color: #fff;
`;

const CandInfo = styled.div`
  display: grid;
  gap: 0.3rem;
`;

const CandName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1a2e20;
  font-size: 0.95rem;
`;

const CandParty = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b7a72;
  font-size: 0.8rem;
`;

const BarWrap = styled.div`
  position: relative;
`;

const BarTrack = styled.div`
  height: 10px;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.1);
  overflow: hidden;
`;

const BarFill = styled.div<{ $value: number; $color: string }>`
  height: 100%;
  width: ${({ $value }) => $value}%;
  background: ${({ $color }) => $color};
  border-radius: 999px;
  transition: width 0.8s ease;
`;

const VoteCount = styled.div`
  text-align: right;
`;

const Percent = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #22312a;
`;

const Votes = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  color: #8a9a90;
`;

const ParticipationBar = styled.div`
  margin-top: 0.4rem;
`;

const PartLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #6b7a72;
  margin-bottom: 0.35rem;
`;

const PartTrack = styled.div`
  height: 8px;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.1);
  overflow: hidden;
`;

const PartFill = styled.div<{ $value: number }>`
  height: 100%;
  width: ${({ $value }) => $value}%;
  background: linear-gradient(90deg, rgba(31, 90, 51, 0.6), rgba(31, 90, 51, 0.8));
  border-radius: 999px;
`;

const navItems = [
  { label: 'Tableau de bord', to: '/citoyen/dashboard' },
  { label: 'Elections', to: '/citoyen/elections' },
  { label: 'Candidats', to: '/citoyen/candidats' },
  { label: 'Vote securise', to: '/citoyen/vote' },
  { label: 'Resultats temps reel', to: '/citoyen/resultats' },
  { label: 'Profil', to: '/citoyen/profil' },
];

const elections = [
  {
    id: 'pres-2025',
    label: 'Presidentielle 2025',
    status: 'live',
    totalVotes: 3_482_120,
    participation: 64.2,
    inscrits: 5_423_000,
    candidates: [
      { initials: 'AN', name: 'Aicha Ndiaye', party: 'Union Civique', percent: 39, color: 'rgba(31, 90, 51, 0.7)' },
      { initials: 'MD', name: 'Moussa Diop', party: 'Coalition Verte', percent: 35, color: 'rgba(38, 76, 140, 0.7)' },
      { initials: 'MS', name: 'Mariam Sow', party: 'Renouveau National', percent: 26, color: 'rgba(138, 90, 16, 0.7)' },
    ],
  },
  {
    id: 'leg-dkr',
    label: 'Legislatives Dakar',
    status: 'closed',
    totalVotes: 621_450,
    participation: 57.3,
    inscrits: 1_084_900,
    candidates: [
      { initials: 'CB', name: 'Cheikh Ba', party: 'Front Democratique', percent: 44, color: 'rgba(31, 90, 51, 0.7)' },
      { initials: 'KN', name: 'Khadija Niane', party: 'Alliance Populaire', percent: 33, color: 'rgba(138, 90, 16, 0.7)' },
      { initials: 'OD', name: 'Omar Diouf', party: 'Bloc Citoyen', percent: 23, color: 'rgba(91, 95, 101, 0.7)' },
    ],
  },
];

const CitizenResults = () => {
  const [selectedId, setSelectedId] = useState(elections[0].id);
  const election = elections.find((e) => e.id === selectedId) ?? elections[0];
  const sorted = [...election.candidates].sort((a, b) => b.percent - a.percent);

  return (
    <AppLayout
      role="Citoyen"
      title="Resultats en temps reel"
      subtitle="Mise a jour automatique a chaque vote enregistre."
      navItems={navItems}
    >
      <LayoutGrid>
        <TopBar>
          <ElectionSelector value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {elections.map((el) => (
              <option key={el.id} value={el.id}>{el.label}</option>
            ))}
          </ElectionSelector>
          {election.status === 'live' && (
            <LiveBadge>
              <PulseDot />
              Resultats en direct
            </LiveBadge>
          )}
        </TopBar>

        <SummaryRow>
          <StatCard $accent="rgba(31, 90, 51, 0.6)">
            <StatLabel>Participation nationale</StatLabel>
            <StatValue>{election.participation}%</StatValue>
          </StatCard>
          <StatCard $accent="rgba(38, 76, 140, 0.5)">
            <StatLabel>Votes enregistres</StatLabel>
            <StatValue>{election.totalVotes.toLocaleString('fr-FR')}</StatValue>
          </StatCard>
          <StatCard $accent="rgba(138, 90, 16, 0.5)">
            <StatLabel>Inscrits</StatLabel>
            <StatValue>{election.inscrits.toLocaleString('fr-FR')}</StatValue>
          </StatCard>
          <StatCard $accent="rgba(91, 95, 101, 0.4)">
            <StatLabel>Delai mise a jour</StatLabel>
            <StatValue>{'< 2s'}</StatValue>
          </StatCard>
        </SummaryRow>

        <Panel>
          <PanelHeader>
            <PanelTitle>Resultats — {election.label}</PanelTitle>
          </PanelHeader>
          <ResultsList>
            {sorted.map((cand, idx) => (
              <ResultRow key={cand.initials} $rank={idx + 1}>
                <RankNum $rank={idx + 1}>
                  {idx === 0 ? <i className="bi bi-trophy" /> : `#${idx + 1}`}
                </RankNum>
                <CandAvatar $color={cand.color}>{cand.initials}</CandAvatar>
                <CandInfo>
                  <CandName>{cand.name}</CandName>
                  <CandParty>{cand.party}</CandParty>
                  <BarWrap>
                    <BarTrack>
                      <BarFill $value={cand.percent} $color={cand.color} />
                    </BarTrack>
                  </BarWrap>
                </CandInfo>
                <VoteCount>
                  <Percent>{cand.percent}%</Percent>
                  <Votes>{Math.round(election.totalVotes * cand.percent / 100).toLocaleString('fr-FR')} voix</Votes>
                </VoteCount>
              </ResultRow>
            ))}
          </ResultsList>

          <div>
            <ParticipationBar>
              <PartLabel>
                <span>Taux de participation</span>
                <strong>{election.participation}%</strong>
              </PartLabel>
              <PartTrack>
                <PartFill $value={election.participation} />
              </PartTrack>
            </ParticipationBar>
          </div>
        </Panel>
      </LayoutGrid>
    </AppLayout>
  );
};

export default CitizenResults;
