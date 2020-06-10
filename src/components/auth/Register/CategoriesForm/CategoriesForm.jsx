import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Chip} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1.5),
        '& > *': {
            margin: theme.spacing(0.5)
        },
    },
}));

const CategoriesForm = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} justify="center">
            <Chip label="Coronavirus Updates" variant="outlined"/>
            <Chip label="Photography" variant="outlined"/>
            <Chip label="Design" variant="outlined"/>
            <Chip label="Remote Work" variant="outlined"/>
            <Chip label="Business" variant="outlined"/>
            <Chip label="Beauty" variant="outlined"/>
            <Chip label="Books" variant="outlined"/>
            <Chip label="Travelling" variant="outlined"/>
            <Chip label="IT Industry" variant="outlined"/>
            <Chip label="Health" variant="outlined"/>
            <Chip label="Food" variant="outlined"/>
            <Chip label="Gaming" variant="outlined"/>
            <Chip label="Fashion" variant="outlined"/>
            <Chip label="Music" variant="outlined"/>
            <Chip label="Design" variant="outlined"/>
            <Chip label="Business" variant="outlined"/>

        </Grid>
    )
};


export default CategoriesForm;
