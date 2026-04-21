import styled from 'styled-components';
import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import Swal from 'sweetalert2';
import { api, type CandidateDto, type ElectionDto } from '../services/api';

const LayoutGrid = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div<{ $accent: string }>`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 16px;
  padding: 0.9rem 1.1rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  border-left: 5px solid ${({ $accent }) => $accent};
  box-shadow: 0 8px 18px rgba(12, 24, 18, 0.07);
`;

const StatLabel = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b7a72;
  font-size: 0.83rem;
`;

const StatValue = styled.h3`
  margin: 0.3rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a2e20;
  font-size: 1.4rem;
  font-weight: 700;
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 1rem;
`;

const ToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 999px;
  padding: 0.45rem 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  color: #22312a;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  min-width: 200px;
  &:focus { border-color: rgba(31, 90, 51, 0.45); box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.1); }
`;

const ElectionSelect = styled.select`
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

const AddButton = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1.1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  border: 1px solid rgba(31, 90, 51, 0.6);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 3px 10px rgba(31, 90, 51, 0.2);
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.72); }
`;

const CandidateList = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const CandidateRow = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(31, 90, 51, 0.1);
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover { box-shadow: 0 6px 18px rgba(12, 24, 18, 0.1); transform: translateY(-1px); }
`;

const CandAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.7), rgba(31, 90, 51, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  color: #fff;
`;

const CandInfo = styled.div``;

const CandName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #1a2e20;
  font-size: 0.95rem;
`;

const CandMeta = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b7a72;
  font-size: 0.8rem;
  margin-top: 0.1rem;
`;

const ElectionBadge = styled.span`
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.8);
  border: 1px solid rgba(31, 90, 51, 0.12);
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const IconBtn = styled.button<{ $danger?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${({ $danger }) => $danger ? 'rgba(176, 58, 46, 0.2)' : 'rgba(31, 90, 51, 0.15)'};
  background: ${({ $danger }) => $danger ? 'rgba(176, 58, 46, 0.06)' : 'rgba(31, 90, 51, 0.06)'};
  color: ${({ $danger }) => $danger ? 'rgba(176, 58, 46, 0.8)' : 'rgba(31, 90, 51, 0.75)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  transition: all 0.2s;
  &:hover:not(:disabled) {
    background: ${({ $danger }) => $danger ? 'rgba(176, 58, 46, 0.12)' : 'rgba(31, 90, 51, 0.12)'};
  }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2.5rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #8a9a90;
  i { font-size: 2rem; display: block; margin-bottom: 0.6rem; }
`;

const navItems = [
  { label: 'Tableau admin', to: '/admin/dashboard' },
  { label: 'Elections creees', to: '/admin/elections' },
  { label: 'Programmer election', to: '/admin/election/create' },
  { label: 'Gestion candidats', to: '/admin/candidats' },
  { label: 'Statistiques', to: '/admin/statistiques' },
  { label: 'Rapports', to: '/admin/rapports' },
];

const AdminCandidates = () => {
  const [searchParams] = useSearchParams();
  const electionFromQuery = searchParams.get('electionId') ?? 'all';
  const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  const [elections, setElections] = useState<ElectionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [electionFilter, setElectionFilter] = useState(electionFromQuery);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.candidats.list(), api.elections.list()])
      .then(([c, e]) => {
        setCandidates(c);
        setElections(e);
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Erreur', text: 'Impossible de charger les candidats.', buttonsStyling: false, customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' } });
      })
      .finally(() => setLoading(false));
  }, []);

  const electionTitleById = useMemo(() => {
    const m: Record<string, string> = {};
    elections.forEach((e) => { m[e.id] = e.titre; });
    return m;
  }, [elections]);

  const filtered = useMemo(() => candidates.filter((c) => {
    const matchSearch = `${c.prenom} ${c.nom}`.toLowerCase().includes(search.toLowerCase())
      || c.parti_politique.toLowerCase().includes(search.toLowerCase());
    const matchElection = electionFilter === 'all' || c.election_id === electionFilter;
    return matchSearch && matchElection;
  }), [candidates, search, electionFilter]);

  const handleDelete = async (c: CandidateDto) => {
    const candName = `${c.prenom} ${c.nom}`;
    const confirm = await Swal.fire({
      title: `Supprimer ${candName} ?`,
      text: 'Cette action est irréversible. Le candidat sera retiré de l\'élection.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    });
    if (!confirm.isConfirmed) return;

    setDeletingId(c.id);
    try {
      await api.candidats.delete(c.id);
      setCandidates((prev) => prev.filter((x) => x.id !== c.id));
      Swal.fire({ icon: 'success', title: 'Supprimé', text: `${candName} a été retiré.`, timer: 2000, showConfirmButton: false, customClass: { popup: 'naatal-swal' } });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de la suppression.';
      Swal.fire({ icon: 'error', title: 'Erreur', text: msg, buttonsStyling: false, customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' } });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AppLayout
      role="Administrateur"
      title="Gestion des candidats"
      subtitle="Ajoutez ou modifiez les candidats avant le demarrage d'une election."
      navItems={navItems}
      actions={<AddButton to={electionFilter !== 'all' ? `/admin/candidats/nouveau?electionId=${electionFilter}` : '/admin/candidats/nouveau'}><i className="bi bi-person-plus" />Ajouter candidat</AddButton>}
    >
      <LayoutGrid>
        <SummaryRow>
          <StatCard $accent="rgba(31, 90, 51, 0.6)">
            <StatLabel>Total candidats</StatLabel>
            <StatValue>{loading ? '—' : candidates.length}</StatValue>
          </StatCard>
          <StatCard $accent="rgba(31, 90, 51, 0.5)">
            <StatLabel>Elections actives</StatLabel>
            <StatValue>{loading ? '—' : elections.filter((e) => e.statut === 'EN_COURS').length}</StatValue>
          </StatCard>
          <StatCard $accent="rgba(138, 90, 16, 0.5)">
            <StatLabel>Elections programmees</StatLabel>
            <StatValue>{loading ? '—' : elections.filter((e) => e.statut === 'PROGRAMMEE').length}</StatValue>
          </StatCard>
          <StatCard $accent="rgba(91, 95, 101, 0.4)">
            <StatLabel>Elections cloturees</StatLabel>
            <StatValue>{loading ? '—' : elections.filter((e) => e.statut === 'CLOTUREE').length}</StatValue>
          </StatCard>
        </SummaryRow>

        <Panel>
          <ToolBar>
            <FilterRow>
              <SearchInput
                placeholder="Rechercher un candidat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ElectionSelect value={electionFilter} onChange={(e) => setElectionFilter(e.target.value)}>
                <option value="all">Toutes les elections</option>
                {elections.map((e) => (
                  <option key={e.id} value={e.id}>{e.titre}</option>
                ))}
              </ElectionSelect>
            </FilterRow>
            <AddButton to={electionFilter !== 'all' ? `/admin/candidats/nouveau?electionId=${electionFilter}` : '/admin/candidats/nouveau'}>
              <i className="bi bi-person-plus" />
              Nouveau
            </AddButton>
          </ToolBar>

          {loading ? (
            <EmptyState>
              <i className="bi bi-arrow-repeat" />
              Chargement des candidats…
            </EmptyState>
          ) : filtered.length === 0 ? (
            <EmptyState>
              <i className="bi bi-person-x" />
              {search || electionFilter !== 'all' ? 'Aucun candidat ne correspond à la recherche.' : 'Aucun candidat enregistré.'}
            </EmptyState>
          ) : (
            <CandidateList>
              {filtered.map((c) => {
                const initials = `${c.prenom.charAt(0)}${c.nom.charAt(0)}`.toUpperCase();
                const electionTitle = electionTitleById[c.election_id] ?? c.election_id;
                return (
                  <CandidateRow key={c.id}>
                    <CandAvatar>{initials}</CandAvatar>
                    <CandInfo>
                      <CandName>{c.prenom} {c.nom}</CandName>
                      <CandMeta>{c.parti_politique}</CandMeta>
                    </CandInfo>
                    <ElectionBadge>{electionTitle}</ElectionBadge>
                    <Actions>
                      <IconBtn
                        $danger
                        title="Supprimer"
                        disabled={deletingId === c.id}
                        onClick={() => handleDelete(c)}
                      >
                        {deletingId === c.id
                          ? <i className="bi bi-arrow-repeat" />
                          : <i className="bi bi-trash" />
                        }
                      </IconBtn>
                    </Actions>
                  </CandidateRow>
                );
              })}
            </CandidateList>
          )}
        </Panel>
      </LayoutGrid>
    </AppLayout>
  );
};

export default AdminCandidates;
