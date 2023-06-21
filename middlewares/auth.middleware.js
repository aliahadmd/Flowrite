const authenticateSession = (req, res, next) => {
  if (req.session.adminId) {
    next();
  } else {
    const message = "Access denied. Please log in.";
    res.redirect(`/admin/login`);
  }
};

const unauthenticateSession = (req, res, next) => {
  if (!req.session.adminId) {
    next();
  } else {
    
    res.redirect(`/admin`);
  }
};



export { authenticateSession, unauthenticateSession };

