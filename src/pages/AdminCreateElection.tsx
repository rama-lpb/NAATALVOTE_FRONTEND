import styled from 'styled-components';
import { useState, type FormEvent } from 'react';
import { AppLayout } from '../components/AppLayout';
import Swal from 'sweetalert2';

const Form = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 22px;
  padding: 1.6rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 1.4rem;
  border: 1px solid rgba(31, 90, 51, 0.1);
  backdrop-filter: blur(10px);
  max-width: 900px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(31, 90, 51, 0.1);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
`;

const FieldGroup = styled.div`
  display: grid;
  gap: 0.45rem;
`;

const Label = styled.label`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a3d28;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Helper = styled.span<{ $error?: boolean }>`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: ${({ $error }) => $error ? '#b03a2e' : '#6b6f72'};
`;

const Field = styled.input<{ hasError?: boolean }>`
  width: 100%;
  border: 1px solid ${({ hasError }) => hasError ? 'rgba(176, 58, 46, 0.5)' : 'rgba(31, 90, 51, 0.2)'};
  border-radius: 14px;
  padding: 0.75rem 0.9rem;
  font-size: 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  background: rgba(255, 255, 255, 0.85);
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    border-color: rgba(31, 90, 51, 0.45);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
  }
  &::placeholder {
    color: #8a9a90;
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  width: 100%;
  border: 1px solid ${({ hasError }) => hasError ? 'rgba(176, 58, 46, 0.5)' : 'rgba(31, 90, 51, 0.2)'};
  border-radius: 14px;
  padding: 0.75rem 0.9rem;
  font-size: 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  outline: none;
  background: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
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
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    border-color: rgba(31, 90, 51, 0.45);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
  }
  &::placeholder {
    color: #8a9a90;
  }
`;

const Notice = styled.div<{ $type?: 'info' | 'warning' | 'success' }>`
  padding: 1rem 1.2rem;
  border-radius: 16px;
  background: ${({ $type }) => 
    $type === 'warning' ? 'rgba(210, 140, 30, 0.1)' : 
    $type === 'success' ? 'rgba(31, 90, 51, 0.1)' :
    'rgba(255, 255, 255, 0.88)'};
  border: 1px solid ${({ $type }) => 
    $type === 'warning' ? 'rgba(210, 140, 30, 0.3)' : 
    $type === 'success' ? 'rgba(31, 90, 51, 0.3)' :
    'rgba(31, 90, 51, 0.2)'};
  color: ${({ $type }) => 
    $type === 'warning' ? '#8a5a10' : 
    $type === 'success' ? '#1a5a33' :
    '#2e4f3b'};
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  
  i {
    font-size: 1.1rem;
    margin-top: 0.1rem;
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  padding-top: 0.5rem;
`;

const PrimaryButton = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.55);
  border-radius: 12px;
  padding: 0.75rem 1.4rem;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.9) 0%, rgba(31, 90, 51, 0.75) 100%);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(31, 90, 51, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const GhostButton = styled.button`
  border: 1px solid rgba(31, 90, 51, 0.25);
  border-radius: 12px;
  padding: 0.75rem 1.4rem;
  background: rgba(31, 90, 51, 0.08);
  color: rgba(31, 90, 51, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(31, 90, 51, 0.15);
  }
`;

interface FormData {
  title: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  region: string;
}

interface FormErrors {
  title?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  region?: string;
}

const AdminCreateElection = () => {
  const navItems = [
    { label: 'Tableau admin', to: '/admin/dashboard' },
    { label: 'Programmer election', to: '/admin/election/create' },
    { label: 'Candidats', to: '/admin/candidats' },
    { label: 'Statistiques', to: '/admin/statistiques' },
    { label: 'Rapports', to: '/admin/rapports' },
  ];

  const [formData, setFormData] = useState<FormData>({
    title: '',
    type: '',
    description: '',
    startDate: '',
    endDate: '',
    region: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const now = new Date();

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre du scrutin est requis';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Le titre doit contenir au moins 3 caractères';
    }

    if (!formData.type) {
      newErrors.type = 'Veuillez sélectionner un type d\'élection';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'La date de début est requise';
    } else {
      const startDate = new Date(formData.startDate);
      // Allow scheduling 1 hour in advance minimum
      const minDate = new Date(now.getTime() + 60 * 60 * 1000);
      if (startDate < minDate && startDate.toDateString() !== now.toDateString()) {
        newErrors.startDate = 'La date de début doit être à venir (au moins 1h)';
      }
    }

    if (!formData.endDate) {
      newErrors.endDate = 'La date de fin est requise';
    } else if (formData.startDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate <= startDate) {
        newErrors.endDate = 'La date de fin doit être postérieure à la date de début';
      }
    }

    if (!formData.region.trim()) {
      newErrors.region = 'La zone/région est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Show error notification
      Swal.fire({
        icon: 'error',
        title: 'Formulaire incomplet',
        text: 'Veuillez corriger les erreurs avant de soumettre.',
        customClass: {
          container: 'naatal-swal',
          title: 'swal2-title',
          htmlContainer: 'swal2-html-container',
        },
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);

    // Success notification
    await Swal.fire({
      icon: 'success',
      title: 'Élection programmée',
      text: 'Le scrutin a été programmé avec succès. Il démarrera automatiquement à la date prévue.',
      customClass: {
        container: 'naatal-swal',
        title: 'swal2-title',
        htmlContainer: 'swal2-html-container',
        confirmButton: 'swal-confirm',
      },
    });

    // Reset form
    setFormData({
      title: '',
      type: '',
      description: '',
      startDate: '',
      endDate: '',
      region: '',
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Annuler la création ?',
      text: 'Toutes les informations saisies seront perdues.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, annuler',
      cancelButtonText: 'Continuer',
      customClass: {
        container: 'naatal-swal',
        title: 'swal2-title',
        htmlContainer: 'swal2-html-container',
        confirmButton: 'swal-confirm',
        cancelButton: 'swal-cancel',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.history.back();
      }
    });
  };

  return (
    <AppLayout
      role="Administrateur"
      title="Programmer une election"
      subtitle="Le systeme demarre et cloture automatiquement selon les dates definies."
      navItems={navItems}
    >
      <Form onSubmit={handleSubmit}>
        <SectionTitle>Informations générales</SectionTitle>
        <Row>
          <FieldGroup>
            <Label htmlFor="title">Titre du scrutin *</Label>
            <Field 
              id="title"
              name="title"
              placeholder="Ex: Présidentielle 2025"
              value={formData.title}
              onChange={handleChange}
              hasError={!!errors.title}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && <Helper $error id="title-error">{errors.title}</Helper>}
            <Helper>Nom officiel affiché aux citoyens.</Helper>
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="type">Type d'élection *</Label>
            <Select 
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              hasError={!!errors.type}
              aria-invalid={!!errors.type}
              aria-describedby={errors.type ? 'type-error' : undefined}
            >
              <option value="">Sélectionnez le type</option>
              <option value="presidentielle">Présidentielle</option>
              <option value="legislative">Législative</option>
              <option value="municipale">Municipale</option>
              <option value="regionale">Régionale</option>
            </Select>
            {errors.type && <Helper $error id="type-error">{errors.type}</Helper>}
          </FieldGroup>
        </Row>
        <FieldGroup>
          <Label htmlFor="description">Description officielle</Label>
          <Textarea 
            id="description"
            name="description"
            placeholder="Objectifs, règles et contexte du scrutin..."
            value={formData.description}
            onChange={handleChange}
          />
          <Helper>Informations visibles par les citoyens (optionnel).</Helper>
        </FieldGroup>

        <SectionTitle>Calendrier automatisé</SectionTitle>
        <Row>
          <FieldGroup>
            <Label htmlFor="startDate">Date et heure de début *</Label>
            <Field 
              id="startDate"
              name="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={handleChange}
              hasError={!!errors.startDate}
              aria-invalid={!!errors.startDate}
              aria-describedby={errors.startDate ? 'startDate-error' : undefined}
            />
            {errors.startDate && <Helper $error id="startDate-error">{errors.startDate}</Helper>}
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="endDate">Date et heure de fin *</Label>
            <Field 
              id="endDate"
              name="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={handleChange}
              hasError={!!errors.endDate}
              aria-invalid={!!errors.endDate}
              aria-describedby={errors.endDate ? 'endDate-error' : undefined}
            />
            {errors.endDate && <Helper $error id="endDate-error">{errors.endDate}</Helper>}
          </FieldGroup>
        </Row>

        <SectionTitle>Configuration</SectionTitle>
        <Row>
          <FieldGroup>
            <Label htmlFor="region">Zone / Région *</Label>
            <Field 
              id="region"
              name="region"
              placeholder="Ex: National, Dakar, Thiès..."
              value={formData.region}
              onChange={handleChange}
              hasError={!!errors.region}
              aria-invalid={!!errors.region}
              aria-describedby={errors.region ? 'region-error' : undefined}
            />
            {errors.region && <Helper $error id="region-error">{errors.region}</Helper>}
          </FieldGroup>
        </Row>

        <Notice $type="info">
          <i className="bi bi-info-circle-fill" />
          <div>
            <strong>Important :</strong> Une fois programmée, l'élection suit un cycle automatique. 
            Le système démarre et clôture automatiquement selon les dates définies. Aucune intervention 
            manuelle n'est possible pendant le scrutin.
          </div>
        </Notice>

        <ActionRow>
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enregistrement...' : 'Programmer l\'élection'}
          </PrimaryButton>
          <GhostButton type="button" onClick={handleCancel}>
            Annuler
          </GhostButton>
        </ActionRow>
      </Form>
    </AppLayout>
  );
};

export default AdminCreateElection;
