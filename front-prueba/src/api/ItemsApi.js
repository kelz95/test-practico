import axios from 'axios';

const BASE_URL_API = process.env.REACT_APP_BASE_URL_API || "http://localhost:3000";
const BASE_ITEMS_API = `${BASE_URL_API}/api/items`;

export const getItems = async (elementTosearch) => { return axios.get(`${BASE_ITEMS_API}?q=${elementTosearch}`);}

export const getItem = async (elementTosearch) => { return axios.get(`${BASE_ITEMS_API}/${elementTosearch}`);}

