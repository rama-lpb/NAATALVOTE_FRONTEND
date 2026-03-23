import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { type ReactNode, useState } from 'react';
import { LogoNaatalVote } from '../assets/LogoNaatalVote';

interface NavItem {
  label: string;
  to: string;
}

interface AppLayoutProps {
  role: string;
  title: string;
  subtitle?: string;
  navItems: NavItem[];
  actions?: ReactNode;
  children: ReactNode;
}

const Frame = styled.main`
  min-height: 100vh;
  height: 100vh;
  background: #f4f8f4;
  position: relative;
  overflow: hidden;
  color: #0f1b12;
`;

const Shell = styled.section<{ $collapsed: boolean }>`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: ${({ $collapsed }) => ($collapsed ? '86px' : '292px')} 1fr;
  height: 100%;
  gap: 0;
  padding: 0;
  box-sizing: border-box;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside<{ $collapsed: boolean }>`
  background: rgba(255, 255, 255, 0.84);
  border-radius: 0;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  padding: ${({ $collapsed }) => ($collapsed ? '1.2rem 0.75rem' : '1.2rem 1.2rem')};
  gap: 1.2rem;
  min-width: 0;
  height: 100%;
  transition: all 0.3s ease;
  @media (max-width: 1100px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem;
    height: auto;
    border-radius: 0;
  }
  @media (max-width: 768px) {
    overflow-x: auto;
    justify-content: flex-start;
    padding: 0.5rem;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Abhaya Libre', 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: #1f5a33;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  white-space: nowrap;
  line-height: 1.1;
`;

const BrandText = styled.span<{ $collapsed: boolean }>`
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: rgba(31, 90, 51, 0.2);
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  @media (max-width: 1100px) {
    flex-direction: row;
    flex-wrap: wrap;
    order: 3;
  }
  @media (max-width: 768px) {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 0.5rem;
  }
`;

const NavItemLink = styled(Link)<{ $active?: boolean; $collapsed?: boolean }>`
  text-decoration: none;
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  color: ${({ $active }) => ($active ? '#ffffff' : '#2f3b36')};
  background: ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(31, 90, 51, 0.08)')};
  border: 1px solid ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(31, 90, 51, 0.2)')};
  transition: background 0.2s ease, color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.5rem 0.7rem;
  }
  &:hover {
    background: ${({ $active }) => ($active ? 'rgba(31, 90, 51, 0.95)' : 'rgba(31, 90, 51, 0.16)')};
  }
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  .nav-label {
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
    @media (max-width: 1100px) {
      display: inline;
    }
  }
  .nav-icon {
    font-size: 1.05rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const SideFooter = styled.div<{ $collapsed: boolean }>`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (max-width: 1100px) {
    margin-top: 0;
    flex-direction: row;
    flex-wrap: wrap;
    order: 4;
  }
`;

const SideLink = styled(Link)<{ $collapsed?: boolean; $danger?: boolean }>`
  text-decoration: none;
  color: ${({ $danger }) => ($danger ? 'rgba(176, 58, 46, 0.95)' : 'rgba(31, 90, 51, 0.9)')};
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.4rem 0.6rem;
  border-radius: 10px;
  background: ${({ $danger }) => ($danger ? 'rgba(176, 58, 46, 0.12)' : 'rgba(31, 90, 51, 0.08)')};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background: ${({ $danger }) => ($danger ? 'rgba(176, 58, 46, 0.18)' : 'rgba(31, 90, 51, 0.16)')};
  }
  .side-label {
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
  }
`;

const Content = styled.div`
  height: 100%;
  overflow: auto;
  padding: 1.2rem 1.5rem 1.5rem 1.5rem;
  @media (max-width: 768px) {
    padding: 1rem 0.8rem;
  }
`;

const TopBar = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 18px;
  padding: 1rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 14px 30px rgba(15, 27, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.14);
  backdrop-filter: blur(10px);
  margin-bottom: 1.4rem;
  gap: 1rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    border-radius: 12px;
    gap: 0.8rem;
  }
`;

const TopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const SearchField = styled.input`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.55rem 1rem;
  font-size: 0.95rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #2f3b36;
  background: rgba(255, 255, 255, 0.85);
  outline: none;
  min-width: 220px;
  transition: all 0.2s ease;
  @media (max-width: 768px) {
    min-width: 100%;
    font-size: 0.9rem;
    padding: 0.5rem 0.8rem;
  }
  &:focus {
    border-color: rgba(31, 90, 51, 0.45);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
  }
`;



const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Title = styled.h1`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 2rem;
  color: #22312a;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #335a42;
  font-size: 1rem;
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const Body = styled.div`
  padding-top: 0.4rem;
`;

const ToggleButton = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.2);
  background: rgba(255, 255, 255, 0.85);
  color: #1f5a33;
  border-radius: 10px;
  height: 36px;
  width: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, border 0.2s ease;
  &:hover {
    background: rgba(31, 90, 51, 0.12);
    border-color: rgba(31, 90, 51, 0.35);
  }
  i {
    font-size: 1.1rem;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const AppLayout = ({ title, subtitle, navItems, actions, children, noScroll }: AppLayoutProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const iconMap: Record<string, string> = {
    dashboard: 'bi-speedometer2',
    'tableau admin': 'bi-speedometer2',
    'tableau de bord': 'bi-speedometer2',
    accueil: 'bi-house',
    'console systeme': 'bi-cpu',
    'logs immuables': 'bi-journal-text',
    'exports audit': 'bi-download',
    utilisateurs: 'bi-people-gear',
    suspensions: 'bi-person-x',
    decision: 'bi-check2-circle',
    elections: 'bi-calendar2-week',
    'elections en cours': 'bi-calendar2-check',
    'programmer election': 'bi-calendar2-plus',
    candidats: 'bi-people',
    'gestion candidats': 'bi-person-lines-fill',
    'vote securise': 'bi-check2-square',
    vote: 'bi-check2-square',
    'resultats temps reel': 'bi-bar-chart',
    resultats: 'bi-bar-chart',
    statistiques: 'bi-graph-up',
    rapports: 'bi-file-earmark-text',
    'alertes fraude': 'bi-shield-exclamation',
    historique: 'bi-clock-history',
    'detail alerte': 'bi-info-circle',
    recommandation: 'bi-clipboard-check',
    profil: 'bi-person-circle',
    securite: 'bi-shield-lock',
  };

  const getIconClass = (label: string, to: string) => {
    const key = label.toLowerCase();
    if (iconMap[key]) return iconMap[key];
    if (to.includes('/dashboard')) return 'bi-speedometer2';
    if (to.includes('/election')) return 'bi-calendar2-week';
    if (to.includes('/candidats')) return 'bi-people';
    if (to.includes('/vote')) return 'bi-check2-square';
    if (to.includes('/resultats')) return 'bi-bar-chart';
    if (to.includes('/statistiques')) return 'bi-graph-up';
    if (to.includes('/rapports')) return 'bi-file-earmark-text';
    if (to.includes('/alerts')) return 'bi-shield-exclamation';
    if (to.includes('/historique')) return 'bi-clock-history';
    if (to.includes('/profil')) return 'bi-person-circle';
    if (to.includes('/superadmin')) return 'bi-shield-lock';
    return 'bi-dot';
  };

  return (
    <Frame>
      <Shell $collapsed={collapsed}>
        <Sidebar $collapsed={collapsed}>
          <Brand>
            <LogoNaatalVote size={64} />
            <BrandText $collapsed={collapsed}>NATAALVOTE</BrandText>
          </Brand>
          <Divider />
          <Nav>
            {navItems.map((item) => (
              <NavItemLink
                key={item.to}
                to={item.to}
                $active={location.pathname === item.to}
                $collapsed={collapsed}
                title={item.label}
              >
                <span className="nav-icon">
                  <i className={`bi ${getIconClass(item.label, item.to)}`} />
                </span>
                <span className="nav-label">{item.label}</span>
              </NavItemLink>
            ))}
          </Nav>
          <SideFooter $collapsed={collapsed}>
            <SideLink to="/portal" $collapsed={collapsed}>
              <i className="bi bi-shuffle" />
              <span className="side-label">Changer de role</span>
            </SideLink>
            <SideLink to="/login" $collapsed={collapsed} $danger>
              <i className="bi bi-box-arrow-right" />
              <span className="side-label">Deconnexion</span>
            </SideLink>
          </SideFooter>
        </Sidebar>
        <Content>
          <TopBar>
            <TitleRow>
              <ToggleButton onClick={() => setCollapsed((prev) => !prev)} aria-label="Toggle sidebar">
                <i className="bi bi-list" />
              </ToggleButton>
              <TitleGroup>
                <Title>{title}</Title>
                {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
              </TitleGroup>
            </TitleRow>
            <TopRight>
              <SearchField placeholder="Recherche" />
              {actions ? <Actions>{actions}</Actions> : null}
            </TopRight>
          </TopBar>
          <Body>{children}</Body>
        </Content>
      </Shell>
    </Frame>
  );
};
