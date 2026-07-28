require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");


const PORT = process.env.PORT || 3000;


// Trust Render proxy for secure cookies
app.set("trust proxy", 1);


connectDB()
  .then(() => {

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch((error) => {

    console.error(
      "Database connection failed:",
      error
    );

    process.exit(1);

  });