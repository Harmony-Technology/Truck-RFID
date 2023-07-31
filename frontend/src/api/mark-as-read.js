import client from '../lib/client';
import JWTToken from '../lib/token';

export const markAsRead = async () => {
  const token = JWTToken.getToken();

  try {
    const { data } = await client.put(
      `inputs/notification/mark-as-read`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
