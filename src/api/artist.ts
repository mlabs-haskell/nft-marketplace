import axios from 'axios';

export const getArtist = async () => {
    const response = await axios.get('artists');
    return response;
}

export const getArtistbyId = async (id: string) => {
    const response = await axios.get(`artists/${id}`);
    return response;
}