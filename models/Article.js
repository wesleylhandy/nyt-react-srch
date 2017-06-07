var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}


var newSchema = new Schema({
  
  'title': { 
    type: String,
    validate: [isArticleUnique, 'notUnique'] },
  'pubdate': { type: String },
  'imgsrc': { type: String },
  'url': { type: String },
  'likes': { type: Number, default: 0 },
  'snippet': { type: String },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

function isArticleUnique(value, done) {
  //excluding current id from count
  mongoose.models['Article'].count({_id: {'$ne': this._id }, title: value, pubdate: this.pubdate}, function(err, count){
    if(err) {
      return done(err);
    }
    // will return true if count is zero, false if greater than zero
    done(!count);
  })
}



module.exports = mongoose.model('Article', newSchema);
