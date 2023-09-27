import { CSSObjectWithLabel } from 'react-select';

import { ReactSelectType } from 'src/models';

const selectStyles: ReactSelectType = {
  option: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    height: '25px',
    fontSize: '10px',
    color: '050142',
    backgroundColor: state.isSelected ? '#F0EFFF' : '##F5F5F5',
    border: 'none',
    borderRadius: '6px',

    '&:hover': {
      backgroundColor: state.isFocused ? '#f0EFFF' : '',
    },
  }),

  control: () => ({
    width: '96px',
    height: '28px',
    paddingLeft: '5px',
    display: 'flex',
    backgroundColor: '#fff',
    color: '#050142',
    borderRadius: '6px',
    fontSize: '12.8px',
    cursor: 'pointer',
    position: 'absolute',
    bottom: '15px',
    right: '15px',
  }),

  indicatorSeparator: () => ({
    border: 'none',
  }),

  menu: (defaultStyles: any) => ({
    ...defaultStyles,
    borderRadius: '6px',
    overflow: 'hidden',
    width: '96px',
    right: '15px',
    top: '-20px',
    border: 'none',
    boxShadow: 'none',
  }),

  menuList: () => ({
    backgroundColor: '#fff',
    width: '100%',
    overflow: 'hidden',
    padding: '6px',
  }),

  placeholder: (defaultStyles: any) => ({ ...defaultStyles, color: '#050142' }),
};

export default selectStyles;
