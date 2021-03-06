import axios from 'axios';
import { PRODUCT_SERVER } from '../components/utils/misc';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS
} from './types';

export const getProductsBySell = () => {
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data)
    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }
};

export const getProductsByArrival = () => {
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data)
    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
};

/////////////////////////////////////////
////////////////// CATGEGORIES
////////////////////////////////////////

export const getBrands = () => {
    const request = axios.get(`${PRODUCT_SERVER}/brands`)
        .then(response => response.data);
    return {
        type: GET_BRANDS,
        payload: request
    };
};

export const getWoods = () => {
    const request = axios.get(`${PRODUCT_SERVER}/woods`)
    .then(response => response.data);
    return {
        type: GET_WOODS,
        payload: request
    };
};