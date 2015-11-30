module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  var toto = 'toto';
  var User = new Schema({
        username: String,
        password: String,
      }, {
        collection: 'users',
      });
  return mongoose.model('users', User);
};
