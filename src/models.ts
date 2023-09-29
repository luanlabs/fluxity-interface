import {
  GroupBase,
  StylesConfig,
  MultiValue,
  SingleValue,
  ActionMeta,
} from 'react-select';

export interface SelectItemType {
  label: string;
  value: string;
}

export interface SelectTokenType extends SelectItemType {
  icon: string;
}

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
