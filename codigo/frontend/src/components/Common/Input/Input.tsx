import { InputStyled, Label, Wrapper } from "./Styles";

export interface InputProps {
  type?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  label?: string;
  margin?: string;
  name?: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export default function Input(props: InputProps) {
  return (
    <Wrapper width={props.width} margin={props.margin}>
      <Label>{props.label}</Label>
      <InputStyled
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder as string}
      />
    </Wrapper>
  );
}
