import '../styles/Country.css';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import projectStore from '../stores/projectStore';
import ProjectAdd from '../components/ProjectAdd';
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

function Project() {
  useEffect(() => {
    projectStore.fetchProjects();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Project Management</Typography>

      <ProjectAdd onAdd={projectStore.createOrUpdateProject} />

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="project table">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projectStore.projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              projectStore.projects.map((row) => {
                const isEditing = String(projectStore.editingId) === String(row.id);
                return (
                  <TableRow key={row.id || row.code}>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          size="small"
                          name="code"
                          value={projectStore.editForm.code}
                          onChange={(e) => projectStore.changeEditField('code', e.target.value)}
                        />
                      ) : (
                        row.code
                      )}
                    </TableCell>

                    <TableCell>
                      {isEditing ? (
                        <TextField
                          size="small"
                          name="name"
                          value={projectStore.editForm.name}
                          onChange={(e) => projectStore.changeEditField('name', e.target.value)}
                        />
                      ) : (
                        row.name
                      )}
                    </TableCell>

                    <TableCell>
                      {isEditing ? (
                        <TextField
                          size="small"
                          name="description"
                          value={projectStore.editForm.description}
                          onChange={(e) =>
                            projectStore.changeEditField('description', e.target.value)
                          }
                        />
                      ) : (
                        row.description
                      )}
                    </TableCell>

                    <TableCell align="right">
                      {isEditing ? (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={projectStore.createOrUpdateProject}
                          >
                            Save
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            onClick={projectStore.cancelEdit}
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
                            onClick={() => projectStore.startEdit(row)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="text"
                            color="error"
                            size="small"
                            onClick={() => projectStore.deleteProject(row.id)}
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

export default observer(Project);