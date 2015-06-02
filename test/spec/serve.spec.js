'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var rewire = require('rewire');

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('task:serve', function() {
	var task;
	var mockApi = createMockApi();
	var mockBrowserSync = createMockBrowserSync();
	before(function() {
		task = rewire('../../lib/tasks/serve');
		task.__set__('browserSync', mockBrowserSync);
	});

	afterEach(function() {
		mockBrowserSync.reset();
	});

	function createMockApi() {
		return {
			errors: {
				TaskError: createCustomError('TaskError')
			}
		};

		function createCustomError(type) {
			function CustomError(message) {
				this.message = message;
			}

			CustomError.prototype = Object.create(Error.prototype);
			CustomError.prototype.name = type;

			return CustomError;
		}
	}

	function createMockBrowserSync() {
		var browserSync = {
			create: sinon.spy(function() {
				var instance = {
					init: sinon.spy(function(config, callback) {
						setTimeout(function() {
							if (config.server === 'error') {
								callback(new Error('Server error'));
							} else {
								callback(null);
							}
						});
					})
				};
				this.instance = instance;
				return instance;
			}),
			instance: null,
			reset: function() {
				this.instance = null;
				this.create.reset();
			}
		};
		return browserSync;
	}

	it('should have a description', function() {
		expect(task.description).to.be.a('string');
	});

	it('should specify default configuration', function() {
		expect(task.defaults).to.eql({});
	});

	it('should call Browsersync API methods', function() {
		var promise = task.call(mockApi, {
			server: '/project/dist'
		});
		return promise.then(function(returnValue) {
			expect(returnValue).to.exist;
			expect(returnValue).to.equal(mockBrowserSync.instance);
			expect(mockBrowserSync.create).to.have.been.calledOnce;
			expect(mockBrowserSync.instance.init).to.have.been.calledOnce;
			expect(mockBrowserSync.instance.init).to.have.been.calledWith({
				server: '/project/dist'
			});
		});
	});

	it('should throw error on Browsersync API error', function() {
		var promise = task.call(mockApi, {
			server: 'error'
		});
		return expect(promise).to.be.rejectedWith('Server error');
	});
});
