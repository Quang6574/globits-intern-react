import '../styles/Country.css';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import companyStore from '../stores/companyStore';
import CompanyAdd from '../components/CompanyAdd';
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
} from '@mui/material';

function Company() {
  useEffect(() => {
    companyStore.fetchCompanies();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Company Management</Typography>

      <CompanyAdd onAdd={companyStore.createOrUpdateCompany} />

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="company table">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {companyStore.companies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              companyStore.companies.map((row) => {
                const isEditing = companyStore.editingId === row.code;
                return (
                  <TableRow key={row.code}>
                    <TableCell>
                      {isEditing ? (
                        <input
                          type="text"
                          value={companyStore.editForm.code}
                          onChange={(e) =>
                            companyStore.changeEditField('code', e.target.value)
                          }
                        />
                      ) : (
                        row.code
                      )}
                    </TableCell>

                    <TableCell>
                      {isEditing ? (
                        <input
                          type="text"
                          value={companyStore.editForm.name}
                          onChange={(e) =>
                            companyStore.changeEditField('name', e.target.value)
                          }
                        />
                      ) : (
                        row.name
                      )}
                    </TableCell>

                    <TableCell>
                      {isEditing ? (
                        <input
                          type="text"
                          value={companyStore.editForm.address}
                          onChange={(e) =>
                            companyStore.changeEditField('address', e.target.value)
                          }
                        />
                      ) : (
                        row.address
                      )}
                    </TableCell>

                    <TableCell align="right">
                      {isEditing ? (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={companyStore.createOrUpdateCompany}
                          >
                            Save
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            onClick={companyStore.cancelEdit}
                            sx={{ ml: 1 }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => companyStore.startEdit(row)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="text"
                            color="error"
                            size="small"
                            onClick={() => companyStore.deleteCompany(row.code)}
                            sx={{ ml: 1 }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
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

export default observer(Company);