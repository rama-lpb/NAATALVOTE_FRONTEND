import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 1;
  margin: 0;
  padding: 0;
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  margin: 0;
  padding: 0;
  video, img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    filter: brightness(0.92) saturate(0.98);
    position: absolute;
    z-index: 0;
    margin: 0;
    padding: 0;
    left: 0;
    top: 0;
    transform: translateX(0) translateY(0);
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    border: none;
    outline: none;
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.15);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  padding-top: 4rem;
`;

const HeroText = styled.div`
  background: rgba(30, 30, 30, 0.5);
  border-radius: 1.6rem;
  padding: 2.5rem 2.6rem;
  color: #fff;
  font-size: 1.65rem;
  font-weight: 500;
  max-width: 720px;
  text-align: left;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.22);
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  letter-spacing: 0.1px;
  pointer-events: auto;
  margin: 1.5rem auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  line-height: 1.4;
`;

const TrustRow = styled.div`
  margin-top: 1.2rem;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
  pointer-events: auto;
`;

const TrustPill = styled.div`
  background: rgba(22, 86, 56, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: rgba(255, 255, 255, 0.95);
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  letter-spacing: 0.2px;
`;

const ActionRow = styled.div`
  margin-top: 1.2rem;
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
  justify-content: center;
  pointer-events: auto;
`;

const SecondaryAction = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  padding: 0.55rem 1.2rem;
  font-size: 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  background: rgba(23, 76, 42, 0.4);
  transition: background 0.2s, border-color 0.2s;
  &:hover {
    background: rgba(23, 76, 42, 0.55);
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const FooterBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
`;

const FooterInner = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-evenly;
  gap: 0.8rem;
  flex-wrap: wrap;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.2rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-weight: 600;
  pointer-events: auto;
  padding: 0.8rem 1.2rem;
  background: transparent;
  border-radius: 0.8rem 0.8rem 0 0;
`;

const FooterLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  border-bottom: 2px solid rgba(120, 200, 150, 0.85);
  padding-bottom: 0.15rem;
  &:hover {
    border-bottom-color: rgba(160, 230, 190, 1);
  }
`;

interface HeroProps {
  videoSrc?: string;
  videoAlt?: string;
}

export const Hero = ({ videoSrc, videoAlt }: HeroProps) => {
  return (
    <HeroSection>
      <VideoBackground>
        {videoSrc ? (
          <img src={videoSrc} alt={videoAlt || 'Fond vidéo'} />
        ) : (
          <img src="/images/image_baniere.png" alt={videoAlt || 'Fond vidéo'} />
        )}
      </VideoBackground>
      <HeroContent>
        <HeroText>
          Participez au scrutin en toute sécurité, partout au Sénégal, et suivez les résultats en direct.
          <br />
          Votes chiffrés, anonymat du bulletin et publication des résultats vérifiable.
        </HeroText>
        <TrustRow>
          <TrustPill>Plateforme officielle</TrustPill>
          <TrustPill>Chiffrement des votes</TrustPill>
          <TrustPill>Assistance 24/7</TrustPill>
        </TrustRow>
        <ActionRow>
          <SecondaryAction to="/portal">Acceder au portail</SecondaryAction>
          <SecondaryAction to="/login">Connexion citoyen</SecondaryAction>
        </ActionRow>
      </HeroContent>
      <FooterBar>
        <FooterInner>
          <FooterLink href="#">Mentions légales</FooterLink>
          <FooterLink href="#">Politique de confidentialité</FooterLink>
          <FooterLink href="#">Accessibilité</FooterLink>
          <FooterLink href="#">Support citoyen</FooterLink>
        </FooterInner>
      </FooterBar>
    </HeroSection>
  );
};
