// Require node modules
var HooksServer = require('sails-generate-githooks/libs/hooks-srv'),
	config = require('./config/githooks.conf'),
	app = new HooksServer(config);

// Start GitHook server
app.serve(function(server){
	console.log("GitHooks server start [OK]!");
});
