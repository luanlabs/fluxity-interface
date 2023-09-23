import {
  GroupBase,
  StylesConfig,
  MultiValue,
  SingleValue,
  ActionMeta,
} from 'react-select';

type SelectItemType = {
  label: string;
  value: string;
};

export type ReactSelectType = StylesConfig<
  SelectItemType,
  boolean,
  GroupBase<SelectItemType>
>;

export type ReactSelectOnChangeType = (
  newValue: MultiValue<SelectItemType> | SingleValue<SelectItemType>,
  actionMeta: ActionMeta<SelectItemType>
) => void;

export type SvgProps = {
  fill?: string;
};
