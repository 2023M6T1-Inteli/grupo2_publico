import { ButtonStyled } from "./Styles";

export interface ButtonProps {
  variant: 'primary' | 'outline'
  text: string
  onClick: () => void
}

export default function Button(props: ButtonProps) {
  return (
    <ButtonStyled onClick={props.onClick} variant={props.variant}>{props.text}</ButtonStyled>
  )
} 