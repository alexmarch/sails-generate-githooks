// GITHooks config file
var post = require('../hooks/post.hook'),
		marge = require('../hooks/marge.hook');

module.exports = {
	appPath: "~/apps/hooks",
	users: [],
	hooks: {
		"post": post,
		"marge": marge
	},
	port: 8080
}
