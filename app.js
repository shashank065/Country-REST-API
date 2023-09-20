import express from 'express';
import authRoutes from './routes/authRoutes.js'; // Import authentication routes
import countryRoutes from './routes/countryRoutes.js'; // Import country routes
import authenticateToken from './middleware/authenticateToken.js'; 
import pkg from 'body-parser';
import sequelize from './config/database.js';

const {json, urlencoded } = pkg;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
// Use authentication routes
app.use('/auth', authRoutes);
//This will ensure that any route defined after this line will require a valid JWT token in the Authorization header.
app.use('/api', authenticateToken);
// Use country-related routes
app.use('/api', countryRoutes);
//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

  async function syncDatabase() {
    try {
      await sequelize.sync();
      console.log("Database connected");
      app.listen(PORT);
      console.log("API is running on port", PORT);
    } catch (err) {
      console.error(err);
    }
  }
  
syncDatabase();
  