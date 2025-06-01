require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const specs = require("./swaggerDocumentation");
const sequelize = require("./database.js");


const app = require('./app');

// Swagger documentation setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/", (req, res) => {
  res.send("Smart Permit System API is running!");
});

const PORT = process.env.PORT || 1999;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// connect to database
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to the database successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
}
connectToDatabase();