import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import departmentStore from '../stores/departmentStore';
import Popup from '../components/Popup';
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
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function Department  () {
  const [openPopup, setOpenPopup] = useState(false);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState('');
  const [createForm, setCreateForm] = useState({ code: '', name: '' });

  useEffect(() => {
    departmentStore.fetchDepartments();
  }, []);

  const handleCreateChange = (field, value) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateDepartment = async () => {
    if (!createForm.code || !createForm.name) {
      alert('Code and Name are required!');
      return;
    }

    await departmentStore.createOrUpdateDepartment(createForm);
    setCreateForm({ code: '', name: '' });
    setOpenPopup(false);
  };

  const currentEditingDepartment = departmentStore.departments.find(
    (department) => String(department.id) === String(departmentStore.editingId)
  );

  const availableParentDepartments = currentEditingDepartment
    ? departmentStore.departments.filter(
        (department) => String(department.id) !== String(currentEditingDepartment.id)
      )
    : [];

  const handleOpenParentPopup = () => {
    if (!currentEditingDepartment) {
      return;
    }

    const parentDepartmentValue = currentEditingDepartment.parentDepartment;
    const parentValue = currentEditingDepartment.parent;
    const currentParentId =
      (typeof parentDepartmentValue === 'object' ? parentDepartmentValue?.id : parentDepartmentValue) ??
      (typeof parentValue === 'object' ? parentValue?.id : parentValue) ??
      currentEditingDepartment.parentDepartmentId ??
      currentEditingDepartment.parentId;
    setSelectedParentId(currentParentId ? String(currentParentId) : '');
    setOpenParentPopup(true);
  };

  const handleConfirmParentChange = async () => {
    if (!departmentStore.editingId || !selectedParentId) {
      alert('Please select a parent department.');
      return;
    }

    try {
      await departmentStore.editParentDepartment(departmentStore.editingId, selectedParentId);
      setOpenParentPopup(false);
    } catch (error) {
      alert('Failed to update parent department.');
    }
  };

  const handleRemoveParent = async () => {
    if (!departmentStore.editingId) {
      return;
    }

    try {
      await departmentStore.editParentDepartment(departmentStore.editingId, null);
      setSelectedParentId('');
      setOpenParentPopup(false);
    } catch (error) {
      alert('Failed to remove parent department.');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Department Management</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => setOpenPopup(true)}>
        Add Department
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="department table">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Parent
                  {departmentStore.editingId && (
                    <Button variant="outlined" size="small" onClick={handleOpenParentPopup}>
                      Edit Parent
                    </Button>
                  )}
                </Box>
              </TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departmentStore.departments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No data</TableCell>
              </TableRow>
            ) : (
              departmentStore.departments.map((department) => {
                const isEditing = String(departmentStore.editingId) === String(department.id);

                return (
                  <TableRow key={department.id}>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          size="small"
                          name="code"
                          value={departmentStore.editForm.code}
                          onChange={(e) => departmentStore.changeEditField('code', e.target.value)}
                        />
                      ) : (
                        department.code
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          size="small"
                          name="name"
                          value={departmentStore.editForm.name}
                          onChange={(e) => departmentStore.changeEditField('name', e.target.value)}
                        />
                      ) : (
                        department.name
                      )}
                    </TableCell>
                    <TableCell>{departmentStore.parentNamesByDepartmentId[department.id] || ''}</TableCell>
                    <TableCell>{department.company ? department.company.name : ''}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <>
                          <Button variant="contained" size="small" onClick={departmentStore.createOrUpdateDepartment}>Save</Button>
                          <Button variant="text" size="small" onClick={departmentStore.cancelEdit} sx={{ ml: 1 }}>Cancel</Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outlined" size="small" onClick={() => departmentStore.startEdit(department)}>Edit</Button>
                          <Button variant="text" color="error" size="small" onClick={() => departmentStore.deleteDepartment(department.id)} sx={{ ml: 1 }}>Delete</Button>
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

      <Popup
        title="Add Department"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TextField
          fullWidth
          size="small"
          margin="dense"
          label="Code"
          value={createForm.code}
          onChange={(e) => handleCreateChange('code', e.target.value)}
        />
        <TextField
          fullWidth
          size="small"
          margin="dense"
          label="Name"
          value={createForm.name}
          onChange={(e) => handleCreateChange('name', e.target.value)}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="text" onClick={() => setOpenPopup(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateDepartment}>Save</Button>
        </Box>
      </Popup>

      <Popup
        title="Edit Parent Department"
        openPopup={openParentPopup}
        setOpenPopup={setOpenParentPopup}
      >
        <FormControl fullWidth size="small" margin="dense">
          <InputLabel id="parent-department-select-label">Parent Department</InputLabel>
          <Select
            labelId="parent-department-select-label"
            value={selectedParentId}
            label="Parent Department"
            onChange={(e) => setSelectedParentId(e.target.value)}
          >
            {availableParentDepartments.map((department) => (
              <MenuItem key={department.id} value={String(department.id)}>
                {department.code} - {department.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button color="error" variant="text" onClick={handleRemoveParent}>Remove Parent</Button>
          <Button variant="text" onClick={() => setOpenParentPopup(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmParentChange}>Confirm</Button>
        </Box>
      </Popup>
    </Container>
  );
};

export default observer(Department);