import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Chip} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1.5),
        '& > *': {
            margin: theme.spacing(0.5)
        }
    },
}));

const CategoriesForm = () => {
    const classes = useStyles();

    const [categories, setCategories] = React.useState([
        {key: 0, label: 'Coronavirus Updates'},
        {key: 1, label: 'Photography'},
        {key: 2, label: 'Design'},
        {key: 3, label: 'Remote Work'},
        {key: 4, label: 'Business'},
        {key: 5, label: 'Beauty'},
        {key: 6, label: 'Books'},
        {key: 7, label: 'Travelling'},
        {key: 8, label: 'IT Industry'},
        {key: 9, label: 'Health'},
        {key: 10, label: 'Food'},
        {key: 11, label: 'Gaming'},
        {key: 12, label: 'Fashion'},
        {key: 13, label: 'Music'},
        {key: 14, label: 'Design'},
        {key: 15, label: 'Family'}

    ]);


    return (
        <Grid container className={classes.root} justify="center">
            {categories.map(el => {
                return (
                    <span key={el.key}>
                        <Chip label={el.label} variant="outlined"/>
                    </span>
                )
            })}
        </Grid>
    )
};


export default CategoriesForm;
