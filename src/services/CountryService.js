import axios from 'axios';

const API_URL = 'http://localhost:8080/api/country';

const CountryService = {
  getAll: (page = 1, pageSize = 10) => {
    return axios.get(API_URL, { params: { page, pageSize } });
  },

  getById: (id) => {
    return axios.get(`${API_URL}/${id}`);
  },

  createOrUpdate: (country) => {
    return axios.put(API_URL, country);
  },

  delete: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  },
};

export default CountryService;