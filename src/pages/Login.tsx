import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { LogoNaatalVote } from '../assets/LogoNaatalVote';
import { useState, type FormEvent } from 'react';
import { 
  getPhonesByCNI, 
  validateOTP, 
  hasMultipleRoles, 
  getRoleDashboardPath
} from '../data/mockData';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(80px) rotateY(-45deg);
  }
  50% {
    transform: translateX(-10px) rotateY(5deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0) rotateY(0deg);
  }
`;

const slideInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-80px) rotateY(45deg);
  }
  50% {
    transform: translateX(10px) rotateY(-5deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0) rotateY(0deg);
  }
`;

const Page = styled.main<{ $direction?: 'left' | 'right' | 'none' }>`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  position: relative;
  animation: ${({ $direction }) => {
      if ($direction === 'left') return slideInLeft;
      if ($direction === 'right') return slideInRight;
      return fadeScale;
    }}
    2000ms ease-in-out;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Shell = styled.section`
  width: 90vw;
  height: 95vh;
  display: grid;
  grid-template-columns: 55% 45%;
  background: #ffffff;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.18);
  border-radius: 28px;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100vh;
    border-radius: 0;
  }
`;

const ImagePanel = styled.div`
  position: relative;
  padding: 2rem 0 2rem 2rem;
  display: flex;
  align-items: center;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const ImageFrame = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 36px 40px 40px 36px;
  overflow: hidden;
  position: relative;
  background-image: url('/images/connexion.png');
  background-size: cover;
  background-position: center;
  clip-path: polygon(0 0, 100% 0, 92% 100%, 0 100%);
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(28, 88, 52, 0.22);
  }
`;

const FormPanel = styled.div`
  padding: 2.6rem 4.2rem 3.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.2rem;
  position: relative;
  padding-top: 4rem;
  
  @media (max-width: 900px) {
    padding: 1.5rem;
    padding-top: 5rem;
  }
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #1e5a33;
  font-family: 'Abhaya Libre', 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 1.2px;
  margin-top: 0.6rem;
  animation: ${fadeUp} 450ms ease-out;
  text-transform: uppercase;
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  color: #1f5a33;
  text-decoration: none;
  font-size: 1.05rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  background: rgba(31, 90, 51, 0.1);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  backdrop-filter: blur(2px);
  transition: background 0.2s, opacity 0.2s;
  opacity: 0.9;
  z-index: 9999;
  pointer-events: auto;
  display: block;
  width: auto;
  height: auto;
  &:hover {
    background: rgba(31, 90, 51, 0.2);
    opacity: 1;
  }
`;

const Title = styled.h1`
  margin: 0.2rem 0 0;
  color: #1f5a33;
  font-family: 'Abhaya Libre', 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  animation: ${fadeUp} 700ms ease-out;
`;

const Tabs = styled.div`
  width: 100%;
  max-width: 460px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 2px solid rgba(25, 80, 45, 0.35);
  border-radius: 14px;
  overflow: hidden;
  margin-top: 1.6rem;
  margin-bottom: 1.2rem;
  animation: ${fadeUp} 800ms ease-out;
`;

const TabLink = styled(Link)<{ $active?: boolean }>`
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1.2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: ${({ $active }) => ($active ? '#ffffff' : '#1f5a33')};
  background: ${({ $active }) => ($active ? '#1f5a33' : '#ffffff')};
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: background 0.2s ease, color 0.2s ease;
  &:hover {
    background: ${({ $active }) => ($active ? '#245f37' : '#f4f7f4')};
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const FieldLabel = styled.label`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1a3d28;
`;

const Field = styled.input<{ hasError?: boolean }>`
  width: 100%;
  border: 2px solid ${({ hasError }) => hasError ? 'rgba(176, 58, 46, 0.6)' : 'rgba(0, 0, 0, 0.18)'};
  border-radius: 16px;
  padding: 0.95rem 1.2rem;
  font-size: 1.1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a3d28;
  background: #fafafa;
  outline: none;
  animation: ${fadeUp} 1200ms ease-out;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    border-color: rgba(31, 90, 51, 0.6);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
    background: #ffffff;
  }
  &::placeholder {
    color: #8a9a90;
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  width: 100%;
  border: 2px solid ${({ hasError }) => hasError ? 'rgba(176, 58, 46, 0.6)' : 'rgba(0, 0, 0, 0.18)'};
  border-radius: 16px;
  padding: 0.95rem 1.2rem;
  font-size: 1.1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a3d28;
  background: #fafafa;
  outline: none;
  cursor: pointer;
  animation: ${fadeUp} 1200ms ease-out;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    border-color: rgba(31, 90, 51, 0.6);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
    background: #ffffff;
  }
`;

const ErrorText = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #b03a2e;
  margin-left: 0.3rem;
`;

const Helper = styled.span`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: #6b6f72;
`;

const SubmitButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 1rem 1.4rem;
  font-size: 1.2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.9) 0%, rgba(31, 90, 51, 0.75) 100%);
  border: 1px solid rgba(31, 90, 51, 0.5);
  cursor: pointer;
  margin-top: 0.8rem;
  animation: ${fadeUp} 1000ms ease-out;
  transition: all 0.2s ease;
  text-decoration: none;
  text-align: center;
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(31, 90, 51, 1) 0%, rgba(31, 90, 51, 0.85) 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(31, 90, 51, 0.3);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ForgotPassword = styled(Link)`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  color: #1f5a33;
  text-decoration: none;
  text-align: center;
  margin-top: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const direction = 'none';

  const [cni, setCni] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<{ cni?: string; phone?: string; otp?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPhones, setIsLoadingPhones] = useState(false);
  const [availablePhones, setAvailablePhones] = useState<string[]>([]);
  const [hasSearchedPhones, setHasSearchedPhones] = useState(false);

  // Look up phone numbers by CNI
  const simulatePhoneLookup = async (cniNumber: string) => {
    if (cniNumber.length < 5) return;
    
    setIsLoadingPhones(true);
    setHasSearchedPhones(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Use centralized mock data to get phone numbers
    const phones = getPhonesByCNI(cniNumber);
    setAvailablePhones(phones.length > 0 ? phones : []);
    
    setIsLoadingPhones(false);
  };

  const validateForm = () => {
    const newErrors: { cni?: string; phone?: string; otp?: string } = {};
    
    if (!cni.trim()) {
      newErrors.cni = 'Le numéro CNI est requis';
    } else if (cni.length < 5) {
      newErrors.cni = 'Le numéro CNI doit contenir au moins 5 caractères';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    }
    
    if (!otp.trim()) {
      newErrors.otp = 'Le code OTP est requis';
    } else if (otp.length !== 6) {
      newErrors.otp = 'Le code OTP doit contenir 6 chiffres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      // Validate OTP against mock data
      const user = validateOTP(cni, phone, otp);
      
      setTimeout(() => {
        setIsLoading(false);
        if (user) {
          // Check if user has multiple roles
          if (hasMultipleRoles(user)) {
            // Store user info with all roles in sessionStorage
            sessionStorage.setItem('user', JSON.stringify({
              id: user.id,
              nom: user.nom,
              prenom: user.prenom,
              email: user.email,
              roles: user.roles,
              currentRole: user.roles[0]
            }));
            // Redirect to portal for role selection
            navigate('/portal');
          } else {
            // Single role - redirect directly to dashboard
            sessionStorage.setItem('user', JSON.stringify({
              id: user.id,
              nom: user.nom,
              prenom: user.prenom,
              email: user.email,
              roles: user.roles,
              currentRole: user.roles[0]
            }));
            window.location.href = getRoleDashboardPath(user.roles[0]);
          }
        } else {
          setErrors({ otp: 'Code OTP invalide' });
        }
      }, 1200);
    }
  };

  return (
    <Page $direction={direction}>
      <Shell>
        <BackLink to="/">← Accueil</BackLink>
        <ImagePanel>
          <ImageFrame />
        </ImagePanel>
        <FormPanel>
          <LogoRow>
            <LogoNaatalVote size={120} />
            NATAALVOTE
          </LogoRow>
          <Title>Connectez-vous</Title>
          <Tabs>
            <TabLink to="/login" $active>
              Connexion
            </TabLink>
            <TabLink to="/register" state={{ from: 'login' }}>
              Inscription
            </TabLink>
          </Tabs>
          <Form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <FieldLabel htmlFor="cni">Numéro CNI</FieldLabel>
              <Field 
                id="cni"
                type="text" 
                placeholder="Entrez votre numéro CNI"
                value={cni}
                onChange={(e) => {
                  setCni(e.target.value);
                  if (errors.cni) setErrors(prev => ({ ...prev, cni: undefined }));
                  // Trigger phone lookup when CNI is entered
                  if (e.target.value.length >= 5) {
                    simulatePhoneLookup(e.target.value);
                  } else {
                    setHasSearchedPhones(false);
                    setAvailablePhones([]);
                    setPhone('');
                  }
                }}
                hasError={!!errors.cni}
                aria-describedby={errors.cni ? 'cni-error' : undefined}
                aria-invalid={!!errors.cni}
                autoComplete="username"
              />
              {errors.cni && <ErrorText id="cni-error" role="alert">{errors.cni}</ErrorText>}
            </FieldGroup>
            <FieldGroup>
              <FieldLabel htmlFor="phone">Numéro de téléphone</FieldLabel>
              {!hasSearchedPhones ? (
                <Helper style={{ color: '#8a9a90', fontStyle: 'italic' }}>
                  Entrez d'abord votre CNI pour voir les numéros associés
                </Helper>
              ) : isLoadingPhones ? (
                <Helper style={{ color: '#1f5a33' }}>
                  Recherche des numéros associés en cours...
                </Helper>
              ) : availablePhones.length > 0 ? (
                <>
                  <Select
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                    }}
                    hasError={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    aria-invalid={!!errors.phone}
                  >
                    <option value="">Sélectionnez un numéro</option>
                    {availablePhones.map((p, idx) => (
                      <option key={idx} value={p}>{p}</option>
                    ))}
                  </Select>
                  {errors.phone && <ErrorText id="phone-error" role="alert">{errors.phone}</ErrorText>}
                </>
              ) : (
                <Helper style={{ color: '#8a5a10' }}>
                  Aucun numéro trouvé pour ce CNI
                </Helper>
              )}
            </FieldGroup>
            <FieldGroup>
              <FieldLabel htmlFor="otp">Code OTP</FieldLabel>
              <Field 
                id="otp"
                type="text" 
                placeholder="Entrez le code OTP (ex: 123456)"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  if (errors.otp) setErrors(prev => ({ ...prev, otp: undefined }));
                }}
                hasError={!!errors.otp}
                aria-describedby={errors.otp ? 'otp-error' : undefined}
                aria-invalid={!!errors.otp}
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={6}
              />
              {errors.otp && <ErrorText id="otp-error" role="alert">{errors.otp}</ErrorText>}
            </FieldGroup>
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Vérification...' : 'Se connecter'}
            </SubmitButton>
            <Helper style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              Le code OTP a été envoyé à votre numéro de téléphone
            </Helper>
          </Form>
        </FormPanel>
      </Shell>
    </Page>
  );
};

export default Login;
