import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { LogoNaatalVote } from '../assets/LogoNaatalVote';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';
import { api } from '../services/api';

interface NavItem {
  label: string;
  to: string;
  badge?: number;
}

interface Notif {
  id: string;
  icon: string;
  text: string;
  sub?: string;
  type: 'info' | 'warning' | 'success' | 'danger';
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
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(135deg, #1f5a33 0%, #2d7a45 100%)'
      : 'rgba(255, 255, 255, 0.64)'};
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(31, 90, 51, 0.50)' : 'rgba(31, 90, 51, 0.2)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: ${({ $active }) =>
    $active
      ? '0 4px 14px rgba(31, 90, 51, 0.2), inset 0 1px 0 rgba(255,255,255,0.12)'
      : 'none'};
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
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
    background: ${({ $active }) =>
      $active ? 'linear-gradient(135deg, #215d36 0%, #307f49 100%)' : 'rgba(31, 90, 51, 0.22)'};
    box-shadow: ${({ $active }) =>
      $active
        ? '0 6px 16px rgba(31, 90, 51, 0.25), inset 0 1px 0 rgba(255,255,255,0.15)'
        : 'none'};
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
  color: ${({ $danger }) => ($danger ? 'rgba(176, 58, 46, 0.9)' : 'rgba(31, 90, 51, 0.85)')};
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.4rem 0.6rem;
  border-radius: 10px;
  background: ${({ $danger }) =>
    $danger ? 'rgba(176, 58, 46, 0.14)' : 'rgba(255, 255, 255, 0.56)'};
  border: 1px solid ${({ $danger }) =>
    $danger ? 'rgba(176, 58, 46, 0.18)' : 'rgba(31, 90, 51, 0.12)'};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s, border-color 0.2s;
  &:hover {
    background: ${({ $danger }) =>
      $danger ? 'rgba(176, 58, 46, 0.14)' : 'rgba(31, 90, 51, 0.1)'};
  }
  .side-label {
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
  }
`;

const LogoutBtn = styled.button<{ $collapsed?: boolean }>`
  text-decoration: none;
  color: rgba(176, 58, 46, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.4rem 0.6rem;
  border-radius: 10px;
  background: rgba(176, 58, 46, 0.16);
  border: 1px solid rgba(176, 58, 46, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s, border-color 0.2s;
  cursor: pointer;
  width: 100%;
  &:hover { background: rgba(176, 58, 46, 0.14); }
  .side-label {
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
  }
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const TopBarWrap = styled.div`
  padding: 1rem 1.5rem 0;
  flex-shrink: 0;
  @media (max-width: 768px) {
    padding: 0.7rem 0.8rem 0;
  }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 1.5rem 1.5rem;
  @media (max-width: 768px) {
    padding: 0 0.8rem 1rem;
  }
`;

const TopBar = styled.div`
  background: rgba(255, 255, 255, 0.82);
  border-radius: 14px;
  padding: 0.6rem 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 16px rgba(15, 27, 18, 0.06);
  border: 1px solid rgba(31, 90, 51, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  margin-bottom: 1.4rem;
  gap: 0.8rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    padding: 0.55rem 0.8rem;
    border-radius: 10px;
    gap: 0.6rem;
  }
`;

const TopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.06rem;
`;

const Title = styled.h1`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.05rem;
  color: #2e4a38;
  font-weight: 600;
  letter-spacing: 0.01em;
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;


const NotifBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(31, 90, 51, 0.14);
  background: rgba(255, 255, 255, 0.74);
  color: rgba(31, 90, 51, 0.84);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.18s;
  &:hover {
    background: rgba(31, 90, 51, 0.08);
    color: rgba(31, 90, 51, 0.9);
    border-color: rgba(31, 90, 51, 0.25);
  }
`;

const UserChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.3rem 0.7rem 0.3rem 0.3rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(31, 90, 51, 0.13);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  cursor: default;
`;

const UserAvatar = styled.div<{ $color: string }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  flex-shrink: 0;
`;

const UserRole = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #3a5040;
  white-space: nowrap;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const PageHeader = styled.div`
  margin-bottom: 1.2rem;
`;


const PageSubtitle = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  color: #6b8070;
`;

const Body = styled.div`
  padding-top: 0.2rem;
`;

const ToggleButton = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.18);
  background: rgba(255, 255, 255, 0.82);
  color: #1f5a33;
  border-radius: 10px;
  height: 36px;
  width: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, border 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(31, 90, 51, 0.08), inset 0 1px 0 rgba(255,255,255,0.6);
  &:hover {
    background: rgba(255, 255, 255, 0.75);
    border-color: rgba(31, 90, 51, 0.3);
    box-shadow: 0 4px 12px rgba(31, 90, 51, 0.12), inset 0 1px 0 rgba(255,255,255,0.7);
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

const NavBadge = styled.span`
  margin-left: auto;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: rgba(176, 58, 46, 0.85);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
`;

const NotifWrap = styled.div`
  position: relative;
`;

const NotifBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 16px;
  height: 16px;
  padding: 0 3px;
  border-radius: 999px;
  background: rgba(176, 58, 46, 0.85);
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  border: 2px solid #fff;
`;

const NotifOverlay = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  z-index: 999;
`;

const NotifDropdown = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  max-height: 400px;
  background: rgba(255, 255, 255, 0.97);
  border-radius: 16px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  box-shadow: 0 16px 40px rgba(12, 24, 18, 0.13);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'all' : 'none')};
  transform: ${({ $open }) => ($open ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)')};
  transition: opacity 0.18s ease, transform 0.18s ease;
  transform-origin: top right;
`;

const NotifHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(31, 90, 51, 0.08);
  flex-shrink: 0;
`;

const NotifTitle = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 0.82rem;
  color: #1a2e20;
`;

const MarkReadBtn = styled.button`
  font-family: 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(31, 90, 51, 0.7);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2rem 0.45rem;
  border-radius: 6px;
  &:hover { background: rgba(31, 90, 51, 0.06); }
`;

const NotifList = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 0.3rem 0;
`;

const NotifEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  color: rgba(31, 90, 51, 0.35);
  font-family: 'Poppins', sans-serif;
  font-size: 0.82rem;
  gap: 0.5rem;
  i { font-size: 1.8rem; }
`;

const NotifItem = styled.div<{ $read?: boolean; $type: 'info' | 'warning' | 'success' | 'danger' }>`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.65rem 1rem;
  cursor: pointer;
  transition: background 0.15s;
  background: ${({ $read }) => ($read ? 'transparent' : 'rgba(31, 90, 51, 0.025)')};
  border-left: 3px solid ${({ $type }) =>
    $type === 'warning' ? 'rgba(138, 90, 16, 0.45)' :
    $type === 'success' ? 'rgba(31, 90, 51, 0.45)' :
    $type === 'danger' ? 'rgba(176, 58, 46, 0.45)' :
    'rgba(38, 76, 140, 0.4)'};
  &:hover { background: rgba(31, 90, 51, 0.04); }
`;

const NotifIconWrap = styled.div<{ $type: 'info' | 'warning' | 'success' | 'danger' }>`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  background: ${({ $type }) =>
    $type === 'warning' ? 'rgba(138, 90, 16, 0.09)' :
    $type === 'success' ? 'rgba(31, 90, 51, 0.09)' :
    $type === 'danger' ? 'rgba(176, 58, 46, 0.09)' :
    'rgba(38, 76, 140, 0.09)'};
  color: ${({ $type }) =>
    $type === 'warning' ? 'rgba(138, 90, 16, 0.8)' :
    $type === 'success' ? 'rgba(31, 90, 51, 0.75)' :
    $type === 'danger' ? 'rgba(176, 58, 46, 0.7)' :
    'rgba(38, 76, 140, 0.75)'};
`;

const NotifContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotifText = styled.div<{ $read?: boolean }>`
  font-family: 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: ${({ $read }) => ($read ? 500 : 600)};
  color: ${({ $read }) => ($read ? '#7a8a80' : '#1a2e20')};
  line-height: 1.35;
`;

const NotifSub = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 0.7rem;
  color: #9aaa9f;
  margin-top: 0.15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NotifUnreadDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(31, 90, 51, 0.55);
  flex-shrink: 0;
  margin-top: 4px;
`;

export const AppLayout = ({ role, title, subtitle, navItems, actions, children }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((s) => s.auth.user?.id ?? null);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    try { await api.auth.logout(); } catch { /* ignore */ }
    dispatch(logout());
    navigate('/login');
  };
  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const [notifications, setNotifications] = useState<Notif[]>([]);

  useEffect(() => {
    let cancelled = false;
    const rLow = role.toLowerCase();

    const load = async () => {
      try {
        const notifs: Notif[] = [];

        if (rLow.includes('operateur')) {
          const [alerts, suspensions] = await Promise.all([
            api.operateur.listAlerts(),
            api.operateur.listSuspensions(),
          ]);

          const newAlerts = alerts.filter((a) => a.statut === 'NOUVELLE' && !a.operateur_id);
          if (newAlerts.length > 0) {
            notifs.push({
              id: 'new-alerts',
              icon: 'bi-shield-exclamation',
              text: `${newAlerts.length} nouvelle${newAlerts.length > 1 ? 's' : ''} alerte${newAlerts.length > 1 ? 's' : ''} non assignée${newAlerts.length > 1 ? 's' : ''}`,
              sub: 'En attente de prise en charge',
              type: 'warning',
            });
          }

          if (userId) {
            const myAnalysis = alerts.filter((a) => a.statut === 'EN_ANALYSE' && a.operateur_id === userId);
            if (myAnalysis.length > 0) {
              notifs.push({
                id: 'my-analysis',
                icon: 'bi-hourglass-split',
                text: `${myAnalysis.length} alerte${myAnalysis.length > 1 ? 's' : ''} en cours d'analyse`,
                sub: 'Mes dossiers actifs',
                type: 'info',
              });
            }

            const myResolved = alerts.filter((a) => a.statut === 'RESOLUE' && a.operateur_id === userId);
            if (myResolved.length > 0) {
              notifs.push({
                id: 'my-resolved',
                icon: 'bi-check-circle',
                text: `${myResolved.length} alerte${myResolved.length > 1 ? 's' : ''} clôturée${myResolved.length > 1 ? 's' : ''}`,
                sub: 'Dossiers résolus',
                type: 'success',
              });
            }

            suspensions.filter((s) => s.operateur_id === userId).forEach((s) => {
              if (s.statut === 'EN_ATTENTE') {
                notifs.push({
                  id: `susp-pending-${s.id}`,
                  icon: 'bi-clock-history',
                  text: 'Suspension soumise — en attente du SuperAdmin',
                  sub: `Dossier ${s.id} • pas encore traité`,
                  type: 'warning',
                });
              } else if (s.statut === 'APPROUVE') {
                notifs.push({
                  id: `susp-approved-${s.id}`,
                  icon: 'bi-person-check',
                  text: 'Votre suspension a été approuvée',
                  sub: s.id,
                  type: 'success',
                });
              } else if (s.statut === 'REJETE') {
                notifs.push({
                  id: `susp-rejected-${s.id}`,
                  icon: 'bi-person-x',
                  text: 'Votre suspension a été rejetée',
                  sub: s.id,
                  type: 'danger',
                });
              }
            });
          }
        } else if (rLow.includes('super')) {
          const suspensions = await api.superadmin.listSuspensions();
          const pending = suspensions.filter((s) => s.statut === 'EN_ATTENTE');
          if (pending.length > 0) {
            notifs.push({
              id: 'susp-pending-total',
              icon: 'bi-person-exclamation',
              text: `${pending.length} suspension${pending.length > 1 ? 's' : ''} en attente de validation`,
              sub: 'Requiert votre décision',
              type: 'warning',
            });
          }
          suspensions.filter((s) => s.statut === 'APPROUVE').forEach((s) =>
            notifs.push({
              id: `approved-${s.id}`,
              icon: 'bi-check2-circle',
              text: 'Suspension approuvée',
              sub: s.justification?.slice(0, 55) || s.id,
              type: 'success',
            }));
          suspensions.filter((s) => s.statut === 'REJETE').forEach((s) =>
            notifs.push({
              id: `rejected-${s.id}`,
              icon: 'bi-x-circle',
              text: 'Suspension rejetée',
              sub: s.justification?.slice(0, 55) || s.id,
              type: 'danger',
            }));
        } else if (rLow.includes('admin')) {
          const [elections, candidats] = await Promise.all([api.elections.list(), api.candidats.list()]);
          elections.filter((e) => e.statut === 'EN_COURS').forEach((e) =>
            notifs.push({
              id: `elec-encours-${e.id}`,
              icon: 'bi-calendar2-check',
              text: `Élection en cours : ${e.titre}`,
              sub: `${(e.votes_count as number).toLocaleString('fr-FR')} votes enregistrés`,
              type: 'success',
            }));
          elections.filter((e) => e.statut === 'PROGRAMMEE').forEach((e) =>
            notifs.push({
              id: `elec-prog-${e.id}`,
              icon: 'bi-calendar2-plus',
              text: `Élection programmée : ${e.titre}`,
              sub: `Début : ${new Date(e.date_debut).toLocaleDateString('fr-FR')}`,
              type: 'info',
            }));
          const activeIds = elections.filter((e) => e.statut === 'EN_COURS').map((e) => e.id);
          const activeCands = candidats.filter((c) => activeIds.includes(c.election_id));
          if (activeCands.length > 0) {
            notifs.push({
              id: 'candidats-count',
              icon: 'bi-people',
              text: `${activeCands.length} candidat${activeCands.length > 1 ? 's' : ''} inscrit${activeCands.length > 1 ? 's' : ''} aux élections en cours`,
              sub: 'Élections actives',
              type: 'info',
            });
          }
        } else {
          const elections = await api.elections.list();
          elections.filter((e) => e.statut === 'EN_COURS').forEach((e) =>
            notifs.push({
              id: `vote-open-${e.id}`,
              icon: 'bi-check2-square',
              text: `Élection ouverte : ${e.titre}`,
              sub: `Votez avant le ${new Date(e.date_fin).toLocaleDateString('fr-FR')}`,
              type: 'warning',
            }));
          elections.filter((e) => e.statut === 'CLOTUREE').forEach((e) =>
            notifs.push({
              id: `results-${e.id}`,
              icon: 'bi-bar-chart',
              text: `Résultats disponibles : ${e.titre}`,
              sub: `${(e.votes_count as number).toLocaleString('fr-FR')} votes comptabilisés`,
              type: 'success',
            }));
        }

        if (!cancelled) setNotifications(notifs);
      } catch {
        if (!cancelled) setNotifications([]);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [role, userId]);

  const unreadCount = useMemo(() => notifications.filter((n) => !readIds.has(n.id)).length, [notifications, readIds]);

  const handleMarkAllRead = () => setReadIds(new Set(notifications.map((n) => n.id)));
  const handleNotifClick = (id: string) => setReadIds((prev) => new Set([...prev, id]));

  const getAvatarInitials = (r: string) =>
    r.split(' ').filter((w) => w.length > 2).map((w) => w[0].toUpperCase()).slice(0, 2).join('');

  const getRoleColor = (r: string): string => {
    const rLow = r.toLowerCase();
    if (rLow.includes('super')) return 'rgba(72, 52, 160, 0.65)';
    if (rLow.includes('admin')) return 'rgba(38, 76, 140, 0.65)';
    if (rLow.includes('operateur')) return 'rgba(31, 90, 51, 0.6)';
    return 'rgba(31, 90, 51, 0.55)';
  };

  const initials = getAvatarInitials(role);
  const avatarColor = getRoleColor(role);

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
            <BrandText $collapsed={collapsed}>NAATALVOTE</BrandText>
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
                {item.badge != null && item.badge > 0 && !collapsed && (
                  <NavBadge>{item.badge}</NavBadge>
                )}
              </NavItemLink>
            ))}
          </Nav>
          <SideFooter $collapsed={collapsed}>
            <SideLink to="/portal" $collapsed={collapsed}>
              <i className="bi bi-shuffle" />
              <span className="side-label">Changer de role</span>
            </SideLink>
            <LogoutBtn $collapsed={collapsed} onClick={handleLogout}>
              <i className="bi bi-box-arrow-right" />
              <span className="side-label">Deconnexion</span>
            </LogoutBtn>
          </SideFooter>
        </Sidebar>
        <RightCol>
          <TopBarWrap>
            <TopBar>
              <TitleRow>
                <ToggleButton onClick={() => setCollapsed((prev) => !prev)} aria-label="Toggle sidebar">
                  <i className="bi bi-list" />
                </ToggleButton>
                <TitleGroup>
                  <Title>
                    <span style={{ color: 'rgba(31,90,51,0.4)', marginRight: '0.4rem', fontSize: '0.75rem' }}>
                      <i className="bi bi-house-door" />
                    </span>
                    {title}
                  </Title>
                </TitleGroup>
              </TitleRow>
              <TopRight>
                {actions && <Actions>{actions}</Actions>}
                <NotifWrap>
                  <NotifOverlay $open={notifOpen} onClick={() => setNotifOpen(false)} />
                  <NotifBtn title="Notifications" onClick={() => setNotifOpen((p) => !p)}>
                    <i className="bi bi-bell" />
                  </NotifBtn>
                  {unreadCount > 0 && <NotifBadge>{unreadCount > 9 ? '9+' : unreadCount}</NotifBadge>}
                  <NotifDropdown $open={notifOpen}>
                    <NotifHeader>
                      <NotifTitle>Notifications {unreadCount > 0 && `(${unreadCount})`}</NotifTitle>
                      {unreadCount > 0 && (
                        <MarkReadBtn onClick={handleMarkAllRead}>Tout marquer lu</MarkReadBtn>
                      )}
                    </NotifHeader>
                    <NotifList>
                      {notifications.length === 0 ? (
                        <NotifEmpty>
                          <i className="bi bi-bell-slash" />
                          Aucune notification
                        </NotifEmpty>
                      ) : (
                        notifications.map((n) => {
                          const isRead = readIds.has(n.id);
                          return (
                            <NotifItem key={n.id} $read={isRead} $type={n.type} onClick={() => handleNotifClick(n.id)}>
                              <NotifIconWrap $type={n.type}>
                                <i className={`bi ${n.icon}`} />
                              </NotifIconWrap>
                              <NotifContent>
                                <NotifText $read={isRead}>{n.text}</NotifText>
                                {n.sub && <NotifSub>{n.sub}</NotifSub>}
                              </NotifContent>
                              {!isRead && <NotifUnreadDot />}
                            </NotifItem>
                          );
                        })
                      )}
                    </NotifList>
                  </NotifDropdown>
                </NotifWrap>
                <UserChip>
                  <UserAvatar $color={avatarColor}>{initials}</UserAvatar>
                  <UserRole>{role}</UserRole>
                </UserChip>
              </TopRight>
            </TopBar>
          </TopBarWrap>
          <ScrollArea>
            <Body>
              {subtitle && (
                <PageHeader>
                  <PageSubtitle>{subtitle}</PageSubtitle>
                </PageHeader>
              )}
              {children}
            </Body>
          </ScrollArea>
        </RightCol>
      </Shell>
    </Frame>
  );
};
