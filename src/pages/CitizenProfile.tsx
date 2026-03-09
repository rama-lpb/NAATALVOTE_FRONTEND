import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.2rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const LeftCol = styled.div`
  display: grid;
  gap: 1.2rem;
  align-content: start;
`;

const RightCol = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const AvatarCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.8rem 1.4rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
`;

const AvatarCircle = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.85), rgba(31, 90, 51, 0.55));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 800;
  font-size: 2rem;
  color: #fff;
  box-shadow: 0 6px 20px rgba(31, 90, 51, 0.3);
`;

const UserName = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a2e20;
`;

const UserRole = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #6b7a72;
`;

const StatusBadge = styled.div<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.12)' : 'rgba(176, 58, 46, 0.1)'};
  color: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.9)' : 'rgba(176, 58, 46, 0.9)'};
  border: 1px solid ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.25)' : 'rgba(176, 58, 46, 0.2)'};
`;

const AvatarDivider = styled.div`
  height: 1px;
  width: 100%;
  background: rgba(31, 90, 51, 0.1);
`;

const SecurityCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.2rem 1.4rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 0.8rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #22312a;
`;

const SecurityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.6rem 0.8rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.04);
  border: 1px solid rgba(31, 90, 51, 0.08);
`;

const SecurityLabel = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #4a6d5a;
  display: flex;
  align-items: center;
  gap: 0.45rem;
`;

const SecurityStatus = styled.span<{ $ok: boolean }>`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ $ok }) => $ok ? 'rgba(31, 90, 51, 0.85)' : 'rgba(138, 90, 16, 0.85)'};
  background: ${({ $ok }) => $ok ? 'rgba(31, 90, 51, 0.1)' : 'rgba(138, 90, 16, 0.1)'};
  padding: 0.2rem 0.55rem;
  border-radius: 8px;
`;

const InfoPanel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 0.8rem;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.2rem;
`;

const EditButton = styled.button`
  background: rgba(31, 90, 51, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 10px;
  padding: 0.35rem 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: rgba(31, 90, 51, 0.85);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 500;
  transition: background 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.14); }
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 0.6rem;
  align-items: start;
  padding: 0.7rem 0.8rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(31, 90, 51, 0.09);
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const InfoLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(31, 90, 51, 0.65);
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const InfoValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  color: #22312a;
  font-weight: 500;
`;

const VoteHistoryPanel = styled(InfoPanel)``;

const VoteHistoryRow = styled.div<{ $status: 'voted' | 'active' | 'upcoming' }>`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 0.8rem;
  align-items: center;
  padding: 0.8rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid ${({ $status }) =>
    $status === 'voted' ? 'rgba(31, 90, 51, 0.18)' :
    $status === 'active' ? 'rgba(138, 90, 16, 0.18)' :
    'rgba(91, 95, 101, 0.12)'};
`;

const VoteTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: #1a2e20;
`;

const VoteMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  color: #8a9a90;
  margin-top: 0.1rem;
`;

const VoteTag = styled.span<{ $status: 'voted' | 'active' | 'upcoming' }>`
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ $status }) =>
    $status === 'voted' ? 'rgba(31, 90, 51, 0.9)' :
    $status === 'active' ? 'rgba(138, 90, 16, 0.9)' :
    'rgba(91, 95, 101, 0.7)'};
  background: ${({ $status }) =>
    $status === 'voted' ? 'rgba(31, 90, 51, 0.1)' :
    $status === 'active' ? 'rgba(138, 90, 16, 0.1)' :
    'rgba(91, 95, 101, 0.08)'};
`;

const navItems = [
  { label: 'Tableau de bord', to: '/citoyen/dashboard' },
  { label: 'Elections', to: '/citoyen/elections' },
  { label: 'Candidats', to: '/citoyen/candidats' },
  { label: 'Vote securise', to: '/citoyen/vote' },
  { label: 'Resultats temps reel', to: '/citoyen/resultats' },
  { label: 'Profil', to: '/citoyen/profil' },
];

const history = [
  { title: 'Presidentielle 2025', meta: 'En cours — cloture le 12/03/2026', status: 'voted' as const },
  { title: 'Legislatives Dakar', meta: 'Debut le 20/03/2026', status: 'active' as const },
  { title: 'Municipales Pikine', meta: 'Cloturee le 02/02/2026', status: 'voted' as const },
  { title: 'Regionales Thies', meta: 'Cloturee le 15/11/2025', status: 'voted' as const },
];

const CitizenProfile = () => {
  return (
    <AppLayout
      role="Citoyen"
      title="Mon profil"
      subtitle="Informations personnelles, securite et historique electoral."
      navItems={navItems}
    >
      <LayoutGrid>
        <LeftCol>
          <AvatarCard>
            <AvatarCircle>AF</AvatarCircle>
            <div>
              <UserName>Aicha Fall</UserName>
              <UserRole>Citoyenne — Senegal</UserRole>
            </div>
            <StatusBadge $active>
              <i className="bi bi-check-circle-fill" />
              Eligible — Compte actif
            </StatusBadge>
            <AvatarDivider />
            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.3rem', color: '#1a2e20' }}>3</div>
                <div style={{ fontFamily: 'Poppins', fontSize: '0.75rem', color: '#8a9a90' }}>Votes effectues</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.3rem', color: '#1a2e20' }}>100%</div>
                <div style={{ fontFamily: 'Poppins', fontSize: '0.75rem', color: '#8a9a90' }}>Participation</div>
              </div>
            </div>
          </AvatarCard>

          <SecurityCard>
            <CardTitle><i className="bi bi-shield-lock" /> Securite</CardTitle>
            <SecurityItem>
              <SecurityLabel><i className="bi bi-phone" />OTP SMS</SecurityLabel>
              <SecurityStatus $ok>Actif</SecurityStatus>
            </SecurityItem>
            <SecurityItem>
              <SecurityLabel><i className="bi bi-clock" />Session</SecurityLabel>
              <SecurityStatus $ok>30 min</SecurityStatus>
            </SecurityItem>
            <SecurityItem>
              <SecurityLabel><i className="bi bi-calendar-check" />Derniere connexion</SecurityLabel>
              <SecurityStatus $ok>Auj. 09:14</SecurityStatus>
            </SecurityItem>
          </SecurityCard>
        </LeftCol>

        <RightCol>
          <InfoPanel>
            <PanelHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <EditButton><i className="bi bi-pencil" />Modifier</EditButton>
            </PanelHeader>
            <InfoRow>
              <InfoLabel><i className="bi bi-person" />Nom complet</InfoLabel>
              <InfoValue>Aicha Fall</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel><i className="bi bi-credit-card-2-front" />Numero CNI</InfoLabel>
              <InfoValue>SN-2349-8891</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel><i className="bi bi-telephone" />Telephone</InfoLabel>
              <InfoValue>+221 77 000 00 00</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel><i className="bi bi-geo-alt" />Adresse</InfoLabel>
              <InfoValue>Medina, Dakar, Senegal</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel><i className="bi bi-calendar" />Date de naissance</InfoLabel>
              <InfoValue>14 Mars 1988</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel><i className="bi bi-envelope" />Email</InfoLabel>
              <InfoValue>aicha.fall@email.sn</InfoValue>
            </InfoRow>
          </InfoPanel>

          <VoteHistoryPanel>
            <PanelHeader>
              <CardTitle>Historique electoral</CardTitle>
            </PanelHeader>
            {history.map((h) => (
              <VoteHistoryRow key={h.title} $status={h.status}>
                <div>
                  <VoteTitle>{h.title}</VoteTitle>
                  <VoteMeta>{h.meta}</VoteMeta>
                </div>
                <VoteTag $status={h.status}>
                  {h.status === 'voted' ? 'Vote' : h.status === 'active' ? 'A venir' : 'Upcoming'}
                </VoteTag>
                {h.status === 'voted' && (
                  <i className="bi bi-check-circle-fill" style={{ color: 'rgba(31, 90, 51, 0.7)', fontSize: '1.1rem' }} />
                )}
              </VoteHistoryRow>
            ))}
          </VoteHistoryPanel>
        </RightCol>
      </LayoutGrid>
    </AppLayout>
  );
};

export default CitizenProfile;
