import React, { forwardRef, ForwardedRef } from "react";
import { View } from "react-native";
import Dropdown, { DropDownPropsInterface } from "./Dropdown";

const genderList = [
  {
    label: "Masculino",
    value: "Male",
  },
  {
    label: "Feminino",
    value: "Female",
  },
  {
    label: "Outro",
    value: "Other",
  },
];

const GenderDropdown = forwardRef<View, GenderDropdownProps>(
  (props, ref: ForwardedRef<View>) => {
    return (
      <Dropdown
        {...props}
        list={genderList}
        label="Gênero"
        placeholder="Selecione o gênero"
        ref={ref}
      />
    );
  },
);

export type GenderDropdownProps = Omit<
  DropDownPropsInterface,
  "list" | "label" | "placeholder"
>;

export default GenderDropdown;
