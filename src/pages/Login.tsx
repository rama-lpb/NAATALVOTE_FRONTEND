import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { LogoNaatalVote } from '../assets/LogoNaatalVote';
import { useState, type FormEvent } from 'react';
import { api, type UserDto } from '../services/api';
import { useAppDispatch } from '../store/hooks';
import { setSession } from '../store/authSlice';
import { getPhonesByCNI, getRoleDashboardPath } from '../data/mockData';

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

const OtpInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  border: 2px solid ${({ hasError }) => hasError ? 'rgba(176, 58, 46, 0.6)' : 'rgba(0, 0, 0, 0.18)'};
  border-radius: 16px;
  padding: 0.95rem 1.2rem;
  font-size: 1.3rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a3d28;
  background: #fafafa;
  outline: none;
  text-align: center;
  letter-spacing: 6px;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    border-color: rgba(31, 90, 51, 0.6);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
    background: #ffffff;
  }
  &::placeholder {
    color: #8a9a90;
    letter-spacing: 2px;
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
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.65) 0%, rgba(31, 90, 51, 0.5) 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(31, 90, 51, 0.5);
  cursor: pointer;
  margin-top: 0.8rem;
  animation: ${fadeUp} 1000ms ease-out;
  transition: all 0.2s ease;
  text-decoration: none;
  text-align: center;
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(31, 90, 51, 0.72) 0%, rgba(31, 90, 51, 0.58) 100%);
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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(8px);
  animation: ${fadeScale} 200ms ease-out;
`;

const PopupCard = styled.div`
  background: #e8ebe9;
  border-radius: 16px;
  padding: 1.8rem 2rem;
  max-width: 560px;
  width: 92%;
  box-shadow: 
    0 20px 45px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(31, 90, 51, 0.08);
  animation: ${fadeScale} 300ms ease-out;
  position: relative;
`;

const PopupIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(31, 90, 51, 0.15) 0%, rgba(31, 90, 51, 0.06) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.9rem;
  
  i {
    font-size: 1.3rem;
    color: #1f5a33;
  }
`;

const PopupTitle = styled.h2`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1a2e23;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.35rem;
  text-align: center;
`;

const PopupText = styled.p`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #4a5550;
  font-size: 0.85rem;
  margin: 0 0 1.2rem;
  text-align: center;
  line-height: 1.5;
  
  strong {
    color: #1f5a33;
  }
`;

const OtpDisplay = styled.div`
  background: rgba(31, 90, 51, 0.08);
  border: 1px dashed rgba(31, 90, 51, 0.25);
  border-radius: 10px;
  padding: 0.85rem;
  text-align: center;
  margin-bottom: 1.2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
`;

const OtpLabel = styled.span`
  display: block;
  color: #6b7570;
  font-size: 0.65rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 0.2rem;
`;

const OtpCode = styled.span`
  display: block;
  color: #1f5a33;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 4px;
`;

const PopupButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1.3rem;
  font-size: 0.95rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #1f5a33 0%, #2d7a45 100%);
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-top: 0.45rem;
  box-shadow: 0 3px 8px rgba(31, 90, 51, 0.25);
  
  &:hover:not(:disabled) {
    transform: translateY(-1.5px);
    box-shadow: 0 4px 12px rgba(31, 90, 51, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PopupSecondary = styled.button`
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1.3rem;
  font-size: 0.85rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: #5a6560;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.12);
    color: #2a3530;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const direction = 'none';

  const [cni, setCni] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ cni?: string; phone?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPhones, setIsLoadingPhones] = useState(false);
  const [availablePhones, setAvailablePhones] = useState<string[]>([]);
  const [hasSearchedPhones, setHasSearchedPhones] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loginError, setLoginError] = useState('');

  const simulatePhoneLookup = async (cniNumber: string) => {
    if (cniNumber.length < 5) return;
    
    setIsLoadingPhones(true);
    setHasSearchedPhones(true);
    setLoginError('');
    
    try {
      setAvailablePhones(getPhonesByCNI(cniNumber));
    } catch {
      setAvailablePhones([]);
    } finally {
      setIsLoadingPhones(false);
    }
  };

  const validateForm = () => {
    const newErrors: { cni?: string; phone?: string } = {};
    
    if (!cni.trim()) {
      newErrors.cni = 'Le numéro CNI est requis';
    } else if (cni.length < 5) {
      newErrors.cni = 'Le numéro CNI doit contenir au moins 5 caractères';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setLoginError('');
      
      try {
        const result = await api.auth.login(cni, phone);
        
        if (result.success && result.requiresOtp) {
          setEnteredOtp('');
          setOtpError('');
          setShowOtpPopup(true);
        } else {
          setLoginError(result.message || 'Erreur lors de la connexion');
        }
      } catch (error) {
        setLoginError('Erreur de connexion au serveur');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOtpVerification = async () => {
    setIsLoading(true);
    setOtpError('');
    
    try {
      const result = await api.auth.verifyOtp(cni, phone, enteredOtp);
      
      setShowOtpPopup(false);
      if (result.success && result.user) {
        const roles = (result.user.roles ?? []) as any[];
        const firstRole = roles[0] as any;
        dispatch(setSession({
          token: result.token,
          user: {
            id: result.user.id,
            nom: result.user.nom,
            prenom: result.user.prenom,
            email: result.user.email,
            roles,
          },
          currentRole: firstRole,
        }));
        if (roles.length > 1) {
          navigate('/portal');
        } else {
          navigate(getRoleDashboardPath(firstRole));
        }
      } else {
        setOtpError('Code OTP invalide');
      }
    } catch (error) {
      setOtpError('Code OTP invalide');
    } finally {
      setIsLoading(false);
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
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Envoi en cours...' : 'Se connecter'}
            </SubmitButton>
            <Helper style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              Cliquez pour recevoir un code OTP par SMS
            </Helper>
          </Form>
        </FormPanel>
      </Shell>
      
      {/* OTP Popup Modal */}
      {showOtpPopup && (
        <Overlay>
          <PopupCard>
            <PopupIcon>
              <i className="bi bi-shield-lock-fill" />
            </PopupIcon>
            <PopupTitle>Vérification OTP</PopupTitle>
            <PopupText>
              Un code de vérification a été envoyé au numéro : <strong>{phone}</strong>
            </PopupText>
            <OtpDisplay>
              <OtpLabel>Code OTP envoyé</OtpLabel>
              <OtpCode>Vérifiez vos messages puis saisissez le code.</OtpCode>
            </OtpDisplay>
            <FieldGroup>
              <FieldLabel htmlFor="popup-otp">Entrez le code OTP</FieldLabel>
              <OtpInput
                id="popup-otp"
                type="text" 
                placeholder="------"
                value={enteredOtp}
                onChange={(e) => {
                  setEnteredOtp(e.target.value);
                  if (otpError) setOtpError('');
                }}
                hasError={!!otpError}
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={6}
              />
              {otpError && <ErrorText role="alert">{otpError}</ErrorText>}
            </FieldGroup>
            <PopupButton onClick={handleOtpVerification} disabled={isLoading || enteredOtp.length !== 6}>
              {isLoading ? 'Vérification...' : 'Valider le code'}
            </PopupButton>
            <PopupSecondary onClick={() => setShowOtpPopup(false)}>
              Annuler
            </PopupSecondary>
          </PopupCard>
        </Overlay>
      )}
    </Page>
  );
};

export default Login;
