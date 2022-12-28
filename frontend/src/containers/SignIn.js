import './App.css';
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useSignIn, useAuthUser } from "react-auth-kit";
import styled from "styled-components";
import axios from "../api";
import { useEffect } from 'react';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


const validate = (values) => {
    const errors = {};
  
    if (!values.username) {
      errors.username = 'Required';
    }
    if (!values.password) {
        errors.password = 'Required';
    }
  
    return errors;
  };

const SignIn = () => {
    const navigate = useNavigate();
    const signIn = useSignIn();
    const auth = useAuthUser();

    useEffect(() => {
        if(auth())
            navigate("/");
    }, [])

    const onSubmit = async (values, actions) => {
        try {
            const response = await axios.get("/login", {params: {username: values.username, password: values.password}});
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
            alert(e.response.data.message)
        } 
        
        actions.setSubmitting(false);
    }

    return (
        <Container>
            <h1>WPM</h1>
            <Formik
                initialValues={{ username: '', password: '' }}
                validate={validate}
                onSubmit={onSubmit}
            >
                {props => (
                    <Form>
                        <Field
                            type="text"
                            name="username"
                            placeholder="username"
                        />
                        {props.errors.username ? <span>{props.errors.username}</span> : null}
                        <br/>
                        <Field
                            type="password"
                            name="password"
                            placeholder="password"
                        />
                        {props.errors.password ? <span>{props.errors.password}</span> : null}
                        <br />
                        <button type="submit">Login</button>
                        <button onClick={() => navigate("/signup")} style={{color: 'darkblue'}}>Sign Up</button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default SignIn;
