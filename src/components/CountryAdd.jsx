import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

const validationSchema = Yup.object({
    name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Name must only contain letters and spaces')
        .required('Name is required'),
    code: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'Code must only contain letters and numbers')
        .required('Code is required')
});

export default function CountryAdd({ onAdd }) {
    return (
        <Formik
            initialValues={{ name: '', code: '', description: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                onAdd?.(values);
                resetForm();
            }}
        >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                    />
                    <TextField
                        margin="normal"
                        label="Code"
                        name="code"
                        value={values.code}
                        onChange={handleChange}
                        error={touched.code && Boolean(errors.code)}
                        helperText={touched.code && errors.code}
                    />
                    <TextField
                        margin="normal"
                        label="Description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Add Country
                    </Button>
                </Form>

            )}
        </Formik>
    );
}