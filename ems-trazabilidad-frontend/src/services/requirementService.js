import axios from 'axios';

const API = 'http://localhost:3001/requirements';

export const createRequirement = async (data) => {
  return await axios.post(API, data);
};

export const getRequirements = async (projectId) => {
  return await axios.get(`${API}/${projectId}`);
};

export const updateRequirement = async (id, data) => {
  return await axios.put(`${API}/${id}`, data);
};