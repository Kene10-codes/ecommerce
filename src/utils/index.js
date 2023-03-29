export const checkUserIsAdmin = currentUser => {
  if (!currentUser || !Array.isArray (currentUser.userRoles)) return false;
  const {userRoles} = currentUser;
  if (userRoles.includes ('Admin')) return true;

  return false;
};
