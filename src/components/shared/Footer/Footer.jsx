import React from 'react';
import s from './Footer.module.scss';
import {Container, Grid, Typography, Divider, IconButton} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


const Footer = () => {
    const scrollTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    return (
        <footer className={s.mainFooter}>
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item md={4}>
                        <Typography variant="h6" component="h2" gutterBottom={true}>Discover Small</Typography>
                        <Typography variant="body2" component="p">
                            Welcome to a place where words matter.
                            On Small, smart voices and original ideas
                            take center stage - with no ads in sight.
                        </Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant="h6" component="h2" gutterBottom={true}>Make Small yours</Typography>
                        <Typography variant="body2" component="p">
                            Follow all the topics you care about, and we’ll deliver
                            the best stories for you to your homepage and inbox
                        </Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant="h6" component="h2" gutterBottom={true}>Become a member</Typography>
                        <Typography variant="body2" component="p">
                            Being a good writer leads to being a better and more coherent thinker.
                        </Typography>
                    </Grid>
                </Grid>
                <Divider variant="middle" className={s.divider}/>
                <Grid container justify="space-between" alignItems="center">
                    <Typography variant="h4" className={s.brand} component={NavLink} to="/">
                        Small
                    </Typography>
                    <IconButton onClick={scrollTop}>
                        <ArrowUpwardIcon fontSize="large" className={s.upIcon}/>
                    </IconButton>
                </Grid>
            </Container>
        </footer>
    );
};


export default Footer;
