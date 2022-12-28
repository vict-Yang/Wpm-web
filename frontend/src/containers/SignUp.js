import './App.css';
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "../api";

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

const SignUp = () => {
    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        if(values.password !== values.confirmPassword)
            alert("Password does not match");
        else
        {
            try {
                const response = await axios.post("/signup", {username: values.username, password: values.password});
                console.log(response)
                navigate("/login")
            }
            catch(e) {
                alert(e.response.data.message);
            }
        }
        actions.setSubmitting(false);
    }

    return (
        <div>
            <h1>WPM</h1>
            <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
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
                <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                />
                <br />
                <button type="submit">Sign Up</button>
                </Form>
            )}
            </Formik>
        </div>
    );
}

export default SignUp;
