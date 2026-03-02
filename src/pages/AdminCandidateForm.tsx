import styled from 'styled-components';
import { AppLayout } from '../components/AppLayout';

const Form = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.4rem;
  box-shadow: 0 16px 30px rgba(12, 24, 18, 0.08);
  display: grid;
  gap: 1rem;
  border: 1px solid rgba(31, 90, 51, 0.12);
  backdrop-filter: blur(10px);
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

const Field = styled.input`
  width: 100%;
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 14px;
  padding: 0.75rem 0.9rem;
  font-size: 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
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
  background: rgba(255, 255, 255, 0.9);
  &:focus {
    border-color: rgba(31, 90, 51, 0.45);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const Primary = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.55);
  border-radius: 12px;
  padding: 0.65rem 1.2rem;
  background: rgba(31, 90, 51, 0.8);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  cursor: pointer;
`;

const Ghost = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.25);
  border-radius: 12px;
  padding: 0.65rem 1.2rem;
  background: rgba(31, 90, 51, 0.12);
  color: rgba(31, 90, 51, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  cursor: pointer;
`;

const AdminCandidateForm = () => {
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
      title="Ajouter un candidat"
      subtitle="Informations officielles avant le demarrage du scrutin."
      navItems={navItems}
    >
      <Form>
        <Row>
          <FieldGroup>
            <Label>Nom</Label>
            <Field placeholder="Diop" />
          </FieldGroup>
          <FieldGroup>
            <Label>Prenom</Label>
            <Field placeholder="Amadou" />
          </FieldGroup>
        </Row>
        <Row>
          <FieldGroup>
            <Label>Parti politique</Label>
            <Field placeholder="Alliance Nouvelle Repubrique" />
          </FieldGroup>
          <FieldGroup>
            <Label>Programme (URL PDF)</Label>
            <Field placeholder="https://..." />
          </FieldGroup>
        </Row>
        <FieldGroup>
          <Label>Biographie</Label>
          <Textarea placeholder="Resume officiel du candidat" />
        </FieldGroup>
        <ActionRow>
          <Primary>Enregistrer</Primary>
          <Ghost>Annuler</Ghost>
        </ActionRow>
      </Form>
    </AppLayout>
  );
};

export default AdminCandidateForm;
