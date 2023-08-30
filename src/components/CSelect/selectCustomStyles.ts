const selectCustomStyles = () => ({
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: '1px solid rgba(5, 1, 66, 0.10)',
    color: state.isSelected ? '#7D7B9B' : '#7D7B9B',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    height: '60px',
    backgroundColor: state.isSelected ? '#d1d1d1' : '##F5F5F5',
    '&:hover': {
      backgroundColor: state.isFocused ? '#e9e9e9' : '',
    },
  }),

  control: () => ({
    width: '100%',
    display: 'flex',
    backgroundColor: '#F5F5F5',
    height: '56px',
    borderRadius: '12px',
    fontSize: '18px',
    padding: '0 10px',
    cursor: 'pointer',
    color: '#7D7B9B',
  }),

  indicatorSeparator: () => ({
    border: 'none',
  }),

  menu: (defaultStyles: any) => ({
    ...defaultStyles,
    borderRadius: '12px',
    overflow: 'hidden',
  }),

  menuList: () => ({
    backgroundColor: '#fff',
    width: '100%',
    overflow: 'hidden',
  }),

  placeholder: (defaultStyles: any) => ({ ...defaultStyles, color: '#7D7B9B' }),
});

export default selectCustomStyles;
