import '../styles/Country.css';

import CountryAdd from '../components/CountryAdd';

import { useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import countryStore from '../stores/countryStore';

import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableCell,
  TextField,
} from '@mui/material';

// Validation schema for each row
const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Name must only contain letters and spaces')
    .required('Name is required'),
  code: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Code must only contain letters and numbers')
    .required('Code is required'),
  description: Yup.string().required('Description is required'),
});

function Country() {
  useEffect(() => {
    countryStore.fetchCountries();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Country Management</Typography>
      <CountryAdd onAdd={countryStore.addCountry} />
      
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="country table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Code</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {countryStore.countries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              countryStore.countries.map((row) => {
                const isEditing = countryStore.editingId === row.id;

                return (
                  <TableRow key={row.id}>
                    {isEditing ? (
                      <Formik
                        initialValues={{
                          name: row.name,
                          code: row.code,
                          description: row.description,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => countryStore.saveEdit(values)}
                      >
                        {({ values, handleChange, handleSubmit, errors, touched }) => (
                          <>
                            <TableCell>
                              <TextField
                                size="small"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <TextField
                                size="small"
                                name="code"
                                value={values.code}
                                onChange={handleChange}
                                error={touched.code && Boolean(errors.code)}
                                helperText={touched.code && errors.code}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <TextField
                                size="small"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                variant="contained"
                                size="small"
                                onClick={handleSubmit}
                              >
                                Save
                              </Button>
                              <Button
                                variant="text"
                                size="small"
                                onClick={countryStore.cancelEdit}
                                sx={{ ml: 1 }}
                              >
                                Cancel
                              </Button>
                            </TableCell>
                          </>
                        )}
                      </Formik>
                    ) : (
                      <>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="right">{row.code}</TableCell>
                        <TableCell align="right">{row.description}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => countryStore.startEdit(row)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="text"
                            color="error"
                            size="small"
                            onClick={() => countryStore.deleteCountry(row.id)}
                            sx={{ ml: 1 }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default observer(Country);