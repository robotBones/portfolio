var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res, next) {

  mongoClient.connect('mongodb://localhost:27017/portfolio', (err, db) => {
    var projects = db.collection('projects');
    projects.find({}).toArray(
      (err, results) => {
        db.close();
        res.json(results);
      });
  });


  // res.json({ title: 'Anthony M' });
});

module.exports = router;

