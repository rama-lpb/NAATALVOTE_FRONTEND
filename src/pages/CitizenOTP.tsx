import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

const Card = styled.section`
  width: min(520px, 92vw);
  padding: 2rem 2.2rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 16px 30px rgba(12, 24, 18, 0.12);
  border: 1px solid rgba(31, 90, 51, 0.12);
`;

const Title = styled.h1`
  margin: 0;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #22312a;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Text = styled.p`
  margin: 0.6rem 0 1.2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  color: #6b6f72;
`;

const Field = styled.input`
  width: 100%;
  border: 1px solid rgba(31, 90, 51, 0.2);
  border-radius: 14px;
  padding: 0.85rem 1rem;
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

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const Primary = styled(Link)`
  text-decoration: none;
  padding: 0.7rem 1.2rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(31, 90, 51, 0.55);
  color: #ffffff;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
`;

const Secondary = styled(Link)`
  text-decoration: none;
  padding: 0.7rem 1.2rem;
  border-radius: 12px;
  background: rgba(31, 90, 51, 0.12);
  border: 1px solid rgba(31, 90, 51, 0.25);
  color: rgba(31, 90, 51, 0.9);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 500;
`;

const CitizenOTP = () => (
  <Page>
    <Card>
      <Title>Verification OTP</Title>
      <Text>Un code a ete envoye par SMS. Saisissez-le pour continuer.</Text>
      <Field placeholder="Code OTP" />
      <ActionRow>
        <Primary to="/portal">Valider</Primary>
        <Secondary to="/login">Retour</Secondary>
      </ActionRow>
    </Card>
  </Page>
);

export default CitizenOTP;
