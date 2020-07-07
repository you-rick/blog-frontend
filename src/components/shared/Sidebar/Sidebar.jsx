import React, {useEffect} from "react";
import {List, Typography, Box} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {requestSidebarUsers, requestSidebarArticles} from "../../../store/sidebarReducer";
import User from "./User/User";
import ArticlePreview from "./ArticlePreview/ArticlePreview";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '20rem',
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(2)
    },
    inline: {
        display: 'inline',
    },
}));

const Sidebar = (props) => {
    const {users, articles} = props;
    const classes = useStyles();

    useEffect(() => {
        props.requestSidebarUsers(1, 5);
    }, []);

    useEffect(() => {
        props.requestSidebarArticles(1, 3, '', '');
    }, []);

    return (
        <>
            <Typography variant="h6" component="h2">Best on Small</Typography>
            <Box boxShadow={1} m="0 0 2rem">
                <List className={classes.root}>
                    {articles.map((article, index) => (
                        <ArticlePreview key={article._id} index={index} {...article} />
                    ))}
                </List>
            </Box>

            <Typography variant="h6" component="h2">Popular Authors</Typography>
            <Box boxShadow={1}>
                <List className={classes.root}>
                    {users.map((user) => (
                        <User key={user._id} {...user} />
                    ))}
                </List>
            </Box>

        </>
    )
};

const mapStateToProps = (state) => ({
    users: state.sidebar.users,
    articles: state.sidebar.articles
});


export default connect(mapStateToProps, {requestSidebarUsers, requestSidebarArticles})(Sidebar);
