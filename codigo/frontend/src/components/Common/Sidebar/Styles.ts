import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 20vw;
  height: 100vh;
  border-radius: 0 4rem 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0 0 0;
  box-shadow: 4px 2px 4px rgba(177, 169, 169, 0.25), 4px 2px 4px 0px #B1A9A940;
`

export const Logo = styled.img`
  width: 80%;
  height: auto;
`

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 4rem;
`

interface LinkProps {
  active: boolean
}

export const LinkStyled = styled(Link)<LinkProps>`
  text-align: center;
  text-decoration: none;
  color: ${(props) => props.active ? '#fff' : '#000'};
  padding: .8rem;
  width: 100%;
  background: ${(props) => props.active ? '#528265' : '#E7E7E7'};
`