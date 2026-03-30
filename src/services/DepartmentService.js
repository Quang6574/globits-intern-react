import axios from 'axios';

const API_URL = 'http://localhost:8080/api/department';

const DepartmentService = {
  // Get all departments with pagination
  getAll: (page = 1, pageSize = 10) => {
    return axios.get(API_URL, {
      params: { page, pageSize },
    });
  },

  // Get parent department of a department by ID
  getParent: (id) => {
    return axios.get(`${API_URL}/${id}/getParent`);
  },

  // Delete a department by ID
  delete: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  },

  // Edit the parent department
  editParent: (id, departmentParentDTO) => {
    return axios.put(`${API_URL}/${id}/editParent`, departmentParentDTO);
  },

  // Create or update a department
  createOrUpdate: (departmentDTO) => {
    return axios.put(API_URL, departmentDTO);
  },
};

export default DepartmentService;