'use strict';

var browserSync = require('browser-sync');
var Promise = require('promise');

module.exports = function(config) {
	return launchServer(config);


	function launchServer(config) {
		return new Promise(function(resolve, reject) {
			var bs = browserSync.create();
			bs.init(config, function(error) {
				if (error) {
					return reject(error);
				}
				return resolve(bs);
			});
		});
	}
};

module.exports.defaults = {};

module.exports.description = 'Serve files using Browsersync';
