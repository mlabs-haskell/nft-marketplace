/* eslint-disable */
import axios from 'axios';

export const getImage = async () => {
    const response = await axios.get('images');
    return response;
}

export const addImage = async (payload: {
    image: string,
    title: string,
}) => {
    const response = await axios.post('images', payload);
    return response;
}