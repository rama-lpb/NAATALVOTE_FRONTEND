import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LogoNaatalVote } from '../assets/LogoNaatalVote';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem 2.2rem;
  background: rgba(120, 120, 120, 0.35);
  backdrop-filter: blur(3px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.18);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 3;
`;

const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2.1rem;
  font-weight: 800;
  color: #fff;
  font-family: 'Abhaya Libre', 'Poppins', Arial, Helvetica, sans-serif;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const LoginButton = styled(Link)`
  background: #1d4f2b;
  color: #fff;
  border: none;
  border-radius: 1.6rem;
  padding: 0.75rem 2.6rem;
  font-size: 1.25rem;
  font-weight: 600;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #256d3a;
  }
`;

export const Header = () => (
  <HeaderContainer>
    <LogoTitle>
      <LogoNaatalVote size={90} />
      NAATALVOTE
    </LogoTitle>
    <LoginButton to="/login">Se connecter</LoginButton>
  </HeaderContainer>
);
