import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';

const Form = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 22px;
  padding: 1.6rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 1.2rem;
  border: 1px solid rgba(31, 90, 51, 0.1);
  backdrop-filter: blur(10px);
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const FieldGroup = styled.div`
  display: grid;
  gap: 0.45rem;
`;

const Label = styled.label`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #2f3b36;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Helper = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
  font-size: 0.8rem;
`;

const Field = styled.input`
  width: 100%;
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 14px;
  padding: 0.75rem 0.9rem;
  font-size: 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  background: rgba(255, 255, 255, 0.85);
  &:focus {
    border-color: rgba(31, 90, 51, 0.45);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
  }
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 14px;
  padding: 0.75rem 0.9rem;
  font-size: 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  background: rgba(255, 255, 255, 0.85);
  &:focus {
    border-color: rgba(31, 90, 51, 0.45);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 14px;
  padding: 0.75rem 0.9rem;
  font-size: 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  min-height: 120px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.85);
  &:focus {
    border-color: rgba(31, 90, 51, 0.45);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
  }
`;

const Notice = styled.div`
  padding: 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(31, 90, 51, 0.2);
  color: #2e4f3b;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.55);
  border-radius: 12px;
  padding: 0.65rem 1.2rem;
  background: rgba(31, 90, 51, 0.8);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  cursor: pointer;
`;

const GhostButton = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.25);
  border-radius: 12px;
  padding: 0.65rem 1.2rem;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  cursor: pointer;
`;

const AdminCreateElection = () => {
  const navItems = [
    { label: 'Tableau admin', to: '/admin/dashboard' },
    { label: 'Programmer election', to: '/admin/election/create' },
    { label: 'Candidats', to: '/admin/candidats' },
    { label: 'Statistiques', to: '/admin/statistiques' },
    { label: 'Rapports', to: '/admin/rapports' },
  ];

  return (
    <AppLayout
      role="Administrateur"
      title="Programmer une election"
      subtitle="Le systeme demarre et cloture automatiquement selon les dates definies."
      navItems={navItems}
    >
      <Form>
        <SectionTitle>Informations generales</SectionTitle>
        <Row>
          <FieldGroup>
            <Label>Titre du scrutin</Label>
            <Field placeholder="Presidentielle 2025" />
            <Helper>Nom officiel affiche aux citoyens.</Helper>
          </FieldGroup>
          <FieldGroup>
            <Label>Type d'election</Label>
            <Select defaultValue="">
              <option value="" disabled>
                Selectionnez le type
              </option>
              <option value="presidentielle">Presidentielle</option>
              <option value="legislative">Legislative</option>
              <option value="municipale">Municipale</option>
              <option value="regionale">Regionale</option>
            </Select>
          </FieldGroup>
        </Row>
        <FieldGroup>
          <Label>Description officielle</Label>
          <Textarea placeholder="Objectifs, regles et contexte du scrutin." />
        </FieldGroup>

        <SectionTitle>Calendrier automatise</SectionTitle>
        <Row>
          <FieldGroup>
            <Label>Date et heure de debut</Label>
            <Field type="datetime-local" />
          </FieldGroup>
          <FieldGroup>
            <Label>Date et heure de fin</Label>
            <Field type="datetime-local" />
          </FieldGroup>
        </Row>

        <SectionTitle>Configuration</SectionTitle>
        <Row>
          <FieldGroup>
            <Label>Candidats assignes</Label>
            <Field placeholder="Ajouter les candidats" />
          </FieldGroup>
          <FieldGroup>
            <Label>Zone / Region</Label>
            <Field placeholder="Region / Departement" />
          </FieldGroup>
        </Row>

        <Notice>
          Une fois programmee, l'election suit un cycle automatique. Aucun demarrage ou arret manuel n'est
          autorise pendant le scrutin.
        </Notice>

        <ActionRow>
          <PrimaryButton>Enregistrer</PrimaryButton>
          <GhostButton>Annuler</GhostButton>
        </ActionRow>
      </Form>
    </AppLayout>
  );
};

export default AdminCreateElection;
