const roleCheck = (role) => (req, res, next) =>
  !role.includes(req.user.userRole)
    ? res.status(401).json("Unauthorized")
    : next();

module.exports = roleCheck;
