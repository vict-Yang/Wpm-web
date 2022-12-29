import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from'@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import * as yup from "yup"

const SignUp = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const validationSchema = yup.object({
        username: yup.string().required("Username is required."),
        password: yup.string().min(6, "Password should be of minimum 6 characters.").required("Password is required."),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Does not match with Password")
    });

    const onSubmit = async (values, actions) => {
        if(values.password !== values.confirmPassword)
            alert("Password does not match");
        else
        {
            try {
                const response = await axios.post("/signup", {username: values.username, password: values.password});
                console.log(response)
                navigate("/signin")
            }
            catch(e) {
                setOpen(true);
                setErrorMsg(e.response.data.message);
            }
        }
        actions.setSubmitting(false);
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit,
        validationSchema: validationSchema,
    })

    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert severity="error" sx={{ width: '100%' }} onClose={() => setOpen(false)}>
                    {errorMsg}
                </Alert>
            </Snackbar>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h4" color="textPrimary">Sign Up</Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            type="text"
                            name="username"
                            placeholder="Username"
                            label="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            type="password"
                            name="password"
                            placeholder="Password"
                            label="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            label="Confirm Password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                        <Button sx={{ mt: 3, mb: 2 }} variant="contained" fullWidth type="submit">
                            SIGN UP
                        </Button>
                        <Link href="/signin" variant="body1">
                            Sign In
                        </Link>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default SignUp;
