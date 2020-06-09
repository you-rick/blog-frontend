const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#fff'
    },
    toolBar: {
        justifyContent: 'space-between'
    },
    brand: {
        fontFamily: 'Vollkorn',
        fontSize: '24px',
        fontWeight: '700'
    },
    aside: {
        display: 'flex'
    },
    title: {
        flexGrow: 1,
        display: 'none',
    },
    search: {
        position: 'relative',
        marginLeft: 0,
        display: 'flex',
        alignItems: 'center'
    },
    searchIcon: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            }
        }
    }
});

export default styles;
