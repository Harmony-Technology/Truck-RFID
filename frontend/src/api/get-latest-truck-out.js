import client from '../lib/client';
import JWTToken from '../lib/token';

export const getLatestTruckOut = async () => {
  const token = JWTToken.getToken();

  try {
    const { data } = await client.get(`inputs/latest/output`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    // console.log('data', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
