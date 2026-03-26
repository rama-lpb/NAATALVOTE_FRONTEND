import styled from 'styled-components';
import { useState, useMemo } from 'react';
import { AppLayout } from '../components/AppLayout';
import { data } from '../data/mockData';

interface UserData {
  id: string;
  cni?: string;
  nom: string;
  prenom: string;
  email: string;
  telephones?: string[];
  date_naissance?: string;
  adresse?: string;
  roles: string[];
  currentRole: string;
}

const ProfileContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProfileCard = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(31, 90, 51, 0.1);
`;

const AvatarCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.85), rgba(31, 90, 51, 0.55));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
  color: #fff;
  box-shadow: 0 4px 15px rgba(31, 90, 51, 0.25);
  flex-shrink: 0;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const UserInfo = styled.div``;

const UserName = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a2e20;
`;

const UserMeta = styled.p`
  margin: 0.3rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  color: #6b7a72;
`;

const StatusBadge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.12)' : 'rgba(176, 58, 46, 0.1)'};
  color: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.9)' : 'rgba(176, 58, 46, 0.9)'};
  border: 1px solid ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.25)' : 'rgba(176, 58, 46, 0.2)'};
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StatBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  background: rgba(31, 90, 51, 0.06);
  border-radius: 10px;
  border: 1px solid rgba(31, 90, 51, 0.1);
`;

const StatIcon = styled.span`
  font-size: 1rem;
  color: rgba(31, 90, 51, 0.7);
`;

const StatText = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a2e20;
  line-height: 1;
`;

const StatLabel = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.65rem;
  color: #8a9a90;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #22312a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div``;

const InfoLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(31, 90, 51, 0.6);
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  color: #22312a;
  font-weight: 500;
`;

const OTPContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OTPLine = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
`;

const OTPField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
  min-width: 200px;
`;

const OTPLabel = styled.label`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #4a6d5a;
`;

const OTPInput = styled.input`
  border: 1px solid rgba(31, 90, 51, 0.25);
  border-radius: 12px;
  padding: 0.7rem 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.95);
  color: #22312a;
  width: 100%;
  text-align: center;
  letter-spacing: 0.4rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: rgba(31, 90, 51, 0.6);
    box-shadow: 0 0 0 4px rgba(31, 90, 51, 0.12);
  }

  &::placeholder {
    letter-spacing: normal;
    color: #bbb;
    font-size: 0.9rem;
  }
`;

const OTPButton = styled.button`
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.65), rgba(31, 90, 51, 0.5));
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: none;
  border-radius: 12px;
  padding: 0.7rem 1.5rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: all 0.25s;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(31, 90, 51, 0.35);
    background: linear-gradient(135deg, rgba(31, 90, 51, 0.72), rgba(31, 90, 51, 0.58));
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const OTPMessage = styled.div<{ $success?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  background: ${({ $success }) => $success ? 'rgba(31, 90, 51, 0.12)' : 'rgba(176, 58, 46, 0.1)'};
  color: ${({ $success }) => $success ? 'rgba(31, 90, 51, 0.9)' : 'rgba(176, 58, 46, 0.9)'};
  border: 1px solid ${({ $success }) => $success ? 'rgba(31, 90, 51, 0.2)' : 'rgba(176, 58, 46, 0.15)'};
`;

const SecurityIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.15), rgba(31, 90, 51, 0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: rgba(31, 90, 51, 0.8);
`;

const HeaderWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
`;

const LoadingText = styled.p`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  color: #6b7a72;
  text-align: center;
  padding: 2rem;
`;

const navItems = [
  { label: 'Tableau de bord', to: '/citoyen/dashboard' },
  { label: 'Elections', to: '/citoyen/elections' },
  { label: 'Candidats', to: '/citoyen/candidats' },
  { label: 'Vote securise', to: '/citoyen/vote' },
  { label: 'Resultats temps reel', to: '/citoyen/resultats' },
  { label: 'Profil', to: '/citoyen/profil' },
];

const CitizenProfile = () => {
  const [currentOtp, setCurrentOtp] = useState('');
  const [newOtp, setNewOtp] = useState('');
  const [otpMessage, setOtpMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Récupérer les données utilisateur depuis sessionStorage
  const userData = useMemo(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser) as UserData;
      } catch (e) {
        console.error('Erreur parsing user:', e);
      }
    }
    return null;
  }, []);

  // Si pas de session, utiliser les données mockées (pour démo)
  const user = useMemo(() => {
    if (userData && userData.id) {
      // Essayer de trouver l'utilisateur complet dans les mock data
      const mockUser = data.users.find(u => u.id === userData.id);
      if (mockUser) {
        return {
          ...userData,
          cni: mockUser.cni,
          telephones: mockUser.telephones,
          date_naissance: mockUser.date_naissance,
          adresse: mockUser.adresse
        };
      }
      return userData;
    }
    return null;
  }, [userData]);

  const handleCurrentOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCurrentOtp(value);
    setOtpMessage('');
  };

  const handleNewOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setNewOtp(value);
    setOtpMessage('');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentOtp.length !== 6) {
      setOtpMessage('Veuillez saisir votre code OTP actuel (6 chiffres)');
      setIsSuccess(false);
      return;
    }
    if (newOtp.length !== 6) {
      setOtpMessage('Veuillez saisir le nouveau code OTP (6 chiffres)');
      setIsSuccess(false);
      return;
    }
    if (currentOtp === newOtp) {
      setOtpMessage('Le nouveau code doit etre different de l\'actuel');
      setIsSuccess(false);
      return;
    }
    setOtpMessage('Code OTP modifie avec succes!');
    setIsSuccess(true);
    setCurrentOtp('');
    setNewOtp('');
  };

  // Formatage du nom complet
  const fullName = user ? `${user.prenom || ''} ${user.nom || ''}`.trim() : '';
  const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  // Formatage du téléphone
  const phone = user?.telephones && user.telephones.length > 0 ? user.telephones[0] : '';
  
  // Formatage de la date de naissance
  const birthDate = user?.date_naissance ? new Date(user.date_naissance).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : '';

  if (!user) {
    return (
      <AppLayout
        role="Citoyen"
        title="Mon profil"
        subtitle="Informations personnelles et parametres de securite."
        navItems={navItems}
      >
        <LoadingText>Chargement des informations...</LoadingText>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      role="Citoyen"
      title="Mon profil"
      subtitle="Informations personnelles et parametres de securite."
      navItems={navItems}
    >
      <ProfileContainer>
        {/* En-tête du profil */}
        <ProfileCard>
          <ProfileHeader>
            <AvatarCircle>{initials || 'U'}</AvatarCircle>
            <HeaderContent>
              <UserInfo>
                <UserName>{fullName || 'Utilisateur'}</UserName>
                <UserMeta>Citoyen — Senegal</UserMeta>
                <StatusBadge $active style={{ marginTop: '0.5rem' }}>
                  Eligible — Compte actif
                </StatusBadge>
              </UserInfo>
              <StatsContainer>
                <StatBox>
                  <StatIcon>✓</StatIcon>
                  <StatText>
                    <StatValue>3</StatValue>
                    <StatLabel>Votes</StatLabel>
                  </StatText>
                </StatBox>
                <StatBox>
                  <StatIcon>%</StatIcon>
                  <StatText>
                    <StatValue>100%</StatValue>
                    <StatLabel>Participation</StatLabel>
                  </StatText>
                </StatBox>
                <StatBox>
                  <StatIcon>→</StatIcon>
                  <StatText>
                    <StatValue>1</StatValue>
                    <StatLabel>A venir</StatLabel>
                  </StatText>
                </StatBox>
              </StatsContainer>
            </HeaderContent>
          </ProfileHeader>

          <SectionTitle>
            <i className="bi bi-person-vcard" /> Informations personnelles
          </SectionTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Nom complet</InfoLabel>
              <InfoValue>{fullName || '-'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Telephone</InfoLabel>
              <InfoValue>{phone || '-'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{user.email || '-'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Numero CNI</InfoLabel>
              <InfoValue>{user.cni || '-'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Adresse</InfoLabel>
              <InfoValue>{user.adresse || '-'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Date de naissance</InfoLabel>
              <InfoValue>{birthDate || '-'}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </ProfileCard>

        {/* Section OTP modernisée */}
        <ProfileCard>
          <HeaderWithIcon>
            <SecurityIcon>
              <i className="bi bi-shield-lock-fill" />
            </SecurityIcon>
            <SectionTitle style={{ margin: 0 }}>
              Modifier le code OTP
            </SectionTitle>
          </HeaderWithIcon>
          
          <form onSubmit={handleOtpSubmit}>
            <OTPContainer>
              <OTPLine>
                <OTPField>
                  <OTPLabel>Code OTP actuel</OTPLabel>
                  <OTPInput
                    type="text"
                    inputMode="numeric"
                    placeholder="------"
                    value={currentOtp}
                    onChange={handleCurrentOtpChange}
                    maxLength={6}
                  />
                </OTPField>
                <OTPField>
                  <OTPLabel>Nouveau code OTP</OTPLabel>
                  <OTPInput
                    type="text"
                    inputMode="numeric"
                    placeholder="------"
                    value={newOtp}
                    onChange={handleNewOtpChange}
                    maxLength={6}
                  />
                </OTPField>
                <OTPButton type="submit">
                  <i className="bi bi-check2-circle" style={{ marginRight: '0.4rem' }} />
                  Confirmer
                </OTPButton>
              </OTPLine>
              {otpMessage && (
                <OTPMessage $success={isSuccess}>
                  <i className={`bi ${isSuccess ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`} />
                  {otpMessage}
                </OTPMessage>
              )}
            </OTPContainer>
          </form>
        </ProfileCard>
      </ProfileContainer>
    </AppLayout>
  );
};

export default CitizenProfile;
