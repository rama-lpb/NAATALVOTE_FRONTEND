import styled from 'styled-components';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { AppLayout } from '../components/AppLayout';

const LayoutGrid = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const TabRow = styled.div`
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid rgba(31, 90, 51, 0.1);
  padding-bottom: 0;
`;

const Tab = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.8)' : 'transparent'};
  margin-bottom: -2px;
  padding: 0.5rem 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  font-weight: ${({ $active }) => $active ? 700 : 500};
  color: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.9)' : '#8a9a90'};
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: rgba(31, 90, 51, 0.8); }
`;

const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  color: #22312a;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  min-width: 200px;
  &:focus { border-color: rgba(31, 90, 51, 0.45); box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.1); }
`;

const CreateButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.85);
  color: #fff;
  border: 1px solid rgba(31, 90, 51, 0.6);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(31, 90, 51, 0.2);
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.95); }
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 0;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 52px 1fr 140px 160px 120px 100px;
  gap: 0.8rem;
  padding: 0.75rem 1.3rem;
  background: rgba(31, 90, 51, 0.04);
  border-bottom: 1px solid rgba(31, 90, 51, 0.1);
`;

const TH = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(31, 90, 51, 0.55);
`;

const UserRows = styled.div``;

const UserRow = styled.div`
  display: grid;
  grid-template-columns: 52px 1fr 140px 160px 120px 100px;
  gap: 0.8rem;
  align-items: center;
  padding: 0.9rem 1.3rem;
  border-bottom: 1px solid rgba(31, 90, 51, 0.06);
  transition: background 0.15s;
  &:last-child { border-bottom: none; }
  &:hover { background: rgba(31, 90, 51, 0.025); }
`;

const UserAvatar = styled.div<{ $color: string }>`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.82rem;
  color: #fff;
`;

const UserInfo = styled.div``;

const UserName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1a2e20;
  font-size: 0.9rem;
`;

const UserEmail = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #8a9a90;
  font-size: 0.75rem;
`;

const RoleBadge = styled.span<{ $role: string }>`
  padding: 0.22rem 0.6rem;
  border-radius: 8px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  background: ${({ $role }) =>
    $role === 'Administrateur' ? 'rgba(38, 76, 140, 0.1)' : 'rgba(138, 90, 16, 0.1)'};
  color: ${({ $role }) =>
    $role === 'Administrateur' ? 'rgba(38, 76, 140, 0.85)' : 'rgba(138, 90, 16, 0.85)'};
`;

const LastLogin = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #6b7a72;
`;

const StatusDot = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.85)' : 'rgba(91, 95, 101, 0.7)'};
  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ $active }) => $active ? 'rgba(31, 90, 51, 0.8)' : 'rgba(91, 95, 101, 0.5)'};
  }
`;

const ActionsCell = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const IconBtn = styled.button<{ $danger?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: 1px solid ${({ $danger }) => $danger ? 'rgba(176, 58, 46, 0.2)' : 'rgba(31, 90, 51, 0.15)'};
  background: ${({ $danger }) => $danger ? 'rgba(176, 58, 46, 0.06)' : 'rgba(31, 90, 51, 0.06)'};
  color: ${({ $danger }) => $danger ? 'rgba(176, 58, 46, 0.8)' : 'rgba(31, 90, 51, 0.75)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.2s;
  &:hover { background: ${({ $danger }) => $danger ? 'rgba(176, 58, 46, 0.12)' : 'rgba(31, 90, 51, 0.12)'}; }
`;

const navItems = [
  { label: 'Console systeme', to: '/superadmin/console' },
  { label: 'Logs immuables', to: '/superadmin/logs' },
  { label: 'Exports audit', to: '/superadmin/export' },
  { label: 'Utilisateurs', to: '/superadmin/utilisateurs' },
  { label: 'Suspensions', to: '/superadmin/suspensions' },
];

const users = [
  { id: 'u1', initials: 'AN', name: 'Awa Ndiaye', email: 'a.ndiaye@naatal.sn', role: 'Administrateur', lastLogin: '09/03/2026 09:14', active: true, color: 'rgba(38, 76, 140, 0.7)' },
  { id: 'u2', initials: 'MD', name: 'Mamadou Diallo', email: 'm.diallo@naatal.sn', role: 'Operateur', lastLogin: '09/03/2026 08:02', active: true, color: 'rgba(138, 90, 16, 0.7)' },
  { id: 'u3', initials: 'KS', name: 'Kadiatou Sow', email: 'k.sow@naatal.sn', role: 'Administrateur', lastLogin: '08/03/2026 17:30', active: true, color: 'rgba(38, 76, 140, 0.6)' },
  { id: 'u4', initials: 'ON', name: 'Omar Niane', email: 'o.niane@naatal.sn', role: 'Operateur', lastLogin: '07/03/2026 11:50', active: false, color: 'rgba(91, 95, 101, 0.5)' },
];

const SuperAdminUsers = () => {
  const [tab, setTab] = useState<'all' | 'admin' | 'operator'>('all');
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) => {
    const matchTab = tab === 'all' || (tab === 'admin' && u.role === 'Administrateur') || (tab === 'operator' && u.role === 'Operateur');
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleCreate = () => {
    Swal.fire({
      title: 'Creer un compte administratif',
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Nom complet" style="font-family:Poppins">
        <input id="swal-email" class="swal2-input" placeholder="Email professionnel" style="font-family:Poppins">
        <select id="swal-role" class="swal2-select" style="font-family:Poppins;width:100%;padding:0.5rem;margin-top:0.5rem;border:1px solid #ddd;border-radius:8px">
          <option value="admin">Administrateur</option>
          <option value="operator">Operateur de securite</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Creer',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    });
  };

  const handleDeactivate = (name: string) => {
    Swal.fire({
      title: `Desactiver ${name} ?`,
      text: 'Le compte sera desactive. Aucune donnee ne sera supprimee. Cette action est tracee dans les logs.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Desactiver',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    });
  };

  return (
    <AppLayout
      role="Super Admin"
      title="Gestion des utilisateurs"
      subtitle="Creation et desactivation des comptes administratifs et operateurs."
      navItems={navItems}
      actions={<CreateButton onClick={handleCreate}><i className="bi bi-person-plus" />Creer un compte</CreateButton>}
    >
      <LayoutGrid>
        <TabRow>
          <Tab $active={tab === 'all'} onClick={() => setTab('all')}>Tous ({users.length})</Tab>
          <Tab $active={tab === 'admin'} onClick={() => setTab('admin')}>Administrateurs ({users.filter(u => u.role === 'Administrateur').length})</Tab>
          <Tab $active={tab === 'operator'} onClick={() => setTab('operator')}>Operateurs ({users.filter(u => u.role === 'Operateur').length})</Tab>
        </TabRow>

        <ControlBar>
          <SearchInput
            placeholder="Rechercher un utilisateur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CreateButton onClick={handleCreate}><i className="bi bi-person-plus" />Creer</CreateButton>
        </ControlBar>

        <Panel>
          <TableHeader>
            <TH></TH>
            <TH>Utilisateur</TH>
            <TH>Role</TH>
            <TH>Derniere connexion</TH>
            <TH>Statut</TH>
            <TH>Actions</TH>
          </TableHeader>
          <UserRows>
            {filtered.map((u) => (
              <UserRow key={u.id}>
                <UserAvatar $color={u.color}>{u.initials}</UserAvatar>
                <UserInfo>
                  <UserName>{u.name}</UserName>
                  <UserEmail>{u.email}</UserEmail>
                </UserInfo>
                <div><RoleBadge $role={u.role}>{u.role === 'Administrateur' ? 'Admin' : 'Operateur'}</RoleBadge></div>
                <LastLogin>{u.lastLogin}</LastLogin>
                <StatusDot $active={u.active}>{u.active ? 'Actif' : 'Inactif'}</StatusDot>
                <ActionsCell>
                  <IconBtn title="Voir logs"><i className="bi bi-journal-text" /></IconBtn>
                  <IconBtn $danger title="Desactiver" onClick={() => handleDeactivate(u.name)} disabled={!u.active}>
                    <i className="bi bi-person-x" />
                  </IconBtn>
                </ActionsCell>
              </UserRow>
            ))}
          </UserRows>
        </Panel>
      </LayoutGrid>
    </AppLayout>
  );
};

export default SuperAdminUsers;
