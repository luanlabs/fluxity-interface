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
    backgroundColor: state.isSelected ? '#e9e9e9' : '##F5F5F5',
    border: 'none',

    '&:hover': {
      backgroundColor: state.isFocused ? '#e9e9e9' : '',
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
    fontSize: '12.6px',
    cursor: 'pointer',
    position: 'absolute',
    bottom: '46px',
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
    top: '-50px',
    border: 'solid 1px rgba(5, 1, 66, 0.01)',
  }),

  menuList: () => ({
    backgroundColor: '#fff',
    width: '100%',
    overflow: 'hidden',
  }),

  placeholder: (defaultStyles: any) => ({ ...defaultStyles, color: '#050142' }),
};

export default selectStyles;
