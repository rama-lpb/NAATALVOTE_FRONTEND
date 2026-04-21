import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';
import { useState, useEffect, useMemo } from 'react';
import { api, type ElectionDto, type CandidateDto } from '../services/api';

interface ElectionStats {
  election_id: string;
  titre: string;
  total_votes: number;
  participation_rate: number;
  candidate_votes: { candidat_id: string; votes: number }[];
  statut: string;
}

// Illustrative demographic data (backend does not expose this breakdown)
const ILLUS_AGE_GROUPS = [
  { label: '18 - 24 ans', value: 22, color: 'rgba(31, 90, 51, 0.6)' },
  { label: '25 - 34 ans', value: 28, color: 'rgba(31, 90, 51, 0.65)' },
  { label: '35 - 44 ans', value: 20, color: 'rgba(138, 90, 16, 0.6)' },
  { label: '45 - 54 ans', value: 18, color: 'rgba(91, 95, 101, 0.6)' },
  { label: '55+ ans',     value: 12, color: 'rgba(31, 90, 51, 0.5)' },
];

const ILLUS_HOURLY = [
  { hour: '08h', votes: 120 },
  { hour: '10h', votes: 350 },
  { hour: '12h', votes: 280 },
  { hour: '14h', votes: 420 },
  { hour: '16h', votes: 510 },
  { hour: '18h', votes: 380 },
  { hour: '20h', votes: 190 },
];

const DEMO_CANDIDATE_DISTRIBUTION = [
  { label: 'Cheikh NDIAYE', votes: 420000, percent: 23, color: 'rgba(31, 90, 51, 0.56)' },
  { label: 'Rokhaya FALL', votes: 222500, percent: 12, color: 'rgba(138, 90, 16, 0.52)' },
  { label: 'Aminata DIOP', votes: 680000, percent: 37, color: 'rgba(38, 76, 140, 0.54)' },
  { label: 'Ibrahima SOW', votes: 515000, percent: 28, color: 'rgba(91, 95, 101, 0.55)' },
];

// ─── Styled components ───────────────────────────────────────────────────────

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
  min-width: 200px;
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
    $status === 'EN_COURS'   ? 'rgba(34, 197, 94, 0.15)' :
    $status === 'CLOTUREE'   ? 'rgba(176, 58, 46, 0.15)' :
                               'rgba(59, 130, 246, 0.15)'};
  color: ${({ $status }) =>
    $status === 'EN_COURS'   ? '#16a34a' :
    $status === 'CLOTUREE'   ? '#b03a2e' :
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
  font-size: 1.1rem;
  font-weight: 600;
`;

const IllusNote = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  color: #8a9a90;
  font-weight: 400;
  margin-left: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const StatBox = styled.div<{ $accent: string }>`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 16px;
  padding: 1rem 1.3rem;
  border-left: 5px solid ${({ $accent }) => $accent};
  box-shadow: 0 6px 16px rgba(12, 24, 18, 0.07);
`;

const StatLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #4a6a57;
  font-size: 0.82rem;
  font-weight: 500;
`;

const StatValue = styled.h3`
  margin: 0.4rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a2e20;
  font-size: 1.6rem;
  font-weight: 700;
`;

const ChartBox = styled.div`
  height: 220px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
  grid-template-columns: 1fr 2fr 56px;
  align-items: center;
  gap: 0.7rem;
`;

const BarLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BarTrack = styled.div<{ $pct: number; $color: string }>`
  height: 10px;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.10);
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: ${({ $pct }) => $pct}%;
    background: ${({ $color }) => $color};
    border-radius: 999px;
  }
`;

const BarValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.82rem;
  text-align: right;
`;

const EmptyMsg = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #8a9a90;
  font-size: 0.88rem;
  text-align: center;
  padding: 1.5rem 0;
`;

const EmptyState = styled.div`
  display: grid;
  gap: 0.7rem;
  background: linear-gradient(140deg, rgba(31, 90, 51, 0.06), rgba(31, 90, 51, 0.02));
  border: 1px solid rgba(31, 90, 51, 0.16);
  border-radius: 16px;
  padding: 1rem 1.1rem;
`;

const EmptyTitle = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #234433;
  font-size: 0.95rem;
  font-weight: 600;
`;

const EmptyText = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5f7667;
  font-size: 0.84rem;
  line-height: 1.5;
`;

const EmptySteps = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const EmptyStep = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  color: #1f5a33;
  border: 1px solid rgba(31, 90, 51, 0.22);
  background: rgba(255, 255, 255, 0.76);
  border-radius: 999px;
  padding: 0.3rem 0.6rem;
`;

const softenBarColor = (color: string): string => {
  const rgbaMatch = color.match(/^rgba?\(([^)]+)\)$/i);
  if (rgbaMatch) {
    const parts = rgbaMatch[1].split(',').map((p) => p.trim());
    if (parts.length === 4) {
      const [r, g, b, a] = parts;
      const alpha = Number(a);
      if (!Number.isNaN(alpha)) {
        const nextAlpha = Math.max(0.35, Math.min(0.58, alpha * 0.82));
        return `rgba(${r}, ${g}, ${b}, ${nextAlpha.toFixed(2)})`;
      }
    }
    if (parts.length === 3) {
      const [r, g, b] = parts;
      return `rgba(${r}, ${g}, ${b}, 0.52)`;
    }
  }

  const hex = color.replace('#', '');
  if (hex.length === 6 || hex.length === 3) {
    const normalized = hex.length === 3 ? hex.split('').map((c) => `${c}${c}`).join('') : hex;
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    if (![r, g, b].some(Number.isNaN)) {
      return `rgba(${r}, ${g}, ${b}, 0.52)`;
    }
  }

  return 'rgba(31, 90, 51, 0.52)';
};

// ─── Candidate votes bar chart ────────────────────────────────────────────────

const CandidateVotesChart = ({
  stats,
  candidates,
}: {
  stats: ElectionStats;
  candidates: CandidateDto[];
}) => {
  const maxVotes = Math.max(...stats.candidate_votes.map(c => c.votes), 1);

  return (
    <BarList>
      {stats.candidate_votes.map((cv, i) => {
        const cand = candidates.find(c => c.id === cv.candidat_id);
        const label = cand ? `${cand.prenom} ${cand.nom}` : `Candidat ${i + 1}`;
        const pct = Math.round((cv.votes / maxVotes) * 100);
        const color = softenBarColor(cand?.color ?? 'rgba(31, 90, 51, 0.6)');
        return (
          <BarRow key={cv.candidat_id}>
            <BarLabel title={label}>{label}</BarLabel>
            <BarTrack $pct={pct} $color={color} />
            <BarValue>{cv.votes.toLocaleString('fr-FR')}</BarValue>
          </BarRow>
        );
      })}
    </BarList>
  );
};

// ─── Hourly histogram (illustrative) ─────────────────────────────────────────

const HourlyChart = () => {
  const maxV = Math.max(...ILLUS_HOURLY.map(p => p.votes));
  const points = ILLUS_HOURLY
    .map((peak, idx) => {
      const x = 40 + idx * 86;
      const y = 190 - (peak.votes / maxV) * 130;
      return { x, y, label: peak.hour, votes: peak.votes };
    });
  const linePath = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} 200 L ${points[0].x} 200 Z`;

  return (
    <ChartBox>
      <ChartSvg viewBox="0 0 600 220" preserveAspectRatio="none">
        <path d={areaPath} fill="rgba(31, 90, 51, 0.14)" />
        <path d={linePath} fill="none" stroke="rgba(31, 90, 51, 0.78)" strokeWidth="3.2" strokeLinecap="round" />
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r="4.2" fill="rgba(31, 90, 51, 0.92)" />
            <text x={p.x} y="215" textAnchor="middle" fontSize="11" fill="#6b6f72">{p.label}</text>
          </g>
        ))}
      </ChartSvg>
    </ChartBox>
  );
};

const DemoCandidateChart = () => (
  <BarList>
    {DEMO_CANDIDATE_DISTRIBUTION.map((row) => (
      <BarRow key={row.label}>
        <BarLabel title={`${row.label} · ${row.percent}%`}>
          {row.label} · {row.percent}%
        </BarLabel>
        <BarTrack $pct={row.percent} $color={row.color} />
        <BarValue>{row.votes.toLocaleString('fr-FR')}</BarValue>
      </BarRow>
    ))}
  </BarList>
);

// ─── Main component ───────────────────────────────────────────────────────────

const navItems = [
  { label: 'Tableau admin', to: '/admin/dashboard' },
  { label: 'Elections creees', to: '/admin/elections' },
  { label: 'Programmer election', to: '/admin/election/create' },
  { label: 'Candidats', to: '/admin/candidats' },
  { label: 'Statistiques', to: '/admin/statistiques' },
  { label: 'Rapports', to: '/admin/rapports' },
];

const AdminStats = () => {
  const [elections, setElections] = useState<ElectionDto[]>([]);
  const [loadingElections, setLoadingElections] = useState(true);

  const [selectedId, setSelectedId] = useState('');
  const [stats, setStats] = useState<ElectionStats | null>(null);
  const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  const [loadingStats, setLoadingStats] = useState(false);

  const [selectedYear, setSelectedYear] = useState('all');
  const [electionType, setElectionType] = useState('all');

  // Load elections list
  useEffect(() => {
    api.elections.list()
      .then(setElections)
      .catch(() => setElections([]))
      .finally(() => setLoadingElections(false));
  }, []);

  // When election is selected, fetch its stats + candidates
  useEffect(() => {
    if (!selectedId) {
      setStats(null);
      setCandidates([]);
      return;
    }
    setLoadingStats(true);
    Promise.all([
      api.admin.stats(selectedId),
      api.elections.getCandidates(selectedId),
    ])
      .then(([s, c]) => { setStats(s); setCandidates(c); })
      .catch(() => { setStats(null); setCandidates([]); })
      .finally(() => setLoadingStats(false));
  }, [selectedId]);

  const filteredElections = useMemo(() => {
    let result = elections;
    if (selectedYear !== 'all') result = result.filter(e => e.date_debut.startsWith(selectedYear));
    if (electionType !== 'all') result = result.filter(e => e.type === electionType);
    return result;
  }, [elections, selectedYear, electionType]);

  const availableYears = useMemo(() => {
    const years = new Set(
      elections.map((e) => new Date(e.date_debut).getFullYear().toString())
    );
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [elections]);

  const availableTypes = useMemo(() => {
    const types = new Set(elections.map((e) => e.type));
    return Array.from(types).sort();
  }, [elections]);

  const regionParticipation = useMemo(() => {
    const byRegion = new Map<string, { votes: number; electeurs: number }>();
    elections.forEach((election) => {
      const key = election.region || 'National';
      const current = byRegion.get(key) ?? { votes: 0, electeurs: 0 };
      current.votes += election.votes_count;
      current.electeurs += election.total_electeurs;
      byRegion.set(key, current);
    });
    return Array.from(byRegion.entries())
      .map(([label, values], idx) => ({
        label,
        value: values.electeurs > 0 ? Math.round((values.votes / values.electeurs) * 100) : 0,
        color: idx % 2 === 0 ? 'rgba(31, 90, 51, 0.6)' : 'rgba(138, 90, 16, 0.6)',
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [elections]);

  const selectedElection = elections.find(e => e.id === selectedId) ?? null;

  const handleElectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
    setSelectedId('');
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setElectionType(e.target.value);
    setSelectedId('');
  };

  return (
    <AppLayout
      role="Administrateur"
      title="Statistiques avancees"
      subtitle="Repartitions, participation et tendances par scrutin."
      navItems={navItems}
    >
      <FilterBar>
        <FilterGroup>
          <FilterLabel htmlFor="election-filter">Election :</FilterLabel>
          <FilterSelect
            id="election-filter"
            value={selectedId}
            onChange={handleElectionChange}
            disabled={loadingElections}
          >
            <option value="">{loadingElections ? 'Chargement…' : 'Selectionner une election'}</option>
            {filteredElections.map(e => (
              <option key={e.id} value={e.id}>{e.titre}</option>
            ))}
          </FilterSelect>
          {selectedElection && (
            <ElectionBadge $status={selectedElection.statut}>
              {selectedElection.statut === 'EN_COURS' ? 'En cours' :
               selectedElection.statut === 'CLOTUREE'  ? 'Cloturee' : 'Programmee'}
            </ElectionBadge>
          )}
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="year-filter">Annee :</FilterLabel>
          <FilterSelect id="year-filter" value={selectedYear} onChange={handleYearChange}>
            <option value="all">Toutes les annees</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="type-filter">Type :</FilterLabel>
          <FilterSelect id="type-filter" value={electionType} onChange={handleTypeChange}>
            <option value="all">Tous les types</option>
            {availableTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </FilterSelect>
        </FilterGroup>
      </FilterBar>

      <Section>
        {/* Real stats — only shown when an election is selected */}
        {selectedId && (
          <Card>
            <CardTitle>
              {loadingStats ? 'Chargement…' : stats ? stats.titre : 'Statistiques'}
            </CardTitle>
            {loadingStats ? (
              <EmptyMsg>Chargement des statistiques…</EmptyMsg>
            ) : !stats ? (
              <EmptyMsg>Impossible de charger les statistiques.</EmptyMsg>
            ) : (
              <>
                <StatRow>
                  <StatBox $accent="rgba(31, 90, 51, 0.7)">
                    <StatLabel>Total votes</StatLabel>
                    <StatValue>{stats.total_votes.toLocaleString('fr-FR')}</StatValue>
                  </StatBox>
                  <StatBox $accent="rgba(138, 90, 16, 0.7)">
                    <StatLabel>Taux de participation</StatLabel>
                    <StatValue>{stats.participation_rate}%</StatValue>
                  </StatBox>
                  <StatBox $accent="rgba(91, 95, 101, 0.7)">
                    <StatLabel>Candidats</StatLabel>
                    <StatValue>{stats.candidate_votes.length}</StatValue>
                  </StatBox>
                </StatRow>

                {stats.candidate_votes.length > 0 ? (
                  <>
                    <CardTitle style={{ marginTop: '1rem' }}>Votes par candidat</CardTitle>
                    <CandidateVotesChart stats={stats} candidates={candidates} />
                  </>
                ) : (
                  <EmptyMsg>Aucun vote enregistre pour cette election.</EmptyMsg>
                )}
              </>
            )}
          </Card>
        )}

        {!selectedId && !loadingElections && (
          <Card>
            <EmptyState>
              <EmptyTitle>Selectionnez une election pour afficher les statistiques detaillees</EmptyTitle>
              <EmptyText>
                Choisissez d’abord une election dans le filtre du haut. En attendant, voici un aperçu
                de vos diagrammes pour conserver une vue analytique.
              </EmptyText>
              <EmptySteps>
                <EmptyStep>1. Choisir annee</EmptyStep>
                <EmptyStep>2. Choisir type</EmptyStep>
                <EmptyStep>3. Selectionner election</EmptyStep>
              </EmptySteps>
            </EmptyState>
            <CardTitle style={{ marginTop: '1rem' }}>Diagramme des voix par candidat (aperçu)</CardTitle>
            <DemoCandidateChart />
          </Card>
        )}

        {/* Illustrative charts — always visible */}
        <Grid>
          <Card>
            <CardTitle>
              Votes par tranche d'age
              <IllusNote>(illustratif)</IllusNote>
            </CardTitle>
            <BarList>
              {ILLUS_AGE_GROUPS.map((group, idx) => (
                <BarRow key={idx}>
                  <BarLabel>{group.label}</BarLabel>
                  <BarTrack $pct={group.value} $color={group.color} />
                  <BarValue>{group.value}%</BarValue>
                </BarRow>
              ))}
            </BarList>
          </Card>

          <Card>
            <CardTitle>
              Participation par region
              <IllusNote>(illustratif)</IllusNote>
            </CardTitle>
            <BarList>
              {regionParticipation.map((region, idx) => (
                <BarRow key={idx}>
                  <BarLabel>{region.label}</BarLabel>
                  <BarTrack $pct={region.value} $color={region.color} />
                  <BarValue>{region.value}%</BarValue>
                </BarRow>
              ))}
            </BarList>
          </Card>
        </Grid>

        <Card>
          <CardTitle>
            Tendance des votes (courbe horaire)
            <IllusNote>(illustratif)</IllusNote>
          </CardTitle>
          <HourlyChart />
          <Legend>
            <LegendItem><Dot $color="rgba(31, 90, 51, 0.75)" />Evolution par heure</LegendItem>
          </Legend>
        </Card>
      </Section>
    </AppLayout>
  );
};

export default AdminStats;
