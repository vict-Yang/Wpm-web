import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import axios from "../api"
import PsModal from "../components/PsModal";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from "../components/Header";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import { RecentWPM } from "../components/RecentWPM"

const Profile = () => {
    const authHeader = useAuthHeader();
    const auth = useAuthUser();
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [exist, setExist] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");
    const [status, setStatus] = useState("success");
    const [loading, setLoading] = useState(true);
    const [recentWPM, setRecentWPM] = useState([]);
    const { username } = useParams();

    const getUser = async (username) => {
        const {data:{message, user}} = await axios.get("/user", {params: {username}});
        if(message === "Found") {
            setExist(true)
            setRecentWPM(user.recentWPM)
        }  
        setLoading(false);
    }

    useEffect(() => {
        getUser(username);
    }, [])

    const changePassword = async (values, actions) => {
        if(values.newPassword !== values.confirmPassword)
            alert("Password does not match");
        else
        {
            try {
                const response = await axios.post("/changePassword", 
                    {oldPassword: values.oldPassword, newPassword: values.newPassword}, 
                    {headers: {"Authorization": authHeader()}
                });
                setSnackbarOpen(true);
                setStatus("success");
                setStatusMsg(response.data.message);
                setModalOpen(false);
            }
            catch(e) {
                setSnackbarOpen(true)
                setStatus("error");
                setStatusMsg(e.response.data.message);
            }
        }
        actions.resetForm();
        actions.setSubmitting(false);
    }

    return (
        <div>
            <Header />
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert severity={status} sx={{ width: '100%' }} onClose={() => setSnackbarOpen(false)}>
                    {statusMsg}
                </Alert>
            </Snackbar>
            <Container component="main" maxWidth="xl" sx={{ marginTop: 6 }}>
                {loading? <></> : !exist? 
                    <Box sx={{marginTop: 20}}>
                        <Typography component="h1" variant="h1" color="textPrimary" align="center">404</Typography> 
                        <Typography component="h1" variant="h2" color="textPrimary" align="center">User Not Found</Typography> 
                    </Box>
                    : 
                    <Box> 
                        <Grid container sx={{marginLeft: 2, borderBottom: 1, borderColor: "divider", alignItems: "center", justifyContent: 'space-around'}}>
                            <Grid item>
                                <Typography component="h1" variant="h3" color="textPrimary">{username}'s Profile</Typography>
                            </Grid>
                            <Grid item>
                                {auth().name === username? <Button variant="outlined" onClick={() => setModalOpen(true)}>Change Password</Button> : <></>}
                            </Grid>
                        </Grid>
                        <Box sx={{marginTop: 6, display: 'flex', justifyContent: 'center'}}>
                            <RecentWPM
                                xDataKey={"second"}
                                dataKey={"wpm"}
                                recentWPM={recentWPM}
                            />
                        </Box>
                        <PsModal open={modalOpen} changePassword={changePassword} onClose={() => setModalOpen(false)}/>         
                    </Box>
                }
            </Container>
            {/* <Container component="main" maxWidth="xl" sx={{
                marginTop: 6,
                display: 'flex',
                justifyContent: 'center',
            }}>
                {(loading)? <></> : <RecentWPM
                xDataKey={"second"}
                dataKey={"wpm"}
                recentWPM={recentWPM}
                />}
            </Container> */}
        </div>
    )
}

export default Profile