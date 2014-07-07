(function(routes) {
	var mongodb = require('mongodb');
	var breezeMongo = require('breeze-mongodb');
	var fs = require('fs');

	var host = 'localhost';
	var port = 27017;
	var dbName = 'demo';
	var dbServer = new mongodb.Server(host, port, {auto_reconnect: true});
	var db = new mongodb.Db(dbName, dbServer, {strict: true, w: 1});
	db.open(function() {});

	routes.initialize = function(app) {
		app.get('/breeze/Metadata', metadata);
		app.get('/breeze/:slug', routes.get);
	};

	routes.get = function(request, result, next) {
		var query = new breezeMongo.MongoQuery(request.query);

		query.execute(db, request.params.slug, processResults(result, next));
	}

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