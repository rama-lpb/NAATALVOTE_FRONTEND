import styled from 'styled-components';

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.88);
  border-radius: 18px;
  padding: 1rem 1.2rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

export const CardTitle = styled.h3`
  margin: 0 0 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1f5a33;
  font-size: 1.1rem;
`;

const DonutWrap = styled.div`
  display: grid;
  place-items: center;
  margin: 0 auto;
`;

const DonutLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  color: #1f5a33;
  margin-top: -0.4rem;
`;

export const DonutChart = ({
  percent,
  label,
  color = '#1f5a33',
}: {
  percent: number;
  label: string;
  color?: string;
}) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <DonutWrap>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} stroke="rgba(31, 90, 51, 0.15)" strokeWidth="14" fill="none" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke={color}
          strokeWidth="14"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
        />
        <text x="70" y="78" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1f5a33">
          {label}
        </text>
      </svg>
      <DonutLabel>Progression</DonutLabel>
    </DonutWrap>
  );
};

const Bars = styled.div`
  display: grid;
  gap: 0.6rem;
`;

const BarRow = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr 40px;
  align-items: center;
  gap: 0.6rem;
`;

const BarLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #2f4d3b;
  font-size: 0.85rem;
`;

const BarTrack = styled.div<{ $value: number; $color: string }>`
  height: 10px;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  position: relative;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: ${({ $value }) => $value}%;
    background: ${({ $color }) => $color};
    border-radius: 999px;
  }
`;

const BarValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1f5a33;
  font-size: 0.85rem;
`;

export const BarChart = ({
  data,
}: {
  data: { label: string; value: number; color?: string }[];
}) => (
  <Bars>
    {data.map((row) => (
      <BarRow key={row.label}>
        <BarLabel>{row.label}</BarLabel>
        <BarTrack $value={row.value} $color={row.color || '#1f5a33'} />
        <BarValue>{row.value}%</BarValue>
      </BarRow>
    ))}
  </Bars>
);
