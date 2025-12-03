const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
res.json({ message: "Welcome to trade-app application." });

app.get("/sync-db", async (req, res) => {
  try {
    const db = require("./app/modules");
    await db.sequelize.sync({ force: false });
    
    const [tables] = await db.sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    
    res.json({ 
      message: "Database synced successfully",
      tables: tables.map(t => t.table_name)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const db = require("./app/modules");
db.sequelize.sync()
.then(() => {
console.log("Synced db.");
})
.catch((err) => {
console.log("Failed to sync db: " + err.message);
});
});
require("dotenv").config();
// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;

const goodsgroupRoutes = require("./app/routes/goodsgroup.routes");
app.use("/api/goodsgroup", goodsgroupRoutes);

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);

});



