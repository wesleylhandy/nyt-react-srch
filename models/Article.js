var mongoose = require('mongoose');

mongoose.Promise = Promise;

var Schema = mongoose.Schema;

if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'))
  .then(() => console.log('connected to DB!'))
  .catch((err) => console.error(err));
}


var newSchema = new Schema({
  
  'title': { 
    type: String,
    validate: {
      isAsync: true,
      validator: isArticleUnique, 
      message:'Duplicate: This article has already been saved and can be viewed in the Saved Articles Section.' 
    },
    required: true
  },
  'pubdate': { type: String, required: true },
  'imgsrc': { type: String, required: true },
  'url': { type: String, required: true },
  'likes': { type: Number, default: 0 },
  'snippet': { type: String, required: true },
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
  mongoose.models['Article'].count({_id: {$ne: this._id }, title: value, pubdate: this.pubdate}, function(err, count){
    if(err) {
      return done(err);
    }
    // will return true if count is zero, false if greater than zero
    done(!count);
  })
}



module.exports = mongoose.model('Article', newSchema);
