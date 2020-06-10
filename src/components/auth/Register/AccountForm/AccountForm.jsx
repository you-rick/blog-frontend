import React from "react";
import {Box, Grid, TextField} from "@material-ui/core";

const AccountForm = () => {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="repeatPassword"
                        name="repeatPassword"
                        label="Repeat password"
                        type="password"
                        fullWidth
                    />
                </Grid>

            </Grid>
        </Box>
    )
};


export default AccountForm;
