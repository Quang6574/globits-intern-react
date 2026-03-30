import axios from 'axios';

const API_URL = 'http://localhost:8080/api/project';

const ProjectService = {
    getAll: (page = 1, pageSize = 10) => {
        return axios.get(API_URL, { params: { page, pageSize } });
    },

    getById: (id) => {
        return axios.get(`${API_URL}/${id}`);
    },

    createOrUpdate: (project) => {
        return axios.put(API_URL, project);
    },

    delete: (id) => {
        return axios.delete(`${API_URL}/${id}`);
    },

    editCompany: (id, payload) => {
        return axios.put(`${API_URL}/${id}/editCompany`, payload);
    },

    addPerson: (id, payload) => {
        return axios.put(`${API_URL}/${id}/addPerson`, payload);
    },

    removePerson: (id, payload) => {
        return axios.put(`${API_URL}/${id}/removePerson`, payload);
    },
};

export default ProjectService;