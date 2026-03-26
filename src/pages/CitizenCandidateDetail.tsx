import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 22px;
  padding: 1.6rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 1.2rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 320px) 1fr;
  gap: 1.4rem;
  align-items: center;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 18px;
  border: 1px solid rgba(31, 90, 51, 0.12);
  background: rgba(31, 90, 51, 0.08);
`;

const Title = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Party = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: rgba(31, 90, 51, 0.9);
  font-weight: 500;
  margin-top: 0.3rem;
`;

const Bio = styled.p`
  margin: 0.8rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  line-height: 1.5;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 0.8rem;
`;

const InfoChip = styled.div`
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.85rem;
`;

const Section = styled.div`
  display: grid;
  gap: 0.6rem;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.05rem;
  font-weight: 600;
`;

const ProgramText = styled.p`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  line-height: 1.5;
`;

const ProgramBlock = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const ProgramList = styled.div`
  display: grid;
  gap: 0.35rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #5a6d62;
  font-size: 0.95rem;
`;

const ProgramItem = styled.div`
  padding-left: 0.6rem;
  border-left: 2px solid rgba(31, 90, 51, 0.18);
`;

const ProgramSectionTitle = styled.h4`
  margin: 0.2rem 0 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 0.98rem;
  font-weight: 600;
`;
const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(31, 90, 51, 0.55);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
`;

const SecondaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  border: 1px solid rgba(31, 90, 51, 0.25);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
`;

const CitizenCandidateDetail = () => {
  const { id } = useParams();

  const navItems = [
    { label: 'Tableau de bord', to: '/citoyen/dashboard' },
    { label: 'Elections', to: '/citoyen/elections' },
    { label: 'Candidats', to: '/citoyen/candidats' },
    { label: 'Vote securise', to: '/citoyen/vote' },
    { label: 'Resultats temps reel', to: '/citoyen/resultats' },
    { label: 'Profil', to: '/citoyen/profil' },
  ];

  const candidates = [
    {
      id: 'c1',
      name: 'Aicha Ndiaye',
      party: 'Union Civique',
      bio: 'Ancienne ministre de la cohesion sociale, elle porte un projet axe sur la stabilite institutionnelle, la sante publique et la relance de l economie locale.',
      programIntro:
        'Priorite a la cohesion sociale, au renforcement des institutions et a une economie locale dynamique. Education, sante et proximite seront les piliers des 100 premiers jours.',
      programAxes: [
        'Relance economique par les PME locales et les filieres agricoles strategiques.',
        'Modernisation des centres de sante communautaires et recrutement cible de personnel medical.',
        'Plan national pour l emploi des jeunes avec incitations a l embauche.',
        'Renforcement des institutions et des mecanismes de transparence.',
      ],
      programActions: [
        'Fonds national d appui a l entrepreneuriat et aux cooperatives locales.',
        'Programme de securisation alimentaire et logistique regionale.',
        'Numerisation progressive des services publics de proximite.',
      ],
      programBudget: [
        'Budget cible: 1,8% du PIB pour la sante communautaire.',
        'Reallocation progressive des depenses non prioritaires vers l emploi des jeunes.',
        'Partenariats public-prive pour l infrastructure locale.',
      ],
      programTimeline: [
        '100 jours: reorganisation des services de proximite et audits institutionnels.',
        '12 mois: lancement du fonds emploi jeunes et programme securisation alimentaire.',
        '24 mois: extension nationale des services numerises.',
      ],
      programKPIs: [
        '200 000 emplois jeunes crees en 24 mois.',
        '50% des centres de sante modernises la premiere annee.',
        'Reduction de 30% des delais administratifs.',
      ],
      profile: 'Economiste, 48 ans',
      region: 'Dakar',
      photo: '/images/candidate-placeholder.svg',
    },
    {
      id: 'c2',
      name: 'Moussa Diop',
      party: 'Coalition Verte',
      bio: 'Specialiste des politiques environnementales, il milite pour la transition energetique et la resilience des territoires face aux changements climatiques.',
      programIntro:
        'Transition energetique acceleree, agriculture resiliente et gouvernance participative. Un plan climat local sera deploye avec des filieres d emploi vert.',
      programAxes: [
        'Reduction progressive des emissions urbaines et mobilite propre.',
        'Reboisement massif et restauration des bassins versants.',
        'Soutien aux agriculteurs via des solutions d irrigation intelligentes.',
        'Gouvernance participative et budgets locaux co-construits.',
      ],
      programActions: [
        'Creation de 3 filieres d emploi vert par region.',
        'Renforcement des infrastructures hydrauliques rurales.',
        'Programme de tri et valorisation des dechets dans les grandes villes.',
      ],
      programBudget: [
        'Fonds transition verte: 2% du PIB sur 5 ans.',
        'Incentives fiscaux pour les entreprises bas carbone.',
        'Financement mixte Etat/collectivites pour l hydraulique rurale.',
      ],
      programTimeline: [
        '100 jours: audit carbone et feuille de route territoriale.',
        '12 mois: lancement reboisement massif et emploi vert.',
        '24 mois: 50% des grandes villes equipees en tri/valorisation.',
      ],
      programKPIs: [
        '1 million d arbres plantes en 18 mois.',
        '20% de reduction des emissions urbaines en 3 ans.',
        '100 000 emplois verts crees.',
      ],
      profile: 'Ingenieur energie, 52 ans',
      region: 'Saint-Louis',
      photo: '/images/candidate-placeholder.svg',
    },
    {
      id: 'c3',
      name: 'Mariam Sow',
      party: 'Renouveau National',
      bio: 'Ancienne dirigeante d entreprise, elle propose une modernisation profonde des services publics et un pacte pour l emploi des jeunes.',
      programIntro:
        'Modernisation des services publics, emploi des jeunes et digitalisation des procedures. L etat civil, les permis et les services sociaux seront simplifies.',
      programAxes: [
        'Guichets uniques digitaux dans chaque region.',
        'Reduction des delais administratifs et simplification des procedures.',
        'Plan national pour l emploi des jeunes et formation professionnelle.',
        'Soutien aux entrepreneurs locaux et aux startups.',
      ],
      programActions: [
        'Portail citoyen pour les documents administratifs essentiels.',
        'Programme de stages et d alternance public-prive.',
        'Incubateurs regionaux et fonds d amorcage.',
      ],
      programBudget: [
        'Budget digitalisation: 1,2% du PIB sur 3 ans.',
        'Fonds emploi jeunes: 250 000 opportunites en 24 mois.',
        'Financement mixte pour incubateurs regionaux.',
      ],
      programTimeline: [
        '100 jours: portail citoyen v1 et simplification des permis.',
        '12 mois: guichets uniques dans chaque region.',
        '24 mois: generalisation des services sociaux digitaux.',
      ],
      programKPIs: [
        '70% de demarches administratives digitalisees.',
        'Delais reduits de 40% pour les permis et actes.',
        '150 000 jeunes formes en filieres techniques.',
      ],
      profile: 'Entrepreneure, 45 ans',
      region: 'Thiès',
      photo: '/images/candidate-placeholder.svg',
    },
  ];

  const candidate = candidates.find((item) => item.id === id) ?? candidates[0];

  return (
    <AppLayout
      role="Citoyen"
      title="Profil candidat"
      subtitle="Informations officielles et programme de campagne."
      navItems={navItems}
    >
      <Panel>
        <Header>
          <Photo src={candidate.photo} alt={candidate.name} />
          <div>
            <Title>{candidate.name}</Title>
            <Party>{candidate.party}</Party>
            <InfoRow>
              <InfoChip>{candidate.profile}</InfoChip>
              <InfoChip>Region: {candidate.region}</InfoChip>
            </InfoRow>
            <Bio>{candidate.bio}</Bio>
            <ActionRow>
              <SecondaryButton to="/citoyen/candidats">Retour candidats</SecondaryButton>
              <PrimaryButton to="/citoyen/vote">Voter</PrimaryButton>
            </ActionRow>
          </div>
        </Header>
        <Section>
          <SectionTitle>Programme complet</SectionTitle>
          <ProgramBlock>
            <ProgramText>{candidate.programIntro}</ProgramText>
            <ProgramSectionTitle>Axes prioritaires</ProgramSectionTitle>
            <ProgramList>
              {candidate.programAxes.map((item) => (
                <ProgramItem key={item}>{item}</ProgramItem>
              ))}
            </ProgramList>
            <ProgramSectionTitle>Actions concretes</ProgramSectionTitle>
            <ProgramList>
              {candidate.programActions.map((item) => (
                <ProgramItem key={item}>{item}</ProgramItem>
              ))}
            </ProgramList>
            <ProgramSectionTitle>Budget & financement</ProgramSectionTitle>
            <ProgramList>
              {candidate.programBudget.map((item) => (
                <ProgramItem key={item}>{item}</ProgramItem>
              ))}
            </ProgramList>
            <ProgramSectionTitle>Calendrier de mise en oeuvre</ProgramSectionTitle>
            <ProgramList>
              {candidate.programTimeline.map((item) => (
                <ProgramItem key={item}>{item}</ProgramItem>
              ))}
            </ProgramList>
            <ProgramSectionTitle>Indicateurs de performance</ProgramSectionTitle>
            <ProgramList>
              {candidate.programKPIs.map((item) => (
                <ProgramItem key={item}>{item}</ProgramItem>
              ))}
            </ProgramList>
          </ProgramBlock>
        </Section>
      </Panel>
    </AppLayout>
  );
};

export default CitizenCandidateDetail;
