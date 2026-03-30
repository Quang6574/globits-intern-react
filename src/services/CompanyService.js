import axios from 'axios';

const API_URL = 'http://localhost:8080/api/company';

const CompanyService = {
  getAll: (page = 1, pageSize = 10) => {
    return axios.get(API_URL, { params: { page, pageSize } });
  },

  getById: (code) => {
    return axios.get(`${API_URL}/${code}`);
  },

  createOrUpdate: (company) => {
    return axios.put(API_URL, company);
  },

  delete: (code) => {
    return axios.delete(`${API_URL}/${code}`);
  }
};

export default CompanyService;