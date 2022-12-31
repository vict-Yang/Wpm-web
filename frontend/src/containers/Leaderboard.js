import axios from "../api";
import { useAuthUser } from "react-auth-kit";
import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TabPanel = ({children, value, index}) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children.length > 0 && children.map((user) => (
                <Typography color="textPrimary">
                    {user.ranking} {user.username} {user.bestWPM}
                </Typography>
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
        const response = await axios.get("/leaderboard", {params: {name: auth().name}});
        setTopUsers(response.data.topUsers);
        setSelf(response.data.self);
        console.log(topUsers)
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
            <Button sx={{position: "absolute", top: "2%", right: "5%"}} size="large" onClick={() => {navigate("/")}}>Main Page</Button>
            <Container component="main" maxWidth="lg" sx={{pt: 10/*background:"white"*/}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                        <Tab label={<span style={{fontSize: "1.5em"}}>1-10</span>}/>
                        <Tab label={<span style={{fontSize: "1.5em"}}>11-20</span>}/>
                        <Tab label={<span style={{fontSize: "1.5em"}}>21-30</span>}/>
                        <Tab label={<span style={{fontSize: "1.5em"}}>31-40</span>}/>
                        <Tab label={<span style={{fontSize: "1.5em"}}>41-50</span>}/>
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0} children={topUsers.slice(0, Math.min(10, topUsers.length))} />
                <TabPanel value={tabValue} index={1} children={topUsers.slice(Math.min(10, topUsers.length), Math.min(20, topUsers.length))} />
                <TabPanel value={tabValue} index={2} children={topUsers.slice(Math.min(20, topUsers.length), Math.min(30, topUsers.length))} />
                <TabPanel value={tabValue} index={3} children={topUsers.slice(Math.min(30, topUsers.length), Math.min(40, topUsers.length))} />
                <TabPanel value={tabValue} index={4} children={topUsers.slice(Math.min(40, topUsers.length), Math.min(50, topUsers.length))} />
                {/* <Box sx={{paddingTop: 20}}>
                    {loading? <h1>Hi</h1> : topUsers !== []? topUsers.map((user) => 
                        <Typography component="h1" variant="h4" color="textPrimary" key={user.ranking}>
                            {user.ranking} {user.username} {user.bestWPM}
                        </Typography>
                    ) : <></>}
                </Box> */}
            </Container>
        </>
    )
}

export default Leaderboard