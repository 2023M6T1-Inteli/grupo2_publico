import styled from "styled-components"
import { ButtonProps } from "./Button"

export const ButtonStyled = styled.button<{ variant: string | undefined }>`
  padding: .5rem 1rem;
  border-radius: .5rem;
  border: ${(props) => props.variant === 'primary' ? 'none' : '1px solid #528265'};
  background: ${(props) => props.variant === 'primary' ? '#528265' : '#fff'};
  color: ${(props) => props.variant === 'primary' ? '#fff' : '#528265'};
  transition: .2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`