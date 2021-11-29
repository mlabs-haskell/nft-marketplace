import axios from 'axios';

export const unlistImage = async (id: string) => {
  const response = await axios.post(`admin/unlist_image/${id}`);
  return response;
};

export const createArtist = async (payload: {
  name: string;
  pubKeyHash: string;
}) => {
  const response = await axios.post(`admin/create_artist`, payload);
  return response;
};

export const deleteArtist = async (id: string) => {
  const response = await axios.delete(`admin/delete_artist/${id}`);
  return response;
};

export const createPurchase = async (payload: {
  imageHash: string;
  authorPubKeyHash: string;
  ownerPubKeyHash: string;
  price: string;
  wasAuctioned: boolean;
}) => {
  const response = await axios.post(`admin/create_purchase`, payload);
  return response;
};
