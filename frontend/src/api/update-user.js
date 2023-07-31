import client from '../lib/client';
import JWTToken from '../lib/token';

export const updateUser = async (id, updatedUserData) => {
  const token = JWTToken.getToken();

  try {
    const { data } = await client.put(`inputs/updateUser/${id}`, updatedUserData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
