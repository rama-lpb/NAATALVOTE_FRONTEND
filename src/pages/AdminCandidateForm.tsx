import styled from 'styled-components';
import { useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import Swal from 'sweetalert2';

const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.2rem;
  align-items: start;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const MainForm = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.6rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 1.1rem;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(31, 90, 51, 0.1);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FieldGroup = styled.div`
  display: grid;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #2f3b36;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const Required = styled.span`
  color: rgba(176, 58, 46, 0.8);
  font-size: 0.8rem;
`;

const Helper = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #8a9a90;
  font-size: 0.75rem;
`;

const Field = styled.input`
  width: 100%;
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 12px;
  padding: 0.65rem 0.9rem;
  font-size: 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  &:focus {
    border-color: rgba(31, 90, 51, 0.5);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 12px;
  padding: 0.65rem 0.9rem;
  font-size: 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  cursor: pointer;
  &:focus {
    border-color: rgba(31, 90, 51, 0.5);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 12px;
  padding: 0.65rem 0.9rem;
  font-size: 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  min-height: 110px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  &:focus {
    border-color: rgba(31, 90, 51, 0.5);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.1);
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  padding-top: 0.4rem;
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid rgba(31, 90, 51, 0.55);
  border-radius: 12px;
  padding: 0.65rem 1.2rem;
  background: rgba(31, 90, 51, 0.85);
  color: #fff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(31, 90, 51, 0.22);
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.95); }
`;

const GhostButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid rgba(31, 90, 51, 0.22);
  border-radius: 12px;
  padding: 0.65rem 1.1rem;
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: rgba(31, 90, 51, 0.14); }
`;

const SidePanel = styled.div`
  display: grid;
  gap: 1rem;
  align-content: start;
`;

const PreviewCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  padding: 1.4rem;
  box-shadow: 0 14px 28px rgba(12, 24, 18, 0.08);
  border: 1px solid rgba(31, 90, 51, 0.12);
  display: grid;
  gap: 0.8rem;
  text-align: center;
`;

const PreviewAvatar = styled.div<{ $initials: string }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.8), rgba(31, 90, 51, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  color: #fff;
  margin: 0 auto;
  box-shadow: 0 4px 14px rgba(31, 90, 51, 0.25);
`;

const PreviewName = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  color: #1a2e20;
  font-size: 1rem;
`;

const PreviewParty = styled.div`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b7a72;
  font-size: 0.82rem;
`;

const PreviewBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: rgba(31, 90, 51, 0.1);
  color: rgba(31, 90, 51, 0.85);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0 auto;
  width: fit-content;
`;

const NoticeCard = styled.div`
  background: rgba(255, 255, 255, 0.88);
  border-radius: 18px;
  padding: 1rem 1.1rem;
  border: 1px solid rgba(138, 90, 16, 0.2);
  background: rgba(138, 90, 16, 0.04);
  color: rgba(100, 65, 10, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  line-height: 1.5;
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
`;

const navItems = [
  { label: 'Tableau admin', to: '/admin/dashboard' },
  { label: 'Programmer election', to: '/admin/election/create' },
  { label: 'Gestion candidats', to: '/admin/candidats' },
  { label: 'Statistiques', to: '/admin/statistiques' },
  { label: 'Rapports', to: '/admin/rapports' },
];

const AdminCandidateForm = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [parti, setParti] = useState('');

  const initials = `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase() || 'CA';
  const displayName = prenom || nom ? `${prenom} ${nom}`.trim() : 'Nouveau candidat';

  const handleSave = () => {
    Swal.fire({
      icon: 'success',
      title: 'Candidat enregistre',
      text: `${displayName} a ete ajoute avec succes.`,
      confirmButtonText: 'OK',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
    });
  };

  return (
    <AppLayout
      role="Administrateur"
      title="Ajouter un candidat"
      subtitle="Informations officielles avant le demarrage du scrutin."
      navItems={navItems}
    >
      <Form>
        <MainForm>
          <SectionTitle><i className="bi bi-person-badge" />Identite du candidat</SectionTitle>
          <Row>
            <FieldGroup>
              <Label>Prenom <Required>*</Required></Label>
              <Field placeholder="Amadou" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </FieldGroup>
            <FieldGroup>
              <Label>Nom <Required>*</Required></Label>
              <Field placeholder="Diop" value={nom} onChange={(e) => setNom(e.target.value)} />
            </FieldGroup>
          </Row>
          <Row>
            <FieldGroup>
              <Label>Parti politique <Required>*</Required></Label>
              <Field placeholder="Alliance Nouvelle Republique" value={parti} onChange={(e) => setParti(e.target.value)} />
            </FieldGroup>
            <FieldGroup>
              <Label>Election ciblee <Required>*</Required></Label>
              <Select defaultValue="">
                <option value="" disabled>Selectionnez une election</option>
                <option value="pres-2025">Presidentielle 2025</option>
                <option value="leg-dkr">Legislatives Dakar</option>
                <option value="mun-pik">Municipales Pikine</option>
              </Select>
            </FieldGroup>
          </Row>

          <Divider />
          <SectionTitle><i className="bi bi-file-person" />Informations complementaires</SectionTitle>

          <FieldGroup>
            <Label>Biographie officielle <Required>*</Required></Label>
            <Textarea placeholder="Resume officiel du candidat (parcours, engagement, vision...)" />
            <Helper>Maximum 500 mots recommandes.</Helper>
          </FieldGroup>
          <Row>
            <FieldGroup>
              <Label>Photo (URL)</Label>
              <Field placeholder="https://..." />
              <Helper>URL publique vers la photo officielle.</Helper>
            </FieldGroup>
            <FieldGroup>
              <Label>Programme (URL PDF)</Label>
              <Field placeholder="https://..." />
              <Helper>Lien vers le document de programme electoral.</Helper>
            </FieldGroup>
          </Row>

          <ActionRow>
            <PrimaryButton onClick={handleSave}><i className="bi bi-check2" />Enregistrer</PrimaryButton>
            <GhostButton><i className="bi bi-x" />Annuler</GhostButton>
          </ActionRow>
        </MainForm>

        <SidePanel>
          <PreviewCard>
            <SectionTitle style={{ justifyContent: 'center', fontSize: '0.85rem' }}>Apercu carte candidat</SectionTitle>
            <PreviewAvatar $initials={initials}>{initials}</PreviewAvatar>
            <PreviewName>{displayName}</PreviewName>
            <PreviewParty>{parti || 'Parti politique'}</PreviewParty>
            <PreviewBadge><i className="bi bi-calendar2-check" />Election non definie</PreviewBadge>
          </PreviewCard>

          <NoticeCard>
            <i className="bi bi-exclamation-triangle" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
            <span>
              Une fois l'election demarree, <strong>aucune modification</strong> ne sera autorisee
              sur les candidats. Verifiez toutes les informations avant d'enregistrer.
            </span>
          </NoticeCard>
        </SidePanel>
      </Form>
    </AppLayout>
  );
};

export default AdminCandidateForm;
