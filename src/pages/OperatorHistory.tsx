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

const FilterChips = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Chip = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.5)' : 'rgba(31, 90, 51, 0.18)'};
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(31, 90, 51, 0.06)'};
  color: ${({ $active }) => $active ? '#fff' : 'rgba(31, 90, 51, 0.8)'};
  border-radius: 999px;
  padding: 0.3rem 0.75rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
`;

const ExportBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border-radius: 10px;
  border: 1px solid rgba(31, 90, 51, 0.2);
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.14); }
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 0.7rem;
`;

const TimelineRow = styled.div`
  display: grid;
  grid-template-columns: 8px 120px 1fr auto;
  align-items: start;
  gap: 0.9rem;
  padding: 0.9rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.08);
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 4px 14px rgba(12, 24, 18, 0.08); }
`;

const Dot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  margin-top: 0.45rem;
  flex-shrink: 0;
`;

const TimeCol = styled.div`
  display: grid;
  gap: 0.1rem;
`;

const TimeDate = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #4a5a50;
`;

const TimeHour = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  color: #8a9a90;
`;

const HistoryContent = styled.div``;

const ActionType = styled.div<{ $color: string }>`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${({ $color }) => $color};
  margin-bottom: 0.2rem;
`;

const HistoryText = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.87rem;
  color: #2a3a2f;
  line-height: 1.4;
`;

const HistoryMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  color: #8a9a90;
  margin-top: 0.2rem;
`;

const StatusPill = styled.span<{ $tone: string }>`
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  align-self: start;
  background: ${({ $tone }) => $tone === 'resolved' ? 'rgba(31, 90, 51, 0.1)' : $tone === 'pending' ? 'rgba(138, 90, 16, 0.1)' : 'rgba(176, 58, 46, 0.1)'};
  color: ${({ $tone }) => $tone === 'resolved' ? 'rgba(31, 90, 51, 0.85)' : $tone === 'pending' ? 'rgba(138, 90, 16, 0.85)' : 'rgba(176, 58, 46, 0.85)'};
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  padding-top: 0.4rem;
`;

const PageBtn = styled.button<{ $active?: boolean }>`
  border: 1px solid rgba(31, 90, 51, 0.2);
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(31, 90, 51, 0.06)'};
  color: ${({ $active }) => $active ? '#fff' : 'rgba(31, 90, 51, 0.85)'};
  border-radius: 8px;
  padding: 0.28rem 0.6rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
`;

const navItems = [
  { label: 'Alertes fraude', to: '/operateur/alerts' },
  { label: 'Historique', to: '/operateur/historique' },
  { label: 'Rapports', to: '/operateur/rapports' },
  { label: 'Detail alerte', to: '/operateur/alerts/detail' },
  { label: 'Recommandation', to: '/operateur/recommandation' },
];

type ActionCategory = 'all' | 'ANALYSE' | 'SUSPENSION' | 'REJET' | 'MARQUAGE';

const history = [
  { id: 1, date: '09/03/2026', hour: '11:42', type: 'ANALYSE' as const, text: 'Alerte IP suspecte (41.220.0.12) analysee — Fraude confirmee.', meta: 'Election Presidentielle 2025 · Alerte #ALT-112', outcome: 'resolved' as const },
  { id: 2, date: '09/03/2026', hour: '10:15', type: 'SUSPENSION' as const, text: 'Recommandation de suspension envoyee au SuperAdmin pour CNI 2349.', meta: 'Motif: vote multiple confirme', outcome: 'pending' as const },
  { id: 3, date: '08/03/2026', hour: '16:55', type: 'REJET' as const, text: 'Fausse alerte — Pattern suspect region Est classe sans suite.', meta: 'Election Municipales · Alerte #ALT-108', outcome: 'resolved' as const },
  { id: 4, date: '08/03/2026', hour: '14:22', type: 'MARQUAGE' as const, text: 'Compte CNI 8841 marque comme suspect pour surveillance renforcee.', meta: 'Election Legislatives Dakar', outcome: 'pending' as const },
  { id: 5, date: '07/03/2026', hour: '09:05', type: 'ANALYSE' as const, text: 'Analyse alerte vote multiple bloque — CNI 7712.', meta: 'Election Presidentielle 2025 · Alerte #ALT-99', outcome: 'resolved' as const },
  { id: 6, date: '07/03/2026', hour: '08:30', type: 'REJET' as const, text: 'Tentative de connexion anormale — Dossier ferme.', meta: 'Pas d\'election associee', outcome: 'resolved' as const },
];

const typeColors: Record<string, string> = {
  ANALYSE: 'rgba(38, 76, 140, 0.85)',
  SUSPENSION: 'rgba(176, 58, 46, 0.85)',
  REJET: 'rgba(91, 95, 101, 0.8)',
  MARQUAGE: 'rgba(138, 90, 16, 0.85)',
};

const dotColors: Record<string, string> = {
  ANALYSE: 'rgba(38, 76, 140, 0.7)',
  SUSPENSION: 'rgba(176, 58, 46, 0.7)',
  REJET: 'rgba(91, 95, 101, 0.6)',
  MARQUAGE: 'rgba(138, 90, 16, 0.7)',
};

const filters: { id: ActionCategory; label: string }[] = [
  { id: 'all', label: 'Toutes' },
  { id: 'ANALYSE', label: 'Analyses' },
  { id: 'SUSPENSION', label: 'Suspensions' },
  { id: 'REJET', label: 'Rejets' },
  { id: 'MARQUAGE', label: 'Marquages' },
];

const OperatorHistory = () => {
  const [filter, setFilter] = useState<ActionCategory>('all');

  const filtered = history.filter((h) => filter === 'all' || h.type === filter);

  return (
    <AppLayout
      role="Operateur de securite"
      title="Historique des actions"
      subtitle="Traçabilite complete de toutes vos analyses et recommandations."
      navItems={navItems}
    >
      <LayoutGrid>
        <TopBar>
          <FilterChips>
            {filters.map((f) => (
              <Chip key={f.id} $active={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
              </Chip>
            ))}
          </FilterChips>
          <ExportBtn><i className="bi bi-download" />Exporter</ExportBtn>
        </TopBar>

        <Panel>
          {filtered.map((h) => (
            <TimelineRow key={h.id}>
              <Dot $color={dotColors[h.type]} />
              <TimeCol>
                <TimeDate>{h.date}</TimeDate>
                <TimeHour>{h.hour}</TimeHour>
              </TimeCol>
              <HistoryContent>
                <ActionType $color={typeColors[h.type]}>{h.type}</ActionType>
                <HistoryText>{h.text}</HistoryText>
                <HistoryMeta>{h.meta}</HistoryMeta>
              </HistoryContent>
              <StatusPill $tone={h.outcome}>
                {h.outcome === 'resolved' ? 'Traite' : 'En cours'}
              </StatusPill>
            </TimelineRow>
          ))}

          <Pagination>
            <PageBtn>‹</PageBtn>
            <PageBtn $active>1</PageBtn>
            <PageBtn>2</PageBtn>
            <PageBtn>3</PageBtn>
            <PageBtn>›</PageBtn>
          </Pagination>
        </Panel>
      </LayoutGrid>
    </AppLayout>
  );
};

export default OperatorHistory;
