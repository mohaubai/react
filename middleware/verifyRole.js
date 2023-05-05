const verifyRole = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        console.log('Rejected by verifyRole middleware.');
        return res.status(403).send({ error: 'Insufficient permissions.' });
      }
      next();
    };
  };
  
  module.exports = verifyRole;
  