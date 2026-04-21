import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import { api, type CandidateDto, type ElectionDto } from '../services/api';

const PageGrid = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const HeroPanel = styled.div`
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 85% 12%, rgba(31, 90, 51, 0.14), transparent 36%),
    radial-gradient(circle at 18% 80%, rgba(26, 62, 40, 0.12), transparent 44%),
    linear-gradient(150deg, #ffffff 0%, #f0f6f2 100%);
  border-radius: 22px;
  padding: 1.35rem;
  box-shadow: 0 16px 34px rgba(20, 36, 29, 0.1);
  border: 1px solid rgba(31, 90, 51, 0.2);
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(210px, 320px) 1fr;
  gap: 1.2rem;
  align-items: stretch;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PortraitWrap = styled.div`
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(31, 90, 51, 0.16);
  background: linear-gradient(180deg, #d6e7db 0%, #edf5f0 100%);
  min-height: 320px;
`;

const Portrait = styled.img`
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: cover;
`;

const HeroContent = styled.div`
  display: grid;
  gap: 0.85rem;
  align-content: start;
`;

const Name = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #163a26;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
`;

const Party = styled.div`
  width: fit-content;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.86rem;
  font-weight: 600;
  color: #1f5a33;
  background: rgba(31, 90, 51, 0.12);
  border: 1px solid rgba(31, 90, 51, 0.2);
`;

const HeroText = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #4f6358;
  line-height: 1.55;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Chip = styled.div`
  padding: 0.32rem 0.68rem;
  border-radius: 999px;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.82rem;
  background: rgba(31, 90, 51, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.18);
  color: #1f5a33;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.62rem 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #1f5a33 0%, #2f7b4b 100%);
  border: 1px solid rgba(31, 90, 51, 0.55);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
`;

const SecondaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.62rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(31, 90, 51, 0.2);
  background: #ffffff;
  color: #1f5a33;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const FactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.7rem;
`;

const FactCard = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(31, 90, 51, 0.14);
  padding: 0.72rem 0.8rem;
  background: rgba(31, 90, 51, 0.04);
`;

const FactLabel = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  color: #6a7b71;
`;

const FactValue = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  color: #203328;
  font-weight: 600;
  margin-top: 0.2rem;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid rgba(31, 90, 51, 0.14);
  box-shadow: 0 8px 24px rgba(20, 36, 29, 0.06);
  padding: 1rem;
  display: grid;
  gap: 0.7rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 1.05rem;
  color: #1a3d28;
`;

const BodyText = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  line-height: 1.55;
  color: #4f6358;
`;

const BulletList = styled.div`
  display: grid;
  gap: 0.45rem;
`;

const Bullet = styled.div`
  padding: 0.55rem 0.7rem;
  border-radius: 10px;
  background: rgba(31, 90, 51, 0.06);
  border-left: 3px solid rgba(31, 90, 51, 0.35);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #395044;
`;

const PdfHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
`;

const PdfActions = styled.div`
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
`;

const PdfLink = styled.a`
  text-decoration: none;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.83rem;
  font-weight: 600;
  color: #1f5a33;
  border: 1px solid rgba(31, 90, 51, 0.22);
  border-radius: 10px;
  padding: 0.42rem 0.66rem;
  background: #f6fbf8;
`;

const PdfFrame = styled.iframe`
  width: 100%;
  min-height: 560px;
  border: 1px solid rgba(31, 90, 51, 0.16);
  border-radius: 12px;
  background: #f6fbf8;
`;

const buildHighlights = (biographie: string) => {
  return biographie
    .split(/\n|[.!?]/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 18)
    .filter((part, index, arr) => arr.indexOf(part) === index)
    .slice(0, 5);
};

const normalizeUrl = (url: string) => {
  const value = url.trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return '';
};

const isPdfProgram = (url: string) => /\.pdf($|[?#])/i.test(url);

const toStatusLabel = (statut?: string) => {
  if (statut === 'EN_COURS') return 'En cours';
  if (statut === 'PROGRAMMEE') return 'Programmee';
  if (statut === 'CLOTUREE') return 'Cloturee';
  return 'Inconnu';
};

const CitizenCandidateDetail = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState<CandidateDto | null>(null);
  const [election, setElection] = useState<ElectionDto | null>(null);
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navItems = [
    { label: 'Tableau de bord', to: '/citoyen/dashboard' },
    { label: 'Elections', to: '/citoyen/elections' },
    { label: 'Candidats', to: '/citoyen/candidats' },
    { label: 'Vote securise', to: '/citoyen/vote' },
    { label: 'Resultats temps reel', to: '/citoyen/resultats' },
    { label: 'Profil', to: '/citoyen/profil' },
  ];

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Candidat introuvable.');
      return;
    }

    setLoading(true);
    setError(null);

    api.candidats.get(id)
      .then(async (c) => {
        setCandidate(c);
        try {
          const electionData = await api.elections.get(c.election_id);
          setElection(electionData);
        } catch {
          setElection(null);
        }
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Impossible de charger ce candidat.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const highlights = useMemo(() => buildHighlights(candidate?.biographie ?? ''), [candidate?.biographie]);
  const biographyText = (candidate?.biographie ?? '').trim();
  const biographyBlocks = useMemo(
    () => biographyText.split(/\n+/).map((line) => line.trim()).filter(Boolean),
    [biographyText]
  );
  const programUrl = useMemo(() => normalizeUrl(candidate?.programme_url ?? ''), [candidate?.programme_url]);
  const photoUrl = useMemo(() => normalizeUrl(candidate?.photo_url ?? ''), [candidate?.photo_url]);
  const hasProgramUrl = programUrl.length > 0;
  const hasPdfProgram = hasProgramUrl && isPdfProgram(programUrl);

  return (
    <AppLayout
      role="Citoyen"
      title="Profil candidat"
      subtitle="Photo officielle, biographie et programme detaille."
      navItems={navItems}
    >
      <PageGrid>
        <HeroPanel>
          {loading ? <BodyText>Chargement du profil candidat...</BodyText> : null}
          {!loading && error ? <BodyText>{error}</BodyText> : null}
          {!loading && !error && candidate ? (
            <HeroGrid>
              <PortraitWrap>
                <Portrait
                  src={!imgError && photoUrl ? photoUrl : '/images/candidate-placeholder.svg'}
                  alt={`${candidate.prenom} ${candidate.nom}`}
                  onError={() => setImgError(true)}
                />
              </PortraitWrap>

              <HeroContent>
                <Name>{candidate.prenom} {candidate.nom}</Name>
                <Party>{candidate.parti_politique || 'Parti non renseigne'}</Party>
                <Chips>
                  <Chip>{candidate.votes_count.toLocaleString()} voix</Chip>
                  {election ? <Chip>{election.titre}</Chip> : null}
                  {election?.region ? <Chip>{election.region}</Chip> : null}
                  {election?.statut ? <Chip>Statut: {toStatusLabel(election.statut)}</Chip> : null}
                </Chips>
                <HeroText>
                  {biographyText || 'Biographie non renseignee. Ce profil sera complete par le candidat ou son equipe.'}
                </HeroText>
                <Actions>
                  <SecondaryButton to="/citoyen/candidats">Retour candidats</SecondaryButton>
                  <PrimaryButton to="/citoyen/vote">Voter</PrimaryButton>
                </Actions>
              </HeroContent>
            </HeroGrid>
          ) : null}
        </HeroPanel>

        {!loading && !error && candidate ? (
          <Grid>
            <Card>
              <CardTitle>Informations officielles</CardTitle>
              <FactsGrid>
                <FactCard>
                  <FactLabel>Election</FactLabel>
                  <FactValue>{election?.titre ?? 'Non renseignee'}</FactValue>
                </FactCard>
                <FactCard>
                  <FactLabel>Type</FactLabel>
                  <FactValue>{election?.type ?? 'Non renseigne'}</FactValue>
                </FactCard>
                <FactCard>
                  <FactLabel>Statut</FactLabel>
                  <FactValue>{toStatusLabel(election?.statut)}</FactValue>
                </FactCard>
                <FactCard>
                  <FactLabel>Periode</FactLabel>
                  <FactValue>
                    {election
                      ? `${new Date(election.date_debut).toLocaleDateString('fr-FR')} - ${new Date(election.date_fin).toLocaleDateString('fr-FR')}`
                      : 'Non renseignee'}
                  </FactValue>
                </FactCard>
              </FactsGrid>
            </Card>

            <Card>
              <CardTitle>Priorites du candidat</CardTitle>
              {highlights.length > 0 ? (
                <BulletList>
                  {highlights.map((item) => (
                    <Bullet key={item}>{item}</Bullet>
                  ))}
                </BulletList>
              ) : (
                <BodyText>Aucune priorite detaillee dans la biographie pour le moment.</BodyText>
              )}
            </Card>

            <Card>
              <CardTitle>Biographie complete</CardTitle>
              {biographyBlocks.length > 0 ? (
                biographyBlocks.map((block) => <BodyText key={block}>{block}</BodyText>)
              ) : (
                <BodyText>La biographie complete n'est pas encore disponible.</BodyText>
              )}
            </Card>

            <Card>
              <PdfHeader>
                <CardTitle>Programme officiel</CardTitle>
                {hasProgramUrl ? (
                  <PdfActions>
                    <PdfLink href={programUrl} target="_blank" rel="noreferrer">Ouvrir le document</PdfLink>
                    {hasPdfProgram ? <PdfLink href={programUrl} download>Telecharger</PdfLink> : null}
                  </PdfActions>
                ) : null}
              </PdfHeader>

              {!hasProgramUrl ? (
                <BodyText>Aucun document de programme n'a ete publie pour ce candidat.</BodyText>
              ) : hasPdfProgram ? (
                <PdfFrame title={`Programme de ${candidate.prenom} ${candidate.nom}`} src={`${programUrl}#toolbar=1&navpanes=0&view=FitH`} />
              ) : (
                <BodyText>
                  Le programme n'est pas au format PDF. Utilisez le bouton "Ouvrir le document" pour le consulter.
                </BodyText>
              )}
            </Card>
          </Grid>
        ) : null}
      </PageGrid>
    </AppLayout>
  );
};

export default CitizenCandidateDetail;
