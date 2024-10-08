export const ROLES = {
  admin: 'admin',
  user: 'user',
  premiun: 'premiun'
}

export const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.session.user.role)) {
      return res.status(403).send({ error: 'Access denied' });
    }
    next();
  };
};