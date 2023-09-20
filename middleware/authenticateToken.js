import pkg from 'jsonwebtoken';
const { verify } = pkg;

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Change this to a secure secret

function authenticateToken(req, res, next) {

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication token missing.' });
    }
  
    verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token.' });
      }
  
      // You can optionally store the authenticated user in the request for later use
      req.user = user;
  
      // The token is valid; proceed to the next middleware or route
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
 
}

export default authenticateToken;
