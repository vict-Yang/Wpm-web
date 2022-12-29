import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import axios from "../api"
import PsModal from "../components/PsModal";
import Typography from '@mui/material/Typography';

const Profile = () => {
    const navigate = useNavigate();
    const authHeader = useAuthHeader();
    const auth = useAuthUser();
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [exist, setExist] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");
    const [status, setStatus] = useState("success");
    const [loading, setLoading] = useState(true);
    const { username } = useParams();

    const getUser = async (username) => {
        const {data:{message}} = await axios.get("/user", {params: {username}});
        if(message === "Found") {
            setExist(true)
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
            {loading? <></> : !exist? <h1>User Not Found</h1> : 
                <>
                    <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                        <Alert severity={status} sx={{ width: '100%' }} onClose={() => setSnackbarOpen(false)}>
                            {statusMsg}
                        </Alert>
                    </Snackbar>
                    <Typography component="h1" variant="h4" color="textPrimary" >{username}'s Profile</Typography>
                    <Button sx={{position: "absolute", top: "2%", right: "5%"}} size="large" onClick={() => {navigate("/")}}>Main Page</Button>
                    {auth().name === username? <Button variant="outlined" onClick={() => setModalOpen(true)}>Change Password</Button> : <></>}
                    <PsModal open={modalOpen} changePassword={changePassword} onClose={() => setModalOpen(false)}/>         
                </>
            }
        </div>
    )
}

export default Profile