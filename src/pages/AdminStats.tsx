import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';
import { useState, useMemo } from 'react';
import { getAllElectionsList, getElectionById, type Election } from '../data/mockData';

// Statistics data for each election
interface ElectionStats {
  electionId: string;
  participation: { month: string; global: number; valid: number }[];
  ageGroups: { label: string; value: number; color: string }[];
  sexDistribution: { femme: number; homme: number };
  regions: { label: string; value: number; color: string }[];
  hourlyPeaks: { hour: string; votes: number }[];
}

const electionStatsData: Record<string, ElectionStats> = {
  'elec-001': {
    electionId: 'elec-001',
    participation: [
      { month: 'Jan', global: 45, valid: 42 },
      { month: 'Fev', global: 52, valid: 48 },
      { month: 'Mar', global: 38, valid: 35 },
      { month: 'Avr', global: 61, valid: 58 },
      { month: 'Mai', global: 55, valid: 51 },
      { month: 'Juin', global: 48, valid: 45 },
    ],
    ageGroups: [
      { label: '18 - 24 ans', value: 22, color: 'rgba(31, 90, 51, 0.6)' },
      { label: '25 - 34 ans', value: 28, color: 'rgba(31, 90, 51, 0.65)' },
      { label: '35 - 44 ans', value: 20, color: 'rgba(138, 90, 16, 0.6)' },
      { label: '45 - 54 ans', value: 18, color: 'rgba(91, 95, 101, 0.6)' },
      { label: '55+ ans', value: 12, color: 'rgba(31, 90, 51, 0.5)' },
    ],
    sexDistribution: { femme: 46, homme: 54 },
    regions: [
      { label: 'Dakar', value: 68, color: 'rgba(31, 90, 51, 0.6)' },
      { label: 'Thies', value: 57, color: 'rgba(31, 90, 51, 0.6)' },
      { label: 'Saint-Louis', value: 49, color: 'rgba(138, 90, 16, 0.6)' },
      { label: 'Ziguinchor', value: 53, color: 'rgba(91, 95, 101, 0.6)' },
    ],
    hourlyPeaks: [
      { hour: '08h', votes: 120 },
      { hour: '10h', votes: 350 },
      { hour: '12h', votes: 280 },
      { hour: '14h', votes: 420 },
      { hour: '16h', votes: 510 },
      { hour: '18h', votes: 380 },
      { hour: '20h', votes: 190 },
    ],
  },
  'elec-002': {
    electionId: 'elec-002',
    participation: [
      { month: 'Jan', global: 35, valid: 32 },
      { month: 'Fev', global: 42, valid: 39 },
      { month: 'Mar', global: 48, valid: 44 },
      { month: 'Avr', global: 51, valid: 47 },
      { month: 'Mai', global: 39, valid: 36 },
      { month: 'Juin', global: 44, valid: 41 },
    ],
    ageGroups: [
      { label: '18 - 24 ans', value: 18, color: 'rgba(31, 90, 51, 0.55)' },
      { label: '25 - 34 ans', value: 32, color: 'rgba(31, 90, 51, 0.7)' },
      { label: '35 - 44 ans', value: 22, color: 'rgba(138, 90, 16, 0.6)' },
      { label: '45 - 54 ans', value: 16, color: 'rgba(91, 95, 101, 0.55)' },
      { label: '55+ ans', value: 12, color: 'rgba(31, 90, 51, 0.45)' },
    ],
    sexDistribution: { femme: 49, homme: 51 },
    regions: [
      { label: 'Dakar', value: 72, color: 'rgba(31, 90, 51, 0.65)' },
      { label: 'Thies', value: 61, color: 'rgba(31, 90, 51, 0.6)' },
      { label: 'Saint-Louis', value: 42, color: 'rgba(138, 90, 16, 0.55)' },
      { label: 'Ziguinchor', value: 58, color: 'rgba(91, 95, 101, 0.6)' },
    ],
    hourlyPeaks: [
      { hour: '08h', votes: 90 },
      { hour: '10h', votes: 280 },
      { hour: '12h', votes: 220 },
      { hour: '14h', votes: 350 },
      { hour: '16h', votes: 420 },
      { hour: '18h', votes: 310 },
      { hour: '20h', votes: 150 },
    ],
  },
  'elec-003': {
    electionId: 'elec-003',
    participation: [
      { month: 'Jan', global: 28, valid: 25 },
      { month: 'Fev', global: 35, valid: 32 },
      { month: 'Mar', global: 42, valid: 38 },
      { month: 'Avr', global: 38, valid: 35 },
      { month: 'Mai', global: 45, valid: 41 },
      { month: 'Juin', global: 32, valid: 29 },
    ],
    ageGroups: [
      { label: '18 - 24 ans', value: 25, color: 'rgba(31, 90, 51, 0.6)' },
      { label: '25 - 34 ans', value: 30, color: 'rgba(31, 90, 51, 0.65)' },
      { label: '35 - 44 ans', value: 18, color: 'rgba(138, 90, 16, 0.55)' },
      { label: '45 - 54 ans', value: 15, color: 'rgba(91, 95, 101, 0.5)' },
      { label: '55+ ans', value: 12, color: 'rgba(31, 90, 51, 0.45)' },
    ],
    sexDistribution: { femme: 44, homme: 56 },
    regions: [
      { label: 'Dakar', value: 65, color: 'rgba(31, 90, 51, 0.6)' },
      { label: 'Thies', value: 52, color: 'rgba(31, 90, 51, 0.55)' },
      { label: 'Saint-Louis', value: 55, color: 'rgba(138, 90, 16, 0.6)' },
      { label: 'Ziguinchor', value: 48, color: 'rgba(91, 95, 101, 0.55)' },
    ],
    hourlyPeaks: [
      { hour: '08h', votes: 80 },
      { hour: '10h', votes: 200 },
      { hour: '12h', votes: 180 },
      { hour: '14h', votes: 280 },
      { hour: '16h', votes: 340 },
      { hour: '18h', votes: 250 },
      { hour: '20h', votes: 110 },
    ],
  },
};

// Default stats when no election is selected
const defaultStats: ElectionStats = {
  electionId: 'default',
  participation: [
    { month: 'Jan', global: 45, valid: 42 },
    { month: 'Fev', global: 52, valid: 48 },
    { month: 'Mar', global: 38, valid: 35 },
    { month: 'Avr', global: 61, valid: 58 },
    { month: 'Mai', global: 55, valid: 51 },
    { month: 'Juin', global: 48, valid: 45 },
  ],
  ageGroups: [
    { label: '18 - 24 ans', value: 22, color: 'rgba(31, 90, 51, 0.6)' },
    { label: '25 - 34 ans', value: 28, color: 'rgba(31, 90, 51, 0.65)' },
    { label: '35 - 44 ans', value: 20, color: 'rgba(138, 90, 16, 0.6)' },
    { label: '45 - 54 ans', value: 18, color: 'rgba(91, 95, 101, 0.6)' },
    { label: '55+ ans', value: 12, color: 'rgba(31, 90, 51, 0.5)' },
  ],
  sexDistribution: { femme: 46, homme: 54 },
  regions: [
    { label: 'Dakar', value: 68, color: 'rgba(31, 90, 51, 0.6)' },
    { label: 'Thies', value: 57, color: 'rgba(31, 90, 51, 0.6)' },
    { label: 'Saint-Louis', value: 49, color: 'rgba(138, 90, 16, 0.6)' },
    { label: 'Ziguinchor', value: 53, color: 'rgba(91, 95, 101, 0.6)' },
  ],
  hourlyPeaks: [
    { hour: '08h', votes: 120 },
    { hour: '10h', votes: 350 },
    { hour: '12h', votes: 280 },
    { hour: '14h', votes: 420 },
    { hour: '16h', votes: 510 },
    { hour: '18h', votes: 380 },
    { hour: '20h', votes: 190 },
  ],
};

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 0.9rem;
  font-weight: 500;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  border: 2px solid rgba(31, 90, 51, 0.2);
  background: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #22312a;
  cursor: pointer;
  min-width: 150px;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: rgba(31, 90, 51, 0.5);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
  }
`;

const ElectionBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: 0.5rem;
  background: ${({ $status }) => 
    $status === 'EN_COURS' ? 'rgba(34, 197, 94, 0.15)' :
    $status === 'CLOTUREE' ? 'rgba(176, 58, 46, 0.15)' :
    'rgba(59, 130, 246, 0.15)'};
  color: ${({ $status }) => 
    $status === 'EN_COURS' ? '#16a34a' :
    $status === 'CLOTUREE' ? '#b03a2e' :
    '#3b82f6'};
`;

const Section = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: 0 16px 30px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const CardTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

const ChartBox = styled.div`
  height: 220px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

const Legend = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 0.6rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #6b6f72;
`;

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

const Dot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${({ $color }) => $color};
`;

const BarList = styled.div`
  display: grid;
  gap: 0.7rem;
`;

const BarRow = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr 48px;
  align-items: center;
  gap: 0.7rem;
`;

const BarLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 0.9rem;
`;

const BarTrack = styled.div<{ $value: number; $color: string }>`
  height: 10px;
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

const BarValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.85rem;
`;

const AdminStats = () => {
  const navItems = [
    { label: 'Tableau admin', to: '/admin/dashboard' },
    { label: 'Programmer election', to: '/admin/election/create' },
    { label: 'Candidats', to: '/admin/candidats' },
    { label: 'Statistiques', to: '/admin/statistiques' },
    { label: 'Rapports', to: '/admin/rapports' },
  ];

  // Get all elections for the filter
  const elections = useMemo(() => getAllElectionsList(), []);
  
  // State for selected election
  const [selectedElectionId, setSelectedElectionId] = useState<string>('');
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);

  // Additional filters
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [electionType, setElectionType] = useState<string>('all');

  // Filter elections based on year and type
  const filteredElections = useMemo(() => {
    let result = elections;
    if (selectedYear !== 'all') {
      result = result.filter(e => e.date_debut.includes(selectedYear));
    }
    if (electionType !== 'all') {
      result = result.filter(e => e.type === electionType);
    }
    return result;
  }, [elections, selectedYear, electionType]);

  // Get current stats based on selected filters
  const currentStats = useMemo(() => {
    // If specific election is selected, use its stats
    if (selectedElectionId && electionStatsData[selectedElectionId]) {
      return electionStatsData[selectedElectionId];
    }
    
    // If year or type is selected but no specific election, aggregate stats
    if (selectedYear !== 'all' || electionType !== 'all') {
      // Get elections matching the filters
      let matchingElections = elections;
      if (selectedYear !== 'all') {
        matchingElections = matchingElections.filter(e => e.date_debut.includes(selectedYear));
      }
      if (electionType !== 'all') {
        matchingElections = matchingElections.filter(e => e.type === electionType);
      }
      
      // If we have matching elections with stats, aggregate them
      const matchingStats = matchingElections
        .map(e => electionStatsData[e.id])
        .filter(Boolean);
      
      if (matchingStats.length > 0) {
        // Aggregate the stats
        const avgStats: ElectionStats = {
          electionId: 'aggregated',
          participation: matchingStats[0].participation,
          ageGroups: matchingStats[0].ageGroups,
          sexDistribution: {
            femme: Math.round(matchingStats.reduce((sum, s) => sum + s.sexDistribution.femme, 0) / matchingStats.length),
            homme: Math.round(matchingStats.reduce((sum, s) => sum + s.sexDistribution.homme, 0) / matchingStats.length),
          },
          regions: matchingStats[0].regions,
          hourlyPeaks: matchingStats[0].hourlyPeaks,
        };
        return avgStats;
      }
    }
    
    // If no filters selected (all elections), aggregate ALL elections
    const allStats = elections
      .map(e => electionStatsData[e.id])
      .filter(Boolean);
    
    if (allStats.length > 0) {
      const avgStats: ElectionStats = {
        electionId: 'all-aggregated',
        participation: allStats[0].participation,
        ageGroups: allStats[0].ageGroups,
        sexDistribution: {
          femme: Math.round(allStats.reduce((sum, s) => sum + s.sexDistribution.femme, 0) / allStats.length),
          homme: Math.round(allStats.reduce((sum, s) => sum + s.sexDistribution.homme, 0) / allStats.length),
        },
        regions: allStats[0].regions,
        hourlyPeaks: allStats[0].hourlyPeaks,
      };
      return avgStats;
    }
    
    // Fallback to default
    return defaultStats;
  }, [selectedElectionId, selectedYear, electionType, elections]);

  // Handle election selection
  const handleElectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const electionId = e.target.value;
    setSelectedElectionId(electionId);
    if (electionId) {
      const election = getElectionById(electionId);
      setSelectedElection(election || null);
    } else {
      setSelectedElection(null);
    }
  };

  // Handle year filter change - reset election selection
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
    setSelectedElectionId('');
    setSelectedElection(null);
  };

  // Handle type filter change - reset election selection
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setElectionType(e.target.value);
    setSelectedElectionId('');
    setSelectedElection(null);
  };

  return (
    <AppLayout
      role="Administrateur"
      title="Statistiques avancees"
      subtitle="Repartitions demographiques, participation et tendances temporelles."
      navItems={navItems}
    >
      <FilterBar>
        <FilterGroup>
          <FilterLabel htmlFor="election-filter">Election :</FilterLabel>
          <FilterSelect 
            id="election-filter" 
            value={selectedElectionId} 
            onChange={handleElectionChange}
          >
            <option value="">Toutes les elections</option>
            {filteredElections.map((election) => (
              <option key={election.id} value={election.id}>
                {election.titre}
              </option>
            ))}
          </FilterSelect>
          {selectedElection && (
            <ElectionBadge $status={selectedElection.statut}>
              {selectedElection.statut === 'EN_COURS' ? 'En cours' :
               selectedElection.statut === 'CLOTUREE' ? 'Cloturee' :
               'Programmee'}
            </ElectionBadge>
          )}
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="year-filter">Annee :</FilterLabel>
          <FilterSelect 
            id="year-filter"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="all">Toutes les annees</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="type-filter">Type :</FilterLabel>
          <FilterSelect 
            id="type-filter"
            value={electionType}
            onChange={handleTypeChange}
          >
            <option value="all">Tous les types</option>
            <option value=" PRESIDENTIELLE">Presidentielle</option>
            <option value="LEGISLATIVE">Legislative</option>
            <option value="MUNICIPALE">Municipale</option>
          </FilterSelect>
        </FilterGroup>
      </FilterBar>
      <Section>
        <Grid>
          <Card>
            <CardTitle>Participation mensuelle</CardTitle>
            <ChartBox>
              <ChartSvg viewBox="0 0 600 220" preserveAspectRatio="none">
                <polyline
                  points={currentStats.participation.map((p, i) => `${i * 120},${220 - p.global * 3}`).join(' ')}
                  fill="none"
                  stroke="rgba(31, 90, 51, 0.7)"
                  strokeWidth="3"
                />
                <polyline
                  points={currentStats.participation.map((p, i) => `${i * 120},${220 - p.valid * 3}`).join(' ')}
                  fill="none"
                  stroke="rgba(31, 90, 51, 0.65)"
                  strokeWidth="3"
                />
              </ChartSvg>
            </ChartBox>
            <Legend>
              <LegendItem>
                <Dot $color="rgba(31, 90, 51, 0.7)" /> Participation globale
              </LegendItem>
              <LegendItem>
                <Dot $color="rgba(31, 90, 51, 0.65)" /> Participation validee
              </LegendItem>
            </Legend>
          </Card>

          <Card>
            <CardTitle>Votes par tranche d'age</CardTitle>
            <BarList>
              {currentStats.ageGroups.map((group, idx) => (
                <BarRow key={idx}>
                  <BarLabel>{group.label}</BarLabel>
                  <BarTrack $value={group.value} $color={group.color} />
                  <BarValue>{group.value}%</BarValue>
                </BarRow>
              ))}
            </BarList>
          </Card>
        </Grid>

        <Grid>
          <Card>
            <CardTitle>Repartition par sexe</CardTitle>
            <ChartBox>
              <ChartSvg viewBox="0 0 600 220" preserveAspectRatio="none">
                <rect x="120" y="80" width="120" height="120" fill="rgba(31, 90, 51, 0.6)" />
                <rect x="360" y="60" width="120" height="140" fill="rgba(31, 90, 51, 0.6)" />
                <text x="180" y="70" textAnchor="middle" fontSize="14" fill="#22312a">
                  Femmes {currentStats.sexDistribution.femme}%
                </text>
                <text x="420" y="50" textAnchor="middle" fontSize="14" fill="#22312a">
                  Hommes {currentStats.sexDistribution.homme}%
                </text>
              </ChartSvg>
            </ChartBox>
            <Legend>
              <LegendItem>
                <Dot $color="rgba(31, 90, 51, 0.6)" /> Femmes
              </LegendItem>
              <LegendItem>
                <Dot $color="rgba(31, 90, 51, 0.6)" /> Hommes
              </LegendItem>
            </Legend>
          </Card>

          <Card>
            <CardTitle>Participation par region</CardTitle>
            <BarList>
              {currentStats.regions.map((region, idx) => (
                <BarRow key={idx}>
                  <BarLabel>{region.label}</BarLabel>
                  <BarTrack $value={region.value} $color={region.color} />
                  <BarValue>{region.value}%</BarValue>
                </BarRow>
              ))}
            </BarList>
          </Card>
        </Grid>

        <Card>
          <CardTitle>Histogramme des pics de vote (heures)</CardTitle>
          <ChartBox>
            <ChartSvg viewBox="0 0 600 220" preserveAspectRatio="none">
              {currentStats.hourlyPeaks.map((peak, idx) => {
                const maxVotes = Math.max(...currentStats.hourlyPeaks.map(p => p.votes));
                const height = (peak.votes / maxVotes) * 160;
                const y = 200 - height;
                return (
                  <g key={idx}>
                    <rect 
                      x={30 + idx * 75} 
                      y={y} 
                      width="40" 
                      height={height} 
                      fill="rgba(31, 90, 51, 0.55)" 
                      rx="4"
                    />
                    <text 
                      x={50 + idx * 75} 
                      y="215" 
                      textAnchor="middle" 
                      fontSize="11" 
                      fill="#6b6f72"
                    >
                      {peak.hour}
                    </text>
                  </g>
                );
              })}
            </ChartSvg>
          </ChartBox>
        </Card>
      </Section>
    </AppLayout>
  );
};

export default AdminStats;
