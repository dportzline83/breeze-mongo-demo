(function () {
	var express = require('express'),
		app = express(),
		routes = require('./routes'),
		fileServer = require('serve-static'),
		bodyParser = require('body-parser');

	app.use( fileServer( __dirname+'/../client' ));
	app.use(bodyParser());

	routes.initialize(app);
	app.listen(3000);
})();