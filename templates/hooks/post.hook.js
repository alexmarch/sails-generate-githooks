module.exports = function (hookParams, hook) {
	// Post hook filter
	hook.do('git', ['pull'], function(){
		hook.do('forever', ['restartall'], function(){
			console.log("POST hook done.");
		});
	});
}
