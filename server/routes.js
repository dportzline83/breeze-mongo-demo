(function(routes) {
	var mongodb = require('mongodb').MongoClient;
	var breezeMongo = require('breeze-mongodb');
	var fs = require('fs');

	var host = 'localhost';
	var port = 27017;
	var dbName = 'demo';
	// var dbServer = new mongodb.Server(host, port, {auto_reconnect: true});
	// var db = new mongodb.Db(dbName, dbServer, {strict: true, w: 1});
	// db.open(function() {});
	var db = null;
	var mongoOptions = {
    server: {auto_reconnect: true}
  };
	mongodb.connect("mongodb://localhost:27017/demo", mongoOptions, function(error, database) {
		if (error) {
			console.log(error);
		}
		else {
			db = database;
		}
	});

	routes.initialize = function(app) {
		app.get('/breeze/Metadata', metadata);
		app.post('/breeze/SaveChanges', routes.saveChanges)
		app.get('/breeze/:slug', routes.get);
	};

	routes.get = function(request, result, next) {
		var query = new breezeMongo.MongoQuery(request.query);

		query.execute(db, request.params.slug, processResults(result, next));
	};

	routes.saveChanges = function(req, res, next) {
    var saveHandler = new breezeMongo.MongoSaveHandler(db, req.body, processResults(res, next));
    saveHandler.save();
	};

	function metadata(request, result, next) {
		next({
			statusCode: 404,
			message: 'No metadata from server. Metadata defined on client.'
		});
	}

	function processResults(result, next) {
		return function(error, results) {
			if (error) {
				next(error);
			}
			else {
				result.setHeader('Content-Type:', 'application/json');
				result.send(results);
			}
		};
	}
})(module.exports);