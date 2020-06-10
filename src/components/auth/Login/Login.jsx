import React from "react";
import {Box, Container, TextField, FormControlLabel, Button, Checkbox, Grid, Link} from "@material-ui/core";

const Login = () => {
    return (
        <Box m="6rem 0">
            <Container maxWidth="xs">
            <form>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />
                <Button type="submit" fullWidth variant="contained" color="primary">
                    Sign In
                </Button>
                <Box m="2rem 0 0">
                    <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">Forgot password?</Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">{"Don't have an account? Sign Up"}</Link>
                    </Grid>
                </Grid>
                </Box>
            </form>
        </Container>
        </Box>
    )
};


export default Login
