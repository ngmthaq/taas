const { green, red } = require("console-log-colors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

const dbClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function testDatabaseConnection() {
  try {
    await dbClient.connect();
    await dbClient.db("admin").command({ ping: 1 });
    const message = "Connect to MongoDB successfully";
    console.log(green(message));
  } catch (error) {
    console.log(red(error));
  } finally {
    await dbClient.close();
  }
}

module.exports = {
  dbClient,
  testDatabaseConnection,
};
