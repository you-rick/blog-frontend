import React from "react";
import s from "../ArticleCardHome/Article.module.scss";
import {Card, CardMedia, CardContent, Box} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';


const ArticleCardHome = () => {
    return (
        <Card>
            <CardMedia
                component={Skeleton}
                width="100%"
                height={140}
                className={s.cardMedia}
                style={{transform: "none"}}
            />
            <CardContent>
                <Box m="0 0 1rem">
                    <Skeleton width="100%" height={40} style={{marginBottom: 12}}/>
                </Box>
                <Skeleton width="100%" style={{marginBottom: 6}}/>
                <Skeleton width="100%" style={{marginBottom: 6}}/>
                <Skeleton width="100%"/>
            </CardContent>

        </Card>
    )
};


export default ArticleCardHome;
