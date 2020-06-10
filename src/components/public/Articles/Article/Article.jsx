import React from "react";
import {Container, Box, Grid, Typography} from "@material-ui/core";


const Article = () => {

    return (
        <>
            <Container maxWidth="md">
                <Typography component="h1" variant="h4" align="center" className="headline">
                    I Tried Living Like A Stereotypical “French Girl” & It Changed My Life
                </Typography>
                <Box m="3rem 0" alignItems="center">
                    <Grid container justify="center">
                        <img src="/images/placeholder/post.jpg" alt="Article Image"/>
                    </Grid>
                </Box>
                <Typography variant="body1">
                    <p>Like any country, France is "different"; it's a special place, with its ways, its quirks, its
                    wonderful variety, its joie-de-vivre and its bureaucracy. Depending on circumstances, life in France
                    can be anything from incredibly relaxed to frustratingly rigid; and almost without exception, French
                    people are nothing like the hackneyed stereotypes that are so often relayed in cartoons and in the
                    media.</p><br/>
                    <p>Stereotypes die hard; there is still a comic-book stereotype image of the Frenchman dressed in a
                    striped tee-shirt and beret, smoking a Gauloise, and carrying a string of onions round his neck; or
                    else driving a Citroën 2CV to market, with two chickens and a rabbit on the back seat. But it is
                    doubtful if this stereotype still exists anywhere; perhaps just here and there, but without the
                    onions, and certainly not in modern urban France. And the iconic 2CV or "Deux-chevaux" is today a
                    rare site on French roads.... though less so than 20 years ago, as so many of them have been
                    lovingly rescued from scrap and renovated to their former glory.</p><br/>
                    <p>Even so, rural France is still home to a dwindling generation of traditional country folk, living
                    life as it used to be; and the heritage and traditions of the past are being carefully preserved and
                    even reactivated by younger generations, often fugitives from city-life. The old France is still
                    alive and well, in its own way, and still to be found in its villages and markets, traditions and
                    regional specialities, such as the vast and very varied choice of French cheeses. And of course, it
                    is true that the French eat snails - and very good they are too, as long as they have been properly
                    prepared by the chef, in a delicious sauce of garlic, parsley and butter.... But they certainly
                    don't eat snails every day.... They may have been a peasant dish in bygone days, but they're a
                    luxury today, served in the best restaurants.</p><br/>
                    <p>As for frogs' legs, even the French are turning away from them. Frogs are now protected species in
                    the wild in France, and most frogs' legs served in restaurants, except in the best restaurants, are
                    imported. In 2017 a report by the French Natural History Museum highlighted the environmental
                    disaster caused by the culling of frogs in Asia and Africa, for export to France and other
                    countries; so we're passing on the message. Don't eat frogs' legs in France, or anywhere else for
                    that matter. Some traditions are very worth maintaining; others need to stop, and eating frogs' legs
                    is one of these.</p>
                </Typography>
            </Container>
        </>
    )
};


export default Article;
