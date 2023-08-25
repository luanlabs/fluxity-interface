import { GroupBase, StylesConfig } from 'react-select';

type SelectItemType = {
  label: string;
  value: string;
};

export type ReactSelectType = StylesConfig<
  SelectItemType,
  boolean,
  GroupBase<SelectItemType>
>;
