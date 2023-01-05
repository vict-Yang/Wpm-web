import { useFormik } from "formik";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as yup from "yup"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: '#313336',
    p: 4,
    boxShadow: 8,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const PsModal = ({open, onClose, changePassword}) => {
    const validationSchema = yup.object({
        oldPassword: yup.string().required("Required."),
        newPassword: yup.string().min(6, "Password should be of minimum 6 characters.").required("Required."),
        confirmPassword: yup.string().oneOf([yup.ref("newPassword"), null], "Does not match with Password"),
    });

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        onSubmit: changePassword,
        validationSchema: validationSchema,
    });

    return (
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box sx={style}>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        type="password"
                        name="oldPassword"
                        placeholder="Old Password"
                        label="Old Password"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        label="New Password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
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
                        Submit
                    </Button>
                    </Box>
                </Box>  
            </Modal>
    )
}

export default PsModal;