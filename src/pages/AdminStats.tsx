import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';

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

  return (
    <AppLayout
      role="Administrateur"
      title="Statistiques avancees"
      subtitle="Repartitions demographiques, participation et tendances temporelles."
      navItems={navItems}
    >
      <Section>
        <Grid>
          <Card>
            <CardTitle>Participation mensuelle</CardTitle>
            <ChartBox>
              <ChartSvg viewBox="0 0 600 220" preserveAspectRatio="none">
                <polyline
                  points="0,180 60,160 120,150 180,130 240,110 300,120 360,95 420,105 480,120 540,110 600,140"
                  fill="none"
                  stroke="rgba(31, 90, 51, 0.7)"
                  strokeWidth="3"
                />
                <polyline
                  points="0,200 60,190 120,175 180,170 240,155 300,150 360,135 420,140 480,150 540,165 600,175"
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
              <BarRow>
                <BarLabel>18 - 24 ans</BarLabel>
                <BarTrack $value={22} $color="rgba(31, 90, 51, 0.6)" />
                <BarValue>22%</BarValue>
              </BarRow>
              <BarRow>
                <BarLabel>25 - 34 ans</BarLabel>
                <BarTrack $value={28} $color="rgba(31, 90, 51, 0.6)" />
                <BarValue>28%</BarValue>
              </BarRow>
              <BarRow>
                <BarLabel>35 - 44 ans</BarLabel>
                <BarTrack $value={20} $color="rgba(138, 90, 16, 0.6)" />
                <BarValue>20%</BarValue>
              </BarRow>
              <BarRow>
                <BarLabel>45 - 54 ans</BarLabel>
                <BarTrack $value={18} $color="rgba(91, 95, 101, 0.6)" />
                <BarValue>18%</BarValue>
              </BarRow>
              <BarRow>
                <BarLabel>55+ ans</BarLabel>
                <BarTrack $value={12} $color="rgba(31, 90, 51, 0.5)" />
                <BarValue>12%</BarValue>
              </BarRow>
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
                  Femmes 46%
                </text>
                <text x="420" y="50" textAnchor="middle" fontSize="14" fill="#22312a">
                  Hommes 54%
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
              <BarRow>
                <BarLabel>Dakar</BarLabel>
                <BarTrack $value={68} $color="rgba(31, 90, 51, 0.6)" />
                <BarValue>68%</BarValue>
              </BarRow>
              <BarRow>
                <BarLabel>Thies</BarLabel>
                <BarTrack $value={57} $color="rgba(31, 90, 51, 0.6)" />
                <BarValue>57%</BarValue>
              </BarRow>
              <BarRow>
                <BarLabel>Saint-Louis</BarLabel>
                <BarTrack $value={49} $color="rgba(138, 90, 16, 0.6)" />
                <BarValue>49%</BarValue>
              </BarRow>
              <BarRow>
                <BarLabel>Ziguinchor</BarLabel>
                <BarTrack $value={53} $color="rgba(91, 95, 101, 0.6)" />
                <BarValue>53%</BarValue>
              </BarRow>
            </BarList>
          </Card>
        </Grid>

        <Card>
          <CardTitle>Histogramme des pics de vote (heures)</CardTitle>
          <ChartBox>
            <ChartSvg viewBox="0 0 600 220" preserveAspectRatio="none">
              <rect x="20" y="140" width="40" height="60" fill="rgba(31, 90, 51, 0.55)" />
              <rect x="80" y="120" width="40" height="80" fill="rgba(31, 90, 51, 0.55)" />
              <rect x="140" y="90" width="40" height="110" fill="rgba(31, 90, 51, 0.55)" />
              <rect x="200" y="70" width="40" height="130" fill="rgba(31, 90, 51, 0.55)" />
              <rect x="260" y="60" width="40" height="140" fill="rgba(31, 90, 51, 0.55)" />
              <rect x="320" y="80" width="40" height="120" fill="rgba(31, 90, 51, 0.55)" />
              <rect x="380" y="110" width="40" height="90" fill="rgba(31, 90, 51, 0.55)" />
              <rect x="440" y="130" width="40" height="70" fill="rgba(31, 90, 51, 0.55)" />
              <rect x="500" y="150" width="40" height="50" fill="rgba(31, 90, 51, 0.55)" />
            </ChartSvg>
          </ChartBox>
        </Card>
      </Section>
    </AppLayout>
  );
};

export default AdminStats;
