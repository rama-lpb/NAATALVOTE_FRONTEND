import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import { api, type ElectionDto } from '../services/api';
import { useAppSelector } from '../store/hooks';

const LayoutGrid = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  color: #1a2e20;
  font-size: 1.1rem;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  color: #22312a;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  cursor: pointer;
`;

const ActionButton = styled(Link)`
  text-decoration: none;
  padding: 0.55rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.6);
  color: #fff;
  border: 1px solid rgba(31, 90, 51, 0.6);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.88rem;
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.72); }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const Table = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1.6fr auto auto auto;
  gap: 0.8rem;
  align-items: center;
  border: 1px solid rgba(31, 90, 51, 0.1);
  border-radius: 14px;
  padding: 0.9rem 1rem;
  background: rgba(31, 90, 51, 0.04);
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ElectionTitle = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1a2e20;
  font-size: 0.97rem;
`;

const Meta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  font-size: 0.82rem;
  margin-top: 0.2rem;
`;

const Tag = styled.span<{ $tone: 'success' | 'info' | 'pending' }>`
  justify-self: start;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.74rem;
  font-weight: 600;
  color: ${({ $tone }) => $tone === 'success' ? '#1f5a33' : $tone === 'info' ? '#1e40af' : '#8a5a10'};
  background: ${({ $tone }) => $tone === 'success' ? 'rgba(31, 90, 51, 0.12)' : $tone === 'info' ? 'rgba(30, 64, 175, 0.1)' : 'rgba(138, 90, 16, 0.12)'};
  border: 1px solid ${({ $tone }) => $tone === 'success' ? 'rgba(31, 90, 51, 0.2)' : $tone === 'info' ? 'rgba(30, 64, 175, 0.2)' : 'rgba(138, 90, 16, 0.2)'};
`;

const Counter = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #3f5e4b;
`;

const RowActions = styled.div`
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
`;

const SecondaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.45rem 0.8rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.25);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  &:hover { background: rgba(31, 90, 51, 0.08); }
`;

const Empty = styled.div`
  text-align: center;
  padding: 2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #8a9a90;
`;

const navItems = [
  { label: 'Tableau admin', to: '/admin/dashboard' },
  { label: 'Elections creees', to: '/admin/elections' },
  { label: 'Programmer election', to: '/admin/election/create' },
  { label: 'Gestion candidats', to: '/admin/candidats' },
  { label: 'Statistiques', to: '/admin/statistiques' },
  { label: 'Rapports', to: '/admin/rapports' },
];

const getStatutTone = (statut: string): 'success' | 'info' | 'pending' =>
  statut === 'EN_COURS' ? 'success' : statut === 'PROGRAMMEE' ? 'info' : 'pending';

const getStatutLabel = (statut: string) =>
  statut === 'EN_COURS' ? 'En cours' : statut === 'PROGRAMMEE' ? 'Programmee' : 'Cloturee';

const AdminElections = () => {
  const currentUser = useAppSelector((s) => s.auth.user);
  const [elections, setElections] = useState<ElectionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PROGRAMMEE' | 'EN_COURS' | 'CLOTUREE'>('ALL');

  useEffect(() => {
    api.admin.listElections(currentUser?.id)
      .then(async (scoped) => {
        if (currentUser?.id && scoped.length === 0) {
          try {
            const fallback = await api.admin.listElections();
            setElections(fallback);
            return;
          } catch {
            setElections([]);
            return;
          }
        }
        setElections(scoped);
      })
      .catch(() => setElections([]))
      .finally(() => setLoading(false));
  }, [currentUser?.id]);

  const filtered = useMemo(() => {
    const base = [...elections].sort((a, b) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime());
    if (statusFilter === 'ALL') return base;
    return base.filter((e) => e.statut === statusFilter);
  }, [elections, statusFilter]);

  return (
    <AppLayout
      role="Administrateur"
      title="Elections creees"
      subtitle="Consultez les scrutins et ajoutez rapidement des candidats par election."
      navItems={navItems}
      actions={
        <ActionButton to="/admin/election/create">
          <i className="bi bi-plus-circle" /> Nouvelle election
        </ActionButton>
      }
    >
      <LayoutGrid>
        <Card>
          <TopRow>
            <Title>Liste des elections</Title>
            <Toolbar>
              <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'PROGRAMMEE' | 'EN_COURS' | 'CLOTUREE')}>
                <option value="ALL">Tous les statuts</option>
                <option value="PROGRAMMEE">Programmee</option>
                <option value="EN_COURS">En cours</option>
                <option value="CLOTUREE">Cloturee</option>
              </FilterSelect>
              <ActionButton to="/admin/candidats/nouveau">
                <i className="bi bi-person-plus" /> Ajouter candidat
              </ActionButton>
            </Toolbar>
          </TopRow>

          {loading ? (
            <Empty>Chargement des elections...</Empty>
          ) : filtered.length === 0 ? (
            <Empty>Aucune election trouvee avec ce filtre.</Empty>
          ) : (
            <Table>
              {filtered.map((election) => (
                <Row key={election.id}>
                  <div>
                    <ElectionTitle>{election.titre}</ElectionTitle>
                    <Meta>
                      Region: {election.region || 'National'} | Debut {new Date(election.date_debut).toLocaleDateString('fr-FR')} | Fin {new Date(election.date_fin).toLocaleDateString('fr-FR')}
                    </Meta>
                  </div>

                  <Tag $tone={getStatutTone(election.statut)}>{getStatutLabel(election.statut)}</Tag>

                  <Counter>
                    {election.candidat_ids.length} candidat(s)
                  </Counter>

                  <RowActions>
                    <SecondaryButton to={`/admin/candidats?electionId=${election.id}`}>
                      Voir candidats
                    </SecondaryButton>
                    <ActionButton to={`/admin/candidats/nouveau?electionId=${election.id}`}>
                      Ajouter candidat
                    </ActionButton>
                  </RowActions>
                </Row>
              ))}
            </Table>
          )}
        </Card>
      </LayoutGrid>
    </AppLayout>
  );
};

export default AdminElections;
