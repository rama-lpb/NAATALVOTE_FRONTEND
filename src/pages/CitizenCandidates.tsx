import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { useState, useEffect } from 'react';
import { api, type ElectionDto, type CandidateDto } from '../services/api';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: 0 16px 30px rgba(12, 24, 18, 0.08);
  display: grid;
  gap: 1rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.9rem;
`;

const SummaryCard = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 10px 20px rgba(12, 24, 18, 0.06);
`;

const SummaryLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.85rem;
`;

const SummaryValue = styled.h3`
  margin: 0.4rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.3rem;
  font-weight: 600;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.2rem;
  font-weight: 500;
`;

const Controls = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
`;

const Select = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  background: rgba(255, 255, 255, 0.85);
  color: #22312a;
  min-width: 200px;
  outline: none;
  cursor: pointer;
  
  &:focus {
    border-color: rgba(31, 90, 51, 0.45);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
  }
`;

const ElectionAccordion = styled.div`
  margin-top: 0.75rem;
  border-radius: 14px;
  border: 1px solid rgba(31, 90, 51, 0.15);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
`;

const AccordionHeader = styled.button<{ $status: 'live' | 'scheduled' | 'closed' }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  background: ${({ $status }) => 
    $status === 'live' ? 'rgba(31, 90, 51, 0.08)' : 
    $status === 'scheduled' ? 'rgba(138, 90, 16, 0.08)' : 
    'rgba(91, 95, 101, 0.05)'};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ $status }) => 
      $status === 'live' ? 'rgba(31, 90, 51, 0.12)' : 
      $status === 'scheduled' ? 'rgba(138, 90, 16, 0.12)' : 
      'rgba(91, 95, 101, 0.08)'};
  }
`;

const ElectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ElectionTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1rem;
  font-weight: 600;
`;

const CandidateCount = styled.span`
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
`;

const StatusBadge = styled.span<{ $status: 'live' | 'scheduled' | 'closed' }>`
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ $status }) =>
    $status === 'live' ? '#1a5a33' : $status === 'scheduled' ? '#8a5a10' : '#5a5f65'};
  background: ${({ $status }) =>
    $status === 'live'
      ? 'rgba(31, 90, 51, 0.12)'
      : $status === 'scheduled'
        ? 'rgba(138, 90, 16, 0.12)'
        : 'rgba(91, 95, 101, 0.1)'};
`;

const ChevronIcon = styled.span<{ $open: boolean }>`
  font-size: 1.2rem;
  color: rgba(31, 90, 51, 0.6);
  transition: transform 0.3s ease;
  transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'rotate(0)'};
`;

const AccordionContent = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => $open ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const CandidateList = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CandidateRow = styled(Link)`
  text-decoration: none;
  display: grid;
  grid-template-columns: 60px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(31, 90, 51, 0.1);
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: rgba(31, 90, 51, 0.25);
    background: rgba(31, 90, 51, 0.04);
    transform: translateX(4px);
  }
`;

const Avatar = styled.div<{ $large?: boolean }>`
  width: ${({ $large }) => $large ? '55px' : '42px'};
  height: ${({ $large }) => $large ? '55px' : '42px'};
  border-radius: 50%;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: ${({ $large }) => $large ? '1.1rem' : '0.9rem'};
  border: 2px solid rgba(31, 90, 51, 0.15);
`;

const CandidateInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CandidateName = styled.h4`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 0.95rem;
  font-weight: 600;
`;

const CandidateParty = styled.p`
  margin: 0.2rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.8rem;
`;

const ViewProfileButton = styled.span`
  padding: 0.35rem 0.7rem;
  border-radius: 8px;
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  white-space: nowrap;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b6f72;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
`;

const CitizenCandidates = () => {
  const navItems = [
    { label: 'Tableau de bord', to: '/citoyen/dashboard' },
    { label: 'Elections', to: '/citoyen/elections' },
    { label: 'Candidats', to: '/citoyen/candidats' },
    { label: 'Vote securise', to: '/citoyen/vote' },
    { label: 'Resultats temps reel', to: '/citoyen/resultats' },
    { label: 'Profil', to: '/citoyen/profil' },
  ];

  const [selectedElection, setSelectedElection] = useState('all');
  const [openElections, setOpenElections] = useState<string[]>([]);
  const [elections, setElections] = useState<ElectionDto[]>([]);
  const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.elections.list(), api.candidats.list()])
      .then(([e, c]) => { setElections(e); setCandidates(c); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      Promise.all([api.elections.list(), api.candidats.list()])
        .then(([e, c]) => {
          setElections(e);
          setCandidates(c);
        })
        .catch(() => {});
    }, 15000);
    return () => window.clearInterval(id);
  }, []);

  const toStatus = (statut: string): 'live' | 'scheduled' | 'closed' => {
    if (statut === 'EN_COURS') return 'live';
    if (statut === 'PROGRAMMEE') return 'scheduled';
    return 'closed';
  };

  const filteredElections = selectedElection === 'all'
    ? elections
    : elections.filter(e => e.id === selectedElection);

  const toggleElection = (electionId: string) => {
    setOpenElections(prev =>
      prev.includes(electionId)
        ? prev.filter(id => id !== electionId)
        : [...prev, electionId]
    );
  };

  const getCandidateCount = (electionId: string) =>
    candidates.filter(c => c.election_id === electionId).length;

  return (
    <AppLayout
      role="Citoyen"
      title="Candidats et programmes"
      subtitle="Consultez les biographies et programmes officiels par election."
      navItems={navItems}
    >
      <Panel>
        <SummaryRow>
          <SummaryCard>
            <SummaryLabel>Total candidats</SummaryLabel>
            <SummaryValue>{loading ? '—' : candidates.length}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Elections actives</SummaryLabel>
            <SummaryValue>{loading ? '—' : elections.filter(e => e.statut === 'EN_COURS').length}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Elections a venir</SummaryLabel>
            <SummaryValue>{loading ? '—' : elections.filter(e => e.statut === 'PROGRAMMEE').length}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Elections cloturees</SummaryLabel>
            <SummaryValue>{loading ? '—' : elections.filter(e => e.statut === 'CLOTUREE').length}</SummaryValue>
          </SummaryCard>
        </SummaryRow>
        <HeaderRow>
          <Title>Liste des candidats</Title>
          <Controls>
            <Select
              value={selectedElection}
              onChange={(e) => setSelectedElection(e.target.value)}
            >
              <option value="all">Toutes les elections</option>
              {elections.map(election => (
                <option key={election.id} value={election.id}>
                  {election.titre}
                </option>
              ))}
            </Select>
          </Controls>
        </HeaderRow>

        {loading ? (
          <EmptyState>Chargement des candidats…</EmptyState>
        ) : filteredElections.length === 0 ? (
          <EmptyState>Aucune election disponible pour le moment.</EmptyState>
        ) : filteredElections.map(election => {
          const status = toStatus(election.statut);
          const electionCandidates = candidates.filter(c => c.election_id === election.id);
          return (
            <ElectionAccordion key={election.id}>
              <AccordionHeader
                $status={status}
                onClick={() => toggleElection(election.id)}
              >
                <ElectionInfo>
                  <ElectionTitle>{election.titre}</ElectionTitle>
                  <CandidateCount>{getCandidateCount(election.id)} candidats</CandidateCount>
                </ElectionInfo>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <StatusBadge $status={status}>
                    {status === 'live' ? 'En cours' : status === 'scheduled' ? 'Programme' : 'Cloture'}
                  </StatusBadge>
                  <ChevronIcon $open={openElections.includes(election.id)}>▼</ChevronIcon>
                </div>
              </AccordionHeader>
              <AccordionContent $open={openElections.includes(election.id)}>
                <CandidateList>
                  {electionCandidates.length === 0 ? (
                    <EmptyState style={{ padding: '1rem' }}>Aucun candidat enregistre.</EmptyState>
                  ) : electionCandidates.map(candidate => {
                    const initials = `${candidate.prenom.charAt(0)}${candidate.nom.charAt(0)}`.toUpperCase();
                    return (
                      <CandidateRow
                        key={candidate.id}
                        to={`/citoyen/candidats/${candidate.id}`}
                      >
                        <Avatar $large>{initials}</Avatar>
                        <CandidateInfo>
                          <CandidateName>{candidate.prenom} {candidate.nom}</CandidateName>
                          <CandidateParty>{candidate.parti_politique}</CandidateParty>
                        </CandidateInfo>
                        <ViewProfileButton>Voir profil →</ViewProfileButton>
                      </CandidateRow>
                    );
                  })}
                </CandidateList>
              </AccordionContent>
            </ElectionAccordion>
          );
        })}
      </Panel>
    </AppLayout>
  );
};

export default CitizenCandidates;
