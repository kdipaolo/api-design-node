var _ = require('lodash');
var tigerRouter = require('express').Router();

var tigers = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

tigerRouter.param('id', function(req, res, next, id) {
  var lion = _.find(tigers, {id: id})

  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send();
  }
});

tigerRouter.get('/', function(req, res){
  res.json(tigers);
});

tigerRouter.get('/:id', function(req, res){
  var tiger = req.tiger;
  res.json(tiger || {});
});

tigerRouter.post('/', updateId, function(req, res) {
  var tiger = req.body;

  tigers.push(tiger);

  res.json(tiger);
});

tigerRouter.delete('/:id', function(req, res) {
  var tiger = _.findIndex(tigers, {id: req.params.id});
  tigers.splice(tiger, 1);

  res.json(req.tiger);
});

tigerRouter.put('/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var tiger = _.findIndex(tigers, {id: req.params.id});
  if (!tigers[tiger]) {
    res.send();
  } else {
    var updatedTiger = _.assign(tigers[tiger], update);
    res.json(updatedTiger);
  }
});

module.exports = tigerRouter;
