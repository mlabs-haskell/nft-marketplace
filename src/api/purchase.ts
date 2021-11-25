import axios from 'axios';

export const getPurchase = async (image_id: string) => {
    const response = await axios.get(`purchases/${image_id}`);
    return response;
}