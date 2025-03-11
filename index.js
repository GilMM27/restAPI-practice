import express from 'express';
import router from './src/indexController.js';
const app = express();
const port = 3000;

// Middleware
app.use(router);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
