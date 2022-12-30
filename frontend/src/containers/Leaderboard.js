import axios from "../api";
import { useAuthUser } from "react-auth-kit";
import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';

const Leaderboard = () => {
    const auth = useAuthUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [topUsers, setTopUsers] = useState([]); // {username, bestWPM, ranking}
    const [self, setSelf] = useState({});

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

    return (
        <>
            <Button sx={{position: "absolute", top: "2%", right: "5%"}} size="large" onClick={() => {navigate("/")}}>Main Page</Button>
            <Container component="main" maxWidth="xs">
                <Box sx={{paddingTop: 20}}>
                    {loading? <h1>Hi</h1> : topUsers !== []? topUsers.map((user) => 
                        <Typography component="h1" variant="h4" color="textPrimary" key={user.ranking}>
                            {user.ranking} {user.username} {user.bestWPM}
                        </Typography>
                    ) : <></>}
                </Box>
            </Container>
        </>
    )
}

export default Leaderboard