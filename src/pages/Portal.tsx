import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LogoNaatalVote } from '../assets/LogoNaatalVote';
import { useEffect } from 'react';
import { getRoleDisplayName, getRoleDashboardPath, getRoleColor, type UserRole } from '../auth/roles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout, setCurrentRole } from '../store/authSlice';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Page = styled.main`
  min-height: 100vh;
  background: #f5f7f8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  position: relative;
`;

const Shell = styled.section`
  width: min(1200px, 95vw);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 28px;
  padding: 2.4rem 3rem 3rem;
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Abhaya Libre', 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 2rem;
  color: #1f5a33;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  margin: 0.3rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #335a42;
  font-size: 1.05rem;
`;

const Badge = styled.div`
  padding: 0.45rem 1rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  color: #1f5a33;
  font-weight: 600;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
`;

const Grid = styled.div`
  margin-top: 2.2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.4rem;
`;

const Card = styled.button`
  text-decoration: none;
  color: inherit;
  border-radius: 22px;
  padding: 1.4rem 1.6rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.2);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-height: 200px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${fadeUp} 500ms ease-out;
  backdrop-filter: blur(10px);
  cursor: pointer;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 36px rgba(0, 0, 0, 0.14);
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1f5a33;
  font-size: 1.4rem;
`;

const CardText = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #2d4d3b;
  font-size: 0.98rem;
  line-height: 1.5;
`;

const Pill = styled.span<{ $color: string }>`
  align-self: flex-start;
  padding: 0.3rem 0.7rem;
  background: ${({ $color }) => $color};
  border-radius: 999px;
  font-size: 0.8rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: white;
`;

const UserInfo = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(31, 90, 51, 0.05);
  border-radius: 12px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #335a42;
`;

const LogoutLink = styled.button`
  background: none;
  border: none;
  color: #1f5a33;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.5rem;
  &:hover {
    color: #2d7a4a;
  }
`;

// Role-specific descriptions
const roleDescriptions: Record<UserRole, string> = {
  CITOYEN: 'Consultez les elections, votez une seule fois et suivez les resultats en direct.',
  ADMIN: 'Programmez les elections, ajoutez des candidats et publiez les statistiques avancees.',
  OPERATEUR: 'Analysez les alertes automatiques, marquez les comptes suspects et preparez les rapports.',
  SUPERADMIN: 'Controlez les acces, validez les suspensions et exportez les logs immuables.'
};

const Portal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const handleRoleSelect = (role: UserRole) => {
    if (!user) return;
    dispatch(setCurrentRole(role));
    navigate(getRoleDashboardPath(role));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) {
    return <Page><Shell>Chargement...</Shell></Page>;
  }

  return (
    <Page>
      <Shell>
        <Header>
          <div>
            <Brand>
              <LogoNaatalVote size={80} />
              NATAALVOTE Secure
            </Brand>
            <Subtitle>Choisissez votre espace de travail pour poursuivre en toute securite.</Subtitle>
          </div>
          <Badge>Acces par role</Badge>
        </Header>
        
        <UserInfo>
          <strong>Connecte en tant que:</strong> {user.prenom} {user.nom} ({user.email})
          <br />
          <strong>Roles disponibles:</strong> {user.roles.map(r => getRoleDisplayName(r)).join(', ')}
          <br />
          <LogoutLink onClick={handleLogout}>Se deconnecter</LogoutLink>
        </UserInfo>
        
        <Grid>
          {user.roles.map((role) => (
            <Card 
              key={role} 
              onClick={() => handleRoleSelect(role)}
              style={{ animationDelay: `${user.roles.indexOf(role) * 100}ms` }}
            >
              <Pill $color={getRoleColor(role)}>
                {getRoleDisplayName(role)}
              </Pill>
              <CardTitle>
                {role === 'CITOYEN' && 'Espace Citoyen'}
                {role === 'ADMIN' && 'Console Admin'}
                {role === 'OPERATEUR' && 'Centre de Fraude'}
                {role === 'SUPERADMIN' && 'Supervision Systeme'}
              </CardTitle>
              <CardText>
                {roleDescriptions[role]}
              </CardText>
            </Card>
          ))}
        </Grid>
      </Shell>
    </Page>
  );
};

export default Portal;
