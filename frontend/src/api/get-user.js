import client from '../lib/client';
import JWTToken from '../lib/token';

export const getUser = async () => {
  const token = JWTToken.getToken();

  try {
    const { data } = await client.get(`users/me`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
