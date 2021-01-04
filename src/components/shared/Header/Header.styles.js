const themeStyles = (theme) => ({
  brand: {
    fontWeight: '700',
    fontFamily: 'Vollkorn',
    color: '#222',
    letterSpacing: '-1px',
  },
  searchInput: {
    marginRight: '1rem',
    padding: theme.spacing(1),
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: '4px',
    width: '8rem',
    transition: theme.transitions.create('width'),
    '&:focus': {
      width: '12rem',
    },
  },
  sliderButton: {
    textAlign: 'center',
  },
  divider: {
    margin: '0 0.5rem',
  },
});

export default themeStyles;
