import { useSignOut, useAuthUser } from 'react-auth-kit'
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const MainPage = () => {
    const signOut = useSignOut();
    const navigate = useNavigate();
    const auth = useAuthUser();
    const username = auth().name;

    const mySignOut = () => {
        signOut();
        navigate("/signin");
    }
    
    return (
        <Grid container sx={{pt: 3}} spacing={2}>
            <Grid item xs={9}>
                <Typography component="h1" variant="h4" color="textPrimary" sx={{ml: 8}}>Main Page</Typography>
            </Grid>
            <Grid item>
                <Button size="large" onClick={mySignOut} color="secondary">Sign Out</Button>
            </Grid>
            <Grid item>
                <Button size="large">Leaderboard</Button>
            </Grid>
            <Grid item>
                <Button size="large" onClick={() => {navigate(`/profile/${username}`)}}>Profile</Button>
            </Grid>
        </Grid>
    )
}

export default MainPage