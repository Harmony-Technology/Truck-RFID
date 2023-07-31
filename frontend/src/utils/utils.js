import { fetchRole } from '@/api/roles';

export const redirectUser = async (roleId, router) => {
  try {
    const roleData = await fetchRole(roleId);
    // console.log(roleData);

    const role_name = roleData.role_name;
    // console.log(role_name);
    switch (role_name) {
      case 'admin':
        router.push('/');
        break;
      case 'client':
        router.push('/input');
        break;
    }
  } catch (error) {
    // Handle the error
    console.log(error);
    throw error;
  }
};
