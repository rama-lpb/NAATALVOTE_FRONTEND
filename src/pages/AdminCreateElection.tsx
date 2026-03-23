import styled from 'styled-components';
import { useState, type FormEvent } from 'react';
import { AppLayout } from '../components/AppLayout';
import Swal from 'sweetalert2';

const Form = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 90, 51, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
  display: grid;
  gap: 1.8rem;
  border: 1px solid rgba(31, 90, 51, 0.08);
  width: 100%;
`;

const FormContainer = styled.div`
  width: 100%;
`;

const SectionTitle = styled.h2`
  margin: 0 0 1.2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a3d28;
  font-size: 1.15rem;
  font-weight: 600;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid rgba(31, 90, 51, 0.12);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  
  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 20px;
    background: linear-gradient(180deg, #1f5a33 0%, #2d7a4a 100%);
    border-radius: 2px;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroup = styled.div`
  display: grid;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1f5a33;
  font-size: 0.88rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  &::after {
    content: '';
  }
`;

const Helper = styled.span<{ $error?: boolean }>`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  color: ${({ $error }) => $error ? '#c0392b' : '#6b7280'};
  margin-top: 0.2rem;
`;

const Field = styled.input<{ hasError?: boolean }>`
  width: 100%;
  border: 1.5px solid ${({ hasError }) => hasError ? '#e74c3c' : '#e2e8f0'};
  border-radius: 12px;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a202c;
  outline: none;
  background: #f8fafc;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: ${({ hasError }) => hasError ? '#e74c3c' : '#1f5a33'};
    background: #ffffff;
    box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? 'rgba(231, 76, 60, 0.15)' : 'rgba(31, 90, 51, 0.1)'};
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  width: 100%;
  border: 1.5px solid ${({ hasError }) => hasError ? '#e74c3c' : '#e2e8f0'};
  border-radius: 12px;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a202c;
  outline: none;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: ${({ hasError }) => hasError ? '#e74c3c' : '#1f5a33'};
    background: #ffffff;
    box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? 'rgba(231, 76, 60, 0.15)' : 'rgba(31, 90, 51, 0.1)'};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a202c;
  outline: none;
  min-height: 120px;
  resize: vertical;
  background: #f8fafc;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: #1f5a33;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const Notice = styled.div<{ $type?: 'info' | 'warning' | 'success' }>`
  padding: 1rem 1.2rem;
  border-radius: 14px;
  background: ${({ $type }) => 
    $type === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 
    $type === 'success' ? 'rgba(34, 197, 94, 0.1)' :
    'rgba(59, 130, 246, 0.08)'};
  border: 1px solid ${({ $type }) => 
    $type === 'warning' ? 'rgba(245, 158, 11, 0.3)' : 
    $type === 'success' ? 'rgba(34, 197, 94, 0.3)' :
    'rgba(59, 130, 246, 0.2)'};
  color: ${({ $type }) => 
    $type === 'warning' ? '#92400e' : 
    $type === 'success' ? '#166534' :
    '#1e40af'};
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
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
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid rgba(31, 90, 51, 0.08);
`;

const PrimaryButton = styled.button`
  border: none;
  border-radius: 14px;
  padding: 0.9rem 1.8rem;
  background: linear-gradient(135deg, #1f5a33 0%, #2d7a4a 100%);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(31, 90, 51, 0.25);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(31, 90, 51, 0.35);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const GhostButton = styled.button`
  border: 1.5px solid rgba(31, 90, 51, 0.3);
  border-radius: 14px;
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
      <FormContainer>
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
            <div style={{ position: 'relative' }}>
              <Field 
                id="region"
                name="region"
                placeholder="Tapez pour rechercher une région..."
                value={formData.region}
                onChange={handleChange}
                hasError={!!errors.region}
                aria-invalid={!!errors.region}
                aria-describedby={errors.region ? 'region-error' : undefined}
                list="region-suggestions"
              />
              <datalist id="region-suggestions">
                <option value="National" />
                <option value="Dakar" />
                <option value="Diourbel" />
                <option value="Fatick" />
                <option value="Kaffrine" />
                <option value="Kaolack" />
                <option value="Kédougou" />
                <option value="Kolda" />
                <option value="Louga" />
                <option value="Matam" />
                <option value="Saint-Louis" />
                <option value="Sédhiou" />
                <option value="Tambacounda" />
                <option value="Thiès" />
                <option value="Ziguinchor" />
              </datalist>
            </div>
            {errors.region && <Helper $error id="region-error">{errors.region}</Helper>}
          </FieldGroup>
        </Row>

        <Notice $type="success">
          <i className="bi bi-check-circle-fill" />
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
      </FormContainer>
    </AppLayout>
  );
};

export default AdminCreateElection;
