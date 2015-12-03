
// Connection to the database
var mongoose      = require('mongoose');
mongoose.connect('mongodb://localhost/Messenger');

var Schema = mongoose.Schema;
var User = new Schema({
      username: String,
      password: String,
    }, {
      collection: 'users',
    });

module.exports = mongoose.model('users', User);
