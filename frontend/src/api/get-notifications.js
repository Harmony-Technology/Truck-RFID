import client from '../lib/client';
import JWTToken from '../lib/token';

export const getNotifications = async () => {
  const token = JWTToken.getToken();

  try {
    const { data } = await client.get(`inputs/notification/findAll`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
