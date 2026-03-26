import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { AppLayout } from '../components/AppLayout';

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.4rem;
`;

const MainColumn = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Hello = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1f5a33;
  font-size: 1.15rem;
`;

const HelperText = styled.p`
  margin: 0.2rem 0 0;
  color: #3f5e4b;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
`;

const Filter = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  background: rgba(255, 255, 255, 0.85);
  color: #1f5a33;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div<{ $accent: string }>`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  padding: 1.3rem 1.5rem;
  box-shadow: 0 12px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.1);
  border-left: 6px solid ${({ $accent }) => $accent};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StatLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #4a6a57;
  font-size: 0.85rem;
  font-weight: 500;
`;

const StatValue = styled.h3`
  margin: 0.5rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a2e20;
  font-size: 1.8rem;
  font-weight: 700;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 14px 32px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.1);
`;

const CardTitle = styled.h2`
  margin: 0 0 1.2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a2e20;
  font-size: 1.15rem;
  font-weight: 600;
`;

const ReportChart = styled.div`
  min-height: 260px;
  height: 260px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(31, 90, 51, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0.5rem;
  position: relative;
  overflow: hidden;
`;

const ChartSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// Données dynamiques pour le graphique
const participationData = [
  { month: 'Jan', value: 45 },
  { month: 'Fev', value: 52 },
  { month: 'Mar', value: 38 },
  { month: 'Avr', value: 61 },
  { month: 'Mai', value: 55 },
  { month: 'Juin', value: 48 },
  { month: 'Juil', value: 72 },
  { month: 'Aout', value: 65 },
  { month: 'Sep', value: 58 },
  { month: 'Oct', value: 63 },
  { month: 'Nov', value: 70 },
  { month: 'Dec', value: 75 },
];

// Composant Graphique dynamique
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ParticipationChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 160 });
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({ width: Math.max(width - 20, 300), height: 160 });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  const padding = { top: 20, right: 20, bottom: 35, left: 45 };
  const chartWidth = dimensions.width - padding.left - padding.right;
  const chartHeight = dimensions.height - padding.top - padding.bottom;
  const maxValue = 100;
  
  // Générer les points
  const points = participationData.map((item, index) => ({
    x: padding.left + (index / (participationData.length - 1)) * chartWidth,
    y: padding.top + chartHeight - (item.value / maxValue) * chartHeight,
    ...item
  }));
  
  // Générer le chemin pour la zone filled
  const areaPath = points.map((p, i) => 
    i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
  ).join(' ') + ` L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;
  
  // Générer le chemin pour la ligne
  const linePath = points.map((p, i) => 
    i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
  ).join(' ');
  
  return (
    <ChartContainer ref={containerRef}>
      <ChartSvg viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} preserveAspectRatio="none">
        {/* Grille horizontale */}
        {[0, 25, 50, 75, 100].map((val, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={padding.top + chartHeight - (val / maxValue) * chartHeight}
              x2={dimensions.width - padding.right}
              y2={padding.top + chartHeight - (val / maxValue) * chartHeight}
              stroke="rgba(31, 90, 51, 0.06)"
              strokeWidth="1"
              strokeDasharray="3"
            />
            <text
              x={padding.left - 6}
              y={padding.top + chartHeight - (val / maxValue) * chartHeight + 3}
              fill="rgba(31, 90, 51, 0.35)"
              fontSize="8"
              fontFamily="Poppins"
              textAnchor="end"
            >
              {val}
            </text>
          </g>
        ))}
        
        {/* Zone sous la courbe */}
        <path d={areaPath} fill="rgba(31, 90, 51, 0.06)" />
        
        {/* Courbe principale */}
        <path
          d={linePath}
          fill="none"
          stroke="rgba(31, 90, 51, 0.75)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Points sur la courbe */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill={i === points.length - 1 ? 'rgba(31, 90, 51, 0.9)' : 'rgba(31, 90, 51, 0.7)'}
            stroke="#fff"
            strokeWidth="1.5"
          />
        ))}
        
        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          stroke="rgba(31, 90, 51, 0.2)"
          strokeWidth="1"
        />
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={dimensions.width - padding.right}
          y2={padding.top + chartHeight}
          stroke="rgba(31, 90, 51, 0.2)"
          strokeWidth="1"
        />
        
        {/* Labels Axe X */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={padding.top + chartHeight + 16}
            fill="rgba(31, 90, 51, 0.35)"
            fontSize="7.5"
            fontFamily="Poppins"
            textAnchor="middle"
          >
            {p.month}
          </text>
        ))}
        
        {/* Titre de l'axe Y */}
        <text
          x={10}
          y={padding.top + chartHeight / 2}
          fill="rgba(31, 90, 51, 0.5)"
          fontSize="8"
          fontFamily="Poppins"
          textAnchor="middle"
          transform={`rotate(-90, 10, ${padding.top + chartHeight / 2})`}
        >
          %
        </text>
      </ChartSvg>
    </ChartContainer>
  );
};

const ChartLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(31, 90, 51, 0.1);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  color: #5a6d62;
`;

const LegendDot = styled.span<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: ${({ $color }) => $color};
`;

const LegendLine = styled.span<{ $color: string }>`
  width: 20px;
  height: 3px;
  border-radius: 2px;
  background: ${({ $color }) => $color};
`;

const Table = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.2rem;
  border-radius: 14px;
  background: rgba(31, 90, 51, 0.04);
  border: 1px solid rgba(31, 90, 51, 0.08);
  transition: all 0.2s;

  &:hover {
    background: rgba(31, 90, 51, 0.08);
    border-color: rgba(31, 90, 51, 0.15);
  }
`;

const RowTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1a2e20;
  font-size: 1rem;
`;

const RowMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  font-size: 0.85rem;
`;

const Tag = styled.span<{ $tone: 'success' | 'pending' | 'info' }>`
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $tone }) => $tone === 'success' ? '#1f5a33' : $tone === 'info' ? '#1e40af' : '#8a5a10'};
  background: ${({ $tone }) => $tone === 'success' ? 'rgba(31, 90, 51, 0.12)' : $tone === 'info' ? 'rgba(30, 64, 175, 0.1)' : 'rgba(138, 90, 16, 0.12)'};
  border: 1px solid ${({ $tone }) => $tone === 'success' ? 'rgba(31, 90, 51, 0.2)' : $tone === 'info' ? 'rgba(30, 64, 175, 0.2)' : 'rgba(138, 90, 16, 0.2)'};
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1.1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.65), rgba(31, 90, 51, 0.5));
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(31, 90, 51, 0.4);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(31, 90, 51, 0.3);
  }
`;

const SecondaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1.1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.25);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: rgba(31, 90, 51, 0.08);
  }
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StatusDot = styled.span<{ $color: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  margin-right: 0.5rem;
`;

const AdminDashboard = () => {
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
      title="Console de programmation"
      subtitle="Pilotage des elections et gestion des scrutins."
      navItems={navItems}
      actions={
        <>
          <SecondaryButton to="/admin/candidats">Gerer candidats</SecondaryButton>
          <ActionButton to="/admin/election/create">Nouvelle election</ActionButton>
        </>
      }
    >
      <LayoutGrid>
        <MainColumn>
          <Greeting>
            <div>
              <Hello>Bonjour, Awa Ndiaye</Hello>
              <HelperText>Voici l'activite des scrutins programs aujourd'hui.</HelperText>
            </div>
            <Filter>
              <option>Mensuel</option>
              <option>Trimestriel</option>
              <option>Annuel</option>
            </Filter>
          </Greeting>

          <Stats>
            <StatCard $accent="rgba(31, 90, 51, 0.7)">
              <StatLabel>
                <StatusDot $color="rgba(31, 90, 51, 0.7)" />
                Scrutins actifs
              </StatLabel>
              <StatValue>4</StatValue>
            </StatCard>
            <StatCard $accent="rgba(31, 90, 51, 0.7)">
              <StatLabel>Taux de participation</StatLabel>
              <StatValue>61%</StatValue>
            </StatCard>
            <StatCard $accent="rgba(138, 90, 16, 0.7)">
              <StatLabel>Alertes en cours</StatLabel>
              <StatValue>18</StatValue>
            </StatCard>
            <StatCard $accent="rgba(107, 111, 114, 0.7)">
              <StatLabel>Rapports publies</StatLabel>
              <StatValue>12</StatValue>
            </StatCard>
          </Stats>

          <Card>
            <HeaderSection>
              <CardTitle>Activite recente</CardTitle>
              <ActionButton to="/admin/statistiques">Exporter</ActionButton>
            </HeaderSection>
            <ReportChart>
              <ParticipationChart />
              <ChartLegend>
                <LegendItem>
                  <LegendLine $color="rgba(31, 90, 51, 0.7)" />
                  <span>Taux de participation (%)</span>
                </LegendItem>
                <LegendItem>
                  <LegendDot $color="rgba(31, 90, 51, 0.9)" />
                  <span>Derniere valeur</span>
                </LegendItem>
              </ChartLegend>
            </ReportChart>
          </Card>

          <Card>
            <HeaderSection>
              <CardTitle>Scrutins programs</CardTitle>
              <ActionRow>
                <SecondaryButton to="/admin/candidats">Voir candidats</SecondaryButton>
                <ActionButton to="/admin/election/create">Creer election</ActionButton>
              </ActionRow>
            </HeaderSection>
            <Table>
              <Row>
                <div>
                  <RowTitle>Presidentielle 2025</RowTitle>
                  <RowMeta>Debut le 08/03/2025 — Fin le 12/03/2025</RowMeta>
                </div>
                <RowMeta>Region nationale</RowMeta>
                <Tag $tone="success">En cours</Tag>
              </Row>
              <Row>
                <div>
                  <RowTitle>Legislatives Dakar</RowTitle>
                  <RowMeta>Debut le 20/03/2025 — Fin le 22/03/2025</RowMeta>
                </div>
                <RowMeta>Dakar</RowMeta>
                <Tag $tone="info">Programmee</Tag>
              </Row>
              <Row>
                <div>
                  <RowTitle>Municipales Pikine</RowTitle>
                  <RowMeta>Cloturee le 02/02/2025</RowMeta>
                </div>
                <RowMeta>Pikine</RowMeta>
                <Tag $tone="pending">Cloturee</Tag>
              </Row>
            </Table>
          </Card>
        </MainColumn>
      </LayoutGrid>
    </AppLayout>
  );
};

export default AdminDashboard;
