var HooksServer = require('../libs/hooks-srv');
var debug = require('debug')('githooks');

var app = new HooksServer(require('../templates/config/githooks.conf'));
app.serve(function(server){
	debug("GitHooks server start [OK]!");
});
