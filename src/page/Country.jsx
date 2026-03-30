import '../styles/Country.css';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CountryAdd from '../components/CountryAdd';
import countryStore from '../stores/countryStore';
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
            <TableCell>
            {isEditing ? (
              <TextField
              size="small"
              name="name"
              value={countryStore.editForm.name}
              onChange={(e) =>
              countryStore.changeEditField('name', e.target.value)
              }
              />
            ) : (
            row.name
            )}
          </TableCell>

          <TableCell align="right">
          {isEditing ? (
            <TextField
            size="small"
            name="code"
            value={countryStore.editForm.code}
            onChange={(e) =>
            countryStore.changeEditField('code', e.target.value)
            }
            />
          ) : (
          row.code
          )}
          </TableCell>

          <TableCell align="right">
          {isEditing ? (
            <TextField
            size="small"
            name="description"
            value={countryStore.editForm.description}
            onChange={(e) =>
            countryStore.changeEditField('description', e.target.value)
            }
            />
          ) : (
          row.description
          )}
          </TableCell>

          <TableCell align="right">
            {isEditing ? (
            <>
            <Button variant="contained" size="small" onClick={countryStore.saveEdit} >
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
            </>
            ) : (
            <>
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

export default observer(Country);