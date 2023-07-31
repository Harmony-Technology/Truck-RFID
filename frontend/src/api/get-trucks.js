import client from '../lib/client';
import JWTToken from '../lib/token';

export const getTrucks = async (page, itemsPerPage) => {
  const token = JWTToken.getToken();

  try {
    const { data } = await client.get(`inputs`, {
      headers: {
        Authorization: `${token}`,
      },
      params: {
        page,
        itemsPerPage,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
