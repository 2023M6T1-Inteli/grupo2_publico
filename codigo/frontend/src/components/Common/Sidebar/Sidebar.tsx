import { LinkStyled, LinksContainer, Logo, Wrapper } from './Styles';

import logo from '../../../assets/img/logo.svg';
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
  let location = useLocation();

  return (
    <Wrapper>
      <Logo src={logo} />
      <LinksContainer>
        <LinkStyled
          active={location.pathname.includes('/projects') ? 'true' : undefined}
          to={'/projects'}
        >
          Projetos
        </LinkStyled>
        <LinkStyled
          active={location.pathname.includes('/machines') ? 'true' : undefined}
          to={'/machines'}
        >
          Máquinas
        </LinkStyled>
      </LinksContainer>
    </Wrapper>
  );
}
