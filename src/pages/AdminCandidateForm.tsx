import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import Swal from 'sweetalert2';
import { api, type ElectionDto } from '../services/api';

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

const Helper = styled.span<{ $error?: boolean }>`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: ${({ $error }) => ($error ? '#c0392b' : '#8a9a90')};
  font-size: 0.75rem;
`;

const Field = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#e74c3c' : 'rgba(31, 90, 51, 0.2)')};
  border-radius: 12px;
  padding: 0.65rem 0.9rem;
  font-size: 0.9rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#e74c3c' : 'rgba(31, 90, 51, 0.5)')};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(231,76,60,0.12)' : 'rgba(31, 90, 51, 0.1)')};
  }
`;

const Select = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#e74c3c' : 'rgba(31, 90, 51, 0.2)')};
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
    border-color: ${({ $hasError }) => ($hasError ? '#e74c3c' : 'rgba(31, 90, 51, 0.5)')};
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.1);
  }
`;

const Textarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#e74c3c' : 'rgba(31, 90, 51, 0.2)')};
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
    border-color: ${({ $hasError }) => ($hasError ? '#e74c3c' : 'rgba(31, 90, 51, 0.5)')};
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
  background: rgba(31, 90, 51, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(31, 90, 51, 0.22);
  transition: all 0.2s;
  &:hover:not(:disabled) { background: rgba(31, 90, 51, 0.72); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
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

const PreviewAvatar = styled.div`
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
  background: rgba(138, 90, 16, 0.04);
  border-radius: 18px;
  padding: 1rem 1.1rem;
  border: 1px solid rgba(138, 90, 16, 0.2);
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

interface FormData {
  election_id: string;
  prenom: string;
  nom: string;
  parti: string;
  biographie: string;
  photo_url: string;
  programme_url: string;
}

interface FormErrors {
  election_id?: string;
  prenom?: string;
  nom?: string;
  parti?: string;
  biographie?: string;
}

const AdminCandidateForm = () => {
  const navigate = useNavigate();
  const [elections, setElections] = useState<ElectionDto[]>([]);
  const [loadingElections, setLoadingElections] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    election_id: '',
    prenom: '',
    nom: '',
    parti: '',
    biographie: '',
    photo_url: '',
    programme_url: '',
  });

  useEffect(() => {
    api.elections.list()
      .then((data) => setElections(data.filter((e) => e.statut !== 'CLOTUREE')))
      .catch(() => setElections([]))
      .finally(() => setLoadingElections(false));
  }, []);

  const initials = `${formData.prenom.charAt(0)}${formData.nom.charAt(0)}`.toUpperCase() || 'CA';
  const displayName = formData.prenom || formData.nom ? `${formData.prenom} ${formData.nom}`.trim() : 'Nouveau candidat';
  const selectedElection = elections.find((e) => e.id === formData.election_id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.election_id) e.election_id = 'Sélectionnez une élection';
    if (!formData.prenom.trim()) e.prenom = 'Le prénom est requis';
    if (!formData.nom.trim()) e.nom = 'Le nom est requis';
    if (!formData.parti.trim()) e.parti = 'Le parti politique est requis';
    if (!formData.biographie.trim()) e.biographie = 'La biographie est requise';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      Swal.fire({
        icon: 'error',
        title: 'Formulaire incomplet',
        text: 'Veuillez corriger les erreurs avant de soumettre.',
        buttonsStyling: false,
        customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
      });
      return;
    }

    const confirm = await Swal.fire({
      title: 'Ajouter ce candidat ?',
      html: `<p style="font-family:Poppins,sans-serif;font-size:0.88rem;color:#5a6d62;margin:0;">
        <strong>${displayName}</strong> sera ajouté à l'élection <strong>${selectedElection?.titre ?? ''}</strong>.
        Vérifiez bien les informations — aucune modification n'est possible après le démarrage du scrutin.
      </p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    });
    if (!confirm.isConfirmed) return;

    setSubmitting(true);
    try {
      await api.candidats.create({
        election_id: formData.election_id,
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        parti_politique: formData.parti.trim(),
        biographie: formData.biographie.trim(),
        photo_url: formData.photo_url.trim(),
        programme_url: formData.programme_url.trim(),
      });

      await Swal.fire({
        icon: 'success',
        title: 'Candidat ajouté',
        text: `${displayName} a été ajouté avec succès.`,
        confirmButtonText: 'Voir les candidats',
        buttonsStyling: false,
        customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
      });

      navigate('/admin/candidats');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue.';
      Swal.fire({
        icon: 'error',
        title: 'Erreur lors de l\'ajout',
        text: msg,
        buttonsStyling: false,
        customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm' },
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Annuler ?',
      text: 'Les informations saisies seront perdues.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, annuler',
      cancelButtonText: 'Continuer',
      buttonsStyling: false,
      customClass: { popup: 'naatal-swal', confirmButton: 'swal-confirm', cancelButton: 'swal-cancel' },
    }).then((r) => { if (r.isConfirmed) navigate('/admin/candidats'); });
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
              <Field
                name="prenom"
                placeholder="Amadou"
                value={formData.prenom}
                onChange={handleChange}
                $hasError={!!errors.prenom}
              />
              {errors.prenom && <Helper $error>{errors.prenom}</Helper>}
            </FieldGroup>
            <FieldGroup>
              <Label>Nom <Required>*</Required></Label>
              <Field
                name="nom"
                placeholder="Diop"
                value={formData.nom}
                onChange={handleChange}
                $hasError={!!errors.nom}
              />
              {errors.nom && <Helper $error>{errors.nom}</Helper>}
            </FieldGroup>
          </Row>
          <Row>
            <FieldGroup>
              <Label>Parti politique <Required>*</Required></Label>
              <Field
                name="parti"
                placeholder="Alliance Nouvelle Republique"
                value={formData.parti}
                onChange={handleChange}
                $hasError={!!errors.parti}
              />
              {errors.parti && <Helper $error>{errors.parti}</Helper>}
            </FieldGroup>
            <FieldGroup>
              <Label>Election ciblee <Required>*</Required></Label>
              <Select
                name="election_id"
                value={formData.election_id}
                onChange={handleChange}
                $hasError={!!errors.election_id}
                disabled={loadingElections}
              >
                <option value="">{loadingElections ? 'Chargement...' : 'Selectionnez une election'}</option>
                {elections.map((e) => (
                  <option key={e.id} value={e.id}>{e.titre} — {e.statut === 'EN_COURS' ? 'En cours' : 'Programmee'}</option>
                ))}
              </Select>
              {errors.election_id && <Helper $error>{errors.election_id}</Helper>}
            </FieldGroup>
          </Row>

          <Divider />
          <SectionTitle><i className="bi bi-file-person" />Informations complementaires</SectionTitle>

          <FieldGroup>
            <Label>Biographie officielle <Required>*</Required></Label>
            <Textarea
              name="biographie"
              placeholder="Resume officiel du candidat (parcours, engagement, vision...)"
              value={formData.biographie}
              onChange={handleChange}
              $hasError={!!errors.biographie}
            />
            {errors.biographie && <Helper $error>{errors.biographie}</Helper>}
            <Helper>Maximum 500 mots recommandes.</Helper>
          </FieldGroup>
          <Row>
            <FieldGroup>
              <Label>Photo (URL)</Label>
              <Field
                name="photo_url"
                placeholder="https://..."
                value={formData.photo_url}
                onChange={handleChange}
              />
              <Helper>URL publique vers la photo officielle.</Helper>
            </FieldGroup>
            <FieldGroup>
              <Label>Programme (URL PDF)</Label>
              <Field
                name="programme_url"
                placeholder="https://..."
                value={formData.programme_url}
                onChange={handleChange}
              />
              <Helper>Lien vers le document de programme electoral.</Helper>
            </FieldGroup>
          </Row>

          <ActionRow>
            <PrimaryButton onClick={handleSave} disabled={submitting}>
              <i className="bi bi-check2" />
              {submitting ? 'Enregistrement...' : 'Enregistrer'}
            </PrimaryButton>
            <GhostButton type="button" onClick={handleCancel} disabled={submitting}>
              <i className="bi bi-x" />Annuler
            </GhostButton>
          </ActionRow>
        </MainForm>

        <SidePanel>
          <PreviewCard>
            <SectionTitle style={{ justifyContent: 'center', fontSize: '0.85rem' }}>Apercu carte candidat</SectionTitle>
            <PreviewAvatar>{initials}</PreviewAvatar>
            <PreviewName>{displayName}</PreviewName>
            <PreviewParty>{formData.parti || 'Parti politique'}</PreviewParty>
            <PreviewBadge>
              <i className="bi bi-calendar2-check" />
              {selectedElection ? selectedElection.titre : 'Election non definie'}
            </PreviewBadge>
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
