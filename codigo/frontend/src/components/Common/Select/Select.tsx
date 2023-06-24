import React from 'react';
import Select, { StylesConfig } from 'react-select';
import { Label, Wrapper } from './Styles';

interface IOption {
  value: string;
  label: string;
}

interface ISelect {
  options: IOption[];
  onChange?: any;
  placeholder?: string;
  label: string
  required?: boolean
}

const customStyles: StylesConfig<IOption, false> = {
  control: (provided, state) => ({
    ...provided,
    fontSize: '13px',
    border: state.isFocused ? '1px solid #E7E7E7' : '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: state.isFocused ? '0 0 0 1px #E7E7E7' : 'none',
    '&:hover': {
      borderColor: '#E7E7E7',
      boxShadow: '0 0 0 1px #E7E7E7'
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray',
    fontSize: '13px',
  }),
  option: (provided) => ({
    ...provided,
    background: '#F5F5F5',
    fontSize: '13px',
    color: '#333',
    borderBottom: '2px solid #fff',
    '&:hover': {
      background: '#E0E0E0',
    },
  }),
};

const MySelect = (props: ISelect) => {
  
  return (
    <Wrapper>
      <Label>{props.label as string}</Label>
      <Select
        required={props.required}
        options={props.options}
        onChange={props.onChange}
        placeholder={props.placeholder}
        styles={customStyles}
      />
    </Wrapper>
  );
};

export default MySelect;