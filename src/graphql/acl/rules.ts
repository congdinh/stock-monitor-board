import { rule } from 'graphql-shield';
import { USER_ROLE } from '../../configs/constant';
import { AuthenticationError } from '../../components/error';

const validatePermissionFromUserContext = (user: any, ROLE: number) => {
  if (!user) return false;

  const role: number = user?.role || null;
  if (!role) return false;
  return role === ROLE;
};

const isAuthenticated = rule()(async (parent, args, { user }, info) => {
  if (!user || !user?._id) {
    return new AuthenticationError('AuthenticationError');
  }
  return true;
});

const isSuperAdmin = rule()(async (parent, args, { user }, info) =>
  validatePermissionFromUserContext(user, USER_ROLE.SUPERADMIN)
);
const isAdmin = rule()(async (parent, args, { user }, info) =>
  validatePermissionFromUserContext(user, USER_ROLE.ADMIN)
);
const isPremium = rule()(async (parent, args, { user }, info) =>
  validatePermissionFromUserContext(user, USER_ROLE.PREMIUM)
);
const isGuest = rule()(async (parent, args, { user }, info) =>
  validatePermissionFromUserContext(user, USER_ROLE.GUEST)
);

export { isAuthenticated, isSuperAdmin, isAdmin, isPremium, isGuest };
