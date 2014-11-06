var express = require('express');
var bodyParser = require('body-parser');
var span = require('child_process').spawn;
var debugHooks = require('debug')('hooks');

function HooksServer(opts){
	this.app = express();
	this.v1Router = express.Router();
	this.opts =  opts || {};
	var self = this;
	
	this.app.use(bodyParser.urlencoded({ extended: false }));

	this.v1Router.post('/hooks',function(req, res, next){
		if(opts.service){
			if(opts.service === "bitbucket"){
				self.parseHooks(req.param('payload'),opts.hooks);
			}else{
				//github
			}
		}else{
			self.parseHooks(req.param('payload'),opts.hooks);
		}
		next();
	});

	this.app.use('/v1', this.v1Router);
	
	this.serve = function(cb){
		var port = self.opts.port || 8181;
		debugHooks("Options:", this.opts);
		debugHooks("Server start at port:", port);
		this.app.listen(port);
		if("function" === typeof cb) 
			cb(this)
	}
};

HooksServer.prototype = {
	parseHooks: function(params, hooks){
		for(var hook in hooks) {
			if( typeof hooks[hook] === "function"){
				if(this.opts.users && this.opts.users.length > 0){
					this.opts.users.forEach(function(user){
						debugHooks("Filter user:",user);
						if(user === params.user){
							hooks[hook](params, this);
						}
					})
				}else{
					debugHooks("Call hook function.");
					debugHooks("Params", params);
					hooks[hook](params, this);
				}
			}
		};
		return this;
	},
	do: function(command,args,cb){
		shell = span(command,args);
		debugHooks("Do command", command);
		shell.stdout.on('data', function(data){
			console.log("DATA:", data.toString());
		});
		shell.on('close', cb);
	}
};

module.exports = HooksServer;
