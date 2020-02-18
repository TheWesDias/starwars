const connection = require('mongodb').MongoClient;
const userDB = process.env.dbuser;
const passwordDB = process.env.dbpassword;
const hostName = process.env.hostname;
const port = process.env.hostport;
const databaseName = process.env.databasename;

function createMongoClientConnection() {
  return connection.connect(`mongodb://${userDB}:${encodeURIComponent(passwordDB)}@${hostName}:${port}/${databaseName}`, { useUnifiedTopology: true });
}

function createDBConnection(){
  return new Promise((resolve, reject) => {
    createMongoClientConnection().then( mongoClient => {
      const starWarsDB = mongoClient.db('starwars');
      resolve(starWarsDB);
    }).catch(err => {
      console.error('Erro ao recuperar mongoclient: ', err);
      reject(err);
    });
  });
}

module.exports = function() {
  return { createDBConnection: createDBConnection};
};