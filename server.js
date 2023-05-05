// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();


// Import routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');

// Initialize the app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/api', adminRoutes);
app.use('/api', userRoutes);
app.use('/api', customerRoutes);
app.use('/api', productRoutes);



// Sync database and start the server
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
  });
