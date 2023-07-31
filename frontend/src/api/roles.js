import client from '../lib/client';
import JWTToken from '../lib/token';

export const fetchRole = async (id) => {
  const token = JWTToken.getToken();

  try {
    const { data } = await client.get(`roles/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
