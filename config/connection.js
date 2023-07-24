const { connect, connection } = require('mongoose');

connect('mongodb://localhost/smApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
