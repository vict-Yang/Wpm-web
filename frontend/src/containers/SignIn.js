import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSignIn, useAuthUser } from "react-auth-kit";
import axios from "../api";
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from'@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as yup from "yup"

const theme = createTheme();

const validationSchema = yup.object({
    username: yup.string().required("Username is required."),
    password: yup.string().min(6, "Password should be of minimum 6 characters.").required("Password is required."),
});

const SignIn = () => {
    const navigate = useNavigate();
    const signIn = useSignIn();
    const auth = useAuthUser();
    const [open, setOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if(auth())
            navigate("/");
    }, [])

    const onSubmit = async (values, actions) => {
        try {
            const response = await axios.get("/signin", {params: {username: values.username, password: values.password}});
            console.log(response.data.token);
            if(signIn({
                token: response.data.token,
                expiresIn: 1440,
                tokenType: "Bearer",
                authState: { name: values.username },
            }))
                navigate("/")
        }
        catch(e) {
            setOpen(true);
            setErrorMsg(e.response.data.message)
        } 
        
        actions.setSubmitting(false);
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit,
        validationSchema: validationSchema,
    })

    return (
        <ThemeProvider theme={theme}>
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert severity="error" sx={{ width: '100%' }} onClose={() => setOpen(false)}>
                    {errorMsg}
                </Alert>
            </Snackbar>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h4">Sign In</Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            type="text"
                            name="username"
                            placeholder="username"
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
                            placeholder="password"
                            label="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button sx={{ mt: 3, mb: 2 }} variant="contained" fullWidth type="submit">
                            SIGN IN
                        </Button>
                        <Link href="/signup" variant="body2">
                            Sign Up
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;
