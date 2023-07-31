import client from '../lib/client';
import JWTToken from '../lib/token';

export const getUsersCount = async () => {
  const token = JWTToken.getToken();

  try {
    const { data } = await client.get(`auth/countUser`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
