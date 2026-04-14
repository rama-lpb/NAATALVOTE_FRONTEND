import styled from 'styled-components';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';
import { useAppSelector } from '../store/hooks';

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
  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
  }
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
  @media (max-width: 720px) {
    width: 100%;
  }
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
  flex-wrap: wrap;
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

const SecurityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SecurityNote = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  color: #6b7a72;
  line-height: 1.5;
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

const EmptyState = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.1);
  display: grid;
  gap: 0.8rem;
  text-align: center;
`;

const EmptyTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a2e20;
`;

const EmptySub = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  color: #6b7a72;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.3rem;
`;

const PrimaryLink = styled(Link)`
  text-decoration: none;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.65), rgba(31, 90, 51, 0.5));
  border: 1px solid rgba(31, 90, 51, 0.25);
  border-radius: 12px;
  padding: 0.7rem 1.1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
`;

const SecondaryLink = styled(Link)`
  text-decoration: none;
  background: rgba(31, 90, 51, 0.07);
  border: 1px solid rgba(31, 90, 51, 0.16);
  border-radius: 12px;
  padding: 0.7rem 1.1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(31, 90, 51, 0.85);
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
  const [otpMessage, setOtpMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const sessionUser = useAppSelector((s) => s.auth.user);
  const currentRole = useAppSelector((s) => s.auth.currentRole);

  const userData = useMemo<UserData | null>(() => {
    if (!sessionUser) return null;
    return {
      id: sessionUser.id,
      nom: sessionUser.nom,
      prenom: sessionUser.prenom,
      email: sessionUser.email,
      roles: sessionUser.roles,
      currentRole: currentRole ?? sessionUser.roles[0] ?? 'CITOYEN',
    };
  }, [sessionUser, currentRole]);

  const user = userData ?? null;

  const handleRegenerateOtp = async () => {
    if (isRegenerating) return;
    setOtpMessage('');
    setIsSuccess(false);

    const result = await Swal.fire({
      icon: 'warning',
      title: 'Régénérer le code OTP ?',
      text: 'Un nouveau code OTP sera généré. Utilisez-le pour vos prochaines validations.',
      showCancelButton: true,
      confirmButtonText: 'Régénérer',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: {
        popup: 'naatal-swal',
        confirmButton: 'swal-confirm',
        cancelButton: 'swal-cancel',
      },
    });
    if (!result.isConfirmed) return;

    setIsRegenerating(true);
    const regeneratedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(regeneratedOtp);
      }
    } catch {
      // Ignore clipboard errors (permissions, insecure context, etc.)
    }

    await Swal.fire({
      icon: 'success',
      title: 'Nouveau code OTP',
      html: `<div style="font-family:Poppins,Arial,Helvetica,sans-serif;color:#22312a;font-size:1.1rem;font-weight:700;letter-spacing:0.22rem;text-align:center;padding:0.4rem 0;">${regeneratedOtp}</div><div style="font-family:Poppins,Arial,Helvetica,sans-serif;color:#6b7a72;font-size:0.9rem;text-align:center;">(Copié si autorisé par le navigateur)</div>`,
      confirmButtonText: 'OK',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
    });

    setOtpMessage('Un nouveau code OTP a été généré.');
    setIsSuccess(true);
    setIsRegenerating(false);
  };

  // Formatage du nom complet
  const fullName = user ? `${user.prenom || ''} ${user.nom || ''}`.trim() : '';
  const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  // Formatage du téléphone
  const phone = user?.telephones && user.telephones.length > 0 ? user.telephones[0] : '';
  
  // Formatage de la date de naissance
  const birthDate = useMemo(() => {
    if (!user?.date_naissance) return '';
    const d = new Date(user.date_naissance);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }, [user]);

  if (!userData) {
    return (
      <AppLayout
        role="Citoyen"
        title="Mon profil"
        subtitle="Informations personnelles et paramètres de sécurité."
        navItems={navItems}
      >
        <ProfileContainer>
          <EmptyState>
            <EmptyTitle>Session expirée</EmptyTitle>
            <EmptySub>Reconnectez-vous pour accéder à votre profil citoyen.</EmptySub>
            <ActionRow>
              <PrimaryLink to="/login">Se connecter</PrimaryLink>
              <SecondaryLink to="/">Accueil</SecondaryLink>
            </ActionRow>
          </EmptyState>
        </ProfileContainer>
      </AppLayout>
    );
  }

  const isCitizenSession =
    (userData.currentRole || '').toUpperCase() === 'CITOYEN' ||
    (userData.roles || []).some((r) => String(r).toUpperCase() === 'CITOYEN');

  if (!isCitizenSession) {
    return (
      <AppLayout
        role="Citoyen"
        title="Mon profil"
        subtitle="Informations personnelles et paramètres de sécurité."
        navItems={navItems}
      >
        <ProfileContainer>
          <EmptyState>
            <EmptyTitle>Rôle incorrect</EmptyTitle>
            <EmptySub>Vous n’êtes pas connecté en tant que citoyen.</EmptySub>
            <ActionRow>
              <PrimaryLink to="/portal">Changer de rôle</PrimaryLink>
              <SecondaryLink to="/login">Se reconnecter</SecondaryLink>
            </ActionRow>
          </EmptyState>
        </ProfileContainer>
      </AppLayout>
    );
  }

  if (!user) {
    return (
      <AppLayout
        role="Citoyen"
        title="Mon profil"
        subtitle="Informations personnelles et paramètres de sécurité."
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
      subtitle="Informations personnelles et paramètres de sécurité."
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
                <UserMeta>Citoyen — Sénégal</UserMeta>
                <StatusBadge $active={true} style={{ marginTop: '0.5rem' }}>
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
              Code OTP
            </SectionTitle>
          </HeaderWithIcon>

          <SecurityContainer>
            <SecurityNote>
              Votre code OTP est régénéré à la demande. Pour des raisons de sécurité, il n’est pas modifiable manuellement.
            </SecurityNote>
            <div>
              <OTPButton type="button" onClick={handleRegenerateOtp} disabled={isRegenerating}>
                <i className="bi bi-arrow-repeat" style={{ marginRight: '0.4rem' }} />
                {isRegenerating ? 'Génération…' : 'Régénérer un OTP'}
              </OTPButton>
            </div>
            {otpMessage && (
              <OTPMessage $success={isSuccess}>
                <i className={`bi ${isSuccess ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`} />
                {otpMessage}
              </OTPMessage>
            )}
          </SecurityContainer>
        </ProfileCard>
      </ProfileContainer>
    </AppLayout>
  );
};

export default CitizenProfile;
