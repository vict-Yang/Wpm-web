import { useSignOut, useAuthUser } from 'react-auth-kit'
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

const Header = () => {
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
                <HomeIcon onClick={() => {navigate("/")}} sx={{ml: 12, cursor: "pointer"}} fontSize="large"/>
            </Grid>
            <Grid item>
                <Button size="large" onClick={mySignOut} color="secondary">Sign Out</Button>
            </Grid>
            <Grid item>
                <Button size="large" onClick={() => {navigate("/leaderboard")}}>Leaderboard</Button>
            </Grid>
            <Grid item>
                <Button size="large" onClick={() => {navigate(`/profile/${username}`); window.location.reload()}}>Profile</Button>
            </Grid>
        </Grid>
    )
}

export default Header