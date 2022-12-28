import { useNavigate } from "react-router-dom"
import { useAuthHeader, useAuthUser } from 'react-auth-kit'
import { Formik, Field, Form } from "formik";
import axios from "../api"

const Profile = () => {
    const navigate = useNavigate();
    const authHeader = useAuthHeader();
    const auth = useAuthUser();
    
    const validate = (values) => {
        const errors = {};
      
        if (!values.oldPassword) {
          errors.oldPassword = 'Required';
        }
        if (!values.newPassword) {
            errors.newPassword = 'Required';
        }
      
        return errors;
    };

    const changePassword = async (values, actions) => {
        if(values.newPassword !== values.confirmPassword)
            alert("Password does not match");
        else
        {
            try {
                const response = await axios.post("/changePassword", 
                {oldPassword: values.oldPassword, newPassword: values.newPassword}, 
                {headers: {
                    "Authorization": authHeader()
                }});
                alert(response.data.message);
            }
            catch(e) {
                alert(e.response.data.message);
            }
        }
        actions.setSubmitting(false);
    }

    return (
        <>
            <h1>{auth().name}'s Profile</h1>
            <button onClick={() => {navigate("/")}}>Main Page</button>
            <Formik
                initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                validate={validate}
                onSubmit={changePassword}
            >
                {props => (
                    <Form>
                        <Field
                            type="password"
                            name="oldPassword"
                            placeholder="Old Password"
                        />
                        {props.errors.oldPassword ? <span>{props.errors.oldPassword}</span> : null}
                        <br/>
                        <Field
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                        />
                        {props.errors.newPassword ? <span>{props.errors.newPassword}</span> : null}
                        <br />
                        <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                        />
                        <br />
                        <button type="submit">Change Password</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default Profile