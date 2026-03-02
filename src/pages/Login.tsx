import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { LogoNaatalVote } from '../assets/LogoNaatalVote';

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
`;

const ImagePanel = styled.div`
  position: relative;
  padding: 2rem 0 2rem 2rem;
  display: flex;
  align-items: center;
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
  gap: 1.4rem;
  position: relative;
  padding-top: 4rem;
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

const Field = styled.input`
  width: 100%;
  max-width: 460px;
  border: 2px solid rgba(0, 0, 0, 0.18);
  border-radius: 16px;
  padding: 0.95rem 1.2rem;
  font-size: 1.2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #1f5a33;
  outline: none;
  animation: ${fadeUp} 1200ms ease-out;
  &:focus {
    border-color: rgba(31, 90, 51, 0.6);
    box-shadow: 0 0 0 3px rgba(31, 90, 51, 0.12);
  }
`;

const SubmitButton = styled(Link)`
  width: 100%;
  max-width: 460px;
  border: none;
  border-radius: 14px;
  padding: 0.9rem 1.4rem;
  font-size: 1.4rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #ffffff;
  background: rgba(31, 90, 51, 0.85);
  border: 1px solid rgba(31, 90, 51, 0.6);
  cursor: pointer;
  margin-top: 0.6rem;
  animation: ${fadeUp} 1000ms ease-out;
  transition: background 0.2s;
  text-decoration: none;
  text-align: center;
  &:hover {
    background: rgba(31, 90, 51, 0.95);
  }
`;

const Login = () => {
  const location = useLocation();
  const direction =
    (location.state as { from?: string } | null)?.from === 'register'
      ? 'right'
      : 'none';

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
          <Title>Connectez vous</Title>
          <Tabs>
            <TabLink to="/login" $active>
              Connexion
            </TabLink>
            <TabLink to="/register" state={{ from: 'login' }}>
              Inscription
            </TabLink>
          </Tabs>
          <Field placeholder="Numéro CNI" />
          <Field type="password" placeholder="Mot de passe" />
          <SubmitButton to="/portal">Se connecter</SubmitButton>
        </FormPanel>
      </Shell>
    </Page>
  );
};

export default Login;
