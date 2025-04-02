import express from 'express';
import router from './src/indexController.js';
const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(router);
app.use(express.static('public')); // Serve static files from the src directory

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
