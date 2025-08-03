import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const registerUser = (data) =>
  axios.post(`${API_URL}/register`, data)

export const loginUser = (data) =>
  axios.post(`${API_URL}/loginUser`, data)

export const getAllUsers = (token) =>
  axios.get(`${API_URL}/getuser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const getItems = (token) =>
  axios.get(`${API_URL}/getAllItems`, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const createItem = (data, token) =>
  axios.post(`${API_URL}/createItem`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const updateItem = (id, data, token) =>
  axios.put(`${API_URL}/updateItem/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const deleteItem = (id, token) =>
  axios.delete(`${API_URL}/deleteItem/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })