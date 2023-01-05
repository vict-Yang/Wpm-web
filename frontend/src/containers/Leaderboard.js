import axios from "../api";
import { useAuthUser } from "react-auth-kit";
import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Header from "../components/Header";
import LoadingModal from "../components/LoadingModal";

const style = {
    margin: "1px", 
    "&:hover": {background: "#292929"}, 
    cursor:"pointer", 
    alignItems: "center",
}

const TabPanel = ({children, value, index}) => {
    const navigate = useNavigate();
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={1} sx={{marginLeft: "1px", marginRight: "1px", borderBottom: "1", borderColor:"divider"}}>
                <Grid item xs={1}>
                    <Typography component="h1" variant="h5" color="textSecondary">
                        Rank
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography component="h1" variant="h5" color="textSecondary">
                        Username
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography component="h1" variant="h5" color="textSecondary" align="center">
                        WPM
                    </Typography>
                </Grid>
            </Grid>
            {children.length > 0 && children.map((user) => (
                <Grid container key={user.ranking} spacing={1} sx={style} onClick={() => navigate(`/profile/${user.username}`)}>
                    <Grid item xs={1}>
                        <Typography component="h1" variant="h4" color="textPrimary">
                            {user.ranking}
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography component="h1" variant="h4" color="textPrimary">
                            {user.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography component="h1" variant="h4" color="textPrimary" align="center">
                            {user.bestWPM}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
          </Box>
        )}
      </div>
    );
  }

const Leaderboard = () => {
    const auth = useAuthUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [topUsers, setTopUsers] = useState([]); // {username, bestWPM, ranking}
    const [self, setSelf] = useState({});
    const [tabValue, setTabValue] = useState(0);

    const getUsers = async () => {
        setLoading(true);
        const response = await axios.get("/leaderboard", {params: {name: auth().name}});
        setTopUsers(response.data.topUsers);
        setSelf(response.data.self);
        setLoading(false);
    }

    useEffect(() => {
        getUsers();
    }, [])

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Header />
            <Container component="main" maxWidth="lg" sx={{pt: 5, background:"", height:"90vh"}}>
                <Box sx={{borderBottom: 2, borderColor: 'divider', background: "", minHeight: "81%"}}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                            <Tab label={<span style={{fontSize: "1.5em"}}>1-10</span>} disabled={!(topUsers.length > 0)}/>
                            <Tab label={<span style={{fontSize: "1.5em"}}>11-20</span>} disabled={!(topUsers.length > 10)}/>
                            <Tab label={<span style={{fontSize: "1.5em"}}>21-30</span>} disabled={!(topUsers.length > 20)}/>
                            <Tab label={<span style={{fontSize: "1.5em"}}>31-40</span>} disabled={!(topUsers.length > 30)}/>
                            <Tab label={<span style={{fontSize: "1.5em"}}>41-50</span>} disabled={!(topUsers.length > 40)}/>
                        </Tabs>
                    </Box>
                    <TabPanel value={tabValue} index={0} children={topUsers.slice(0, Math.min(10, topUsers.length))} />
                    <TabPanel value={tabValue} index={1} children={topUsers.slice(Math.min(10, topUsers.length), Math.min(20, topUsers.length))} />
                    <TabPanel value={tabValue} index={2} children={topUsers.slice(Math.min(20, topUsers.length), Math.min(30, topUsers.length))} />
                    <TabPanel value={tabValue} index={3} children={topUsers.slice(Math.min(30, topUsers.length), Math.min(40, topUsers.length))} />
                    <TabPanel value={tabValue} index={4} children={topUsers.slice(Math.min(40, topUsers.length), Math.min(50, topUsers.length))} />
                </Box>
                <Grid container spacing={1} sx={{marginTop: 3, "&:hover": {background: "#292929"}, cursor:"pointer"}} onClick={() => navigate(`/profile/${self.username}`)}>
                <Grid item xs={1}>
                        <Typography component="h1" variant="h4" color="textPrimary">
                            {self.ranking}
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography component="h1" variant="h4" color="textPrimary">
                            {self.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography component="h1" variant="h4" color="textPrimary" align="center">
                            {self.bestWPM}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <LoadingModal open={loading} />
        </>
    )
}

export default Leaderboard