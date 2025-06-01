require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 1999;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
