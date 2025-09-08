const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing - this will only be reached if static files are not found
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Flight Query Frontend server running on port ${PORT}`);
});