(function () {
	var express = require('express'),
		app = express(),
		routes = require('./routes'),
		fileServer = require('serve-static');
	//app.use(express.bodyParser());
	//app.use(app.router);

	app.use( fileServer( __dirname+'/../client' )); // was fileServer( process.cwd() )

	routes.initialize(app);
	app.listen(3000);
})();