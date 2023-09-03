// src/middlewares/validation.js

exports.validateCatData = (req, res, next) => {
    const { name,  metadata } = req.body;
    if (!name ) {
      return res.status(400).json({ error: 'Name is required.' }); // BAD REQ. miss param.
    }
    next();
  };
  